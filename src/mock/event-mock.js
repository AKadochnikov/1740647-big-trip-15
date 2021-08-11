import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax.js';
dayjs.extend(minMax);

const MAX_MINUTE_GAP = 30;
const MAX_HOUR_GAP = 3;
const MAX_DAY_GAP = 3;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'];

const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const towns = ['Tokyo', 'London', 'Taipei', 'Singapore', 'Barcelona', 'New York', 'Amsterdam', 'Sydney', 'Vienna', 'Salzburg'];
const offersTitle = ['Upgrade to a business class', 'Choose the radio station', 'Choose meal', 'Upgrade to comfort class', 'Order Uber'];

const generateDate = () => {
  const minuteGap = getRandomInteger(-MAX_MINUTE_GAP, MAX_MINUTE_GAP);
  const hourGap = getRandomInteger(-MAX_HOUR_GAP, MAX_HOUR_GAP);
  const dayGap = getRandomInteger(-MAX_DAY_GAP, MAX_DAY_GAP);

  return dayjs().add(minuteGap, 'minute').add(hourGap, 'hour').add(dayGap, 'day').toDate();
};


const getDescription = () => {
  const descriptionCount = getRandomInteger(0, descriptions.length - 1);
  const newDescription = [];
  for (let i = 0; i <= descriptionCount; i++) {
    newDescription.push(descriptions[i]);
  }
  return newDescription.join(' ');
};

const getOffers = () => {
  const count = getRandomInteger(0, 2);
  const newOffersArray = [];
  for (let i = 0; i <= count; i++) {
    const offerItem = {
      'title': offersTitle[getRandomInteger(0, offersTitle.length - 1)],
      'price': getRandomInteger(20, 200),
    };
    newOffersArray.push(offerItem);
  }
  return newOffersArray;
};

const currentType = pointTypes[getRandomInteger(0, pointTypes.length - 1)];
const currentOffers = getOffers();

const getPictures = () => {
  const currentDescription = getDescription();
  const count = getRandomInteger(0, 5);
  const newPicturesArray = [];
  for (let i = 0; i <= count; i++) {
    const pictureItem = {
      'src': `http://picsum.photos/300/200?r=${getRandomInteger(1, 9999999)}`,
      'description': `${currentDescription.charAt(0).toLowerCase() + currentDescription.slice(1)}`,
    };
    newPicturesArray.push(pictureItem);
  }
  return newPicturesArray;
};

const getDestination = () => ({
  'description': getDescription(),
  'name': towns[getRandomInteger(0, towns.length - 1)],
  'pictures': getPictures(),
});

const offer = {
  'type': currentType,
  'offers': currentOffers,
};

const generatePoint = () => {
  const date1 = dayjs(generateDate());
  const date2 = dayjs(generateDate());
  const getDateFrom = () => dayjs.min(date1, date2);
  const getDateTo = () => dayjs.max(date1, date2);
  return {
    'base_price': getRandomInteger(500, 2000),
    'date_from': getDateFrom().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    'date_to': getDateTo().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    'destination': getDestination(),
    'id': `${getRandomInteger(0, 100)}`,
    'is_favorite': Boolean(getRandomInteger(0, 1)),
    'offers': getOffers(),
    'type': pointTypes[getRandomInteger(0, pointTypes.length - 1)],
  };
};

export {generatePoint, offer};
