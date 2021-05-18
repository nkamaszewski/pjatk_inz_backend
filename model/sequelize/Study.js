const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Study = sequelize.define('Study', {
    idEducation: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    FieldOfStudy: { type: Sequelize.STRING, allowNull: false },
	IdUniversity: { type: Sequelize.INTEGER, allowNull: false },
	IdMode: { type: Sequelize.INTEGER, allowNull: false },
	IdGradueDegree: { type: Sequelize.INTEGER, allowNull: false },
}, {
    timestamps: false,
    tableName: 'Study'
});
module.exports = Study;