const Offer = require('../../model/sequelize/Offer');

exports.getOffers = () => {
    return Offer.findAll();
};

exports.createOffer = (newOfferData) => {
    const {IdOffer,Topic,Link,Price,IdQuestionnaireOffer} = newOfferData
    return Offer.create({
        IdOffer,
        Topic,
        Link,
        Price,
        IdQuestionnaireOffer
    });
};

exports.deleteOffer = (offerId) => {
    return Offer.destroy({
        where: { IdOffer: offerId }
    });
};

exports.updateOffer = (offerId, data) => {
    const IdOffer = data.IdOffer;
    const Topic = data.Topic;
    const Link = data.Link;
    const Price = data.Price;
    return Offer.update(data, { where: { IdOffer: offerId } });
}

exports.getOfferById = (offId) => {
    return Offer.findByPk(offId);
};
