const EmploymentRepository = require('../repository/sequelize/EmploymentRepository');
const Role = require('../model/Role');


exports.getEmployments = (req, res, next) => {
    EmploymentRepository.getEmployments()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEmploymentById = (req, res, next) => {
    const empId = req.params.empId;
    EmploymentRepository.getEmploymentById(empId)
        .then(emp => {
            if (!emp) {
                res.status(404).json({
                    message: 'Employment with id: ' + empId + ' not found'
                })
            } else {
                res.status(200).json(emp);
            }
        });
};

exports.createEmployment = (req, res, next) => {
    if (req.userIdRole != Role.ADMIN) {
        res.status(403).json({
            message: 'Brak uprawnień'
        })
    }
    EmploymentRepository.createEmployment(req.body)
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

exports.updateEmployment = (req, res, next) => {
    if (req.userIdRole != Role.ADMIN) {
        res.status(403).json({
            message: 'Brak uprawnień'
        })
    }
    const empId = req.params.empId;
    EmploymentRepository.updateEmployment(empId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Employment updated!', emp: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteEmployment = (req, res, next) => {
    if (req.userIdRole != Role.ADMIN) {
        res.status(403).json({
            message: 'Brak uprawnień'
        })
    }
    const empId = req.params.empId;
    EmploymentRepository.deleteEmployment(empId)
        .then(result => {
            res.status(200).json({ message: 'Removed Employment', emp: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};