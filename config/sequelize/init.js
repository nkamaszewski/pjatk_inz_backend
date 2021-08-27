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
const ApplicationFor = require('../../model/sequelize/ApplicationFor');
const Role = require('../../model/sequelize/Role');
const OtherEducation = require('../../model/sequelize/OtherEducation');
const { getApplicationForReasonsById } = require('../../repository/sequelize/ApplicationForReasonsRepository');

module.exports = () => {
  Division.hasMany(Department, {
    as: 'divisionDepartments',
    foreignKey: { name: 'IdDivision', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Department.belongsTo(Division, {
    as: 'departmentsDivision',
    foreignKey: { name: 'IdDivision', allowNull: false },
  });

  Position.hasMany(Employment, {
    as: 'positionEmployments',
    foreignKey: { name: 'IdPosition', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Employment.belongsTo(Position, {
    as: 'emplymentPosition',
    foreignKey: { name: 'IdPosition', allowNull: false },
  });

  Department.hasMany(Employment, {
    as: 'departmentEmployments',
    foreignKey: { name: 'IdDepartment', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Employment.belongsTo(Department, {
    as: 'employmentsDepartment',
    foreignKey: { name: 'IdDepartment', allowNull: false },
  });

  Subject.hasMany(Topic, {
    as: 'subjectTopics',
    foreignKey: { name: 'IdSubject', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Topic.belongsTo(Subject, {
    as: 'topicsSubject',
    foreignKey: { name: 'IdSubject', allowNull: false },
  });

  Participation.hasMany(Questionnaire, {
    as: 'participationQuestionnaires',
    foreignKey: { name: 'IdParticipation', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Questionnaire.belongsTo(Participation, {
    as: 'questionnairesParticipation',
    foreignKey: { name: 'IdParticipation', allowNull: false },
  });

  Questionnaire.hasMany(QuestionnaireIssue, {
    as: 'questionnaireQuestionnaireIssues',
    foreignKey: { name: 'IdQuestionnaire', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  QuestionnaireIssue.belongsTo(Questionnaire, {
    as: 'questionnaireissuesQuestionnaire',
    foreignKey: { name: 'IdQuestionnaire', allowNull: false },
  });

  Issue.hasMany(QuestionnaireIssue, {
    as: 'issuesQuestionnaireIssue',
    foreignKey: { name: 'IdIssue', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  QuestionnaireIssue.belongsTo(Issue, {
    as: 'questionnaireissuesIssue',
    foreignKey: { name: 'IdIssue', allowNull: false },
  });

  Room.hasMany(Meeting, {
    as: 'roomMeeting',
    foreignKey: { name: 'IdRoom', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Meeting.belongsTo(Room, {
    as: 'MeetingsRoom',
    foreignKey: { name: 'IdRoom', allowNull: false },
  });

  University.hasMany(Study, {
    as: 'univesityStudy',
    foreignKey: { name: 'IdUniversity', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Study.belongsTo(University, {
    as: 'studyUniversity',
    foreignKey: { name: 'IdUniversity', allowNull: false },
  });

  Company.hasMany(Training, {
    as: 'companyTrainings',
    foreignKey: { name: 'IdCompany', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Training.belongsTo(Company, {
    as: 'trainingCompany',
    foreignKey: { name: 'IdCompany', allowNull: false },
  });

  Company.hasMany(OtherEducation, {
    as: 'companyOtherEducation',
    foreignKey: { name: 'IdCompany', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  OtherEducation.belongsTo(Company, {
    as: 'otherEducationCompany',
    foreignKey: { name: 'IdCompany', allowNull: false },
  });

  Person.hasOne(Employee, {
    as: 'personEmployee',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Employee.belongsTo(Person, {
    as: 'employeePerson',
    foreignKey: { name: 'IdPerson', allowNull: false },
  });

  Person.hasOne(Coach, {
    as: 'personCoach',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Coach.belongsTo(Person, {
    as: 'CoachPerson',
    foreignKey: { name: 'IdPerson', allowNull: false },
  });

  Coach.hasMany(Training, {
    as: 'coachTrainings',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Training.belongsTo(Coach, {
    as: 'trainingCoach',
    foreignKey: { name: 'IdPerson', allowNull: false },
  });

  Topic.hasMany(Training, {
    as: 'topicTrainings',
    foreignKey: { name: 'IdTopic', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Training.belongsTo(Topic, {
    as: 'trainingTopic',
    foreignKey: { name: 'IdTopic', allowNull: false },
  });

  Education.hasOne(Training, {
    as: 'educationTraining',
    foreignKey: { name: 'IdEducation', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Training.belongsTo(Education, {
    as: 'trainingEducation',
    foreignKey: { name: 'IdEducation', allowNull: false },
  });

  Training.hasMany(Group, {
    as: 'trainingGroups',
    foreignKey: { name: 'IdEducation', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Group.belongsTo(Training, {
    as: 'groupTraining',
    foreignKey: { name: 'IdEducation', allowNull: false },
  });

  Employee.hasMany(EmployeeGroup, {
    as: 'employeeEmployeeGroup',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  EmployeeGroup.belongsTo(Employee, {
    as: 'employeeGroupEmployee',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });

  Employee.hasMany(Employment, {
    as: 'employeeEmployment',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Employment.belongsTo(Employee, {
    as: 'employmentEmployee',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });

  Group.hasMany(EmployeeGroup, {
    as: 'groupEmployeeGroup',
    foreignKey: { name: 'IdGroup', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  EmployeeGroup.belongsTo(Group, {
    as: 'employeeGroupGroup',
    foreignKey: { name: 'IdGroup', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });

  Group.hasMany(Meeting, {
    as: 'groupMeeting',
    foreignKey: { name: 'IdGroup', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Meeting.belongsTo(Group, {
    as: 'meetingGroup',
    foreignKey: { name: 'IdGroup', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });

  GraduateDegree.hasMany(Study, {
    as: 'graduateDegreeStudys',
    foreignKey: { name: 'IdGraduateDegree', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Study.belongsTo(GraduateDegree, {
    as: 'studysGraduateDegree',
    foreignKey: { name: 'IdGraduateDegree', allowNull: false },
  });

  StudyMode.hasMany(Study, {
    as: 'studyModeStudys',
    foreignKey: { name: 'IdStudyMode', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Study.belongsTo(StudyMode, {
    as: 'studysStudyMode',
    foreignKey: { name: 'IdStudyMode', allowNull: false },
  });

  Status.hasMany(ApplicationForRefund, {
    as: 'statusApplicationForRefunds',
    foreignKey: { name: 'IdStatus', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  ApplicationForRefund.belongsTo(Status, {
    as: 'applicationForRefundsStatus',
    foreignKey: { name: 'IdStatus', allowNull: false },
  });

  Status.hasMany(ApplicationForReasons, {
    as: 'statusApplicationForReasons',
    foreignKey: { name: 'IdStatus', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  ApplicationForReasons.belongsTo(Status, {
    as: 'applicationForReasonsStatus',
    foreignKey: { name: 'IdStatus', allowNull: false },
  });

  QuestionnaireOffer.hasMany(Offer, {
    as: 'questionnaireOfferOffer',
    foreignKey: { name: 'IdQuestionnaireOffer', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Offer.belongsTo(QuestionnaireOffer, {
    as: 'offerQuestionnaireOffer',
    foreignKey: { name: 'IdQuestionnaireOffer', allowNull: false },
  });

  Employee.hasMany(QuestionnaireOffer, {
    as: 'employeeQuestionnarieOffer',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  QuestionnaireOffer.belongsTo(Employee, {
    as: 'questionnaireOfferEmployee',
    foreignKey: { name: 'IdPerson', allowNull: false },
  });

  ReasonForRefund.hasMany(ApplicationForReasons, {
    as: 'reasonForRefundApplicationForReasons',
    foreignKey: { name: 'IdReasonForRefund', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  ApplicationForReasons.belongsTo(ReasonForRefund, {
    as: 'applicationForReasonsReasonForRefund',
    foreignKey: { name: 'IdReasonForRefund', allowNull: false },
  });

  ApplicationForRefund.hasMany(ApplicationForReasons, {
    as: 'applicationForRefundApplicationForReasons',
    foreignKey: { name: 'IdApplicationForRefund', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  ApplicationForReasons.belongsTo(ApplicationForRefund, {
    as: 'applicationForReasonsApplicationForRefund',
    foreignKey: { name: 'IdApplicationForRefund', allowNull: false },
  });

  Employee.hasMany(Participation, {
    as: 'employeeParticipations',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Participation.belongsTo(Employee, {
    as: 'participationEmployee',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });

  Education.hasMany(Participation, {
    as: 'educationParticipations',
    foreignKey: { name: 'IdEducation', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Participation.belongsTo(Education, {
    as: 'participationEducation',
    foreignKey: { name: 'IdEducation', allowNull: false },
  });

  Education.hasOne(Study, {
    as: 'educationStudy',
    foreignKey: { name: 'IdEducation', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  Study.belongsTo(Education, {
    as: 'studyEducation',
    foreignKey: { name: 'IdEducation', allowNull: false },
  });

  Education.hasOne(OtherEducation, {
    as: 'educationOtherEducation',
    foreignKey: { name: 'IdEducation', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  OtherEducation.belongsTo(Education, {
    as: 'otherEducationEducation',
    foreignKey: { name: 'IdEducation', allowNull: false },
  });

  Education.hasOne(ApplicationFor, {
    as: 'educationApplicationFor',
    foreignKey: { name: 'IdEducation', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  ApplicationFor.belongsTo(Education, {
    as: 'applicationForEducation',
    foreignKey: { name: 'IdEducation', allowNull: false },
  });

  Status.hasMany(ApplicationFor, {
    as: 'statusApplicationFor',
    foreignKey: { name: 'IdStatus', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  ApplicationFor.belongsTo(Status, {
    as: 'applicationForStatus',
    foreignKey: { name: 'IdStatus', allowNull: false },
  });

  Education.hasOne(ApplicationFor, {
    as: 'educationsApplicationFor',
    foreignKey: { name: 'IdEducation', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  ApplicationFor.belongsTo(Education, {
    as: 'applicationsForEducation',
    foreignKey: { name: 'IdEducation', allowNull: false },
  });

  ApplicationFor.hasOne(ApplicationForRefund, {
    as: 'applicationForApplicationForRefund',
    foreignKey: { name: 'IdApplicationFor', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  ApplicationForRefund.belongsTo(ApplicationFor, {
    as: 'applicationForRefundApplicationFor',
    foreignKey: { name: 'IdApplicationFor', allowNull: false },
  });

  Employee.hasMany(ApplicationFor, {
    as: 'employeeApplicationFor',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });
  ApplicationFor.belongsTo(Employee, {
    as: 'applicationForEmployee',
    foreignKey: { name: 'IdPerson', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });

  Role.hasMany(Employee, {
    as: 'roleEmployee',
    foreignKey: { name: 'IdRole', allowNull: false },
  });
  Employee.belongsTo(Role, {
    as: 'employeeRole',
    foreignKey: { name: 'IdRole', allowNull: false },
    constraints: true,
    onDelete: 'CASCADE',
  });

  let allDivisions, allDepartments;
  return (
    sequelize
      .sync({ force: true }) //synchronizacja modelu z baza, force - usuniecie i ponowne utworzenie zmienionej tabeli
      // .sync({ alter: true })
      .then(() => {
        return Division.findAll();
      })
      .then((divisions) => {
        if (!divisions || divisions.length == 0) {
          return Division.bulkCreate([
            { Name: 'Finansowy' },
            { Name: 'EFS' },
          ]).then(() => {
            return Division.findAll();
          });
        } else {
          return divisions;
        }
      })
      .then((divisions) => {
        allDivisions = divisions;
        return Department.findAll();
      })
      .then((departments) => {
        if (!departments || departments.length == 0) {
          return Department.bulkCreate([
            { Name: 'Wydział Księgowości', IdDivision: 1 },
            { Name: 'Płatności i refundacji', IdDivision: 1 },
          ]);
        } else {
          return departments;
        }
      })
      .then(() => {
        return Role.findAll();
      })
      .then((role) => {
        if (!role || role.length == 0) {
          return Role.bulkCreate([
            { Name: 'Pracownik' },
            { Name: 'Kierownik' },
            { Name: 'Dyrektor' },
            { Name: 'Administrator HR' },
          ]);
        } else {
          return role;
        }
      })
      .then(() => {
        return Person.findAll();
      })
      .then((persons) => {
        if (!persons || persons.length == 0) {
          return Person.bulkCreate([
            {
              FirstName: 'Jan',
              LastName: 'Kowalski',
              Email: 'jk@wp.pl',
              Phone: '123234345',
            },
            {
              FirstName: 'Leon',
              LastName: 'Zawodowiec',
              Email: 'lz@op.pl',
              Phone: '222333444',
            },
          ]);
        } else {
          return persons;
        }
      })
      .then(() => {
        return Employee.findAll();
      })
      .then((employees) => {
        if (!employees || employees.length == 0) {
          return Employee.bulkCreate([
            { IdPerson: '1', Pesel: '85041234567', Password: 'jakieshaslo' },
            { IdPerson: '2', Pesel: '89010223457', Password: 'alamakota' },
          ]);
        } else {
          return employees;
        }
      })
      .then(() => {
        return Coach.findAll();
      })
      .then((coachs) => {
        if (!coachs || coachs.length == 0) {
          return Coach.bulkCreate([{ IdPerson: '1', JobTitle: 'dr' }]);
        } else {
          return coachs;
        }
      })
      .then(() => {
        return Company.findAll();
      })
      .then((companys) => {
        if (!companys || companys.length == 0) {
          return Company.bulkCreate([
            {
              Name: 'ABC Edukacja',
              City: 'Warszawa',
              PostalCode: '12-232',
              Street: 'Złota',
              Number: "10",
              TIN: '123-321-22-33',
            },
            {
              Name: 'Altkom',
              City: 'Warszawa',
              PostalCode: '11-223',
              Street: 'Wiejska',
              Number: "2",
              TIN: '333-321-22-33',
            },
            {
              Name: 'Firma Testowa Sp. z o.o.',
              City: 'Warszawa',
              PostalCode: '11-111',
              Street: 'Złota',
              Number: "5a",
              TIN: '333-321-22-33',
              Owner: true,
            },
          ]);
        } else {
          return companys;
        }
      })
      .then(() => {
        return Subject.findAll();
      })
      .then((subjects) => {
        if (!subjects || subjects.length == 0) {
          return Subject.bulkCreate([
            { Subject: 'Ekonomiczne' },
            { Subject: 'Informatyczne' },
            { Subject: 'BHP' },
            { Subject: 'Prawne' },
          ]);
        } else {
          return subjects;
        }
      })
      .then(() => {
        return Topic.findAll();
      })
      .then((topics) => {
        if (!topics || topics.length == 0) {
          return Topic.bulkCreate([
            { Topic: 'Księgowość dla informatyków', IdSubject: 1 },
            { Topic: 'Node.js dla każdego', IdSubject: 2 },
            { Topic: 'React nie tylko dla orłów', IdSubject: 2 },
            { Topic: 'Pierwsza pomoc', IdSubject: 3 },
          ]);
        } else {
          return topics;
        }
      })
      .then(() => {
        return Education.findAll();
      })
      .then((educations) => {
        if (!educations || educations.length == 0) {
          return Education.bulkCreate([
            { Price: '900', PriceAccommodation: 200, PriceTransit: 200 },
            { Price: '1000', PriceAccommodation: 300, PriceTransit: 200 },
            { Price: '3200', PriceAccommodation: 0, PriceTransit: 0 },
            { Price: '10200', PriceAccommodation: 0, PriceTransit: 0 },
          ]);
        } else {
          return educations;
        }
      })
      .then(() => {
        return Training.findAll();
      })
      .then((trainings) => {
        if (!trainings || trainings.length == 0) {
          return Training.bulkCreate([
            {
              IdEducation: '1',
              IdTopic: 1,
              IdCompany: 1,
              IdPerson: 1,
              DateFrom: '2021-09-01',
              DateTo: '2021-09-01',
            },
            {
              IdEducation: '2',
              IdTopic: 2,
              IdCompany: 2,
              IdPerson: 1,
              DateFrom: '2021-08-19',
              DateTo: '2021-08-21',
            },
            {
              IdEducation: '3',
              IdTopic: 2,
              IdCompany: 2,
              IdPerson: 1,
              DateFrom: '2021-08-23',
              DateTo: '2021-08-25',
              Internal: true,
            },
          ]);
        } else {
          return trainings;
        }
      })
      .then(() => {
        return Group.findAll();
      })
      .then((groups) => {
        if (!groups || groups.length == 0) {
          return Group.bulkCreate([
            { Name: '21c', NumberOfPerson: '14', IdEducation: 3 },
            { Name: '14', NumberOfPerson: '12', IdEducation: 3 },
          ]);
        } else {
          return groups;
        }
      })
      .then(() => {
        return EmployeeGroup.findAll();
      })
      .then((employeegroups) => {
        if (!employeegroups || employeegroups.length == 0) {
          return EmployeeGroup.bulkCreate([
            { IdGroup: '1', IdPerson: '2' },
            { IdGroup: '2', IdPerson: '2' },
          ]);
        } else {
          return employeegroups;
        }
      })
      .then(() => {
        return Position.findAll();
      })
      .then((positions) => {
        if (!positions || positions.length == 0) {
          return Position.bulkCreate([
            { Name: 'Kierownik' },
            { Name: 'Starszy specjalista' },
          ]);
        } else {
          return positions;
        }
      })
      .then(() => {
        return Employment.findAll();
      })
      .then((employments) => {
        if (!employments || employments.length == 0) {
          return Employment.bulkCreate([
            {
              DateFrom: '2018-01-01',
              IdDepartment: 1,
              IdPosition: 1,
              IdPerson: 1,
            },
            {
              DateFrom: '2019-01-01',
              IdDepartment: 1,
              IdPosition: 2,
              IdPerson: 2,
            },
          ]);
        } else {
          return employments;
        }
      })
      .then(() => {
        return University.findAll();
      })
      .then((universities) => {
        if (!universities || universities.length == 0) {
          return University.bulkCreate([
            {
              Name: 'Polsko Japońska Akademia Technik Komputerowych',
              ShortName: 'PJATK',
              City: 'Warszawa',
              PostalCode: '01-123',
              Street: 'Koszykowa',
              Number: 86,
            },
            {
              Name: 'Uniwersytet Warszawski',
              ShortName: 'UW',
              City: 'Warszawa',
              PostalCode: '01-123',
              Street: 'Nowy Świat',
              Number: 86,
            },
          ]);
        } else {
          return universities;
        }
      })
      .then(() => {
        return University.findAll();
      })
      .then((universities) => {
        if (!universities || universities.length == 0) {
          return University.bulkCreate([
            {
              Name: 'Polsko Japońska Akademia Technik Komputerowych',
              ShortName: 'PJATK',
              City: 'Warszawa',
              PostalCode: '01-123',
              Street: 'Koszykowa',
              Number: 86,
            },
            {
              Name: 'Uniwersytet Warszawski',
              ShortName: 'UW',
              City: 'Warszawa',
              PostalCode: '01-123',
              Street: 'Nowy Świat',
              Number: 86,
            },
          ]);
        } else {
          return universities;
        }
      })
      .then(() => {
        return GraduateDegree.findAll();
      })
      .then((degrees) => {
        if (!degrees || degrees.length == 0) {
          return GraduateDegree.bulkCreate([
            { Name: 'Inżynierskie' },
            { Name: 'Magisterskie' },
            { Name: 'Licencjackie' },
          ]);
        } else {
          return degrees;
        }
      })
      .then(() => {
        return StudyMode.findAll();
      })
      .then((modes) => {
        if (!modes || modes.length == 0) {
          return StudyMode.bulkCreate([
            { Name: 'Dzienne' },
            { Name: 'Zaoczne' },
            { Name: 'Wieczorowe' },
            { Name: 'Internetowe' },
          ]);
        } else {
          return modes;
        }
      })
      .then(() => {
        return Study.findAll();
      })
      .then((studies) => {
        if (!studies || studies.length == 0) {
          return Study.bulkCreate([
            {
              IdEducation: 3,
              FieldOfStudy: 'Informatyka',
              IdUniversity: 1,
              IdStudyMode: 1,
              IdGraduateDegree: 1,
            },
          ]);
        } else {
          return studies;
        }
      })
      .then(() => {
        return QuestionnaireOffer.findAll();
      })
      .then((qOffers) => {
        if (!qOffers || qOffers.length == 0) {
          return QuestionnaireOffer.bulkCreate([{ Year: '2021', IdPerson: 1 }]);
        } else {
          return qOffers;
        }
      })
      .then(() => {
        return Offer.findAll();
      })
      .then((offers) => {
        if (!offers || offers.length == 0) {
          return Offer.bulkCreate([
            {
              Topic: 'React dla opornych',
              Link: 'https://coderslab.pl/pl/kurs/javascript-specialist-react-redux/o-kursie',
              Price: 2000,
              IdQuestionnaireOffer: 1,
            },
            {
              Topic: 'JAVASCRIPT DEVELOPER',
              Link: 'https://coderslab.pl/pl/kurs/javascript-developer-react/o-kursie',
              Price: 1500,
              IdQuestionnaireOffer: 1,
            },
          ]);
        } else {
          return offers;
        }
      })
      .then(() => {
        return Status.findAll();
      })
      .then((status) => {
        if (!status || status.length == 0) {
          return Status.bulkCreate([
            { Name: 'Złożony' },
            { Name: 'Rozpatrywany' },
            { Name: 'Odrzucony' },
            { Name: 'Zatwierdzony - kierownik' },
            { Name: 'Zatwierdzony - dyrektor' },
          ]);
        } else {
          return status;
        }
      })
      .then(() => {
        return ApplicationFor.findAll();
      })
      .then((appsFor) => {
        if (!appsFor || appsFor.length == 0) {
          return ApplicationFor.bulkCreate([
            {
              DateOfSubmission: '2021-08-01',
              IdEducation: 1,
              IdStatus: 1,
              Compability: 'true',
              IdPerson: 1,
            },
            {
              DateOfSubmission: '2021-08-02',
              IdEducation: 2,
              IdStatus: 1,
              Compability: 'true',
              IdPerson: 2,
            },
            {
              DateOfSubmission: '2021-09-01',
              IdEducation: 3,
              IdStatus: 5,
              Compability: 'true',
              IdPerson: 1,
            },
          ]);
        } else {
          return appsFor;
        }
      })
      .then(() => {
        return Room.findAll();
      })
      .then((rooms) => {
        if (!rooms || rooms.length == 0) {
          return Room.bulkCreate([
            { Name: 'A1', Area: 25, CapacitySet1: 10, CapacitySet2: 12 },
            { Name: 'A2', Area: 35, CapacitySet1: 14, CapacitySet2: 15 },
            { Name: 'B1', Area: 40, CapacitySet1: 22, CapacitySet2: 25 },
          ]);
        } else {
          return rooms;
        }
      })
      .then(() => {
        return Participation.findAll();
      })
      .then((participations) => {
        if (!participations || participations.length == 0) {
          return Participation.bulkCreate([
            { IdPerson: 1, IdEducation: 3, DateOfRegistration: '2021-08-02' },
          ]);
        } else {
          return participations;
        }
      })
      .then(() => {
        return Meeting.findAll();
      })
      .then((meetings) => {
        if (!meetings || meetings.length == 0) {
          return Meeting.bulkCreate([
            {
              From: '2021-08-01 9:00',
              To: '2021-08-01 17:00',
              IdGroup: 1,
              IdRoom: 1,
            },
          ]);
        } else {
          return meetings;
        }
      })
      .then(() => {
        return OtherEducation.findAll();
      })
      .then((oEdus) => {
        if (!oEdus || oEdus.length == 0) {
          return OtherEducation.bulkCreate([
            { IdEducation: 4, Name: 'Aplikacja radcowska', IdCompany: 1 },
          ]);
        } else {
          return oEdus;
        }
      })
      .then(() => {
        return ReasonForRefund.findAll();
      })
      .then((reasons) => {
        if (!reasons || reasons.length == 0) {
          return ReasonForRefund.bulkCreate([
            { Name: "Zwrot kosztów szkolenia" },
            { Name: "Zwrot kosztów przejazdu" },
            { Name: "Zwrot kosztów zakwaterowania" },
            { Name: "Urlop szkoleniowy" }
          ]);
        } else {
          return reasons;
        }
      })
      .then(() => {
        return ApplicationForRefund.findAll();
      })
      .then((apps) => {
        if (!apps || apps.length == 0) {
          return ApplicationForRefund.bulkCreate([
            { IdApplicationFor: 1, IdStatus: 1, DateOfSubmission: "2021-08-01" },
            { IdApplicationFor: 2, IdStatus: 1, DateOfSubmission: "2021-08-21" }
          ]);
        } else {
          return apps;
        }
      })
      .then(() => {
        return ApplicationForReasons.findAll();
      })
      .then((appReasons) => {
        if (!appReasons || appReasons.length == 0) {
          return ApplicationForReasons.bulkCreate([
            { IdApplicationForRefund: 1, IdReasonForRefund: 1, IdStatus: 1 },
            { IdApplicationForRefund: 1, IdReasonForRefund: 2, IdStatus: 1 },
            { IdApplicationForRefund: 2, IdReasonForRefund: 1, IdStatus: 1 },
            { IdApplicationForRefund: 2, IdReasonForRefund: 3, IdStatus: 1 }
          ]);
        } else {
          return appReasons;
        }
      })
  );
};
