import AbstractObserver from '../utils/abstract-observer';

class Destinations extends AbstractObserver {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  getDestinations() {
    return this._destinations;
  }
}

export default Destinations;
