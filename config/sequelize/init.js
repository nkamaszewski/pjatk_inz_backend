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
const Room = require('../../model/sequelize/Room');
const Meeting = require('../../model/sequelize/Meeting');
const University = require('../../model/sequelize/University');
const Study = require('../../model/sequelize/Study');

const Company = require('../../model/sequelize/Company');
const Training = require('../../model/sequelize/Training');
const Person = require('../../model/sequelize/Person');
const Employee = require('../../model/sequelize/Employee');
const Coach = require('../../model/sequelize/Coach');
const EmployeeGroup = require('../../model/sequelize/EmployeeGroup');
const Group = require('../../model/sequelize/Group');
const Education = require('../../model/sequelize/Education');
const GraduateDegree = require('../../model/sequelize/GraduateDegree');
const StudyMode = require('../../model/sequelize/StudyMode');
const ApplicationForRefund = require('../../model/sequelize/ApplicationForRefund');
const ReasonForRefund = require('../../model/sequelize/ReasonForRefund');
const ApplicationForReasons = require('../../model/sequelize/ApplicationForReasons');
const Status = require('../../model/sequelize/Status');
const Offer = require('../../model/sequelize/Offer');
const QuestionnaireOffer = require('../../model/sequelize/QuestionnaireOffer');



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

	Room.hasMany(Meeting, { as: 'roomMeeting', foreignKey: { name: 'IdRoom', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Meeting.belongsTo(Room, { as: 'MeetingsRoom', foreignKey: { name: 'IdRoom', allowNull: false } });

	University.hasMany(Study, { as: 'univesityStudy', foreignKey: { name: 'IdUniversity', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Study.belongsTo(University, { as: 'studyUniversity', foreignKey: { name: 'IdUniversity', allowNull: false } });

	Company.hasMany(Training, { as: 'companyTrainings', foreignKey: { name: 'IdCompany', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Training.belongsTo(Company, { as: 'trainingCompany', foreignKey: { name: 'IdCompany', allowNull: false } });

	Person.hasOne(Employee, { as: 'personEmployee', foreignKey: { name: 'IdPerson', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Employee.belongsTo(Person, { as: 'employeePerson', foreignKey: { name: 'IdPerson', allowNull: false } });

	Person.hasOne(Coach, { as: 'personCoach', foreignKey: { name: 'IdPerson', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Coach.belongsTo(Person, { as: 'coachPerson', foreignKey: { name: 'IdPerson', allowNull: false } });

	Coach.hasMany(Training, { as: 'coachTrainings', foreignKey: { name: 'IdPerson', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Training.belongsTo(Coach, { as: 'trainingCoach', foreignKey: { name: 'IdPerson', allowNull: false } });

	Topic.hasMany(Training, { as: 'topicTrainings', foreignKey: { name: 'IdTopic', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Training.belongsTo(Topic, { as: 'trainingTopic', foreignKey: { name: 'IdTopic', allowNull: false } });


	Education.hasOne(Training, { as: 'educationTrainings', foreignKey: { name: 'IdEducation', allowNull: false }, constraints: true, onDelete: 'CASCADE' })
	Training.belongsTo(Education, { as: 'trainingEducation', foreignKey: { name: 'IdEducation', allowNull: false } });

	Employee.hasMany(EmployeeGroup, { as: 'employeeEmployeeGroup', foreignKey: { name: 'IdPerson', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	EmployeeGroup.belongsTo(Employee, { as: 'employeeGroupEmployee', foreignKey: { name: 'IdPerson', allowNull: false }, constraints: true, onDelete: 'CASCADE' });

	Group.hasMany(EmployeeGroup, { as: 'groupEmployeeGroup', foreignKey: { name: 'IdGroup', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	EmployeeGroup.belongsTo(Group, { as: 'employeeGroupGroup', foreignKey: { name: 'IdGroup', allowNull: false }, constraints: true, onDelete: 'CASCADE' });

	Group.hasMany(Meeting, { as: 'groupMeeting', foreignKey: { name: 'IdGroup', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Meeting.belongsTo(Group, { as: 'meetingGroup', foreignKey: { name: 'IdGroup', allowNull: false }, constraints: true, onDelete: 'CASCADE' });

	GraduateDegree.hasMany(Study, { as: 'graduateDegreeStudys', foreignKey: { name: 'IdGraduateDegree', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Study.belongsTo(GraduateDegree, { as: 'studyssGraduateDegree', foreignKey: { name: 'IdGraduateDegree', allowNull: false } });

	StudyMode.hasMany(Study, { as: 'studyModeStudys', foreignKey: { name: 'IdStudyMode', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Study.belongsTo(StudyMode, { as: 'studyssStudyMode', foreignKey: { name: 'IdStudyMode', allowNull: false } });

	Status.hasMany(ApplicationForRefund, { as: 'statusApplicationForRefunds', foreignKey: { name: 'IdStatus', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	ApplicationForRefund.belongsTo(Status, { as: 'applicationForRefundsStatus', foreignKey: { name: 'IdStatus', allowNull: false } });

	Status.hasMany(ApplicationForReasons, { as: 'statusApplicationForReasons', foreignKey: { name: 'IdStatus', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	ApplicationForReasons.belongsTo(Status, { as: 'applicationForReasonsStatus', foreignKey: { name: 'IdStatus', allowNull: false } });

	QuestionnaireOffer.hasMany(Offer, { as: 'questionnaireOfferOffer', foreignKey: { name: 'IdQuestionnaireOffer', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Offer.belongsTo(QuestionnaireOffer, { as: 'offerQuestionnaireOffer', foreignKey: { name: 'IdQuestionnaireOffer', allowNull: false } });

	Employee.hasMany(QuestionnaireOffer, { as: 'employeeQuestionnarieOffer', foreignKey: { name: 'IdPerson', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	QuestionnaireOffer.belongsTo(Employee, { as: 'questionnaireOfferEmployee', foreignKey: { name: 'IdPerson', allowNull: false } });
	

	ReasonForRefund.hasMany(ApplicationForReasons, { as: 'reasonForRefundApplicationForReasons', foreignKey: { name: 'IdReasonForRefund', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	ApplicationForReasons.belongsTo(ReasonForRefund, { as: 'applicationForReasonsReasonForRefund', foreignKey: { name: 'IdReasonForRefund', allowNull: false } });

	ApplicationForRefund.hasMany(ApplicationForReasons, { as: 'applicationForRefundApplicationForReasons', foreignKey: { name: 'IdApplicationForRefund', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	ApplicationForReasons.belongsTo(ApplicationForRefund, { as: 'applicationForReasonsApplicationForRefund', foreignKey: { name: 'IdApplicationForRefund', allowNull: false } });

	Employee.hasMany(Participation, { as: 'employeeParticipation', foreignKey: { name: 'IdPerson', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Participation.belongsTo(Employee, { as: 'participationEmployee', foreignKey: { name: 'IdPerson', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	
	Education.hasMany(Participation, { as: 'employeeParticipation', foreignKey: { name: 'IdEducation', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Participation.belongsTo(Education, { as: 'participationEmployee', foreignKey: { name: 'IdEducation', allowNull: false }, constraints: true, onDelete: 'CASCADE' });

	Education.hasOne(Study, { as: 'educationStudys', foreignKey: { name: 'IdEducation', allowNull: false }, constraints: true, onDelete: 'CASCADE' })
	Study.belongsTo(Education, { as: 'studyEducation', foreignKey: { name: 'IdEducation', allowNull: false } });

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

/*
-- Person
INSERT INTO `pjatk_inz_db`.`person` (`FirstName`, `LastName`, `Email`, `Phone`) VALUES ('Adam', 'Nowak', 'an@wp.pl', '123456789');
INSERT INTO `pjatk_inz_db`.`person` (`FirstName`, `LastName`, `Email`, `Phone`) VALUES ('Jan', 'Kowalski', 'jk@op.pl', '432143211');
INSERT INTO `pjatk_inz_db`.`person` (`FirstName`, `LastName`, `Email`, `Phone`) VALUES ('Stefan', 'Konieczny', 'sk@op.pl', '999888333');

-- Employee
INSERT INTO `pjatk_inz_db`.`employee` (`IdPerson`, `Pesel`, `Password`) VALUES ('1', '87051106545', 'jakieshaslo');
INSERT INTO `pjatk_inz_db`.`employee` (`IdPerson`, `Pesel`, `Password`) VALUES ('2', '980312', 'aabbccdd');

-- Coach
INSERT INTO `pjatk_inz_db`.`coach` (`IdPerson`, `JobTitle`) VALUES ('3', 'dr');

-- Group
INSERT INTO `pjatk_inz_db`.`group` (`Name`, `NumberOfPerson`) VALUES ('21c', '14');
INSERT INTO `pjatk_inz_db`.`group` (`Name`, `NumberOfPerson`) VALUES ('15d', '15');
-- EmployeeGroup
INSERT INTO `pjatk_inz_db`.`employeegroup` (`IdGroup`, `IdPerson`) VALUES ('1', '1');
INSERT INTO `pjatk_inz_db`.`employeegroup` (`IdGroup`, `IdPerson`) VALUES ('1', '2');
-- Company
INSERT INTO `pjatk_inz_db`.`company` (`Name`, `City`, `PostalCode`, `Street`, `TIN`) VALUES ('ABC Edukacja', 'Warszawa', '01-234', 'Zielona', '1070005730');
INSERT INTO `pjatk_inz_db`.`company` (`Name`, `City`, `PostalCode`, `Street`, `TIN`) VALUES ('Altkom', 'Warszawa', '01-123', 'Chłodna 51', '118-00-08-391');

-- Subject
INSERT INTO `pjatk_inz_db`.`subject` (`Subject`) VALUES ('Ekonomiczne');
INSERT INTO `pjatk_inz_db`.`subject` (`Subject`) VALUES ('Informatyczne - programowanie');
INSERT INTO `pjatk_inz_db`.`subject` (`Subject`) VALUES ('Informatyczne - administracja');
INSERT INTO `pjatk_inz_db`.`subject` (`Subject`) VALUES ('BHP');

-- Topic
INSERT INTO `pjatk_inz_db`.`topic` (`Topic`, `IdSubject`) VALUES ('Node.js dla każdego', '2');
INSERT INTO `pjatk_inz_db`.`topic` (`Topic`, `IdSubject`) VALUES ('Windows Server 2019', '3');
INSERT INTO `pjatk_inz_db`.`topic` (`Topic`, `IdSubject`) VALUES ('Księgowość dla informatyków', '1');


-- Education
INSERT INTO `pjatk_inz_db`.`education` (`Price`, `PriceAccommodation`, `PriceTransit`) VALUES ('900', '0', '100');
INSERT INTO `pjatk_inz_db`.`education` (`Price`, `PriceAccommodation`, `PriceTransit`) VALUES ('1000', '200', '100');

-- Training
INSERT INTO `pjatk_inz_db`.`training` (`IdEducation`, `IdTopic`, `IdCompany`, `IdPerson`, `DateFrom`) VALUES ('1', '1', '2', '3', '2021-09-09');




*/