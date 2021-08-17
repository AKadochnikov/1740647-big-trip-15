import SortControlsView from '../view/sort-controls';
import EventsListView from '../view/events-list';
import NoEventView from '../view/no-events';
import {render, RenderPosition} from '../utils/render';
import EventPresenter from './event';

class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._sortComponent = new SortControlsView();
    this._eventListComponent = new EventsListView();
    this._noEventComponent = new NoEventView();
  }

  init(boardEvents){
    this._boardEvents = boardEvents;
    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListComponent);
    eventPresenter.init(event);
  }

  _renderEvents() {
    this._boardEvents.slice().forEach((event) => this._renderEvent(event));
  }

  _renderNoEvents() {
    render(this._boardContainer, this._noEventComponent, RenderPosition.BEFOREEND);
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
