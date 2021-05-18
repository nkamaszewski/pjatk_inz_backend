const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Issue = sequelize.define('Issue', {
    idIssue: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	Description: { type: Sequelize.STRING, allowNull: false}
	}, {
    timestamps: false,
    tableName: 'Issue'
});
module.exports = Issue;