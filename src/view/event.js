import dayjs from 'dayjs';
import AbstractView from './abstract';
import {getDuration} from '../utils/event';

const createOffersCollection = (offers) => {
  let offersTemplate = '';
  offers.forEach((currentOffer) => {
    const currentOffersTemplate = `<li class="event__offer">
      <span class="event__offer-title">${currentOffer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${currentOffer.price}</span>
    </li>`;
    offersTemplate += currentOffersTemplate;});
  return offersTemplate;
};

const getFavoriteButton = (isFavorite) => {
  if (isFavorite) {
    return 'event__favorite-btn--active';
  }
  return '';
};

const createEventTemplate = (item) => {
  const dateFromObj = dayjs(item.dateFrom, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const dateToObj = dayjs(item.dateTo, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFromObj.format('YYYY-MM-DD')}">${dateFromObj.format('MMM DD')}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${item.type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${item.type} ${item.destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFromObj.format('YYYY-MM-DDTHH:mm')}">${dateFromObj.format('HH:mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateToObj.format('YYYY-MM-DDTHH:mm')}">${dateToObj.format('HH:mm')}</time>
                  </p>
                  <p class="event__duration">${getDuration(item.dateFrom, item.dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${item.basePrice}</span>
                </p>
                ${item.offers ? `<h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                    ${createOffersCollection(item.offers)}
                </ul>` : ''}
                <button class="event__favorite-btn ${getFavoriteButton(item.isFavorite)}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}

export default Event;
