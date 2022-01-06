const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Employee = sequelize.define(
	'Employee',
	{
		IdPerson: {
			type: Sequelize.INTEGER,
			autoIncrement: false,
			allowNull: false,
			primaryKey: true,
		},
		Pesel: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: 'Należy podać nr PESEL',
				},
				notNull: {
					msg: 'Należy podać nr PESEL',
				},
				len: {
					args: [11, 11],
					msg: 'Nr PESEL powinien zawierać 11 znaków',
				},
				isNumeric: {
					msg: 'Nr PESEL powinien zawierać tylko cyfry',
				},
			},
		},
		Password: { type: Sequelize.STRING, allowNull: false },
		IdRole: {
			type: Sequelize.INTEGER,
			allowNull: true,
			defaultValue: '1',
		},
		IsActive: { type: Sequelize.BOOLEAN, allowNull: false },
		OwnerAccount: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		timestamps: false,
		tableName: 'Employee',
		indexes: [
			{
				name: 'idx_employee_pesel',
				unique: true,
				fields: ['Pesel'],
			},
		],
	}
);
module.exports = Employee;
