const Person = require('../../model/sequelize/Person');
const Employee = require('../../model/sequelize/Employee');

exports.getEmployees = () => {
    return Employee.findAll({
        attributes: ['IdPerson', 'Pesel', 'Password', 'IdRole'],
        include: [{
            model: Person,
            as: 'employeePerson'
        }]
    });

};

exports.createEmployee = (newEmployeeData) => {
    return Employee.create({
        IdPerson: newEmployeeData.IdPerson,
        Pesel: newEmployeeData.Pesel,
        Password: newEmployeeData.Password,
        IdRole: newEmployeeData.IdRole
    });
};

exports.deleteEmployee = (personId) => {
    return Employee.destroy({
        where: { IdPerson: personId }
    });
};

exports.updateEmployee = (personId, data) => {
    const IdPerson = data.IdPerson;
    const Pesel = data.Pesel;
    const Password = data.Password;
    const IdRole = data.IdRole;

    return Employee.update(data, { where: { IdPerson: personId } });
}

exports.getEmployeeById = (persId) => {
    return Employee.findByPk(persId);
};

