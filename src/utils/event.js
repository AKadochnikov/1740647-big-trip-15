import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getDuration = (dateStart, dateEnd) => {
  const dayjsDateStart = dayjs(dateStart, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const dayjsDateEnd = dayjs(dateEnd, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const currentDuration = dayjsDateEnd.diff(dayjsDateStart);
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

const getFormatedDate = (date) => {
  const dayjsDate = dayjs(date, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  return dayjsDate.format('DD/MM/YYYY HH:mm');
};

const sortDay = (eventA, eventB) => {
  const dayjsDateA = dayjs(eventA.date_from, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const dayjsDateB = dayjs(eventB.date_from, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  return dayjs(dayjsDateA).diff(dayjs(dayjsDateB));
};

const getDateMilliseconds = (event) => {
  const dateStartObj = dayjs(event.date_from, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const dateEndObj = dayjs(event.date_to, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const currentDuration = dateEndObj.diff(dateStartObj);
  return dayjs(currentDuration);
};

const sortTime = (eventA, eventB) => {
  const rankA = getDateMilliseconds(eventA);
  const rankB = getDateMilliseconds(eventB);

  return rankB - rankA;
};

const getPrice = (event) => event.base_price;

const sortPrice = (eventA, eventB) => {
  const rankA = getPrice(eventA);
  const rankB = getPrice(eventB);

  return rankB - rankA;
};

export {getFormatedDate, getDuration, sortDay, sortTime, sortPrice};
