//создать массив из типов оффера
//позже сделать объект из ключей тип офера и значений суммы.

//создать функцию которая будет считать стоимость офферов за все точки путешествия


const getOffersCollection = (points) => {
  const OfferTypes = new Set();
  points.forEach((point) => {
    if(point.offers !== '') {
      OfferTypes.add(point.type);
    }
  });
  return OfferTypes;
};

const getOfferPrice = (point, currentArr) => {
  const currentOffers = point.offers;

  if (currentOffers !== '') {
    currentOffers.forEach((offer) => {
      currentArr.push(offer.price);
      return currentArr;
    });
  }

  return currentArr;
};


const getOffersCost = (points, offerType) => {
  const offerTypeCost = [];
  const filteredPoints = points.filter((point) => point.type === offerType);

  filteredPoints.forEach((point) => getOfferPrice(point, offerTypeCost));

  return offerTypeCost.reduce((a, b) => a + b);
};

const countOfferTypeCost = (points, offerTypes) => offerTypes.map((type) => getOffersCost(points, type));

export {getOffersCollection, getOffersCost, countOfferTypeCost};
