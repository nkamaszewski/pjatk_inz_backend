const ReasonForRefundRepository = require('../repository/sequelize/ReasonForRefundRepository');

exports.getReasonForRefunds = (req, res, next) => {
    ReasonForRefundRepository.getReasonForRefunds()
        .then(reasForRefs => {
            res.status(200).json(reasForRefs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getReasonForRefundById = (req, res, next) => {
    const reasForRefId = req.params.reasForRefId;
    ReasonForRefundRepository.getReasonForRefundById(reasForRefId)
        .then(reasForRef => {
            if (!reasForRef) {
                res.status(404).json({
                    message: 'Reason for refund with id: ' + reasForRefId + ' not found'
                })
            } else {
                res.status(200).json(reasForRef);
            }
        });
};

exports.createReasonForRefund = (req, res, next) => {
    ReasonForRefundRepository.createReasonForRefund(req.body)
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

exports.updateReasonForRefund = (req, res, next) => {
    const reasForRefId = req.params.reasForRefId;
    ReasonForRefundRepository.updateReasonForRefund(reasForRefId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Reason for refund updated!', reasForRef: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteReasonForRefund = (req, res, next) => {
    const reasForRefId = req.params.reasForRefId;
    ReasonForRefundRepository.deleteReasonForRefund(reasForRefId)
        .then(result => {
            res.status(200).json({ message: 'Removed reason for refund', reasForRef: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};