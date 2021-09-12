import dayjs from 'dayjs';

const AUTHORIZATION = 'Basic ff3ay7rSL9tt9vk7f';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';
const SHAKE_ANIMATION_TIMEOUT = 600;
const ONE_THOUSAND_MILLISEC = 1000;
const BAR_HEIGHT = 55;

const NEW_EVENT = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  type: 'taxi',
  offers: [],
  destination: {
    description: 'Chamonix, with crowded streets, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    name: 'Chamonix',
    pictures: [
      {
        'src': 'http://picsum.photos/300/200?r=0.961477384126419',
        'description': 'Chamonix kindergarten',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.8186866271526865',
        'description': 'Chamonix parliament building',
      },
      {
        'src': 'http://picsum.photos/300/200?r=0.46713149742733173',
        'description': 'Chamonix central station',
      },
    ],
  },
  isFavorite: false,
};

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
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const MenuItem = {
  TABLE: 'TABLE',
  STATISTICS: 'STATISTICS',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessStatusRange = {
  MIN: 200,
  MAX: 299,
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export {SortType, UserAction, UpdateType, FilterType,
  NEW_EVENT, MenuItem, BAR_HEIGHT, Method,
  SuccessStatusRange, AUTHORIZATION, END_POINT, State, Mode, SHAKE_ANIMATION_TIMEOUT, ONE_THOUSAND_MILLISEC};
