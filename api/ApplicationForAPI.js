const ApplicationForRepository = require('../repository/sequelize/ApplicationForRepository');

exports.getApplicationFor = (req, res, next) => {
    ApplicationForRepository.getApplicationFor()
        .then(appFor => {
            res.status(200).json(appFor);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getApplicationForById = (req, res, next) => {
    const appForId = req.params.appForId;
    ApplicationForRepository.getApplicationForById(appForId)
        .then(appFor => {
            if (!appFor) {
                res.status(404).json({
                    message: 'Application for with id: ' + appForId + ' not found'
                })
            } else {
                res.status(200).json(appFor);
            }
        });
};

exports.createApplicationFor = (req, res, next) => {
    ApplicationForRepository.createApplicationFor(req.body)
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

exports.updateApplicationFor = (req, res, next) => {
    const appForId = req.params.appForId;
    ApplicationForRepository.updateApplicationFor(appForId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Application for updated!', appFor: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteApplicationFor = (req, res, next) => {
    const appForId = req.params.appForId;
    ApplicationForRepository.deleteApplicationFor(appForId)
        .then(result => {
            res.status(200).json({ message: 'Removed application for', appFor: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getApplicationForByDepId = (req, res, next) => {
    const depId = req.params.depId;
    ApplicationForRepository.getApplicationForByDepId(depId).then(
        (appFor) => {
            if (!appFor) {
                res.status(404).json({
                    message: 'Applications with IdDepartment: ' + depId + ' not found',
                });
            } else {
                res.status(200).json(appFor);
            }
        }
    );
};


exports.getApplicationForDivId = (req, res, next) => {
    const divId = req.params.divId;
    ApplicationForRepository.getApplicationForByDepId(divId).then(
        (appFor) => {
            if (!appFor) {
                res.status(404).json({
                    message: 'Applications with IdDivision: ' + divId + ' not found',
                });
            } else {
                res.status(200).json(appFor);
            }
        }
    );
};

exports.getApplicationForStatId = (req, res, next) => {
    const statId = req.params.statId;
    ApplicationForRepository.getApplicationForByStatId(statId).then(
        (appFor) => {
            if (!appFor) {
                res.status(404).json({
                    message: 'Applications with IdStatus: ' + statId + ' not found',
                });
            } else {
                res.status(200).json(appFor);
            }
        }
    );
};