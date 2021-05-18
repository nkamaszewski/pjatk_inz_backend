const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Coach = sequelize.define('Coach', {
    idCoach: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	JobTitle: { type: Sequelize.STRING, allowNull: false }
	}, {
    timestamps: false,
    tableName: 'Coach'
});
module.exports = Coach;