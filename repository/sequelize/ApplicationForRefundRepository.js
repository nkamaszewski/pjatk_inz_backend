const ApplicationForReasons = require('../../model/sequelize/ApplicationForReasons');

exports.getApplicationForRefunds = () => {
    return ApplicationForRefund.findAll();
};

exports.createApplicationForRefund = (newApplicationForRefundData) => {
    return ApplicationForRefund.create({
        ApplicationForRefund: newApplicationForRefundData.ApplicationForRefund
    });
};

exports.deleteReasonForFefund = (applicationForRefundId) => {
    return ApplicationForRefund.destroy({
        where: { IdApplicationForRefund: applicationForRefundId }
    });
};

exports.updateApplicationForRefund = (applicationForRefundId, data) => {
    const applicationForRefund = data.ApplicationForRefund;
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