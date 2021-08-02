const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Company = sequelize.define('Company', {
	IdCompany: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Name: { type: Sequelize.STRING, allowNull: false },
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