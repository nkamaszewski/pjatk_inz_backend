const UniversityRepository = require('../repository/sequelize/UniversityRepository');

exports.getUniversitys = (req, res, next) => {
    UniversityRepository.getUniversitys()
        .then(univs => {
            res.status(200).json(univs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getUniversityById = (req, res, next) => {
    const univId = req.params.univId;
    UniversityRepository.getDepartmentById(univId)
        .then(univ => {
            if (!univ) {
                res.status(404).json({
                    message: 'University with id: ' + univId + ' not found'
                })
            } else {
                res.status(200).json(univ);
            }
        });
};

exports.createUniversity = (req, res, next) => {
    UniversityRepository.createUniversity(req.body)
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

exports.updateUniversity = (req, res, next) => {
    const univId = req.params.univId;
    UniversityRepository.updateUniversity(univId, req.body)
        .then(result => {
            res.status(200).json({ message: 'University updated!', univ: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteUniversity = (req, res, next) => {
    const univId = req.params.univId;
    UniversityRepository.deleteUniversity(univId)
        .then(result => {
            res.status(200).json({ message: 'Removed University', univ: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};