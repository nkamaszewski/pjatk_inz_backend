const ApplicationForReasons = require('../../model/sequelize/ApplicationForReasons');
const ApplicationForRefund = require('../../model/sequelize/ApplicationForRefund');
const ReasonForRefund = require('../../model/sequelize/ReasonForRefund');

exports.getApplicationForRefunds = () => {
    return ApplicationForRefund.findAll({
        include: [{
            model: ApplicationForReasons,
            as: 'applicationForRefundApplicationForReasons',
            include: [
                {
                    model: ReasonForRefund,
                    as: 'applicationForReasonsReasonForRefund',
                }
            ]
        }]
    });
};

exports.createApplicationForRefund = (newApplicationForRefundData) => {
    const { IdApplicationForRefund, IdApplicationFor, IdStatus, DateOfSubmission } = newApplicationForRefundData
    return ApplicationForRefund.create({
        IdApplicationForRefund, IdApplicationFor, IdStatus, DateOfSubmission
    });
};

exports.deleteApplicationForRefund = (applicationForRefundId) => {
    return ApplicationForRefund.destroy({
        where: { IdApplicationForRefund: applicationForRefundId }
    });
};

exports.updateApplicationForRefund = (applicationForRefundId, data) => {
    const IdApplicationForRefund = data.IdApplicationForRefund;
    const IdApplicationFor = data.IdApplicationFor;
    const IdStatus = data.IdStatus;
    const DateOfSubmission = data.DateOfSubmission;

    return ApplicationForRefund.update(data, { where: { IdApplicationForRefund: applicationForRefundId } });
}

exports.getApplicationForRefundById = (appForRefId) => {
    return ApplicationForRefund.findByPk(appForRefId,
        {
            include: [{
                model: ApplicationForReasons,
                as: 'applicationForRefundApplicationForReasons'

            }]
        });
};