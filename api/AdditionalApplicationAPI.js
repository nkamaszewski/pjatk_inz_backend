const ReasonForRefundRepository = require('../repository/sequelize/ReasonForRefundRepository');
const ApplicationForRepository = require('../repository/sequelize/ApplicationForRepository');
const ApplicationForRefundRepository = require('../repository/sequelize/ApplicationForRefundRepository');
const ApplicationForReasonsRepository = require('../repository/sequelize/ApplicationForReasonsRepository');

exports.createAdditionalApplication = async (req, res, next) => {
  const { Id, Name, DateOfSubmission } = req.body;

  let appFor = null;
  let IdReasonForRefund = null;
  let appForRefund = null;

  try {
    appFor = await ApplicationForRepository.getApplicationForById(Id);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Wybrany wniosek szkoleniowy nie istnieje w bazie danych',
    });
  }

  try {
    const reasonForRefund =
      await ReasonForRefundRepository.createReasonForRefund({
        Name,
      });
    IdReasonForRefund = reasonForRefund.dataValues.IdReasonForRefund;
  } catch (e) {
    console.error(e);

    res.status(500).json({
      message:
        'Wystąpił błąd przy dodawaniu wniosku (internal: reasonForRefund)',
    });
  }

  try {
    appForRefund =
      await ApplicationForRefundRepository.createApplicationForRefund({
        IdApplicationFor: Id,
        IdStatus: appFor.IdStatus,
        DateOfSubmission,
      });
  } catch (e) {
    res.status(500).json({
      message: 'Wystąpił błąd przy dodawaniu wniosku (internal: appForRefund)',
    });
  }

  try {
    const appForReasons =
      await ApplicationForReasonsRepository.createApplicationForReasons({
        IdReasonForRefund,
        IdApplicationForRefund: appForRefund.IdApplicationForRefund,
        IdStatus: appFor.IdStatus,
      });
    res.status(201).json(appForReasons);
  } catch (e) {
    res.status(500).json({
      message: 'Wystąpił błąd przy dodawaniu wniosku (internal: appForReasons)',
    });
  }
};
