import TripInfoView from './view/trip-info';
import NavigationView from './view/navigation';
import ControlFiltersView from './view/control-filters';
import SortControlsView from './view/sort-controls';
import CostView from './view/cost';
import EventsListView from './view/events-list';
import EventAddView from './view/event-add';
import EventEditView from './view/event-edit';
import EventView from './view/event';
import NoEvent from './view/no-events';
import {generatePoint} from './mock/event-mock';
import {render, RenderPosition} from './utils';

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

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__save-btn').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToEvent();
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);

};

const renderEventList = (eventContainer, events) => {
  const eventListComponent = new EventsListView();

  if (events.length === 0) {
    render(eventContainer, new NoEvent().getElement(), RenderPosition.BEFOREEND);
    return;
  }
  render(eventContainer, new SortControlsView().getElement(), RenderPosition.BEFOREEND);
  render(eventContainer, eventListComponent.getElement(), RenderPosition.BEFOREEND);
  events.slice().forEach((event) => renderEvent(eventListComponent.getElement(), event));

};

render(tripMain, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);

const tripInfo = document.querySelector('.trip-main__trip-info');

render(tripInfo, new CostView().getElement(), RenderPosition.BEFOREEND);
render(controlNavigation, new NavigationView().getElement(), RenderPosition.BEFOREEND);
render(controlFilters, new ControlFiltersView().getElement(), RenderPosition.BEFOREEND);
//render(tripEvents, new SortControlsView().getElement(), RenderPosition.BEFOREEND);

renderEventList(tripEvents, points);

export {townsSet, points};
