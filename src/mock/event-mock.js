const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const description = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'];

const pointType = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const towns = ['Tokyo', 'London', 'Taipei', 'Singapore', 'Barcelona', 'New York', 'Amsterdam', 'Sydney', 'Vienna', 'Salzburg'];
const offersTitle = ['Upgrade to a business class', 'Choose the radio station', 'Choose meal', 'Upgrade to comfort class', 'Order Uber'];

const getDescription = () => {
  const descriptionCount = getRandomInteger(0, description.length - 1);
  const newDescription = [];
  for (let i = 0; i <= descriptionCount; i++) {
    newDescription.push(description[i]);
  }
  return newDescription.join(' ');
};

const getOffers = () => {
  const count = getRandomInteger(0, 2);
  const newOffersArray = [];
  for (let i = 0; i <= count; i++) {
    const offerItem = {
      'title': offersTitle[getRandomInteger(0, offersTitle.length - 1)],
      'price': getRandomInteger(20, 200),
    };
    newOffersArray.push(offerItem);
  }
  return newOffersArray;
};

const currentDescription = getDescription();
const currentTown = towns[getRandomInteger(0, towns.length - 1)];
const currentType = pointType[getRandomInteger(0, pointType.length - 1)];
const currentOffers = getOffers();

const getPictureArray = () => {
  const count = getRandomInteger(0, 5);
  const newPicturesArray = [];
  for (let i = 0; i <= count; i++) {
    const pictureItem = {
      'src': `http://picsum.photos/300/200?r=${getRandomInteger(1, 9999999)}`,
      'description': `${currentTown} ${currentDescription.charAt(0).toLowerCase() + currentDescription.slice(1)}`,
    };
    newPicturesArray.push(pictureItem);
  }
  return newPicturesArray;
};

const currentPictures = getPictureArray();

const destination = {
  'description': currentDescription,
  'name': currentTown,
  'pictures': currentPictures,
};

const offer = {
  'type': currentType,
  'offers': currentOffers,
};

const point = {
  'base_price': getRandomInteger(500, 2000),
  'date_from': '2019-07-10T22:55:56.845Z',
  'date_to': '2019-07-11T11:22:13.375Z',
  'destination': destination,
  'id': `${getRandomInteger(0, 100)}`,
  'is_favorite': Boolean(getRandomInteger(0, 1)),
  'offers': currentOffers,
  'type': currentType,
};


