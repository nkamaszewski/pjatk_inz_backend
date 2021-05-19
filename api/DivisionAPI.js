const DivisionRepository = require('../repository/sequelize/DivisionRepository');

exports.getDivisions = (req, res, next) => {
    DivisionRepository.getDivisions()
        .then(divs => {
            res.status(200).json(divs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getDivisionById = (req, res, next) => {
    const divId = req.params.divId;
    DivisionRepository.getDivisionById(divId)
        .then(div => {
            if (!div) {
                res.status(404).json({
                    message: 'Division with id: ' + divId + ' not found'
                })
            } else {
                res.status(200).json(div);
            }
        });
};

exports.createDivision = (req, res, next) => {
    DivisionRepository.createDivision(req.body)
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

exports.updateDivision = (req, res, next) => {
    const divId = req.params.divId;
    DivisionRepository.updateDivision(divId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Division updated!', div: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteDivision = (req, res, next) => {
    const divId = req.params.divId;
    DivisionRepository.deleteDivision(divId)
        .then(result => {
            res.status(200).json({ message: 'Removed Division', div: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};