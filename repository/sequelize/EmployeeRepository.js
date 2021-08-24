const Person = require('../../model/sequelize/Person');
const Employee = require('../../model/sequelize/Employee');
const QuestionnaireOffer = require('../../model/sequelize/QuestionnaireOffer');
const Offer = require('../../model/sequelize/Offer');
const ApplicationFor = require('../../model/sequelize/ApplicationFor');
const Status = require('../../model/sequelize/Status');
const Participation = require('../../model/sequelize/Participation');


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

exports.getQuestionnaireOfferByEmpId = (empId) => {
    return QuestionnaireOffer.findAll({
        attributes: ['IdQuestionnaireOffer', 'Year', 'IdPerson'],
        include: [
            {
                model: Offer,
                as: 'questionnaireOfferOffer'
            }
        ],
        where: { IdPerson: empId }
    });
};

exports.getApplicationForByEmpId = (empId) => {
    return ApplicationFor.findAll({
        attributes: ['IdApplicationFor', 'DateOfSubmission'],
        include: [
            {
                model: Status,
                as: 'applicationForStatus'
            }
        ],
        where: { IdPerson: empId }
    });
};

exports.getParticipationByEmpId = (empId) => {
    return Participation.findAll({
        attributes: ['DateOfRegistration', 'EndDate'],
        where: { IdPerson: empId }
    });
};

