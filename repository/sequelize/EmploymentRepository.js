const Position = require('../../model/sequelize/Position');
const Employment = require('../../model/sequelize/Employment');
const Department = require('../../model/sequelize/Department');
const Role = require('../../model/Role');


exports.getEmployments = (...userData) => {
  const [userId,userIdDepartment, userIdDivision,userIdRole] = userData;

  return Employment.findAll({
    attributes: ['IdEmployment', 'DateFrom', 'DateTo', 'IdPerson'],
    include: [
      {
        model: Department,
        as: 'employmentsDepartment',
      },
      {
        model: Position,
        as: 'emplymentPosition',
      },
    ],
    where: userIdRole==Role.PRACOWNIK ? { IdPerson: userId } : 
           (userIdRole==Role.KIEROWNIK ? { IdDepartment: userIdDepartment } : 
           (userIdRole==Role.DYREKTOR ? { IdDivision: userIdDivision }: {}))
  });
};

exports.createEmployment = (newEmploymentData) => {
  return Employment.create({
    DateFrom: newEmploymentData.DateFrom,
    DateTo: newEmploymentData.DateTo,
    IdDepartment: newEmploymentData.IdDepartment,
    IdPosition: newEmploymentData.IdPosition,
    IdPerson: newEmploymentData.IdPerson,
  });
};

exports.deleteEmployment = (employmentId) => {
  return Employment.destroy({
    where: { IdEmployment: employmentId },
  });
};

exports.updateEmployment = (employmentId, data) => {
  const dateFrom = data.DateFrom;
  const dateTo = data.DateTo;
  const idDepartment = data.IdDepartment;
  const idPosition = data.idPosition;
  const idPerson = data.idPerson;
  return Employment.update(data, { where: { IdEmployment: employmentId } });
};

exports.getEmploymentById = (empId) => {
  return Employment.findByPk(empId);
};
