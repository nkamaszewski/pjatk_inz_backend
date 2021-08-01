const Offer = require('../../model/sequelize/Offer');

exports.getOffers = () => {
    return Offer.findAll();
};

exports.createOffer = (newOfferData) => {
    return Offer.create({
        Topic: newOfferData.Topic,
        Link: newOfferData.Link,
        Price: newOfferData.Price
        
    });
};

exports.deleteOffer = (offerId) => {
    return Offer.destroy({
        where: { IdOffer: offerId }
    });
};

exports.updateOffer = (offerId, data) => {
    const Topic = data.Topic;
    const Link = data.Link;
    const Price = data.Price;
    return Offer.update(data, { where: { IdOffer: offerId } });
}

exports.getOfferById = (offId) => {
    return Offer.findByPk(offId);
};
