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
				include: [
					{
						model: Division,
						as: 'departmentsDivision',
					},
				],
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
	if (!newEmploymentData.IdDivision) {
		return Department.findOne({
			where: { IdDepartment: newEmploymentData.IdDepartment },
		}).then((dep) => {
			return Employment.create({
				DateFrom: newEmploymentData.DateFrom,
				DateTo: newEmploymentData.DateTo,
				IdDepartment: newEmploymentData.IdDepartment,
				IdDivision: dep.IdDivision,
				IdPosition: newEmploymentData.IdPosition,
				IdPerson: newEmploymentData.IdPerson,
				IdRole: newEmploymentData.IdRole,
			});
		});
	} else {
		return Employment.create({
			DateFrom: newEmploymentData.DateFrom,
			DateTo: newEmploymentData.DateTo,
			IdDepartment: newEmploymentData.IdDepartment,
			IdDivision: newEmploymentData.IdDivision,
			IdPosition: newEmploymentData.IdPosition,
			IdPerson: newEmploymentData.IdPerson,
			IdRole: newEmploymentData.IdRole,
		});
	}
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
	const IdDivision = data.IdDivision;
	const idPosition = data.idPosition;
	const idPerson = data.idPerson;
	const idRole = data.idRole;
	if (!IdDivision) {
		console.log('Nie ma IdDivision');
		return Department.findOne({
			where: { IdDepartment: idDepartment },
		}).then((dep) => {
			console.log(dep.IdDivision);
			data.IdDivision = dep.IdDivision;
			return Employment.update(data, { where: { IdEmployment: employmentId } });
		});
	} else {
		console.log('Jest IdDivision');

		return Employment.update(data, { where: { IdEmployment: employmentId } });
	}
};

exports.getEmploymentById = (empId) => {
	return Employment.findByPk(empId);
};
