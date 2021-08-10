const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Company = sequelize.define('Company', {
	IdCompany: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Name: {
		type: Sequelize.STRING, allowNull: false,
		validate: {
			notEmpty: {
				msg: "Pole jest wymagane"
			},
			len: {
				args: [1, 255],
				msg: "Pole powinno zawierać od 1 do 255 znaków"
			}
		}
	},
	City: { type: Sequelize.STRING, allowNull: false },
	PostalCode: { type: Sequelize.STRING, allowNull: false },
	Street: { type: Sequelize.STRING, allowNull: false },
	TIN: { type: Sequelize.STRING, allowNull: false }
}, {
	timestamps: false,
	tableName: 'Company',
	indexes: [
		{
			name: 'idx_company_name',
			fields: ['Name']
		},
		{
			name: 'idx_company_TIN',
			fields: ['TIN']
		}
	]
});
module.exports = Company;