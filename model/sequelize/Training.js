const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Training = sequelize.define('Training', {
    idEducation: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    IdTopic: { type: Sequelize.INTEGER, allowNull: false },
	IdCompany: { type: Sequelize.INTEGER, allowNull: false },
	IdPerson: { type: Sequelize.INTEGER, allowNull: false },
	Internal: { type: Sequelize.INTEGER, allowNull: false },
	DateFrom: { type: Sequelize.DATE, allowNull: false },
	IdSubject: { type: Sequelize.INTEGER, allowNull: false }
	}, {
    timestamps: false,
    tableName: 'Training'
});
module.exports = Training;