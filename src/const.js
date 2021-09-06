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
  'base_price': '',
  'date_from': dayjs(),
  'date_to': dayjs(),
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

export {SortType, UserAction, UpdateType, FilterType, NEW_EVENT, MenuItem, BAR_HEIGHT};
