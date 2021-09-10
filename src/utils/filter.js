import {FilterType} from '../const';
import dayjs from 'dayjs';
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import IsBetween from 'dayjs/plugin/isBetween';
dayjs.extend(IsBetween);
dayjs.extend(IsSameOrBefore);
dayjs.extend(IsSameOrAfter);

const dateIsBetween = (dateFrom, dateTo) => dayjs().isBetween(dateFrom, dateTo);

const getFilterFuture = (item) => {
  const dateFrom = dayjs(item.dateFrom, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const dateTo = dayjs(item.dateTo, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  return dateFrom.isSameOrAfter(dayjs()) || dateIsBetween(dateFrom, dateTo);
};

const getFilterPast = (item) => {
  const dateFrom = dayjs(item.dateFrom, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const dateTo = dayjs(item.dateTo, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  return dateFrom.isSameOrBefore(dayjs()) || dateIsBetween(dateFrom, dateTo);
};

const filter = {
  [FilterType.EVERYTHING] : (events) => events,
  [FilterType.FUTURE] : (events) => events.filter((event) => getFilterFuture(event)),
  [FilterType.PAST] : (events) => events.filter((event) => getFilterPast(event)),
};

export {getFilterFuture, filter};
