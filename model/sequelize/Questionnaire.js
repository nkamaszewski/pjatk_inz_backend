const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Questionnaire = sequelize.define(
	'Questionnaire',
	{
		IdQuestionnaire: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		IdParticipation: { type: Sequelize.INTEGER, allowNull: false },
		Date: { type: Sequelize.DATE, allowNull: false },

		Issue1: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: 'Ocena szkolenia musi być liczbą',
				},
				min: { args: [0], msg: 'Minimalna ocena to 0' },
				max: { args: [5], msg: 'Maksymalna ocena to 5' },
			},
		},
		Issue2: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: 'Ocena szkolenia musi być liczbą',
				},
				min: { args: [0], msg: 'Minimalna ocena to 0' },
				max: { args: [5], msg: 'Maksymalna ocena to 5' },
			},
		},
		Issue3: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: 'Ocena szkolenia musi być liczbą',
				},
				min: { args: [0], msg: 'Minimalna ocena to 0' },
				max: { args: [5], msg: 'Maksymalna ocena to 5' },
			},
		},
		Issue4: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: 'Ocena szkolenia musi być liczbą',
				},
				min: { args: [0], msg: 'Minimalna ocena to 0' },
				max: { args: [5], msg: 'Maksymalna ocena to 5' },
			},
		},
		Issue5: {
			type: Sequelize.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: 'Ocena szkolenia musi być liczbą',
				},
				min: { args: [0], msg: 'Minimalna ocena to 0' },
				max: { args: [5], msg: 'Maksymalna ocena to 5' },
			},
		},
	},
	{
		timestamps: false,
		tableName: 'Questionnaire',
	}
);
module.exports = Questionnaire;
