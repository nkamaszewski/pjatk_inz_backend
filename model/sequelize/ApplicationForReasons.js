const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ApplicationForReasons = sequelize.define(
	'ApplicationForReasons',
	{
		IdApplicationForReasons: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		IdReasonForRefund: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Wybór przyczyny jest wymagany!',
				},
				isInt: {
					msg: 'Wybór przyczyny jest wymagany!',
				},
			},
		},
		IdApplicationForRefund: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Wybór wniosku jest wymagany!',
				},
				isInt: {
					msg: 'Wybór wniosku jest wymagany!',
				},
			},
		},
		IdStatus: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Wybór statusu jest wymagany!',
				},
				isInt: {
					msg: 'Wybór statusu jest wymagany!',
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: 'ApplicationForReasons',
		indexes: [
			{
				name: 'idx_applicationForReasons_idStuatus',
				fields: ['IdStatus'],
			},
			{
				name: 'idx_appForReasons_appFor_reason',
				unique: true,
				fields: ['IdReasonForRefund', 'IdApplicationForRefund'],
			},
		],
	}
);
module.exports = ApplicationForReasons;
