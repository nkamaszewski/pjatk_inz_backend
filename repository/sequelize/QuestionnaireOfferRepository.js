const Offer = require('../../model/sequelize/Offer');
const QuestionnaireOffer = require('../../model/sequelize/QuestionnaireOffer');
const Employee = require('../../model/sequelize/Employee');
const Employment = require('../../model/sequelize/Employment');


exports.getQuestionnaireOffers = () => {
  return QuestionnaireOffer.findAll({
    attributes: ['IdQuestionnaireOffer', 'Year', 'IdPerson'],
    include: [
      {
        model: Offer,
        as: 'questionnaireOfferOffer',
      },
    ],
  });
};

exports.createQuestionnaireOffer = (newQuestionnaireOfferData) => {
  const { IdQuestionnaireOffer, Year, IdPerson } = newQuestionnaireOfferData;
  return QuestionnaireOffer.create({
    IdQuestionnaireOffer,
    Year,
    IdPerson,
  });
};

exports.deleteQuestionnaireOffer = (questionnaireOfferId) => {
  return QuestionnaireOffer.destroy({
    where: { IdQuestionnaireOffer: questionnaireOfferId },
  });
};

exports.updateQuestionnaireOffer = (questionnaireOfferId, data) => {
  const IdQuestionnaireOffer = data.IdQuestionnaireOffer;
  const IdPerson = data.IdPerson;
  const Year = data.Year;

  return QuestionnaireOffer.update(data, {
    where: { IdQuestionnaireOffer: questionnaireOfferId },
  });
};

exports.getQuestionnaireOfferById = (questionnaireOfferId) => {
  return QuestionnaireOffer.findByPk(questionnaireOfferId);
};


exports.getQuestionnaireOfferByEmpId = (empId) => {
  return QuestionnaireOffer.findAll({
    attributes: ['IdQuestionnaireOffer', 'Year', 'IdPerson'],
    include: [
      {
        model: Offer,
        as: 'questionnaireOfferOffer'
      }
    ],
    where: { IdPerson: empId }
  });
};

exports.getQuestionnaireOfferByDepId = (depId) => {
  return QuestionnaireOffer.findAll({
    attributes: ['IdQuestionnaireOffer', 'Year'],
    include: [
      {
        model: Employee,
        as: 'questionnaireOfferEmployee',
        include: [
          {
            model: Employment,
            as: 'employeeEmployment',
            where: {
              IdDepartment: depId,
              DateTo: null
            }
          }]
      },
    ],
    include: [
      {
        model: Offer,
        as: 'questionnaireOfferOffer'
      }
    ],
  });
};

exports.getQuestionnaireOfferByDivId = (divId) => {
  return QuestionnaireOffer.findAll({
    attributes: ['IdQuestionnaireOffer', 'Year'],
    include: [
      {
        model: Employee,
        as: 'questionnaireOfferEmployee',
        include: [
          {
            model: Employment,
            as: 'employeeEmployment',
            where: {
              DateTo: null
            },
            include: [
              {
                model: Department,
                as: 'departmentEmployment',
                where: {
                  IdDivision: divId
                }

              }]
          }]
      },
    ],
    include: [
      {
        model: Offer,
        as: 'questionnaireOfferOffer'
      }
    ],
  });
};