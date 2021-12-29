const ApplicationForReasons = require('../../model/sequelize/ApplicationForReasons');
const ReasonForRefund = require('../../model/sequelize/ReasonForRefund');

exports.getReasonForRefunds = () => {
  return ReasonForRefund.findAll();
};

exports.createReasonForRefund = (newReasonForRefundData) => {
  const { Name } = newReasonForRefundData;
  return ReasonForRefund.create({
    Name,
  });
};

exports.deleteReasonForFefund = (reasonForRefundId) => {
  return ReasonForRefund.destroy({
    where: { IdReasonForRefund: reasonForRefundId },
  });
};

exports.updateReasonForRefund = (reasonForRefundId, data) => {
  const IdReasonForRefund = data.IdReasonForRefund;
  const Name = data.Name;

  return ReasonForRefund.update(data, {
    where: { IdReasonForRefund: reasonForRefundId },
  });
};

exports.getReasonForRefundById = (reasForRefId) => {
  return ReasonForRefund.findByPk(reasForRefId, {
    include: [
      {
        model: ApplicationForReasons,
        as: 'reasonForRefundApplicationForReasons',
      },
    ],
  });
};
