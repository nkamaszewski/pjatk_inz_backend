const sequelize = require('./sequelize');
const Division = require('../../model/sequelize/Division');
const Department = require('../../model/sequelize/Department');
const Position = require('../../model/sequelize/Position');
const Employment = require('../../model/sequelize/Employment');
const Subject = require('../../model/sequelize/Subject');
const Topic = require('../../model/sequelize/Topic');
const Participation = require('../../model/sequelize/Participation');
const Questionnaire = require('../../model/sequelize/Questionnaire');
const QuestionnaireIssue = require('../../model/sequelize/QuestionnaireIssue');
const Issue = require('../../model/sequelize/Issue');

module.exports = () => {
	Division.hasMany(Department, { as: 'divisionDepartments', foreignKey: { name: 'IdDivision', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Department.belongsTo(Division, { as: 'departmentsDivision', foreignKey: { name: 'IdDivision', allowNull: false } });

	Position.hasMany(Employment, { as: 'positionEmployments', foreignKey: { name: 'IdPosition', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Employment.belongsTo(Position, { as: 'emplymentPosition', foreignKey: { name: 'IdPosition', allowNull: false } });

	Department.hasMany(Employment, { as: 'departmentEmployments', foreignKey: { name: 'IdDepartment', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Employment.belongsTo(Department, { as: 'employmentsDepartment', foreignKey: { name: 'IdDepartment', allowNull: false } });

	Subject.hasMany(Topic, { as: 'subjectTopics', foreignKey: { name: 'IdSubject', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Topic.belongsTo(Subject, { as: 'topicsSubject', foreignKey: { name: 'IdSubject', allowNull: false } });

	Participation.hasMany(Questionnaire, { as: 'participationQuestionnaires', foreignKey: { name: 'IdParticipation', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Questionnaire.belongsTo(Participation, { as: 'questionnairesParticipation', foreignKey: { name: 'IdParticipation', allowNull: false } });

	Questionnaire.hasMany(QuestionnaireIssue, { as: 'questionnaireQuestionnaireIssues', foreignKey: { name: 'IdQuestionnaire', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	QuestionnaireIssue.belongsTo(Questionnaire, { as: 'questionnaireissuesQuestionnaire', foreignKey: { name: 'IdQuestionnaire', allowNull: false } });

	Issue.hasMany(QuestionnaireIssue, { as: 'issuesQuestionnaireIssue', foreignKey: { name: 'IdIssue', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	QuestionnaireIssue.belongsTo(Issue, { as: 'questionnaireissuesIssue', foreignKey: { name: 'IdIssue', allowNull: false } });


	let allDivisions, allDepartments;
	return sequelize
		.sync({ force: true })					//synchronizacja modelu z baza, force - usuniecie i ponowne utworzenie zmienionej tabeli
		.then(() => {
			return Division.findAll();
		})
		.then(divisions => {
			if (!divisions || divisions.length == 0) {
				return Division.bulkCreate([
					{ Name: 'Finansowy' },
					{ Name: 'EFS' },
				])
					.then(() => {
						return Division.findAll();
					});
			} else {
				return divisions;
			}
		})
		.then(divisions => {
			allDivisions = divisions;
			return Department.findAll();
		})
		.then(departments => {
			if (!departments || departments.length == 0) {
				return Department.bulkCreate([
					{ Name: 'Wydział Księgowości', IdDivision: 1 },
					{ Name: 'Płatności i refundacji', IdDivision: 1 }
				])
				// .then(() => {
				// 	return Division.findAll();
				// });
			} else {
				return departments;
			}
		});
};
