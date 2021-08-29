import SortControlsView from '../view/sort-controls';
import EventsListView from '../view/events-list';
import NoEventView from '../view/no-events';
import {render, RenderPosition} from '../utils/render';
import EventPresenter from './event';
import {updateItem} from '../utils/common';
import {sortPrice, sortTime} from '../utils/event';
import {SortType} from '../const';

class Board {
  constructor(boardContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._boardContainer = boardContainer;
    this._sortComponent = new SortControlsView();
    this._eventListComponent = new EventsListView();
    this._noEventComponent = new NoEventView();
    this._eventPresenter = new Map();
    this._currentSortType = SortType.SORT_DAY;

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardEvents){
    this._boardEvents = boardEvents.slice();
    this._sourcedBoardEvents = boardEvents.slice();
    this._renderBoard();
  }

  _getTasks() {
    return this._eventsModel.getEvents();
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._boardEvents = updateItem(this._boardEvents, updatedEvent);
    this._sourcedBoardEvents = updateItem(this._sourcedBoardEvents, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.SORT_TIME:
        this._boardEvents.sort(sortTime);
        break;
      case SortType.SORT_PRICE:
        this._boardEvents.sort(sortPrice);
        break;
      default:
        this._boardEvents = this._sourcedBoardEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventList();
    this._renderEventsList();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderEvents() {
    this._boardEvents.slice().forEach((event) => this._renderEvent(event));
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
    this._renderEvents();
  }

  _renderBoard() {
    if (this._boardEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventsList();
  }
}

export default Board;
