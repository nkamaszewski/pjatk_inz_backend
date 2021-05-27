const Division = require('../../model/sequelize/Division');
const Department = require('../../model/sequelize/Department');

exports.getDepartments = () => {
    return Department.findAll({
        attributes: ['IdDepartment', 'Name', 'IdDivision'],
        include: [{
            model: Division,
            as: 'departmentsDivision'
        }]
    });
};

exports.createDepartment = (newDepartmentData) => {
    return Department.create({
        Name: newDepartmentData.Name,
        IdDivision: newDepartmentData.IdDivision
    });
};

exports.deleteDepartment = (departmentId) => {
    return Department.destroy({
        where: { IdDepartment: departmentId }
    });
};

exports.updateDepartment = (departmentId, data) => {
    const name = data.Name;
    const idDivision = data.IdDivision;
    return Department.update(data, { where: { IdDepartment: departmentId } });
}

exports.getDepartmentById = (depId) => {
    return Department.findByPk(depId);
};

