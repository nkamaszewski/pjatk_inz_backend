const Offer = require("../../model/sequelize/Offer");
const QuestionnaireOffer = require("../../model/sequelize/QuestionnaireOffer");

exports.getOffers = () => {
	return Offer.findAll();
};

exports.createOffer = (newOfferData) => {
	const { IdOffer, Topic, Link, Price, IdQuestionnaireOffer } = newOfferData;
	return Offer.create({
		IdOffer,
		Topic,
		Link,
		Price,
		IdQuestionnaireOffer,
	});
};

exports.deleteOffer = (offerId, userId) => {
	// return Offer.destroy({
	//     where: { IdOffer: offerId }
	// });

	return Offer.findOne({
		include: [
			{
				attributes: [],
				model: QuestionnaireOffer,
				as: "offerQuestionnaireOffer",
				where: { IdPerson: userId },
			},
		],
		where: { IdOffer: offerId },
	}).then(function (offer) {
		if (offer) {
			return offer.destroy();
		} else {
			return -1;
		}
	});
};

exports.updateOffer = (offerId, userId, data) => {
	const IdOffer = data.IdOffer;
	const Topic = data.Topic;
	const Link = data.Link;
	const Price = data.Price;
	// return Offer.update(data, { where: { IdOffer: offerId } });

	return Offer.findOne({
		include: [
			{
				attributes: [],
				model: QuestionnaireOffer,
				as: "offerQuestionnaireOffer",
				where: { IdPerson: userId },
			},
		],
		where: { IdOffer: offerId },
	}).then(function (offer) {
		if (offer) {
			return offer.update(data);
		} else {
			return -1;
		}
	});
};

exports.getOfferById = (offId) => {
	return Offer.findByPk(offId);
};

exports.getNumberOfOffers = (questOfferId) => {
	return Offer.findAndCountAll({
		where: {
			IdQuestionnaireOffer: questOfferId,
		},
	});
};
