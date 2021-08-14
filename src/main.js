import TripInfoView from './view/trip-info';
import NavigationView from './view/navigation';
import ControlFiltersView from './view/control-filters';
import SortControlsView from './view/sort-controls';
import CostView from './view/cost';
import EventsListView from './view/events-list';
import EventEditView from './view/event-edit';
import EventView from './view/event';
import NoEvent from './view/no-events';
import {generatePoint} from './mock/event-mock';
import {render, RenderPosition, replace} from './utils/render';

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


render(tripMain, new TripInfoView, RenderPosition.AFTERBEGIN);

const tripInfo = document.querySelector('.trip-main__trip-info');

render(tripInfo, new CostView, RenderPosition.BEFOREEND);
render(controlNavigation, new NavigationView, RenderPosition.BEFOREEND);
render(controlFilters, new ControlFiltersView, RenderPosition.BEFOREEND);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setEditClickHandler(() => {
    replaceFormToEvent();
  });

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);

};

const renderEventList = (eventContainer, events) => {
  const eventListComponent = new EventsListView();

  if (events.length === 0) {
    render(eventContainer, new NoEvent, RenderPosition.BEFOREEND);
    return;
  }
  render(eventContainer, new SortControlsView, RenderPosition.BEFOREEND);
  render(eventContainer, eventListComponent, RenderPosition.BEFOREEND);
  events.slice().forEach((event) => renderEvent(eventListComponent, event));

};

renderEventList(tripEvents, points);

export {townsSet, points};
