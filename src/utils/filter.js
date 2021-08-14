import dayjs from 'dayjs';
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);

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
        filteredArray = copiedItems.filter((item) => getFilterFuture(item));
        break;
      case 'filter-past':
        pastFilter.setAttribute('checked', 'checked');
        filteredArray = copiedItems.filter((item) => getFilterPast(item));
        break;
      default:
        everythingFilter.setAttribute('checked', 'checked');
        filteredArray = copiedItems;
        break;
    }
    cb(filteredArray);
  });
};

export {getFilterFuture, filterStateHandler};
