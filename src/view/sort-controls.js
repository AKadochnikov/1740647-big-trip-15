import AbstractView from './abstract';
import {SortType} from '../const';
import {isChecked} from '../utils/event-edit-add';

const createSortControlsTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day"  ${isChecked(currentSortType, SortType.SORT_DAY)}>
              <label class="trip-sort__btn" for="sort-day" data-sort-type="${SortType.SORT_DAY}">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event"  disabled>
              <label class="trip-sort__btn" for="sort-event" data-sort-type="${SortType.SORT_EVENT}">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${isChecked(currentSortType, SortType.SORT_TIME)}>
              <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortType.SORT_TIME}">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${isChecked(currentSortType, SortType.SORT_PRICE)}>
              <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortType.SORT_PRICE}">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer"  disabled>
              <label class="trip-sort__btn" for="sort-offer" data-sort-type="${SortType.SORT_OFFER}">Offers</label>
            </div>
          </form>`
);

class SortControls extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortControlsTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    const currentType = evt.target.dataset.sortType;

    if (currentType === SortType.SORT_EVENT || currentType === SortType.SORT_OFFER) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

export default SortControls;
