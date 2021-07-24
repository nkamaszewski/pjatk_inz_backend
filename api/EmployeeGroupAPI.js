const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const EmployeeGroupRepository = require('../repository/sequelize/EmployeeGroupRepository');
const GroupRepository = require('../repository/sequelize/GroupRepository');

exports.getEmployeeGroups = (req, res, next) => {
    EmployeeGroupRepository.getEmployeeGroups()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEmployeeGroupById = (req, res, next) => {
    const empGroupId = req.params.empGroupId;
    EmployeeGroupRepository.getEmployeeGroupById(empGroupId)
        .then(emp => {
            if (!emp) {
                res.status(404).json({
                    message: 'EmployeeGroup with id: ' + empGroupId + ' not found'
                })
            } else {
                res.status(200).json(emp);
            }
        });
};

exports.createEmployeeGroup = (req, res, next) => {
    EmployeeGroupRepository.createEmployeeGroup(req.body)
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

exports.updateEmployeeGroup = (req, res, next) => {
    const empGroupId = req.params.empGroupId;
    EmployeeGroupRepository.updateEmployeeGroup(empGroupId, req.body)
        .then(result => {
            res.status(200).json({ message: 'EmployeeGroup updated!', emp: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteEmployeeGroup = (req, res, next) => {
    const empGroupId = req.params.empGroupId;
    EmployeeGroupRepository.deleteEmployeeGroup(empGroupId)
        .then(result => {
            res.status(200).json({ message: 'Removed EmployeeGroup', emp: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};