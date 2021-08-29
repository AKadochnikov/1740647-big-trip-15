import AbstractObserver from '../utils/abctract-observer';

class Events extends AbstractObserver {
  constructor() {
    super();
    this._events = [];
  }

  setEvents(events) {
    this._events = events.slice();
  }

  getEvents() {
    return this._events;
  }
}

export default Events;
