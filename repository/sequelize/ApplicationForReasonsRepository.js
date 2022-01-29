const ApplicationForRefund = require('../../model/sequelize/ApplicationForRefund');
const ReasonForRefund = require('../../model/sequelize/ReasonForRefund');
const ApplicationForReasons = require('../../model/sequelize/ApplicationForReasons');

ApplicationForReasons;

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
			},
			{
				model: ReasonForRefund,
				as: 'applicationForReasonsReasonForRefund',
			},
		],
	});
};
