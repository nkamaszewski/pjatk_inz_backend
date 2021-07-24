const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');

exports.getEmployees = (req, res, next) => {
    EmployeeRepository.getEmployees()
        .then(emps => {
            res.status(200).json(emps);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEmployeeById = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.getEmployeeById(empId)
        .then(emp => {
            if (!emp) {
                res.status(404).json({
                    message: 'Employee with id: ' + empId + ' not found'
                })
            } else {
                res.status(200).json(emp);
            }
        });
};

exports.createEmployee = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.createEmployee(empId, req.body)
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

exports.updateEmployee = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.updateEmployee(empId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Employee updated!', emp: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteEmployee = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.deleteEmployee(empId)
        .then(result => {
            res.status(200).json({ message: 'Removed Employee', emp: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};