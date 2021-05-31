const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Participation = sequelize.define('Participation', {
    IdParticipation: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
	IdPerson: { type: Sequelize.INTEGER, allowNull: false},
	IdEducation: { type: Sequelize.INTEGER, allowNull: false},
	DateOfRegistration: { type: Sequelize.DATE, allowNull: false},
	EndDate: { type: Sequelize.DATE, allowNull: true},
	CertificateOfCompletion: { type: Sequelize.STRING, allowNull: true}
	}, {
    timestamps: false,
    tableName: 'Participation'
});
module.exports = Participation;