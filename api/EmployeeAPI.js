const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const Role = require('../model/Role')

exports.getEmployees = (req, res, next) => {
  EmployeeRepository.getEmployees()
    .then((emps) => {
      res.status(200).json(emps);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEmployeeById = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.getEmployeeById(empId).then((emp) => {
    if (!emp) {
      res.status(404).json({
        message: 'Employee with id: ' + empId + ' not found',
      });
    } else {
      res.status(200).json(emp);
    }
  });
};

exports.createEmployee = (req, res, next) => {
  if (req.userIdRole != Role.ADMIN) {
    res.status(403).json({
        message: 'Brak uprawnień'
    })
}
  EmployeeRepository.createEmployee(req.body)
    .then((newObj) => {
      res.status(201).json(newObj);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateEmployee = (req, res, next) => {
  const empId = req.params.empId;
  if (req.userIdRole != Role.ADMIN || req.userIdUser != empId) {
    res.status(403).json({
        message: 'Brak uprawnień'
    }) 
  } else {
    console.log(req.userIdRole + ' - ' + empId)
  }
  
  EmployeeRepository.updateEmployee(empId, req.body)
    .then((result) => {
      res.status(200).json({ message: 'Employee updated!', emp: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteEmployee = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.deleteEmployee(empId)
    .then((result) => {
      res.status(200).json({ message: 'Removed Employee', emp: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getQuestionnaireOffersByEmpId = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.getQuestionnaireOffersByEmpId(empId).then((emp) => {
    if (!emp) {
      res.status(404).json({
        message: 'QuestionnaireOffer for id: ' + empId + ' not found',
      });
    } else {
      res.status(200).json(emp);
    }
  });
};

exports.getApplicationsForByEmpId = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.getApplicationsForByEmpId(empId).then((emp) => {
    if (!emp) {
      res.status(404).json({
        message: 'ApplicationFor for id: ' + empId + ' not found',
      });
    } else {
      res.status(200).json(emp);
    }
  });
};

exports.getAppStudiesByEmpId = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.getAppStudiesByEmpId(empId).then((emp) => {
    if (!emp) {
      res.status(404).json({
        message: 'ApplicationFor for id: ' + empId + ' not found',
      });
    } else {
      res.status(200).json(emp);
    }
  });
};

exports.getAppTrainingsByEmpId = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.getAppTrainingsByEmpId(empId).then((emp) => {
    if (!emp) {
      res.status(404).json({
        message: 'ApplicationFor for id: ' + empId + ' not found',
      });
    } else {
      res.status(200).json(emp);
    }
  });
};

exports.getAppOthersByEmpId = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.getAppOthersByEmpId(empId).then((emp) => {
    if (!emp) {
      res.status(404).json({
        message: 'ApplicationFor for id: ' + empId + ' not found',
      });
    } else {
      res.status(200).json(emp);
    }
  });
};

exports.getParticipationsByEmpId = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.getParticipationsByEmpId(empId).then((emp) => {
    if (!emp) {
      res.status(404).json({
        message: 'Participations for id: ' + empId + ' not found',
      });
    } else {
      res.status(200).json(emp);
    }
  });
};

exports.getPartStudiesByEmpId = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.getPartStudiesByEmpId(empId).then((emp) => {
    if (!emp) {
      res.status(404).json({
        message: 'Participations for id: ' + empId + ' not found',
      });
    } else {
      res.status(200).json(emp);
    }
  });
};

exports.getPartTrainingsByEmpId = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.getPartTrainingsByEmpId(empId).then((emp) => {
    if (!emp) {
      res.status(404).json({
        message: 'Participations for id: ' + empId + ' not found',
      });
    } else {
      res.status(200).json(emp);
    }
  });
};

exports.getPartOthersByEmpId = (req, res, next) => {
  const empId = req.params.empId;
  EmployeeRepository.getPartOthersByEmpId(empId).then((emp) => {
    if (!emp) {
      res.status(404).json({
        message: 'Participations for id: ' + empId + ' not found',
      });
    } else {
      res.status(200).json(emp);
    }
  });
};
