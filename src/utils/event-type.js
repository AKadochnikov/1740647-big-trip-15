const eventTypeHandler = () => {
  const eventTypeList = document.querySelector('.event__type-list');
  const allEventTypes = eventTypeList.querySelectorAll('input');
  const eventTypeWrapper = document.querySelector('.event__type-wrapper');
  const labelType = eventTypeWrapper.querySelector('label');

  const eventFieldGroup = document.querySelector('.event__field-group');
  const eventLabel = eventFieldGroup.querySelector('.event__label');

  eventTypeList.addEventListener('change', (evt) => {

  });
};

export {eventTypeHandler};
