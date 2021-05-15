const sequelize = require('./sequelize');
const Division = require('../../model/sequelize/Division');
const Department = require('../../model/sequelize/Department');
const Position = require('../../model/sequelize/Position');


module.exports = () => {
	Division.hasMany(Department, { as: 'divisionDepartment', foreignKey: { name: 'idDivision', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
	Department.belongsTo(Division, { as: 'divisionDepartment', foreignKey: { name: 'idDivision', allowNull: false } });


	let allDivisions, allDepartments;
	return sequelize
		.sync({ force: true })					//synchronizacja modelu z baza, force - usuniecie i ponowne utworzenie zmienionej tabeli
		.then(() => {
			return Division.findAll();
		})
		.then(divisions => {
			if (!divisions || divisions.length == 0) {
				return Division.bulkCreate([
					{ Name: 'Finansowy' },
					{ Name: 'EFS' },
				])
					.then(() => {
						return Division.findAll();
					});
			} else {
				return divisions;
			}
		})
		.then(divisions => {
			allDivisions = divisions;
			return Department.findAll();
		})
		.then(departments => {
			if (!departments || departments.length == 0) {
				return Department.bulkCreate([
					{ Name: 'Wydział Księgowości', idDivision: 1 },
					{ Name: 'Płatności i refundacji', idDivision: 1 }
				])
				// .then(() => {
				// 	return Division.findAll();
				// });
			} else {
				return departments;
			}
		});
};
