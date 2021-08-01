const Offer = require('../../model/sequelize/Offer');
const QuestionnaireOffer = require('../../model/sequelize/QuestionnaireOffer');

exports.getQuestionnaireOffers = () => {
    return QuestionnaireOffer.findAll({
        attributes: ['IdQuestionnaireOffer', 'Year', 'IdPerson'],
        include: [{
            model: Offer,
            as: 'guestionnaireOfferOffer'
        }]
    });

};

exports.createQuestionnaireOffer = (questionnaireOfferId, newQuestionnaireOfferData) => {
    return QuestionnaireOffer.create({
        IdQuestionnaireOffer: questionnaireOfferId,
        IdPerson: personId,
        Year: newQuestionnaireOfferData.Year
    });
};

exports.deleteQuestionnaireOffer = (questionnaireOfferId) => {
    return QuestionnaireOffer.destroy({
        where: { IdQuestionnaireOffer: questionnaireOfferId }
    });
};

exports.updateQuestionnaireOffer = (questionnaireOfferId, data) => {

    const IdQuestionnaireOffer = data.IdQuestionnaireOffer;
    const IdPerson = data.IdPerson;
    const Year = data.Year;


    return QuestionnaireOffer.update(data, { where: { IdQuestionnaireOffer: questionnaireOfferId } });
}

exports.getQuestionnaireOfferById = (questionnaireOfferId) => {
    return QuestionnaireOffer.findByPk(questionnaireOfferId);
};