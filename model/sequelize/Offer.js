const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Offer = sequelize.define(
	'Offer',
	{
		IdOffer: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		Topic: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Należy podać propozycję tematu szkolenia',
				},
				notEmpty: {
					msg: 'Należy podać propozycję tematu szkolenia',
				},
			},
		},
		Link: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				isUrl: {
					require_tld: true,
					allow_underscores: false,
					allow_trailing_dot: false,
					msg: 'Pole link powinno zawierać prawidłowy adres URL',
				},
			},
		},
		Price: {
			type: Sequelize.DECIMAL,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Należy podać cenę szkolenia',
				},
				isNumeric: {
					msg: 'Pole powinno zawierać liczbę',
				},
			},
		},
		IdQuestionnaireOffer: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Należy wybrać rok wniosku',
				},
				isNumeric: {
					msg: 'Należy wybrać rok wniosku',
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: 'Offer',
	}
);
module.exports = Offer;
