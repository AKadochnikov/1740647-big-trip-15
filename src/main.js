import {createTripInfoTemplate} from './view/trip-info.js';
import {createNavigationTemplate} from './view/navigation.js';
import {createControlFiltersTemplate} from './view/control-filters.js';
import {createSortControlsTemplate} from './view/sort-controls.js';
import {createCostTemplate} from './view/cost.js';
import {createEventsListTemplate} from './view/events-list.js';
import {createEventAddTemplate} from './view/event-add.js';
import {createEventEditTemplate} from './view/event-edit.js';
import {createEventTemplate} from './view/event.js';
import {generatePoint} from './mock/event-mock.js';
import {filterStateHandler} from './utils.js';
import {eventTypeHandler} from './view/event-edit.js';

const RENDER_COUNT = 20;

const points = new Array(RENDER_COUNT).fill().map(generatePoint);

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

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripMain, createTripInfoTemplate(), 'afterbegin');

const tripInfo = document.querySelector('.trip-main__trip-info');

render(tripInfo, createCostTemplate(), 'beforeend');
render(controlNavigation, createNavigationTemplate(), 'beforeend');
render(controlFilters, createControlFiltersTemplate(), 'beforeend');
render(tripEvents, createSortControlsTemplate(), 'beforeend');
render(tripEvents, createEventsListTemplate(), 'beforeend');

const eventList = document.querySelector('.trip-events__list');

render(eventList,createEventEditTemplate(points[0]), 'beforeend');
render(eventList,createEventAddTemplate(points[0]), 'beforeend');

const getRenderEvents = (items) => {
  eventList.innerHTML = '';
  render(eventList,createEventEditTemplate(points[0]), 'beforeend');
  render(eventList,createEventAddTemplate(points[0]), 'beforeend');
  for (let i = 1; i < items.length; i++){
    render(eventList, createEventTemplate(items[i]), 'beforeend');
  }
};

getRenderEvents(points);
filterStateHandler(points, getRenderEvents);
eventTypeHandler();

export {getRenderEvents, townsSet, points};
