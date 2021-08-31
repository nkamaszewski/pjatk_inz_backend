const AuthRepository = require('../repository/sequelize/AuthRepository');

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

exports.signIn = (req, res) => {

    // const empId = req.params.empId;
    // EmployeeRepository.updateEmployee(empId, req.body)
    //     .then(result => {
    //         res.status(200).json({ message: 'Employee updated!', emp: result });
    //     })
    //     .catch(err => {
    //         if (!err.statusCode) {
    //             err.statusCode = 500;
    //         }
    //         next(err);
    //     });
    AuthRepository.signIn(req.body, res)
};
