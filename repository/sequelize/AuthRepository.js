const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require("../../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const Person = require('../../model/sequelize/Person');
const Employee = require('../../model/sequelize/Employee');
const Role = require('../../model/sequelize/Role');


exports.updateEmployee = (personId, data) => {
    const IdPerson = data.IdPerson;
    const Pesel = data.Pesel;
    const Password = bcrypt.hashSync(data.Password, 8);
    const IdRole = data.IdRole;

    return Employee.update({ Pesel, Password, IdRole }, { where: { IdPerson: personId } });
}

exports.getEmployeeById = (persId) => {
    return Employee.findByPk(persId);
};

exports.getRoleByEmpId = (empId) => {
    return Employee.findOne({
        include: [
            {
                model: Role,
                required: true,
                as: 'employeeRole'
            }
        ],
        where: { IdPerson: empId }
    });
};

exports.signIn = (employeeData, res) => {
    return Employee.findOne({
        include: [{
            model: Person,
            as: 'employeePerson',
            where: {
                Email: employeeData.Email
            }
        }],
    })

        .then(employee => {
            if (!employee) {
                return res.status(404).send({ message: "Employee Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                employeeData.Password,
                employee.Password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: employee.IdEmployee }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: employee.IdEmployee,
                email: employee.email,
                role: employee.IdRole,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};