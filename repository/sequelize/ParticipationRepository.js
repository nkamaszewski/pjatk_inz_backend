const Participation = require('../../model/sequelize/Participation');
const Employee = require('../../model/sequelize/Employee');
const Person = require('../../model/sequelize/Person');

exports.getParticipations = () => {
	return Participation.findAll({
		attributes: [
			'IdParticipation',
			'IdPerson',
			'IdEducation',
			'DateOfRegistration',
			'EndDate',
		],
		include: [
			{
				model: Employee,
				as: 'participationEmployee',
			},
		],
	});
};

exports.getParticipationsByIdEducation = (IdEducation) => {
	return Participation.findAll({
		attributes: [
			'IdParticipation',
			'IdPerson',
			'IdEducation',
			'DateOfRegistration',
			'EndDate',
			'CertificateOfCompletion',
		],
		where: { IdEducation },
		include: [
			{
				model: Employee,
				as: 'participationEmployee',
				include: [
					{
						model: Person,
						as: 'employeePerson',
					},
				],
			},
		],
	});
};

exports.createParticipation = (newParticipationData) => {
	return Participation.create({
		DateOfRegistration: newParticipationData.DateOfRegistration,
		EndDate: newParticipationData.EndDate,
		CertificateOfCompletion: newParticipationData.CertificateOfCompletion,
		IdPerson: newParticipationData.IdPerson,
		IdEducation: newParticipationData.IdEducation,
	});
};

exports.deleteParticipation = (participationId) => {
	return Participation.destroy({
		where: { IdParticipation: participationId },
	});
};

exports.updateParticipation = (participationId, data) => {
	return Participation.update(data, {
		where: { IdParticipation: participationId },
	});
};

exports.updateParticipationUser = (participationId, data) => {
	return Participation.update(
		{ CertificateOfCompletion: data.CertificateOfCompletion },
		{
			where: { IdParticipation: participationId },
		}
	);
};

exports.getParticipationById = (participId) => {
	return Participation.findByPk(participId);
};

exports.getParticipationByEduId = (eduId) => {
	return Participation.findAndCountAll({
		where: { IdEducation: eduId },
	});
};

exports.getCertificateByPartId = (participId) => {
	return Participation.findOne({
		attributes: ['CertificateOfCompletion'],
		where: { IdParticipation: participId },
	});
};
