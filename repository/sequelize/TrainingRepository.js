const Education = require("../../model/sequelize/Education");
const Coach = require("../../model/sequelize/Coach");
const Person = require("../../model/sequelize/Person");
const Topic = require("../../model/sequelize/Topic");
const Company = require("../../model/sequelize/Company");
const Training = require("../../model/sequelize/Training");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.getTrainings = (params) => {
	const { internal, active, subject } = params;
	console.log(internal);
	return Training.findAll({
		attributes: ["Internal", "DateFrom", "DateTo", "IdEducation"],
		include: [
			{
				model: Education,
				as: "trainingEducation",
			},
			{
				model: Company,
				as: "trainingCompany",
			},
			{
				model: Topic,
				as: "trainingTopic",
				where: [subject ? { IdSubject: subject } : {}],
			},
			{
				model: Coach,
				as: "trainingCoach",
				include: [
					{
						model: Person,
						as: "CoachPerson",
					},
				],
			},
		],
		where: [
			internal ? { Internal: internal } : {},
			active == 1 ? { DateTo: { [Op.gte]: new Date() } } : {},
		],
		order: [["DateFrom", "DESC"]],
	});
};

exports.createTraining = (newTrainingData) => {
	return Training.create({
		IdEducation: newTrainingData.IdEducation,
		IdTopic: newTrainingData.IdTopic,
		IdCompany: newTrainingData.IdCompany,
		IdPerson: newTrainingData.IdPerson,
		Internal: newTrainingData.Internal,
		DateFrom: newTrainingData.DateFrom,
		DateTo: newTrainingData.DateTo,
	});
};

exports.deleteTraining = (eduId) => {
	return Education.destroy({
		where: { IdEducation: eduId },
	}).then(() => {
		return Training.destroy({
			where: { IdEducation: eduId },
		});
	});
};

exports.updateTraining = (eduId, data) => {
	const name = data.Name;
	const idDivision = data.IdDivision;

	const IdEducation = data.IdEducation;
	const IdTopic = data.IdTopic;
	const IdCompany = data.IdCompany;
	const IdPerson = data.IdPerson;
	const Internal = data.Internal;
	const DateFrom = data.DateFrom;
	const DateTo = data.DateTo;

	return Training.update(data, { where: { IdEducation: eduId } });
};

exports.getTrainingById = (eduId) => {
	return Training.findByPk(eduId);
};

exports.getTrainingByInternal = (int) => {
	return Training.findAll({
		attributes: ["Internal", "DateFrom", "DateTo"],
		include: [
			{
				model: Education,
				as: "trainingEducation",
			},
			{
				model: Company,
				as: "trainingCompany",
			},
			{
				model: Topic,
				as: "trainingTopic",
			},
			{
				model: Coach,
				as: "trainingCoach",
				include: [
					{
						model: Person,
						as: "CoachPerson",
					},
				],
			},
		],
		where: {
			Internal: int,
		},
	});
};
