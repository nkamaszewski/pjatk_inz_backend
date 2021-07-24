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
    // return Employee.findAll();

};

exports.createEmployee = (newEmployeeData) => {
    return Employee.create({
        IdPerson: newEmployeeData.IdPerson,
        Pesel: newEmployeeData.Pesel,
        Password: newEmployeeData.Password
    });
};

exports.deleteEmployee = (employeeId) => {
    return Employee.destroy({
        where: { IdEmployee: employeeId }
    });
};

exports.updateEmployee = (employeeId, data) => {

    const IdPerson = data.IdPerson;
    const Pesel = data.Pesel;
    const Password = data.Password;

    return Employee.update(data, { where: { IdEmployee: employeeId } });
}

exports.getEmployeeById = (empId) => {
    return Employee.findByPk(empId);
};

