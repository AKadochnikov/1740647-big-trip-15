import {townsSet} from '../main.js';
import SmartView from './smart';
import {createDataListOptionsTemplate, createTypeTemplate} from '../utils/event-edit-add';
import {getFormatedDate} from '../utils/event';
import {destionations, availableOffers} from '../mock/event-mock';


const getPhotoItems = (items) => {
  let photoTemplate = '';
  items.forEach((item) => {
    const currentPhoto = `<img class="event__photo" src="${item.src}" alt="Event photo">`;
    photoTemplate += currentPhoto;
  });
  return photoTemplate;
};

const createAvailableOffer = (offers) => {
  let offersTemplate = '';
  offers.forEach((currentOffer) => {
    const currentOffersTemplate = `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${currentOffer.offer_id}-1" type="checkbox" name="event-offer-${currentOffer.offer_id}">
                        <label class="event__offer-label" for="event-offer-${currentOffer.offer_id}-1">
                          <span class="event__offer-title">${currentOffer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${currentOffer.price}</span>
                        </label>
                      </div>`;
    offersTemplate += currentOffersTemplate;
  });
  return offersTemplate;
};


const createEventEditTemplate = (item) => (
  `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  ${createTypeTemplate(item)}
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${item.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${item.destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createDataListOptionsTemplate(townsSet)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormatedDate(item.date_from)}" readonly>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormatedDate(item.date_to)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${item.base_price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${item.offers ? `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${createAvailableOffer(item.offers)}
                    </div>
                  </section>`: ''}

                 ${item.destination.description ? `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${item.destination.description}</p>
                  </section>`: ''}
                                 ${item.destination.pictures ? `<div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${getPhotoItems(item.destination.pictures)}
                      </div>
                    </div>` : ''}
                </section>
              </form>
            </li>`
);

class EventEdit extends SmartView {
  constructor(event) {
    super();
    this._data = EventEdit.parseEventToData(event);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);

    this._typesSelectHandler = this._typesSelectHandler.bind(this);
    this._townsSelectHandler = this._townsSelectHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(event) {
    this.updateData(
      EventEdit.parseEventToData(event),
    );
  }

  getTemplate() {
    return createEventEditTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-list')
      .addEventListener('change', this._typesSelectHandler);
    this.getElement()
      .querySelector('#event-destination-1')
      .addEventListener('change', this._townsSelectHandler);
    this.getElement()
      .querySelector('#event-price-1')
      .addEventListener('input', this._priceInputHandler);
  }

  _typesSelectHandler(evt) {
    evt.preventDefault();
    availableOffers.forEach((item) => {
      if(item.type === evt.target.value) {
        this.updateData({
          type: item.type,
          offers: item.offers,
        });
      }
    });
  }

  _townsSelectHandler(evt) {
    evt.preventDefault();
    destionations.forEach((item) => {
      if(item.name === evt.target.value){
        this.updateData({
          destination: item,
        });
      }
    });
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      'base_price': evt.target.value,
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.event__save-btn').addEventListener('submit', this._formSubmitHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick(EventEdit.parseEventToData(this._data));
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign({}, event);
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);
    return data;
  }
}

export default EventEdit;

