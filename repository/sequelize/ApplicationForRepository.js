const ApplicationFor = require('../../model/sequelize/ApplicationFor');
const Education = require('../../model/sequelize/Education');
const Status = require('../../model/sequelize/Status');
const Employee = require('../../model/sequelize/Employee');
const Employment = require('../../model/sequelize/Employment');
const Department = require('../../model/sequelize/Department');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getApplicationFor = (params) => {
  const { iddepartment, iddivision, idstatus } = params
  const depId = iddepartment
  const divId = iddivision
  const statId = idstatus


  return ApplicationFor.findAll({
    attributes: [
      'IdApplicationFor',
      'DateOfSubmission',
      'IdEducation',
      'IdStatus',
      'Compatibility'
    ],
    include: [
      {
        model: Education,
        required: true,
        as: 'applicationForEducation'
      },
      {
        model: Status,
        as: 'applicationForStatus',
        where:
          statId ? { IdStatus: statId } : {},
      },
      {
        model: Employee,
        required: true,
        as: 'applicationForEmployee',
        include: [
          {
            model: Employment,
            required: true,
            as: 'employeeEmployment',
            where:
              depId ? { IdDepartment: depId, DateTo: null } : { DateTo: null },
            include: [
              {
                model: Department,
                required: true,
                as: 'employmentsDepartment',
                where:
                  divId ? { IdDivision: divId } : {},
              }]
          }]
      },
    ],
  });
};

exports.createApplicationFor = (newApplicationForData) => {
  const { IdPerson, DateOfSubmission, IdEducation, IdStatus, Compatibility } =
    newApplicationForData;
  return ApplicationFor.create({
    IdPerson,
    DateOfSubmission,
    IdEducation,
    IdStatus,
    Compatibility,
  });
};

exports.deleteApplicationFor = (applicationForId) => {
  return ApplicationFor.destroy({
    where: { IdApplicationFor: applicationForId },
  });
};

exports.updateApplicationFor = (applicationForId, data) => {
  const IdApplicationFor = data.IdApplicationFor;
  const DateOfSubmission = data.DateOfSubmission;
  const IdEducation = data.IdEducation;
  const IdStatus = data.IdStatus;
  const Compatibility = data.Compatibility;

  return ApplicationFor.update(data, {
    where: { IdApplicationFor: applicationForId },
  });
};

exports.getApplicationForById = (appForId) => {
  return ApplicationFor.findByPk(appForId);
};


exports.getApplicationForByDepId = (depId) => {
  return ApplicationFor.findAll({
    attributes: ['IdApplicationFor', 'DateOfSubmission'],
    include: [
      {
        model: Employee,
        as: 'applicationForEmployee',
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
        model: Status,
        as: 'applicationForStatus'
      }
    ],
  });
};

exports.getApplicationForByDivId = (divId) => {
  return ApplicationFor.findAll({
    attributes: ['IdApplicationFor', 'DateOfSubmission'],
    include: [
      {
        model: Employee,
        as: 'applicationForEmployee',
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
        model: Status,
        as: 'applicationForStatus'
      }
    ],
  });
};

exports.getApplicationForByStatId = (statId) => {
  return ApplicationFor.findAll({
    attributes: [
      'IdApplicationFor',
      'DateOfSubmission',
      'IdEducation',
      'IdStatus',
      'Compatibility'
    ],
    include: [
      {
        model: Education,
        as: 'applicationForEducation'
      },
      {
        model: Status,
        as: 'applicationForStatus'
      },
      {
        model: Employee,
        as: 'applicationForEmployee'
      },
    ],
    where: {
      IdStatus: statId
    }
  });
};