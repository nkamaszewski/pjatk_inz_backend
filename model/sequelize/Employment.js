const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const Op = Sequelize.Op;

const Employment = sequelize.define(
	'Employment',
	{
		IdEmployment: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		DateFrom: {
			type: Sequelize.DATE,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Należy wstawić datę początkową zatrudnienia',
				},
				notEmpty: {
					msg: 'Należy wstawić datę początkową zatrudnienia',
				},
				isDate: {
					msg: 'Pole powinno być prawidłową datą',
				},
				isEmployed(value, next) {
					const personId = this.IdPerson;
					const employmentId = this.IdEmployment;
					Employment.findAll({
						where: {
							IdEmployment: {
								[Op.ne]: employmentId,
							},
							[Op.or]: [
								{
									DateTo: { [Op.is]: null },
								},
								{
									DateTo: { [Op.gte]: value },
								},
							],
							IdPerson: personId,
						},
					})
						.then((meeting) => {
							if (meeting.length != 0)
								next(
									new Error(
										`Data początkowa zatrudnienia pokrywa się z wcześniejszym zatrudnieniem`
									)
								);
							next();
						})
						.catch((onError) => console.log(onError));
				},
			},
		},
		DateTo: {
			type: Sequelize.DATE,
			allowNull: true,
			validate: {
				isDate: {
					msg: 'Pole powinno być prawidłową datą',
				},
				isLessThanDateFrom(value) {
					if (value && value <= this.DateFrom) {
						throw new Error('Data końcowa musi być późniejsza niż początkowa');
					}
				},
			},
		},
		IdDepartment: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		IdDivision: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		IdPosition: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Należy wybrać stanowisko pracownika',
				},
				notEmpty: {
					msg: 'Należy wybrać stanowisko pracownika',
				},
			},
		},
		IdPerson: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Należy wybrać pracownika',
				},
				notEmpty: {
					msg: 'Należy wybrać pracownika',
				},
			},
		},
		IdRole: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: '1',
			validate: {
				notNull: {
					msg: 'Należy określić rolę',
				},
				notEmpty: {
					msg: 'Należy określić rolę',
				},
				isInt: {
					msg: 'Należy określić rolę',
				},
			},
		},
	},
	{
		timestamps: false,
		tableName: 'Employment',
		indexes: [
			{
				name: 'idx_employment_idDepartment',
				fields: ['IdDepartment'],
			},
			{
				name: 'idx_employment_idPosition',
				fields: ['IdPosition'],
			},
			{
				name: 'idx_employment_idPerson',
				fields: ['IdPerson'],
			},
		],
	}
);
module.exports = Employment;
