const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ApplicationForRefund = sequelize.define(
	'ApplicationForRefund',
	{
		IdApplicationForRefund: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		IdApplicationFor: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
			validate: {
				notNull: {
					msg: 'Należy wybrać powiązany wniosek szkoleniowy!',
				},
				isInt: {
					msg: 'Należy wybrać powiązany wniosek szkoleniowy!',
				},
			},
		},
		IdStatus: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Należy okerślić status wniosku!',
				},
				isInt: {
					msg: 'Należy okerślić status wniosku',
				},
			},
		},
		DateOfSubmission: { type: Sequelize.DATE, allowNull: false },
	},
	{
		timestamps: false,
		tableName: 'ApplicationForRefund',
		indexes: [
			{
				name: 'idx_applicationForRefund_idStuatus',
				fields: ['IdStatus'],
			},
		],
	}
);
module.exports = ApplicationForRefund;
