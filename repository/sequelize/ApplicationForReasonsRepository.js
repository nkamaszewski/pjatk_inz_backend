const ApplicationForRefund = require('../../model/sequelize/ApplicationForRefund');
const ReasonForRefund = require('../../model/sequelize/ReasonForRefund');
const ApplicationForReasons = require('../../model/sequelize/ApplicationForReasons');
const ApplicationFor = require('../../model/sequelize/ApplicationFor');

const Role = require('../../model/Role');
const Status = require('../../model/Status');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getApplicationForReasons = () => {
	return ApplicationForReasons.findAll();
};

exports.createApplicationForReasons = (newApplicationForReasonsData) => {
	const { IdReasonForRefund, IdApplicationForRefund, IdStatus } =
		newApplicationForReasonsData;
	return ApplicationForReasons.create({
		IdReasonForRefund,
		IdApplicationForRefund,
		IdStatus,
	});
};

exports.deleteApplicationForReasons = (applicationForReasonsId) => {
	return ApplicationForReasons.destroy({
		where: { IdApplicationForReasons: applicationForReasonsId },
	});
};

exports.updateApplicationForReasonsUser = (applicationForReasonsId, data) => {
	const IdApplicationForReasons = applicationForReasonsId;
	const IdReasonForRefund = data.IdReasonForRefund;
	const IdApplicationForRefund = data.IdApplicationForRefund;
	const IdStatus = data.IdStatus;

	return ApplicationForReasons.findOne({
		where: {
			IdApplicationForReasons: IdApplicationForReasons,
			IdStatus: Status.ZLOZONY,
		},
	}).then(function (appFor) {
		if (appFor && IdStatus == Status.ZLOZONY) {
			return appFor.update({
				IdApplicationForRefund: IdApplicationForRefund,
				IdReasonForRefund: IdReasonForRefund,
			});
		} else {
			return -1;
		}
	});
};

exports.updateApplicationForReasonsManager = (
	applicationForReasonsId,
	data
) => {
	const IdApplicationForReasons = applicationForReasonsId;
	const IdReasonForRefund = data.IdReasonForRefund;
	const IdApplicationForRefund = data.IdApplicationForRefund;
	const IdStatus = data.IdStatus;

	return ApplicationForReasons.findOne({
		where: {
			IdApplicationForReasons: IdApplicationForReasons,
			IdStatus: { [Op.ne]: Status.ZATWIERDZONY_DYR },
		},
	}).then(function (appFor) {
		if (appFor.IdReasonForRefund != IdReasonForRefund) return -1;
		else return appFor.update({ IdStatus: IdStatus });
	});
};

exports.updateApplicationForReasons = (applicationForReasonsId, data) => {
	const IdReasonForRefund = data.IdReasonForRefund;
	const IdApplicationForRefund = data.IdApplicationForRefund;
	const IdStatus = data.IdStatus;

	return ApplicationForReasons.update(data, {
		where: { IdApplicationForReasons: applicationForReasonsId },
	});
};

exports.getApplicationForReasonsById = (appForReasId) => {
	return ApplicationForReasons.findByPk(appForReasId, {
		include: [
			{
				model: ApplicationForRefund,
				as: 'applicationForReasonsApplicationForRefund',
				include: [
					{
						model: ApplicationFor,
						required: true,
						as: 'applicationForRefundApplicationFor',
						attributes: ['IdPerson'],
					},
				],
			},
			{
				model: ReasonForRefund,
				as: 'applicationForReasonsReasonForRefund',
			},
		],
	});
};
