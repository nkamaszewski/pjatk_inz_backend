const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Participation = sequelize.define(
	"Participation",
	{
		IdParticipation: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		IdPerson: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Należy wybrać pracownika",
				},
				isNumeric: {
					msg: "Należy wybrać pracownika",
				},
			},
		},
		IdEducation: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Należy wybrać szkolenie",
				},
				isNumeric: {
					msg: "Należy wybrać szkolenie",
				},
				isAccepted(value, next) {
					const personId = this.IdPerson;
					sequelize.models.ApplicationFor.findOne({
						where: {
							IdPerson: personId,
							IdEducation: value,
							IdStatus: 5,
						},
					})
						.then((applications) => {
							if (!applications) {
								next(new Error(`Wniosek na to szkolenie nie zaakceptowany!`));
							}
							next();
						})
						.catch((onError) => console.log(onError));
				},
			},
		},
		DateOfRegistration: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
			validate: {
				notNull: {
					msg: "Należy wstawić datę początkową zatrudnienia",
				},
				notEmpty: {
					msg: "Należy wstawić datę początkową zatrudnienia",
				},
				isDate: {
					msg: "Pole powinno być prawidłową datą",
				},
			},
		},
		EndDate: { type: Sequelize.DATE, allowNull: true },
		CertificateOfCompletion: { type: Sequelize.STRING, allowNull: true },
	},
	{
		timestamps: false,
		tableName: "Participation",
		indexes: [
			{
				name: "idx_participation_idPerson_idEducation",
				unique: true,
				fields: ["IdPerson", "IdEducation"],
			},
		],
	}
);
module.exports = Participation;
