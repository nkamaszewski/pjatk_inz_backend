const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const OtherEducation = sequelize.define('OtherEducation', {
	IdEducation: { type: Sequelize.INTEGER, autoIncrement: false, allowNull: false, primaryKey: true },
	Name: { type: Sequelize.STRING, allowNull: false },
	IdCompany: { type: Sequelize.INTEGER, allowNull: false }
}, {
	timestamps: false,
	tableName: 'OtherEducation'
});
module.exports = OtherEducation;