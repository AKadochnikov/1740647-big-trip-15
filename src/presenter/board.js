import SortControlsView from '../view/sort-controls';
import EventsListView from '../view/events-list';
import NoEventView from '../view/no-events';
import {render, RenderPosition, remove} from '../utils/render';
import EventPresenter from './event';
import EventNewPresenter from './event-new';
import {filter} from '../utils/filter';
import {sortDay, sortPrice, sortTime} from '../utils/event';
import {SortType, UpdateType, UserAction, FilterType} from '../const';

class Board {
  constructor(boardContainer, eventsModel, filterModel) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._boardContainer = boardContainer;
    this._eventListComponent = new EventsListView();
    this._eventPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.SORT_DAY;

    this._sortComponent = null;
    this._noEventComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelUpdateType = this._handleModelUpdateType.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._eventListComponent, this._handleViewAction);
  }

  init(){
    this._eventsModel.addObserver(this._handleModelUpdateType);
    this._filterModel.addObserver(this._handleModelUpdateType);
    this._renderBoard();
  }

  destroy() {
    this._clearBoard({resetSortType: true});

    remove(this._eventListComponent);

    this._eventsModel.removeObserver(this._handleModelUpdateType);
    this._filterModel.removeObserver(this._handleModelUpdateType);
  }

  createEvent(callback) {
    this._currentSortType = SortType.SORT_DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init(callback);
  }

  _getEvents() {
    this._filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filter[this._filterType](events);

    switch (this._currentSortType) {
      case SortType.SORT_DAY:
        return filteredEvents.sort(sortDay);
      case SortType.SORT_TIME:
        return filteredEvents.sort(sortTime);
      case SortType.SORT_PRICE:
        return filteredEvents.sort(sortPrice);
    }
    return filteredEvents;
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
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
    this._noEventComponent = new NoEventView(this._filterType);
    render(this._boardContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();

    remove(this._sortComponent);

    if (this._noEventComponent){
      remove(this._noEventComponent);
    }

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
    render(this._boardContainer, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderEvents(events);
  }
}

export default Board;
