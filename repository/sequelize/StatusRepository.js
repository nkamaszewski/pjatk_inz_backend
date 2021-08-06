//const ApplicationFor = require('../../model/sequelize/ApplicationFor');
const ApplicationForReasons = require('../../model/sequelize/ApplicationForReasons');
const ApplicationForRefund = require('../../model/sequelize/ApplicationForRefund');
const Status = require('../../model/sequelize/Status');

exports.getStatuss = () => {
    return Status.findAll();
};

exports.createStatus = (newStatusData) => {
    const {IdStatus,Name} = newStatusData;
    return Status.create({
        IdStatus,
        Name
    });
};

exports.deleteStatus = (statusId) => {
    return Status.destroy({
        where: { IdStatus: statusId }
    });
};

exports.updateStatus = (statusId, data) => {
    const IdStatus = data.IdStatus;
    const Name = data.Name;
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
