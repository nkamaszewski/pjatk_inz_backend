const ApplicationForReasonsRepository = require('../repository/sequelize/ApplicationForReasonsRepository');

exports.getApplicationForReasonss = (req, res, next) => {
    ApplicationForReasonsRepository.getApplicationForReasonss()
        .then(appForReass => {
            res.status(200).json(appForReass);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getApplicationForReasonsById = (req, res, next) => {
    const appForReasId = req.params.appForReasId;
    ApplicationForReasonsRepository.getApplicationForReasonsById(appForReasId)
        .then(appForReas => {
            if (!appForReas) {
                res.status(404).json({
                    message: 'Application for reason with id: ' + appForReasId + ' not found'
                })
            } else {
                res.status(200).json(appForReas);
            }
        });
};

exports.createApplicationForReasons = (req, res, next) => {
    ApplicationForReasonsRepository.createApplicationForReasons(req.body)
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

exports.updateApplicationForReasons = (req, res, next) => {
    const appForReasId = req.params.appForReasId;
    ApplicationForReasonsRepository.updateApplicationForReasons(appForReasId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Application for reason updated!', appForReas: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteApplicationForReasons = (req, res, next) => {
    const appForReasId = req.params.appForReasId;
    ApplicationForReasonsRepository.deleteApplicationForReasons(appForReasId)
        .then(result => {
            res.status(200).json({ message: 'Removed application for reason', appForReas: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
