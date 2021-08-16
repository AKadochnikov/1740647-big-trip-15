import AbstractView from './abstract';

const createEventsListTemplate = () => (
  `<ul class="trip-events__list">

</ul>`
);

class EventsList extends AbstractView {
  getTemplate() {
    return createEventsListTemplate();
  }
}

export default EventsList;
