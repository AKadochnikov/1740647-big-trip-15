import TripInfoView from './view/trip-info';
import NavigationView from './view/navigation';
//import ControlFiltersView from './view/filter';
import CostView from './view/cost';
import {generatePoint} from './mock/event-mock';
import {render, RenderPosition} from './utils/render';
import BoardPresenter from './presenter/board';
import FilterPresenter from './presenter/filter';
import {sortDay} from './utils/event';
import EventsModel from './model/events';
import FilterModel from './model/filter';

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

render(tripInfo, new CostView, RenderPosition.BEFOREEND);
render(controlNavigation, new NavigationView, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(tripEvents, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(controlFilters, filterModel, eventsModel);

filterPresenter.init();
boardPresenter.init();

export {townsSet, points};
