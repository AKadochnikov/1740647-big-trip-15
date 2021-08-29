import SortControlsView from '../view/sort-controls';
import EventsListView from '../view/events-list';
import NoEventView from '../view/no-events';
import {render, RenderPosition} from '../utils/render';
import EventPresenter from './event';
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

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelUpdateType = this._handleModelUpdateType.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
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

  /*_handleEventChange(updatedEvent) {
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }*/

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelUpdateType(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearEventList();
    this._renderEventsList();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  _renderBoard() {
    if (this._getEvents().length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventsList();
  }
}

export default Board;
