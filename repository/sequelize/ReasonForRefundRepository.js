const ApplicationForReasons = require('../../model/sequelize/ApplicationForReasons');
const ReasonForRefund = require('../../model/sequelize/ReasonForRefund');

exports.getReasonForRefunds = () => {
    return ReasonForRefund.findAll();
};

exports.createReasonForRefund = (newReasonForRefundData) => {
    return ReasonForRefund.create({
        ReasonForRefund: newReasonForRefundData.ReasonForRefund
    });
};

exports.deleteReasonForFefund = (reasonForRefundId) => {
    return ReasonForRefund.destroy({
        where: { IdReasonForRefund: reasonForRefundId }
    });
};

exports.updateReasonForRefund = (reasonForRefundId, data) => {
    const reasonForRefund = data.ReasonForRefund;
    return ReasonForRefund.update(data, { where: { IdReasonForRefund: reasonForRefundId } });
}

exports.getReasonForRefundById = (reasForRefId) => {
    return ReasonForRefund.findByPk(reasForRefId,
        {
            include: [{
                model: ApplicationForReasons,
                as: 'reasonForRefundApplicationForReasons'

            }]
        });
};