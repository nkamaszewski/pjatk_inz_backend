const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Subject = sequelize.define('Subject', {
    idSubject: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Subject: { type: Sequelize.STRING, allowNull: false }
	}, {
    timestamps: false,
    tableName: 'Subject'
});
module.exports = Subject;