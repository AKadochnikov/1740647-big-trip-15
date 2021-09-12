import SmartView from './smart';
import {createDataListOptionsTemplate, createTypeTemplate} from '../utils/event-edit-add';
import {getFormatedDate} from '../utils/event';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {NEW_EVENT} from '../const';

const getPhotoItems = (items) => {
  let photoTemplate = '';
  items.forEach((item) => {
    const currentPhoto = `<img class="event__photo" src="${item.src}" alt="Event photo">`;
    photoTemplate += currentPhoto;
  });
  return photoTemplate;
};

const getOffers = (item, offers) => {
  let currentOffer = [];
  offers.forEach((offer) => {
    if (item.type === offer.type) {
      currentOffer = offer.offers;
      return currentOffer;
    }
  });
  return currentOffer;
};

const isChecked = (itemOffers, offerTitle) => {
  let booleanResult = false;
  if(itemOffers.length > 0) {
    itemOffers.forEach((itemOffer) => {
      if(itemOffer.title === offerTitle) {
        booleanResult = true;
      }
      return booleanResult;
    });
  }
  return booleanResult;
};

const createAvailableOffers = (item, offers, isAddEvent) => {
  const currentOffers = getOffers(item, offers);

  let offersTemplate = '';
  currentOffers.forEach((offer) => {
    const currentOffersTemplate = `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" ${item.isDisabled ? 'disabled' : ''} ${isAddEvent ? '' : `${isChecked(item.offers, offer.title) ? 'checked' : ''}`}>
                        <label class="event__offer-label" for="event-offer-${offer.title}-1">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`;
    offersTemplate += currentOffersTemplate;
  });
  return offersTemplate;
};

const createOffersTemplate = (item, offers) => {
  const currentOffers = getOffers(item, offers);
  return `${currentOffers.length > 0 ? `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${createAvailableOffers(item, offers)}
</div>
</section>`: ''}`;
};


const createEventEditTemplate = (item, isAddEvent, offers, destinations) => (
  `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  ${createTypeTemplate(item)}
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${item.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${item.destination.name}" list="destination-list-1" onkeyup="this.value=''" ${item.isDisabled ? 'disabled' : ''} required>
                    <datalist id="destination-list-1">
                      ${createDataListOptionsTemplate(destinations)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFormatedDate(item.dateFrom)}" ${item.isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormatedDate(item.dateTo)}" ${item.isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${item.basePrice}" ${item.isDisabled ? 'disabled' : ''} required>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${item.isDisabled ? 'disabled' : ''}>${item.isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset" ${item.isDisabled ? 'disabled' : ''}>${isAddEvent ? 'Cancel' : `${item.isDeleting ? 'Deleting...' : 'Delete'}`}</button>
                  ${isAddEvent ? '' : '<button class="event__rollup-btn" type="button">'}
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${createOffersTemplate(item, offers, isAddEvent)}

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
  constructor(event = NEW_EVENT, offers, destinations, isAddEvent = false) {
    super();
    this._data = EventEdit.parseEventToData(event);
    this._offers = offers;
    this._destinations = destinations;
    this._startDatepicker = null;
    this._endDatepicker = null;
    this._isAddEvent = isAddEvent;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._typesSelectHandler = this._typesSelectHandler.bind(this);
    this._townsSelectHandler = this._townsSelectHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._offersCheckChangeHandler = this._offersCheckChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatePicker();
  }

  reset(event) {
    this.updateData(
      EventEdit.parseEventToData(event),
    );
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._isAddEvent, this._offers, this._destinations);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    if (!this._isAddEvent) {
      this.setEditClickHandler(this._callback.editClick);
    }
    this._setStartDatepicker();
    this._setEndDatePicker();
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    } else if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._data.dateFrom) {
      this._startDatepicker = flatpickr(
        this.getElement().querySelector('#event-start-time-1'),
        {
          dateFormat: 'd/m/y H:i',
          ['time_24hr']: true,
          enableTime: true,
          defaultDate: getFormatedDate(this._data.dateFrom),
          onClose: this._startDateChangeHandler,
        },
      );
    }
  }

  _setEndDatePicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    if (this._data.dateTo) {
      this._endDatepicker = flatpickr(
        this.getElement().querySelector('#event-end-time-1'),
        {
          dateFormat: 'd/m/y H:i',
          ['time_24hr']: true,
          enableTime: true,
          defaultDate: getFormatedDate(this._data.dateTo),
          minDate: getFormatedDate(this._data.dateFrom),
          onClose: this._endDateChangeHandler,
        },
      );
    }
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

    const offers = this.getElement().querySelector('.event__available-offers');

    if(offers !== null) {
      offers.addEventListener('change', this._offersCheckChangeHandler);
    }
  }

  _offersCheckChangeHandler(evt) {
    if(!evt.target.checked) {
      evt.target.removeAttribute('checked');
    } else {
      evt.target.setAttribute('checked', 'checked');
    }
    const newOffers = [];

    const checkedOffer = document.querySelectorAll('.event__offer-checkbox:checked');
    checkedOffer.forEach((item) =>{
      const contentTitle = item.nextElementSibling.querySelector('.event__offer-title').textContent;
      const contentPrice = item.nextElementSibling.querySelector('.event__offer-price').textContent;
      newOffers.push({
        title: contentTitle,
        price: Number(contentPrice),
      });
    });

    this.updateData({
      offers: newOffers,
    }, true);
  }

  _startDateChangeHandler([userDate]) {
    const dateDuration = this._data.dateTo.diff(dayjs(userDate));
    if(dateDuration < 0) {
      this.updateData({
        'dateFrom': dayjs(userDate),
        'dateTo': dayjs(userDate),
      });
    }
    this.updateData({
      'dateFrom': dayjs(userDate),
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      'dateTo': dayjs(userDate),
    }, true);
  }

  _typesSelectHandler(evt) {
    evt.preventDefault();
    this._offers.forEach((item) => {
      if(item.type === evt.target.value) {
        this.updateData({
          type: item.type,
          offers: [],
        });
      }
    });
  }

  _townsSelectHandler(evt) {
    evt.preventDefault();
    this._destinations.forEach((item) => {
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
      'basePrice': Number(evt.target.value),
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToEvent(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
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
    return Object.assign({}, event,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}

export default EventEdit;

