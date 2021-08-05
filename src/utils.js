import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);

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
        break;
    }
    cb(filteredArray);
  });
};

export {getDuration, filterStateHandler, getFilterFuture};
