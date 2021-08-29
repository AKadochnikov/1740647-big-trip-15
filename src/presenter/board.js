import SortControlsView from '../view/sort-controls';
import EventsListView from '../view/events-list';
import NoEventView from '../view/no-events';
import {render, RenderPosition, remove} from '../utils/render';
import EventPresenter from './event';
import {sortPrice, sortTime} from '../utils/event';
import {SortType, UpdateType, UserAction} from '../const';

class Board {
  constructor(boardContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._boardContainer = boardContainer;
    this._eventListComponent = new EventsListView();
    this._noEventComponent = new NoEventView();
    this._eventPresenter = new Map();
    this._currentSortType = SortType.SORT_DAY;

    this._sortComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelUpdateType = this._handleModelUpdateType.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelUpdateType);
  }

  init(){
    this._renderBoard();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.SORT_TIME:
        return this._eventsModel.getEvents().slice().sort(sortTime);
      case SortType.SORT_PRICE:
        return this._eventsModel.getEvents().slice().sort(sortPrice);
    }
    return this._eventsModel.getEvents();
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvents(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelUpdateType(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortControlsView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _renderNoEvents() {
    render(this._boardContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearEventList () {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();
  }

  _renderEventsList(){
    render(this._boardContainer, this._eventListComponent, RenderPosition.BEFOREEND);
    const events = this._getEvents().slice();
    this._renderEvents(events);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._clearEventList();

    remove(this._sortComponent);
    remove(this._noEventComponent);

    if (resetSortType) {
      this._currentSortType = SortType.SORT_DAY;
    }
  }

  _renderBoard() {
    const events = this._getEvents();
    if (events.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventsList();
  }
}

export default Board;
