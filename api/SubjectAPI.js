const SubjectRepository = require('../repository/sequelize/SubjectRepository');

exports.getSubjects = (req, res, next) => {
    SubjectRepository.getSubjects()
        .then(subs => {
            res.status(200).json(subs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSubjectById = (req, res, next) => {
    const subId = req.params.subId;
    SubjectRepository.getSubjectById(subId)
        .then(sub => {
            if (!sub) {
                res.status(404).json({
                    message: 'Subject with id: ' + subId + ' not found'
                })
            } else {
                res.status(200).json(sub);
            }
        });
};

exports.createSubject = (req, res, next) => {
    SubjectRepository.createSubject(req.body)
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

exports.updateSubject = (req, res, next) => {
    const subId = req.params.subId;
    SubjectRepository.updateSubject(subId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Subject updated!', sub: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteSubject = (req, res, next) => {
    const subId = req.params.subId;
    SubjectRepository.deleteSubject(subId)
        .then(result => {
            res.status(200).json({ message: 'Removed Subject', sub: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};