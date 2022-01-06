const Offer = require('../../model/sequelize/Offer');
const QuestionnaireOffer = require('../../model/sequelize/QuestionnaireOffer');
const Employee = require('../../model/sequelize/Employee');
const Employment = require('../../model/sequelize/Employment');
const Role = require('../../model/Role');

exports.getQuestionnaireOffers = (...userData) => {
	const [userId, userIdDepartment, userIdDivision, userIdRole] = userData;
	return QuestionnaireOffer.findAll({
		attributes: ['IdQuestionnaireOffer', 'Year', 'IdPerson'],
		include: [
			{
				model: Employee,
				as: 'questionnaireOfferEmployee',
				include: [
					{
						model: Employment,
						as: 'employeeEmployment',
						where:
							userIdRole == Role.PRACOWNIK
								? { IdPerson: userId }
								: userIdRole == Role.KIEROWNIK
								? { IdDepartment: userIdDepartment }
								: userIdRole == Role.DYREKTOR
								? { IdDivision: userIdDivision }
								: {},
					},
				],
			},
		],
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

exports.deleteQuestionnaireOffer = (questionnaireOfferId, userId) => {
	// return QuestionnaireOffer.destroy({
	//   where: { IdQuestionnaireOffer: questionnaireOfferId, IdPerson: userId },
	// });
	return QuestionnaireOffer.findOne({
		where: {
			IdQuestionnaireOffer: questionnaireOfferId,
			IdPerson: userId,
		},
	}).then(function (questOffer) {
		if (questOffer) {
			return questOffer.destroy();
		} else {
			return -1;
		}
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
				as: 'questionnaireOfferOffer',
			},
		],
		where: { IdPerson: empId },
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
							DateTo: null,
						},
					},
				],
			},
		],
		include: [
			{
				model: Offer,
				as: 'questionnaireOfferOffer',
			},
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
							DateTo: null,
						},
						include: [
							{
								model: Department,
								as: 'departmentEmployment',
								where: {
									IdDivision: divId,
								},
							},
						],
					},
				],
			},
		],
		include: [
			{
				model: Offer,
				as: 'questionnaireOfferOffer',
			},
		],
	});
};
