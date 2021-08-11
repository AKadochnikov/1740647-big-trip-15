import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const getDuration = (dateStart, dateEnd) => {
  const dateStartObj = dayjs(dateStart, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const dateEndObj = dayjs(dateEnd, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const currentDuration = dateEndObj.diff(dateStartObj);
  const millisecondsDuration = dayjs.duration(currentDuration, 'millisecond');
  const minuteDuration = millisecondsDuration.format('mm');
  const hourDuration = millisecondsDuration.format('HH');
  const dayDuration = millisecondsDuration.format('DD');
  let concatDuration = `${dayDuration}D ${hourDuration}H ${minuteDuration}M`;
  if (dayDuration === '00' && hourDuration === '00') {
    concatDuration = `${minuteDuration}M`;
    return concatDuration;
  } else if (dayDuration === '00') {
    concatDuration = `${hourDuration}H ${minuteDuration}M`;
    return concatDuration;
  }
  return concatDuration;
};

const getFilterFuture = (item) => {
  const dateFrom = dayjs(item.date_from, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  return dateFrom.isSameOrAfter(dayjs());
};

const getFilterPast = (item) => {
  const dateFrom = dayjs(item.date_from, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  return dateFrom.isSameOrBefore(dayjs());
};

//Сортировка находится в разработке. По ДЗ её не было, как и фильтрация.
/*const getDateMilliseconds = (dateStart, dateEnd) => {
  const dateStartObj = dayjs(dateStart, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const dateEndObj = dayjs(dateEnd, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const currentDuration = dateEndObj.diff(dateStartObj);
  return dayjs(currentDuration);
};

const compareSortDate = (dateA, dateB) => {
  const rankA = getDateMilliseconds(dateA);
  const rankB = getDateMilliseconds(dateB);

  return rankB - rankA;
};

const getPrice = (item) => item.price;

const compareSortPrice = (priceA, priceB) => {
  const rankA = getPrice(priceA);
  const rankB = getDateMilliseconds(priceB);

  return rankB - rankA;
};

const getSortArray = (items) => {
  const sortForm = document.querySelector('.trip-events__trip-sort');
  const allSortControls = sortForm.querySelectorAll('input');
  const daySortControl = sortForm.querySelector('#sort-day');
  const timeSortControl = sortForm.querySelector('#sort-time');
  const priceSortControl = sortForm.querySelector('#sort-price');
  let containerForArray = [];

  sortForm.addEventListener('change', (evt) => {
    const target = evt.target.id;

    allSortControls.forEach((sortItem) => {
      sortItem.removeAttribute('checked');
    });

    switch (target) {
      case 'sort-day':
        daySortControl.setAttribute('checked', 'checked');
        containerForArray = items;
        console.log(containerForArray);
        return containerForArray;
      case 'sort-time':
        timeSortControl.setAttribute('checked', 'checked');
        containerForArray = items.slice().sort(compareSortDate);
        return containerForArray;
      case 'sort-price':
        priceSortControl.setAttribute('checked', 'checked');
        containerForArray = items.slice().sort(compareSortPrice);
        return containerForArray;
      default:
        containerForArray = items;
        return containerForArray;
    }
  });
  return containerForArray;
};*/

const filterStateHandler = (items, cb) => {
  const filter = document.querySelector('.trip-filters');
  const allFilterInputs = filter.querySelectorAll('input');
  const everythingFilter = filter.querySelector('#filter-everything');
  const futureFilter = filter.querySelector('#filter-future');
  const pastFilter = filter.querySelector('#filter-past');

  filter.addEventListener('change', (evt) => {
    const target = evt.target.id;
    const copiedItems = items.slice();
    let filteredArray = '';

    allFilterInputs.forEach((filterItem) => {
      filterItem.removeAttribute('checked');
    });

    switch (target) {
      case 'filter-everything':
        everythingFilter.setAttribute('checked', 'checked');
        filteredArray = copiedItems;
        break;
      case 'filter-future':
        futureFilter.setAttribute('checked', 'checked');
        filteredArray = copiedItems.filter((item) =>getFilterFuture(item));
        break;
      case 'filter-past':
        pastFilter.setAttribute('checked', 'checked');
        filteredArray = copiedItems.filter((item) =>getFilterPast(item));
        break;
      default:
        everythingFilter.setAttribute('checked', 'checked');
        filteredArray = copiedItems;
        break;
    }
    cb(filteredArray);
  });
};

const eventTypeHandler = () => {
  const eventTypeList = document.querySelector('.event__type-list');
  const allEventTypes = eventTypeList.querySelectorAll('input');
  const eventTypeWrapper = document.querySelector('.event__type-wrapper');
  const labelType = eventTypeWrapper.querySelector('label');
  const imageType = labelType.querySelector('.event__type-icon');
  const eventFieldGroup = document.querySelector('.event__field-group');
  const eventLabel = eventFieldGroup.querySelector('.event__label');

  eventTypeList.addEventListener('change', (evt) => {
    const typeValue = evt.target.value;
    imageType.src = `img/icons/${typeValue}.png`;
    eventLabel.textContent = typeValue;
    allEventTypes.forEach((item) => {
      item.removeAttribute('checked');
      if (typeValue === item.value) {
        item.setAttribute('checked', 'checked');
      }
    });
  });
};

const createDataListOptionsTemplate = (townItems) => {
  let optionTemplate = '';
  townItems.forEach((item) => {
    const currentOption = `<option value="${item}"></option>`;
    optionTemplate += currentOption;
  });
  return optionTemplate;
};

const getFormatedDate = (date) => {
  const dateObj = dayjs(date, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  return dateObj.format('DD/MM/YYYY HH:mm');
};

const createTypeTemplate = (item) => `<div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${item.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                          <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>`;

export {getDuration, filterStateHandler, getFilterFuture, RenderPosition, render, createElement, eventTypeHandler, createDataListOptionsTemplate, getFormatedDate, createTypeTemplate};

