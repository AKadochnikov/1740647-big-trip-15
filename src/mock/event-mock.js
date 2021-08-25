import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import {getRandomInteger} from '../utils/common';
dayjs.extend(minMax);

const MAX_MINUTE_GAP = 30;
const MAX_HOUR_GAP = 3;
const MAX_DAY_GAP = 3;

const descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];

const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const getDescription = () => {
  const descriptionCount = getRandomInteger(0, descriptions.length - 1);
  const newDescription = [];
  for (let i = 0; i < descriptionCount; i++) {
    newDescription.push(descriptions[i]);
  }
  return newDescription.join(' ');
};

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

const destionations = [
  {
    'description': getDescription(),
    'name': 'Tokyo',
    'pictures': getPictures(),
  },
  {
    'description': getDescription(),
    'name': 'London',
    'pictures': getPictures(),
  },
  {
    'description': getDescription(),
    'name': 'Taipei',
    'pictures': getPictures(),
  },
  {
    'description': getDescription(),
    'name': 'Singapore',
    'pictures': getPictures(),
  },
  {
    'description': getDescription(),
    'name': 'Barcelona',
    'pictures': getPictures(),
  },
];
const offersItems = [
  {
    'offer_id': 'business-class',
    'title': 'Upgrade to a business class',
    'price': getRandomInteger(20, 200),
  },
  {
    'offer_id': 'radio',
    'title': 'Choose the radio station',
    'price': getRandomInteger(20, 200),
  },
  {
    'offer_id': 'meal',
    'title': 'Choose meal',
    'price': getRandomInteger(20, 200),
  },
  {
    'offer_id': 'comfort',
    'title': 'Upgrade to comfort class',
    'price': getRandomInteger(20, 200),
  },
  {
    'offer_id': 'uber',
    'title': 'Order Uber',
    'price': getRandomInteger(20, 200),
  },
];

const generateDate = () => {
  const minuteGap = getRandomInteger(-MAX_MINUTE_GAP, MAX_MINUTE_GAP);
  const hourGap = getRandomInteger(-MAX_HOUR_GAP, MAX_HOUR_GAP);
  const dayGap = getRandomInteger(-MAX_DAY_GAP, MAX_DAY_GAP);

  return dayjs().add(minuteGap, 'minute').add(hourGap, 'hour').add(dayGap, 'day').toDate();
};

const getOffers = () => {
  const count = getRandomInteger(0, 2);
  const newOffersArray = [];
  if (count === 0) {
    return '';
  }
  for (let i = 0; i < count; i++) {
    const offerItem = offersItems[getRandomInteger(0, offersItems.length - 1)];
    newOffersArray.push(offerItem);
  }
  return newOffersArray;
};

const availableOffers = [
  {
    'type': 'taxi',
    'offers': getOffers(),
  },
  {
    'type': 'bus',
    'offers': getOffers(),
  },
  {
    'type': 'train',
    'offers': getOffers(),
  },
  {
    'type': 'ship',
    'offers': getOffers(),
  },
  {
    'type': 'transport',
    'offers': getOffers(),
  },
  {
    'type': 'drive',
    'offers': getOffers(),
  },
  {
    'type': 'flight',
    'offers': getOffers(),
  },
  {
    'type': 'check-in',
    'offers': getOffers(),
  },
  {
    'type': 'sightseeing',
    'offers': getOffers(),
  },
  {
    'type': 'restaurant',
    'offers': getOffers(),
  },
];

const generatePoint = () => {
  const date1 = dayjs(generateDate());
  const date2 = dayjs(generateDate());
  const getDateFrom = () => dayjs.min(date1, date2);
  const getDateTo = () => dayjs.max(date1, date2);
  return {
    'base_price': getRandomInteger(500, 2000),
    'date_from': getDateFrom().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    'date_to': getDateTo().format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    'destination': destionations[getRandomInteger(0, destionations.length - 1)],
    'id': `${getRandomInteger(0, 100000)}`,
    'is_favorite': Boolean(getRandomInteger(0, 1)),
    'offers': availableOffers[getRandomInteger(0, availableOffers.length - 1)].offers,
    'type': pointTypes[getRandomInteger(0, pointTypes.length - 1)],
  };
};

export {generatePoint, offersItems, destionations, availableOffers};
