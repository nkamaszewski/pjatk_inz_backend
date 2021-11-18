const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Person = require('../../model/sequelize/Person');
const Employee = require('../../model/sequelize/Employee');
const Employment = require('../../model/sequelize/Employment');
const Department = require('../../model/sequelize/Department');

const QuestionnaireOffer = require('../../model/sequelize/QuestionnaireOffer');
const Offer = require('../../model/sequelize/Offer');
const ApplicationFor = require('../../model/sequelize/ApplicationFor');
const Status = require('../../model/sequelize/Status');
const Participation = require('../../model/sequelize/Participation');
const Training = require('../../model/sequelize/Training');
const Topic = require('../../model/sequelize/Topic');
const Education = require('../../model/sequelize/Education');
const Study = require('../../model/sequelize/Study');
const OtherEducation = require('../../model/sequelize/OtherEducation');
const Division = require('../../model/sequelize/Division');

exports.getEmployees = () => {
  return Employee.findAll({
    attributes: ['IdPerson', 'Pesel', 'Password', 'IdRole'],
    include: [{
      model: Person,
      as: 'employeePerson',
    }, ],
  });
};

exports.getEmployeesByEmail = async (email) => {

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const employee = await Employee.findAll({
    include: [{
        model: Person,
        as: 'employeePerson',
        where: {
          Email: email
        },
      },
      {
        model: Employment,
        as: 'employeeEmployment',
        require: true,
        attributes: ['IdDepartment', 'IdDivision'],
        where: {
          [Op.or]: [{
              DateTo: {
                [Op.is]: null
              }
            },
            {
              DateTo: {
                [Op.gte]: today
              }
            }
          ]
        },
      }
    ],
  });

  if (!employee[0]) {
    return null;
  }

  const {
    IdPerson,
    Password,
    IdRole,
    employeePerson: {
      FirstName,
      LastName,
      Email,
      Phone
    },
    employeeEmployment: [{
      IdDepartment,
      IdDivision
    }]
  } = employee[0].dataValues;
  return {
    IdPerson,
    IdRole,
    Password,
    FirstName,
    LastName,
    Email,
    Phone,
    IdDepartment,
    IdDivision
  }

};

exports.createEmployee = (newEmployeeData) => {
  return Employee.create({
    IdPerson: newEmployeeData.IdPerson,
    Pesel: newEmployeeData.Pesel,
    Password: newEmployeeData.Password,
    IdRole: newEmployeeData.IdRole,
  });
};

exports.deleteEmployee = (personId) => {
  return Employee.destroy({
    where: {
      IdPerson: personId
    },
  });
};

exports.updateEmployee = (personId, data) => {
  return Employee.update(data, {
    where: {
      IdPerson: personId
    }
  });
};

exports.getEmployeeById = (persId) => {
  return Employee.findByPk(persId);
};

exports.getQuestionnaireOffersByEmpId = (empId) => {
  return QuestionnaireOffer.findAll({
    attributes: ['IdQuestionnaireOffer', 'Year', 'IdPerson'],
    include: [{
      model: Offer,
      as: 'questionnaireOfferOffer',
    }, ],
    where: {
      IdPerson: empId
    },
  });
};

exports.getApplicationsForByEmpId = (empId) => {
  return ApplicationFor.findAll({
    attributes: ['IdApplicationFor', 'DateOfSubmission'],
    include: [{
      model: Status,
      as: 'applicationForStatus',
    }, ],
    where: {
      IdPerson: empId
    },
  });
};

exports.getAppStudiesByEmpId = (empId) => {
  return ApplicationFor.findAll({
    include: [{
      model: Status,
      as: 'applicationForStatus',
    }, ],
    include: [{
      model: Education,
      required: true,
      as: 'applicationForEducation',
      include: [{
        model: Study,
        required: true,
        as: 'educationStudy',
      }, ],
    }, ],
    where: {
      IdPerson: empId
    },
  });
};

exports.getAppTrainingsByEmpId = (empId) => {
  return ApplicationFor.findAll({
    include: [{
      model: Status,
      as: 'applicationForStatus',
    }, ],
    include: [{
      model: Education,
      required: true,
      as: 'applicationForEducation',
      include: [{
        model: Training,
        required: true,
        as: 'educationTraining',
        include: [{
          model: Topic,
          as: 'trainingTopic',
        }, ],
      }, ],
    }, ],
    where: {
      IdPerson: empId
    },
  });
};

exports.getAppOthersByEmpId = (empId) => {
  return ApplicationFor.findAll({
    include: [{
      model: Status,
      as: 'applicationForStatus',
    }, ],
    include: [{
      model: Education,
      required: true,
      as: 'applicationForEducation',
      include: [{
        model: OtherEducation,
        required: true,
        as: 'educationOtherEducation',
      }, ],
    }, ],
    where: {
      IdPerson: empId
    },
  });
};

exports.getParticipationsByEmpId = (empId) => {
  return Participation.findAll({
    attributes: ['DateOfRegistration', 'EndDate'],
    where: {
      IdPerson: empId
    },
  });
};

exports.getPartStudiesByEmpId = (empId) => {
  return Participation.findAll({
    include: [{
      model: Education,
      required: true,
      as: 'participationEducation',
      include: [{
        model: Study,
        required: true,
        as: 'educationStudy',
      }, ],
    }, ],
    where: {
      IdPerson: empId
    },
  });
};

exports.getPartTrainingsByEmpId = (empId) => {
  return Participation.findAll({
    include: [{
      model: Education,
      required: true,
      as: 'participationEducation',
      include: [{
        model: Training,
        required: true,
        as: 'educationTraining',
        include: [{
          model: Topic,
          as: 'trainingTopic',
        }, ],
      }, ],
    }, ],
    where: {
      IdPerson: empId
    },
  });
};

exports.getPartOthersByEmpId = (empId) => {
  return Participation.findAll({
    include: [{
      model: Education,
      required: true,
      as: 'participationEducation',
      include: [{
        model: OtherEducation,
        required: true,
        as: 'educationOtherEducation',
      }, ],
    }, ],
    where: {
      IdPerson: empId
    },
  });
};