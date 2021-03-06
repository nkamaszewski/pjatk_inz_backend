const ApplicationFor = require('../../model/sequelize/ApplicationFor');
const Education = require('../../model/sequelize/Education');
const Status = require('../../model/sequelize/Status');
const Employee = require('../../model/sequelize/Employee');
const Employment = require('../../model/sequelize/Employment');
const Department = require('../../model/sequelize/Department');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Role = require('../../model/Role');
const status = require('../../model/Status');
exports.getApplicationFor = (params, ...userData) => {
	const { iddepartment, iddivision, idstatus } = params;
	const depId = iddepartment;
	const divId = iddivision;
	const statId = idstatus;
	const [userId, userIdDepartment, userIdDivision, userIdRole] = userData;

	return ApplicationFor.findAll({
		attributes: [
			'IdApplicationFor',
			'DateOfSubmission',
			'IdEducation',
			'IdStatus',
			'Compatibility',
		],
		order: [['IdApplicationFor', 'DESC']],
		include: [
			{
				model: Education,
				required: true,
				as: 'applicationForEducation',
			},
			{
				model: Status,
				as: 'applicationForStatus',
				where: statId ? { IdStatus: statId } : {},
			},
			{
				model: Employee,
				required: true,
				as: 'applicationForEmployee',
				include: [
					{
						model: Employment,
						required: true,
						as: 'employeeEmployment',
						where: [
							depId ? { IdDepartment: depId, DateTo: null } : { DateTo: null },
							divId ? { IdDivision: divId } : {},
							userIdRole == Role.PRACOWNIK
								? { IdPerson: userId }
								: userIdRole == Role.KIEROWNIK
								? { IdDepartment: userIdDepartment }
								: userIdRole == Role.DYREKTOR
								? { IdDivision: userIdDivision }
								: {},
						],
					},
				],
			},
		],
	});
};

exports.createApplicationFor = (newApplicationForData) => {
	if (isNaN(parseInt(newApplicationForData.IdStatus)))
		newApplicationForData.IdStatus = 1;
	const { IdPerson, DateOfSubmission, IdEducation, IdStatus, Compatibility } =
		newApplicationForData;

	return ApplicationFor.create({
		IdPerson,
		DateOfSubmission,
		IdEducation,
		IdStatus,
		Compatibility,
	});
};

exports.deleteApplicationFor = (applicationForId, userId) => {
	return ApplicationFor.destroy({
		where: { IdApplicationFor: applicationForId },
	});
};

exports.updateApplicationFor = (applicationForId, userId, userIdRole, data) => {
	const IdApplicationFor = data.IdApplicationFor;
	const DateOfSubmission = data.DateOfSubmission;
	const IdEducation = data.IdEducation;
	const IdStatus = data.IdStatus;
	const Compatibility = data.Compatibility;
	const IdPerson = data.IdPerson;

	return ApplicationFor.update(
		{
			IdStatus: IdStatus,
			Compatibility: Compatibility,
			IdEducation: IdEducation,
		},
		{
			where: { IdApplicationFor: applicationForId },
		}
	);
};

exports.updateApplicationForUser = (
	applicationForId,
	userId,
	userIdRole,
	data
) => {
	const { IdPerson, DateOfSubmission, IdEducation, IdStatus, Compatibility } =
		data;

	return ApplicationFor.findOne({
		where: {
			IdApplicationFor: applicationForId,
			IdPerson: userId,
			IdStatus: status.ZLOZONY,
		},
	}).then(function (appFor) {
		if (appFor && IdStatus == status.ZLOZONY) {
			return appFor.update({
				Compatibility: Compatibility,
				IdEducation: IdEducation,
			});
		} else {
			return -1;
		}
	});
};

exports.updateApplicationForManager = (
	applicationForId,
	userId,
	userIdRole,
	data
) => {
	const { IdPerson, DateOfSubmission, IdEducation, IdStatus, Compatibility } =
		data;

	return ApplicationFor.findOne({
		where: {
			IdApplicationFor: applicationForId,
			IdStatus: { [Op.ne]: status.ZATWIERDZONY_DYR },
		},
	}).then(function (appFor) {
		if (appFor) {
			if (appFor.IdPerson != userId) {
				if (appFor.IdEducation != IdEducation) return -1;
				else return appFor.update({ IdStatus: IdStatus });
			} else {
				return appFor.update({
					Compatibility: Compatibility,
					IdEducation: IdEducation,
					IdStatus: IdStatus,
				});
			}
		} else {
			return -1;
		}
	});
};

exports.getApplicationForById = (appForId) => {
	return ApplicationFor.findByPk(appForId);
};

exports.getApplicationForByDepId = (depId) => {
	return ApplicationFor.findAll({
		attributes: ['IdApplicationFor', 'DateOfSubmission'],
		include: [
			{
				model: Employee,
				as: 'applicationForEmployee',
				include: [
					{
						model: Employment,
						as: 'employeeEmployment',
						where: {
							IdDepartment: depId,
							DateTo: null,
						},
					},
				],
			},
		],
		include: [
			{
				model: Status,
				as: 'applicationForStatus',
			},
		],
	});
};

exports.getApplicationForByDivId = (divId) => {
	return ApplicationFor.findAll({
		attributes: ['IdApplicationFor', 'DateOfSubmission'],
		include: [
			{
				model: Employee,
				as: 'applicationForEmployee',
				include: [
					{
						model: Employment,
						as: 'employeeEmployment',
						where: {
							DateTo: null,
						},
						include: [
							{
								model: Department,
								as: 'departmentEmployment',
								where: {
									IdDivision: divId,
								},
							},
						],
					},
				],
			},
		],
		include: [
			{
				model: Status,
				as: 'applicationForStatus',
			},
		],
	});
};

exports.getApplicationForByStatId = (statId) => {
	return ApplicationFor.findAll({
		attributes: [
			'IdApplicationFor',
			'DateOfSubmission',
			'IdEducation',
			'IdStatus',
			'Compatibility',
		],
		include: [
			{
				model: Education,
				as: 'applicationForEducation',
			},
			{
				model: Status,
				as: 'applicationForStatus',
			},
			{
				model: Employee,
				as: 'applicationForEmployee',
			},
		],
		where: {
			IdStatus: statId,
		},
	});
};

exports.getApplicationForByEduId = (eduId) => {
	return ApplicationFor.findAndCountAll({
		where: { IdEducation: eduId, IdStatus: status.ZATWIERDZONY_DYR },
	});
};
