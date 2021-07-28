const ApplicationForRefund = require('../../model/sequelize/ApplicationForRefund');
const ReasonForRefund = require('../../model/sequelize/ReasonForRefund');
const ApplicationForReasons = require('../../model/sequelize/ApplicationForReasons');



ApplicationForReasons

exports.getApplicationForReasonss = () => {
    return ApplicationForReasons.findAll();
};

exports.createApplicationForReasons = (newApplicationForReasonsData) => {
    return ApplicationForReasons.create({
        ApplicationForReasons: newApplicationForReasonsData.ApplicationForReasons
    });
};

exports.deleteReasonForFefund = (applicationForReasonsId) => {
    return ApplicationForReasons.destroy({
        where: { IdApplicationForReasons: applicationForReasonsId }
    });
};

exports.updateApplicationForReasons = (applicationForReasonsId, data) => {
    const ApplicationForReasons = data.ApplicationForReasons;
    return ApplicationForReasons.update(data, { where: { IdApplicationForReasons: applicationForReasonsId } });
}

exports.getApplicationForReasonsById = (appForReasId) => {
    return ApplicationForReasons.findByPk(appForReasId,
        {
            include: [{
            
                model: ApplicationForRefund,
                as: 'applicationForReasonsApplicationForRefund'
            },
            {
                model: ReasonForRefund,
                as: 'applicationForReasonsReasonForRefund'

            }]
        });
};