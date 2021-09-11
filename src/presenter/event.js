import EventView from '../view/event';
import EventEditView from '../view/event-edit';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {UserAction, UpdateType} from '../const';
import {isDatesEqual} from '../utils/event';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class Event {
  constructor(eventListContainer, changeDate,  changeMode, offers, destinations) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeDate;
    this._changeMode = changeMode;
    this._offers = offers;
    this._destinations = destinations;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEventClick = this._handleEventClick.bind(this);
  }

  init(event) {
    this._event = event;
    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event, this._offers, this._destinations);

    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setEditClickHandler(this._handleEventClick);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _replaceEventToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceFormToEvent();
    }
  }

  _handleEventClick() {
    this._eventEditComponent.reset(this._event);
    this._replaceFormToEvent();
  }

  _handleEditClick() {
    this._replaceEventToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._event,
        {
          'isFavorite': !this._event.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(update) {
    const isMinorUpdate =
      !isDatesEqual(this._event.dateFrom, update.dateFrom) ||
      !isDatesEqual(this._event.dateTo, update.dateTo);

    this._changeData(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this._replaceFormToEvent();
  }

  _handleDeleteClick(event) {
    this._changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  }
}

export default Event;
