const StatusRepository = require('../repository/sequelize/StatusRepository');

exports.getStatuss = (req, res, next) => {
    StatusRepository.getStatuss()
        .then(stats => {
            res.status(200).json(stats);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getStatusById = (req, res, next) => {
    const statId = req.params.statId;
    StatusRepository.getStatusById(statId)
        .then(stat => {
            if (!stat) {
                res.status(404).json({
                    message: 'Status with id: ' + statId + ' not found'
                })
            } else {
                res.status(200).json(stat);
            }
        });
};

exports.createStatus = (req, res, next) => {
    StatusRepository.createStatus(req.body)
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

exports.updateStatus = (req, res, next) => {
    const statId = req.params.statId;
    StatusRepository.updateStatus(statId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Status updated!', stat: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteStatus = (req, res, next) => {
    const statId = req.params.statId;
    StatusRepository.deleteStatus(statId)
        .then(result => {
            res.status(200).json({ message: 'Removed Status', stat: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};