const eventTypeHandler = () => {
  const eventTypeList = document.querySelector('.event__type-list');
  const allEventTypes = eventTypeList.querySelectorAll('input');
  const eventTypeWrapper = document.querySelector('.event__type-wrapper');
  const labelType = eventTypeWrapper.querySelector('label');
  const imageType = labelType.querySelector('.event__type-icon');
  const eventFieldGroup = document.querySelector('.event__field-group');
  const eventLabel = eventFieldGroup.querySelector('.event__label');

  eventTypeList.addEventListener('change', (evt) => {
    const typeValue = evt.target.value;
    imageType.src = `img/icons/${typeValue}.png`;
    eventLabel.textContent = typeValue;
    allEventTypes.forEach((item) => {
      item.removeAttribute('checked');
      if (typeValue === item.value) {
        item.setAttribute('checked', 'checked');
      }
    });
  });
};

export {eventTypeHandler};
