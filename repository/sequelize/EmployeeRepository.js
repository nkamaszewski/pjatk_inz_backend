const Person = require('../../model/sequelize/Person');
const Employee = require('../../model/sequelize/Employee');

exports.getEmployees = () => {
    return Employee.findAll({
        attributes: ['IdPerson', 'Pesel', 'Password'],
        include: [{
            model: Person,
            as: 'employeePerson'
        }]
    });

};

exports.createEmployee = (personId, newEmployeeData) => {
    return Employee.create({
        IdPerson: personId,
        Pesel: newEmployeeData.Pesel,
        Password: newEmployeeData.Password
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

    return Employee.update(data, { where: { IdPerson: personId } });
}

exports.getEmployeeById = (persId) => {
    return Employee.findByPk(persId);
};

