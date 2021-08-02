const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Training = sequelize.define('Training', {
	IdEducation: { type: Sequelize.INTEGER, autoIncrement: false, allowNull: false, primaryKey: true },
	IdTopic: { type: Sequelize.INTEGER, allowNull: false },
	IdCompany: { type: Sequelize.INTEGER, allowNull: false },
	IdPerson: { type: Sequelize.INTEGER, allowNull: false },
	Internal: { type: Sequelize.INTEGER, allowNull: false, defaultValue: false },
	DateFrom: { type: Sequelize.DATE, allowNull: false }
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