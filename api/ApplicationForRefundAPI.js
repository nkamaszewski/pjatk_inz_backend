const ApplicationForRefundRepository = require('../repository/sequelize/ApplicationForRefundRepository');

exports.getApplicationForRefunds = (req, res, next) => {
    ApplicationForRefundRepository.getApplicationForRefunds()
        .then(appForRefs => {
            res.status(200).json(appForRefs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getApplicationForRefundById = (req, res, next) => {
    const appForRefId = req.params.appForRefId;
    ApplicationForRefundRepository.getApplicationForRefundById(appForRefId)
        .then(appForRef => {
            if (!appForRef) {
                res.status(404).json({
                    message: 'Application for refund with id: ' + appForRefId + ' not found'
                })
            } else {
                res.status(200).json(appForRef);
            }
        });
};

exports.createApplicationForRefund = (req, res, next) => {
    ApplicationForRefundRepository.createApplicationForRefund(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateApplicationForRefund = (req, res, next) => {
    const appForRefId = req.params.appForRefId;
    ApplicationForRefundRepository.updateApplicationForRefund(appForRefId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Application for refund updated!', appForRef: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteApplicationForRefund = (req, res, next) => {
    const appForRefId = req.params.appForRefId;
    ApplicationForRefundRepository.deleteApplicationForRefund(appForRefId)
        .then(result => {
            res.status(200).json({ message: 'Removed application for refund', appForRef: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};