const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const ApplicationFor = sequelize.define('ApplicationFor', {
    idApplicationFor: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    DateOfSubmission: { type: Sequelize.DATE, allowNull: false },
	IdEducation: { type: Sequelize.INTEGER, allowNull: false },	
    IdStatus: { type: Sequelize.INTEGER, allowNull: false }	
}, {
    timestamps: false,
    tableName: 'ApplicationFor'
});
module.exports = ApplicationFor;