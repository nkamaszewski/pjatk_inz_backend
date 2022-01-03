const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const EmployeeGroup = sequelize.define(
	"EmployeeGroup",
	{
		IdEmployeeGroup: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		IdGroup: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				isMaxOfPerson(value, next) {
					EmployeeGroup.findAndCountAll({
						where: {
							IdGroup: value,
						},
					})
						.then((emp) => {
							sequelize.models.Group.findByPk(value)
								.then((group) => {
									if (group.NumberOfPerson < emp.count)
										next(
											new Error(
												`Przekroczono zadeklarowaną liczbę osób w grupie!`
											)
										);
									next();
								})
								.catch(next);
						})
						.catch((onError) => console.log(onError));
				},
				notNull: {
					msg: "Należy podać grupę",
				},
				isInt: {
					msg: "Należy podać grupę",
				},
			},
		},
		IdPerson: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy podać pracownika",
				},
				isInt: {
					msg: "Należy podać pracownika",
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: "EmployeeGroup",
		indexes: [
			{
				name: "idx_employeeGroup",
				unique: true,
				fields: ["IdGroup", "IdPerson"],
			},
		],
	}
);
module.exports = EmployeeGroup;
