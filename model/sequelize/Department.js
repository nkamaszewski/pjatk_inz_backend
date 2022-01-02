const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Department = sequelize.define(
	"Department",
	{
		IdDepartment: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		Name: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Należy podać nazwę departamentu",
				},
				notEmpty: {
					msg: "Należy podać nazwę departamentu",
				},
				len: {
					args: [2, 255],
					msg: "Nazwa powinna zawierać od 2 do 255 znaków",
				},
			},
		},
		IdDivision: {
			type: Sequelize.INTEGER,
			allowNull: false,
			notNull: {
				msg: "Należy wybrać pion, do którego należy wydział!",
			},
			isInt: {
				msg: "Należy wybrać pion, do którego należy wydział",
			},
		},
	},
	{
		timestamps: false,
		tableName: "Department",
		indexes: [
			{
				name: "idx_department_idDivision_name",
				unique: true,
				fields: ["IdDivision", "name"],
			},
		],
	}
);
module.exports = Department;
