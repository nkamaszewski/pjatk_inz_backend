const PersonRepository = require('../repository/sequelize/PersonRepository');

exports.getPersons = (req, res, next) => {
    PersonRepository.getPersons()
        .then(pers => {
            res.status(200).json(pers);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getPersonById = (req, res, next) => {
    const perId = req.params.perId;
    PersonRepository.getPersonById(perId)
        .then(per => {
            if (!per) {
                res.status(404).json({
                    message: 'Person with id: ' + perId + ' not found'
                })
            } else {
                res.status(200).json(per);
            }
        });
};

exports.createPerson = (req, res, next) => {
    PersonRepository.createPerson(req.body)
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

exports.updatePerson = (req, res, next) => {
    const perId = req.params.perId;
    PersonRepository.updatePerson(perId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Person updated!', per: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deletePerson = (req, res, next) => {
    const perId = req.params.perId;
    PersonRepository.deletePerson(perId)
        .then(result => {
            res.status(200).json({ message: 'Removed Person', per: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};