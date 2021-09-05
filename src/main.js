import TripInfoView from './view/trip-info';
import NavigationView from './view/navigation';
import CostView from './view/cost';
import StatisticsView from './view/statistics';
import {generatePoint} from './mock/event-mock';
import {remove, render, RenderPosition} from './utils/render';
import BoardPresenter from './presenter/board';
import FilterPresenter from './presenter/filter';
import {sortDay} from './utils/event';
import EventsModel from './model/events';
import FilterModel from './model/filter';
import {MenuItem} from './const';
import {switchAfterLine} from './utils/render';

const RENDER_COUNT = 20;

const points = new Array(RENDER_COUNT).fill().map(generatePoint).sort(sortDay);

const townsSet = new Set();

const getTownsSet = (items) => {
  items.forEach((item) => {
    townsSet.add(item.destination.name);
  });
};

getTownsSet(points);

const eventsModel = new EventsModel();
eventsModel.setEvents(points);

const filterModel = new FilterModel();

const tripMain = document.querySelector('.trip-main');
const controlNavigation = document.querySelector('.trip-controls__navigation');
const controlFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

render(tripMain, new TripInfoView, RenderPosition.AFTERBEGIN);

const tripInfo = document.querySelector('.trip-main__trip-info');
const navigationComponent = new NavigationView();

render(tripInfo, new CostView, RenderPosition.BEFOREEND);
render(controlNavigation, navigationComponent, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(tripEvents, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(controlFilters, filterModel, eventsModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  const filtersInput = controlFilters.querySelectorAll('.trip-filters__filter-input');
  switch (menuItem) {
    case MenuItem.TABLE:
      switchAfterLine();
      boardPresenter.init();
      remove(statisticsComponent);
      filtersInput.forEach((filter) => filter.removeAttribute('disabled'));
      document.querySelector('.trip-main__event-add-btn').removeAttribute('disabled');
      break;
    case MenuItem.STATISTICS:
      switchAfterLine(true);
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(tripEvents, statisticsComponent, RenderPosition.BEFOREEND);
      boardPresenter.destroy();
      filtersInput.forEach((filter) => filter.setAttribute('disabled', 'disabled'));
      document.querySelector('.trip-main__event-add-btn').setAttribute('disabled', 'disabled');
      break;
  }
};

navigationComponent.setMenuClickHandler(handleSiteMenuClick);


filterPresenter.init();
boardPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.target.setAttribute('disabled', 'disabled');
  evt.preventDefault();
  boardPresenter.createEvent();
});

export {townsSet, points};
