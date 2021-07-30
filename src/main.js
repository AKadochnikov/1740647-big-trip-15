import {createTripInfoTemplate} from './view/trip-info.js';
import {createNavigationTemplate} from './view/navigation.js';
import {createControlFiltersTemplate} from './view/control-filters.js';
import {createSortControlsTemplate} from './view/sort-controls.js';
import {createCostTemplate} from './view/cost.js';
import {createEventsListTemplate} from './view/events-list.js';
import {createEventAddTemplate} from './view/event-add.js';
import {createEventEditTemplate} from './view/event-edit.js';
import {createEventTemplate} from './view/event.js';

const RENDER_COUNT = 3;

const tripMain = document.querySelector('.trip-main');
const controlNavigation = document.querySelector('.trip-controls__navigation');
const controlFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const render = (container, template, place, count = 1) => {
  for (let i = 0; i < count; i++){
    container.insertAdjacentHTML(place, template);
  }
};

render(tripMain, createTripInfoTemplate(), 'afterbegin');

const tripInfo = document.querySelector('.trip-main__trip-info');

render(tripInfo, createCostTemplate(), 'beforeend');
render(controlNavigation, createNavigationTemplate(), 'beforeend');
render(controlFilters, createControlFiltersTemplate(), 'beforeend');
render(tripEvents, createSortControlsTemplate(), 'beforeend');
render(tripEvents, createEventsListTemplate(), 'beforeend');

const eventList = document.querySelector('.trip-events__list');

render(eventList,createEventEditTemplate(), 'beforeend');
render(eventList, createEventAddTemplate(), 'beforeend');
render(eventList, createEventTemplate(), 'beforeend', RENDER_COUNT);
