const ApplicationForReasons = require('../../model/sequelize/ApplicationForReasons');
const ApplicationForRefund = require('../../model/sequelize/ApplicationForRefund');
const ReasonForRefund = require('../../model/sequelize/ReasonForRefund');
const ApplicationFor = require('../../model/sequelize/ApplicationFor');
const Employee = require('../../model/sequelize/Employee');
const Person = require('../../model/sequelize/Person');
const Employment = require('../../model/sequelize/Employment');
const Education = require('../../model/sequelize/Education');
const Department = require('../../model/sequelize/Department');

exports.getApplicationForRefunds = (params) => {
  const { iddepartment, iddivision, idstatus } = params;
  const depId = iddepartment;
  const divId = iddivision;
  const statId = idstatus;

  return ApplicationForRefund.findAll({
    include: [
      {
        model: ApplicationForReasons,
        as: 'applicationForRefundApplicationForReasons',
        include: [
          {
            model: ReasonForRefund,
            as: 'applicationForReasonsReasonForRefund',
            attributes: ['Name'],
          },
        ],
      },
      {
        model: ApplicationFor,
        required: true,
        as: 'applicationForRefundApplicationFor',
        attributes: ['IdEducation'],
        include: [
          {
            model: Employee,
            required: true,
            as: 'applicationForEmployee',
            attributes: ['IdPerson'],
            include: [
              {
                model: Employment,
                required: true,
                as: 'employeeEmployment',
                attributes: [],
                where: depId
                  ? { IdDepartment: depId, DateTo: null }
                  : { DateTo: null },
                include: [
                  {
                    model: Department,
                    required: true,
                    as: 'employmentsDepartment',
                    attributes: [],
                    where: divId ? { IdDivision: divId } : {},
                  },
                ],
              },
              {
                model: Person,
                required: true,
                as: 'employeePerson',
                attributes: ['FirstName', 'LastName'],
              },
            ],
          },
          {
            model: Education,
            required: true,
            as: 'applicationForEducation',
          },
        ],
      },
    ],
    where: statId ? { IdStatus: statId } : {},
  });
};

exports.createApplicationForRefund = (newApplicationForRefundData) => {
  const { IdApplicationFor, IdStatus, DateOfSubmission } =
    newApplicationForRefundData;
  return ApplicationForRefund.create({
    IdApplicationFor,
    IdStatus,
    DateOfSubmission,
  });
};

exports.deleteApplicationForRefund = (applicationForRefundId) => {
  return ApplicationForRefund.destroy({
    where: { IdApplicationForRefund: applicationForRefundId },
  });
};

exports.updateApplicationForRefund = (applicationForRefundId, data) => {
  const IdApplicationForRefund = data.IdApplicationForRefund;
  const IdApplicationFor = data.IdApplicationFor;
  const IdStatus = data.IdStatus;
  const DateOfSubmission = data.DateOfSubmission;

  return ApplicationForRefund.update(data, {
    where: { IdApplicationForRefund: applicationForRefundId },
  });
};

exports.getApplicationForRefundById = (appForRefId) => {
  return ApplicationForRefund.findByPk(appForRefId, {
    include: [
      {
        model: ApplicationForReasons,
        as: 'applicationForRefundApplicationForReasons',
      },
    ],
  });
};
