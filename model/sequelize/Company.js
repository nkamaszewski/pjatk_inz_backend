const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Company = sequelize.define('Company', {
	IdCompany: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Name: {
		type: Sequelize.STRING, allowNull: false,
		validate: {
			notNull: {
				msg: "Należy podać nazwę firmy"
			},
			len: {
				args: [1, 255],
				msg: "Nazwa firmy powinna mieć od 1 do 255 znaków"
			}
		}
	},
	City: { type: Sequelize.STRING, allowNull: false,
		validate: {
			notNull: {
				msg: "W adresie należy podać nazwę miejscowości"
			},
			notEmpty: {
				msg: "W adresie należy podać nazwę miejscowości"
			}},
	},
	PostalCode: { type: Sequelize.STRING, allowNull: false,
		validate: {
			notNull: {
				msg: "W adresie należy podać kod pocztowy"
			},
			notEmpty: {
				msg: "W adresie należy podać kod pocztowy"
			}},
		},
	Street: { type: Sequelize.STRING, allowNull: false,
		validate: {
			notNull: {
				msg: "W adresie należy podać ulicę"
			},
			notEmpty: {
				msg: "W adresie należy podać ulicę"
			}},
		},
	Number: { type: Sequelize.STRING, allowNull: false,
		validate: {
			notNull: {
				msg: "W adresie należy podać numer"
			},
			notEmpty: {
				msg: "W adresie należy podać numer"
			}},
		},
	TIN: { type: Sequelize.STRING, allowNull: false,
		validate: {
			notNull: {
				msg: "Należy podać numer NIP"
			},
			notEmpty: {
				msg: "Należy podać numer NIP"
			}}, 
		},
	Owner: { type: Sequelize.STRING, allowNull: false, defaultValue: false }
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