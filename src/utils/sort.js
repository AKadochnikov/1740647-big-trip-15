//Сортировка находится в разработке.
/*const getDateMilliseconds = (dateStart, dateEnd) => {
  const dateStartObj = dayjs(dateStart, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const dateEndObj = dayjs(dateEnd, 'YYYY-MM-DDTHH:mm:ssZ[Z]');
  const currentDuration = dateEndObj.diff(dateStartObj);
  return dayjs(currentDuration);
};

const compareSortDate = (dateA, dateB) => {
  const rankA = getDateMilliseconds(dateA);
  const rankB = getDateMilliseconds(dateB);

  return rankB - rankA;
};

const getPrice = (item) => item.price;

const compareSortPrice = (priceA, priceB) => {
  const rankA = getPrice(priceA);
  const rankB = getDateMilliseconds(priceB);

  return rankB - rankA;
};

const getSortArray = (items) => {
  const sortForm = document.querySelector('.trip-events__trip-sort');
  const allSortControls = sortForm.querySelectorAll('input');
  const daySortControl = sortForm.querySelector('#sort-day');
  const timeSortControl = sortForm.querySelector('#sort-time');
  const priceSortControl = sortForm.querySelector('#sort-price');
  let containerForArray = [];

  sortForm.addEventListener('change', (evt) => {
    const target = evt.target.id;

    allSortControls.forEach((sortItem) => {
      sortItem.removeAttribute('checked');
    });

    switch (target) {
      case 'sort-day':
        daySortControl.setAttribute('checked', 'checked');
        containerForArray = items;
        console.log(containerForArray);
        return containerForArray;
      case 'sort-time':
        timeSortControl.setAttribute('checked', 'checked');
        containerForArray = items.slice().sort(compareSortDate);
        return containerForArray;
      case 'sort-price':
        priceSortControl.setAttribute('checked', 'checked');
        containerForArray = items.slice().sort(compareSortPrice);
        return containerForArray;
      default:
        containerForArray = items;
        return containerForArray;
    }
  });
  return containerForArray;
};*/
