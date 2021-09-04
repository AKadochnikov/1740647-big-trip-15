import AbstractView from './abstract';
import {MenuItem} from '../const';

const createNewEventControl = () => (`<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" value="${MenuItem.ADD_NEW_EVENT}">New event</button>`);

class NewEventControl extends AbstractView {
  getTemplate() {
    return createNewEventControl();
  }
}

export default NewEventControl;
