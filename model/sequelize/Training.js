const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Training = sequelize.define('Training', {
	IdEducation: { type: Sequelize.INTEGER, autoIncrement: false, allowNull: false, primaryKey: true },
	IdTopic: { type: Sequelize.INTEGER, allowNull: false },
	IdCompany: { type: Sequelize.INTEGER, allowNull: false },
	IdPerson: { type: Sequelize.INTEGER, allowNull: false },
	Internal: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false },
	DateFrom: {
		type: Sequelize.DATE, allowNull: false,
		validate: {
			isDate: {
				msg: 'Pole powinno być prawidłową datą'
			}
		}
	},
	DateTo: {
		type: Sequelize.DATE, allowNull: false,
		validate: {
			isDate: {
				msg: 'Pole powinno być prawidłową datą'
			},
			isLessThanFrom(value) {
				if (value <= this.DateFrom) {
					throw new Error(`Data końcowa musi być późniejsza niż początkowa`);
				}
			},
		}
	}
}, {
	timestamps: false,
	tableName: 'Training',
	indexes: [
		{
			name: 'idx_training_idTopic',
			fields: ['IdTopic']
		},
		{
			name: 'idx_training_idCompany',
			fields: ['IdCompany']
		},
		{
			name: 'idx_training_idPerson',
			fields: ['IdPerson']
		}
	]
});
module.exports = Training;