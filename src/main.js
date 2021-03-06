import NavigationView from './view/navigation';
import StatisticsView from './view/statistics';
import {remove, render, RenderPosition} from './utils/render';
import BoardPresenter from './presenter/board';
import FilterPresenter from './presenter/filter';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';
import EventsModel from './model/events';
import FilterModel from './model/filter';
import {MenuItem, UpdateType} from './const';
import {switchAfterLine} from './utils/render';
import Api from './api';
import {AUTHORIZATION, END_POINT} from './const';

const api = new Api(END_POINT, AUTHORIZATION);

const controlNavigation = document.querySelector('.trip-controls__navigation');
const controlFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const navigationComponent = new NavigationView();

const boardPresenter = new BoardPresenter(tripEvents, eventsModel, filterModel, offersModel, destinationsModel, api);
const filterPresenter = new FilterPresenter(controlFilters, filterModel, eventsModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      switchAfterLine();
      boardPresenter.destroy();
      boardPresenter.init();
      remove(statisticsComponent);
      filterPresenter.filtersEnabled();
      document.querySelector('.trip-main__event-add-btn').removeAttribute('disabled');
      break;
    case MenuItem.STATISTICS:
      switchAfterLine(true);
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(tripEvents, statisticsComponent, RenderPosition.BEFOREEND);
      boardPresenter.destroy();
      filterPresenter.filtersDisabled();
      document.querySelector('.trip-main__event-add-btn').setAttribute('disabled', 'disabled');
      break;
  }
};

render(controlNavigation, navigationComponent, RenderPosition.BEFOREEND);
filterPresenter.init();
filterPresenter.filtersDisabled();
boardPresenter.init();
document.querySelector('.trip-main__event-add-btn').setAttribute('disabled', 'disabled');

api.getData()
  .then(([offers, destinations, events]) => {
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    eventsModel.setEvents(UpdateType.INIT, events);
    navigationComponent.setMenuClickHandler(handleSiteMenuClick);
    document.querySelector('.trip-main__event-add-btn').removeAttribute('disabled');
  })
  .catch(() => {
    filterPresenter.filtersDisabled();
    document.querySelector('.trip-main__event-add-btn').setAttribute('disabled', 'disabled');
    eventsModel.setEvents(UpdateType.INIT, []);
  });

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.target.setAttribute('disabled', 'disabled');
  evt.preventDefault();
  boardPresenter.createEvent();
});
