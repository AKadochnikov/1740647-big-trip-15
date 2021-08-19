import TripInfoView from './view/trip-info';
import NavigationView from './view/navigation';
import ControlFiltersView from './view/control-filters';
import CostView from './view/cost';
import {generatePoint} from './mock/event-mock';
import {render, RenderPosition} from './utils/render';
import BoardPresenter from './presenter/board';
import {sortDay} from './utils/event';

const RENDER_COUNT = 20;

const points = new Array(RENDER_COUNT).fill().map(generatePoint).sort(sortDay);

const townsSet = new Set();

const getTownsSet = (items) => {
  items.forEach((item) => {
    townsSet.add(item.destination.name);
  });
};

getTownsSet(points);

const tripMain = document.querySelector('.trip-main');
const controlNavigation = document.querySelector('.trip-controls__navigation');
const controlFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter(tripEvents);

render(tripMain, new TripInfoView, RenderPosition.AFTERBEGIN);

const tripInfo = document.querySelector('.trip-main__trip-info');

render(tripInfo, new CostView, RenderPosition.BEFOREEND);
render(controlNavigation, new NavigationView, RenderPosition.BEFOREEND);
render(controlFilters, new ControlFiltersView, RenderPosition.BEFOREEND);

boardPresenter.init(points);

export {townsSet, points};
