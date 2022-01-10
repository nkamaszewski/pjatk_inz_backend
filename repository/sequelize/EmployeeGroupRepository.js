const Group = require('../../model/sequelize/Group');
const Employee = require('../../model/sequelize/Employee');
const EmployeeGroup = require('../../model/sequelize/EmployeeGroup');

exports.getEmployeeGroups = () => {
	return EmployeeGroup.findAll({
		attributes: ['IdEmployeeGroup'],
		include: [
			{
				model: Employee,
				as: 'employeeGroupEmployee',
			},
			{
				model: Group,
				as: 'employeeGroupGroup',
			},
		],
	});
};

exports.createEmployeeGroup = (newEmployeeGroupData) => {
	return EmployeeGroup.create({
		IdEmployeeGroup: newEmployeeGroupData.IdEmployeeGroup,
		IdPerson: newEmployeeGroupData.IdPerson,
		IdGroup: newEmployeeGroupData.IdGroup,
	});
};

exports.deleteEmployeeGroup = (empGroupId) => {
	return EmployeeGroup.destroy({
		where: { IdEmployeeGroup: empGroupId },
	});
};

exports.updateEmployeeGroup = (empGroupId, data) => {
	const IdEmployeeGroup = data.IdEmployeeGroup;
	const IdPerson = data.IdPerson;
	const IdGroup = data.IdGroup;

	return EmployeeGroup.update(data, { where: { IdEmployeeGroup: empGroupId } });
};

exports.getEmployeeGroupById = (empGroupId) => {
	return EmployeeGroup.findByPk(empGroupId);
};
