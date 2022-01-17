const Division = require('../../model/sequelize/Division');
const Department = require('../../model/sequelize/Department');

exports.getDivisions = () => {
  return Division.findAll({
    include: {
      model: Department,
      as: 'divisionDepartments',
    },
  });
};

exports.createDivision = (newDivisionData) => {
  return Division.create({
    Name: newDivisionData.Name,
  });
};

exports.deleteDivision = (divisionId) => {
  return Division.destroy({
    where: { IdDivision: divisionId },
  });
};

exports.updateDivision = (divisionId, data) => {
  const Name = data.Name;
  return Division.update(data, { where: { IdDivision: divisionId } });
};

exports.getDivisionById = (divId) => {
  return Division.findByPk(divId, {
    include: [
      {
        model: Department,
        as: 'divisionDepartments',
      },
    ],
  });
};
