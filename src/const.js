import dayjs from 'dayjs';

const SortType = {
  SORT_DAY: 'sort-day',
  SORT_EVENT: 'sort-event',
  SORT_TIME: 'sort-time',
  SORT_PRICE: 'sort-price',
  SORT_OFFER: 'sort-offer',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const NEW_EVENT = {
  'basePrice': '',
  'dateFrom': dayjs(),
  'dateTo': dayjs(),
  'type': 'taxi',
  'offers': [
    {
      title: 'Upgrade to a business class',
      price: 190,
    },
    {
      title: 'Choose the radio station',
      price: 30,
    },
    {
      title: 'Choose temperature',
      price: 170,
    },
    {
      title: 'Drive quickly, I\'m in a hurry',
      price: 100,
    },
    {
      title: 'Drive slowly',
      price: 110,
    },
  ],
  'destination': {
    'description': '',
    'name': '',
    'pictures': [],
  },
  'is_Favorite': false,
};

const MenuItem = {
  TABLE: 'TABLE',
  STATISTICS: 'STATISTICS',
};

const BAR_HEIGHT = 55;


const METHOD = {
  GET: 'GET',
  PUT: 'PUT',
};

const SUCCESS_STATUS_RANGE = {
  MIN: 200,
  MAX: 299,
};

const AUTHORIZATION = 'Basic ff3ay7rSL9tt9vk7f';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

export {SortType, UserAction, UpdateType, FilterType,
  NEW_EVENT, MenuItem, BAR_HEIGHT, METHOD,
  SUCCESS_STATUS_RANGE, AUTHORIZATION, END_POINT};
