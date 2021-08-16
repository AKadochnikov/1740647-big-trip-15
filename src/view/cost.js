import AbstractView from './abstract';

const createCostTemplate = () => (
  `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
);

class Cost extends AbstractView {
  getTemplate() {
    return createCostTemplate();
  }
}

export default Cost;
