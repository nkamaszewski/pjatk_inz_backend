//const ApplicationFor = require('../../model/sequelize/ApplicationFor');
const ApplicationForReasons = require('../../model/sequelize/ApplicationForReasons');
const ApplicationForRefund = require('../../model/sequelize/ApplicationForRefund');
const Status = require('../../model/sequelize/Status');

exports.getStatuss = () => {
    return Status.findAll();
};

exports.createStatus = (newStatusData) => {
    return Status.create({
        Status: newStatusData.Status
    });
};

exports.deleteStatus = (statusId) => {
    return Status.destroy({
        where: { IdStatus: statusId }
    });
};

exports.updateStatus = (statusId, data) => {
    const status = data.Status;
    return Status.update(data, { where: { IdStatus: statusId } });
}

exports.getStatusById = (statId) => {
    return Status.findByPk(statId,
        {
            include: [{
                model: ApplicationForRefund,
                as: 'statusApplicationForRefund'
            },
            {
                model: ApplicationForReasons,
                as: 'statusApplicationForReasons'
                
            }]
        });
};
