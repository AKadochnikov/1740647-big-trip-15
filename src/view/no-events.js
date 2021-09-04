import AbstractView from './abstract';
import {FilterType} from '../const';

const NoEventTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createNoEventsTemplate = (filterType) => {
  const noEventTextValue = NoEventTextType[filterType];
  return (
    `<p class="trip-events__msg">
    ${noEventTextValue}
  </p>`
  );
};

class NoEvent extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoEventsTemplate(this._data);
  }
}

export default NoEvent;
