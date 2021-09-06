const getFilterOffersType = (points, offerType) => points.filter((point) => point.type === offerType);

const getOffersCollection = (points) => {
  const OffersType = new Set();
  points.forEach((point) => {
    if(point.offers !== '') {
      OffersType.add(point.type);
    }
  });
  return OffersType;
};

const getOffersPrice = (point, currentArr) => {
  const currentOffers = point.offers;

  if (currentOffers !== '') {
    currentOffers.forEach((offer) => {
      currentArr.push(offer.price);
      return currentArr;
    });
  }

  return currentArr;
};

const getOfferTime = (points, offerType) => {
  const offersTime = [];
  const filteredPoints = getFilterOffersType(points, offerType);
  filteredPoints.forEach((point) => {
    const dateFrom = point.date_from;
    const dateTo = point.date_to;
    offersTime.push(dateTo.diff(dateFrom));
  });
  return offersTime.reduce((a, b) => a + b);
};

const getOfferCount = (points, offerType) => getFilterOffersType(points, offerType).length;

const getOfferCost = (points, offerType) => {
  const offersTypeCost = [];
  const filteredPoints = getFilterOffersType(points, offerType);

  filteredPoints.forEach((point) => getOffersPrice(point, offersTypeCost));

  return offersTypeCost.reduce((a, b) => a + b);
};

const getMapResult = (points, offerTypes, currentFunction) => offerTypes.map((type) => currentFunction(points, type));


export {getOffersCollection, getMapResult, getOfferCost, getOfferCount, getOfferTime};
