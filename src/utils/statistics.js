const getFilterOffersType = (points, offerType) => points.filter((point) => point.type === offerType);

const getOffersCollection = (points, allTypes = false) => {
  const OffersType = new Set();

  if(allTypes) {
    points.forEach((point) => {
      OffersType.add(point.type);
    });
    return OffersType;
  }

  points.forEach((point) => {
    if(point.offers.length !== 0) {
      OffersType.add(point.type);
    }
  });
  return OffersType;
};

const getOffersPrice = (point, offersTypeCost) => {
  const currentOffers = point.offers;

  if (currentOffers !== '') {
    currentOffers.forEach((offer) => {
      offersTypeCost.push(offer.price);
      return offersTypeCost;
    });
  }

  return offersTypeCost;
};

const getOfferTime = (points, offerType) => {
  const offersTime = [];
  const filteredPoints = getFilterOffersType(points, offerType);
  filteredPoints.forEach((point) => {
    const dateFrom = point.dateFrom;
    const dateTo = point.dateTo;
    offersTime.push(dateTo.diff(dateFrom));
  });
  return offersTime.reduce((a, b) => a + b);
};

const getOfferCount = (points, offerType) => getFilterOffersType(points, offerType).length;

const getOfferCost = (points, offerType) => {
  const offersTypeCost = [];
  const filteredPoints = getFilterOffersType(points, offerType);

  filteredPoints.forEach((point) => getOffersPrice(point, offersTypeCost));
  if(offersTypeCost.length === 0) {
    return;
  }
  return offersTypeCost.reduce((a, b) => a + b);
};

const getMapResult = (points, offerTypes, currentFunction) => offerTypes.map((type) => currentFunction(points, type));


export {getOffersCollection, getMapResult, getOfferCost, getOfferCount, getOfferTime};
