import EventView from '../view/event';
import EventEditView from '../view/event-edit';
import {render, RenderPosition, replace} from '../utils/render';

class Event {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEventClick = this._handleEventClick.bind(this);
  }

  init(event) {
    this._event = event;

    this._eventComponent = new EventView(this._event);
    this._eventEditComponent = new EventEditView(this._event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setEditClickHandler(this._handleEventClick);

    render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _replaceEventToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToEvent();
    }
  }

  _handleEventClick() {
    this._replaceFormToEvent();
  }

  _handleEditClick() {
    this._replaceEventToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToEvent();
  }
}

export default Event;
