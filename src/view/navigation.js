import AbstractView from './abstract';
import {MenuItem} from '../const';

const createNavigationTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-value="${MenuItem.TABLE}">Table</a>
                <a class="trip-tabs__btn" href="#" data-value="${MenuItem.STATISTICS}">Stats</a>
              </nav>`
);

class Navigation extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.value);
    const menuControls = this.getElement().querySelectorAll('a');
    const currentControl = evt.target;

    menuControls.forEach((control) => control.classList.remove('trip-tabs__btn--active'));

    currentControl.classList.add('trip-tabs__btn--active');
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}

export default Navigation;
