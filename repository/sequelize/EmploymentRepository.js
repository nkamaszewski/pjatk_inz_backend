const Position = require('../../model/sequelize/Position');
const Employment = require('../../model/sequelize/Employment');
const Department = require('../../model/sequelize/Department');
const Employee = require('../../model/sequelize/Employee');
const Person = require('../../model/sequelize/Person');
const Division = require('../../model/sequelize/Division');
const Role = require('../../model/Role');

exports.getEmployments = (...userData) => {
	const [userId, userIdDepartment, userIdDivision, userIdRole] = userData;

	return Employment.findAll({
		attributes: ['IdEmployment', 'DateFrom', 'DateTo', 'IdPerson', 'IdRole'],
		include: [
			{
				model: Department,
				as: 'employmentsDepartment',
			},
			{
				model: Division,
				as: 'employmentsDivision',
			},
			{
				model: Position,
				as: 'emplymentPosition',
			},
			{
				model: Employee,
				as: 'employmentEmployee',
				include: [
					{
						model: Person,
						as: 'employeePerson',
					},
				],
			},
		],
		where:
			userIdRole == Role.PRACOWNIK
				? { IdPerson: userId }
				: userIdRole == Role.KIEROWNIK
				? { IdDepartment: userIdDepartment }
				: userIdRole == Role.DYREKTOR
				? { IdDivision: userIdDivision }
				: {},
	});
};

exports.createEmployment = (newEmploymentData) => {
	if (newEmploymentData.IdDepartment == '') {
		newEmploymentData.IdDepartment = null;
	}
	return Employment.create({
		DateFrom: newEmploymentData.DateFrom,
		DateTo: newEmploymentData.DateTo,
		IdDepartment: newEmploymentData.IdDepartment,
		IdDivision: newEmploymentData.IdDivision,
		IdPosition: newEmploymentData.IdPosition,
		IdPerson: newEmploymentData.IdPerson,
		IdRole: newEmploymentData.IdRole,
	});
};

exports.deleteEmployment = (employmentId) => {
	return Employment.destroy({
		where: { IdEmployment: employmentId },
	});
};

exports.updateEmployment = (employmentId, data) => {
	if (data.IdDepartment == '') data.IdDepartment = null;
	return Employment.update(data, { where: { IdEmployment: employmentId } });
};

exports.getEmploymentById = (empId) => {
	return Employment.findByPk(empId);
};
