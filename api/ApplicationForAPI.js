const ApplicationForRepository = require('../repository/sequelize/ApplicationForRepository');
const ApplicationForRepositoryMySql2 = require('../repository/mysql2/ApplicationForRepository');
const StudyRepository = require('../repository/sequelize/StudyRepository');

exports.getApplicationFor = (req, res, next) => {
  const params = req.query;
  const uId = req.userId;
  const uIdDepartment = req.userIdDepartment;
  const uIdDivision = req.userIdDivision;
  const uIdRole = req.userIdRole;

  ApplicationForRepository.getApplicationFor(params, uId,uIdDepartment,uIdDivision,uIdRole)
    .then((appFor) => {
      res.status(200).json(appFor);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getApplicationForMySql2 = (req, res, next) => {
  const params = req.query;
  const uId = req.userId;
  const uIdDepartment = req.userIdDepartment;
  const uIdDivision = req.userIdDivision;
  const uIdRole = req.userIdRole;
  console.log(params);

  ApplicationForRepositoryMySql2.getApplicationFor(params,uId,uIdDepartment,uIdDivision,uIdRole)
    .then((appFor) => {
      res.status(200).json(appFor);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getApplicationForById = (req, res, next) => {
  const appForId = req.params.appForId;
  ApplicationForRepository.getApplicationForById(appForId).then((appFor) => {
    if (!appFor) {
      res.status(404).json({
        message: 'Application for with id: ' + appForId + ' not found',
      });
    } else {
      const response = { ...appFor.dataValues, IsStudy: true };
      StudyRepository.getStudyById(appFor.IdEducation).then((study) => {
        if (!study) response.IsStudy = false;
        res.status(200).json(response);
      });
    }
  });
};

exports.createApplicationFor = (req, res, next) => {
  ApplicationForRepository.createApplicationFor(req.body)
    .then((newObj) => {
      res.status(201).json(newObj);
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(403).json({ message: "Użytkownik już złożył wniosek na to szkolenie"});
    } else if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateApplicationFor = (req, res, next) => {
  const appForId = req.params.appForId;
  const uId = req.userId;
  const uIdDepartment = req.userIdDepartment;
  const uIdDivision = req.userIdDivision;
  const uIdRole = req.userIdRole;

  ApplicationForRepository.updateApplicationFor(appForId, uId, uIdRole, req.body)
    .then((result) => {
      res
        .status(200)
        .json({ message: 'Wniosek zaktualizowany', appFor: result });
    })
    .catch((err) => {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(403).json({ message: "Użytkownik już złożył wniosek o to szkolenie"});
    } else if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteApplicationFor = (req, res, next) => {
  const appForId = req.params.appForId;
  const userId = req.userId;

  ApplicationForRepository.deleteApplicationFor(appForId, userId)
    .then((result) => {
      if(result == -1) {
        res.status(403).json({ message: 'Brak uprawnień!' });
    } else {
      res
        .status(200)
        .json({ message: 'Wniosek usunięty', appFor: result });
    }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getApplicationForByDepId = (req, res, next) => {
  const depId = req.params.depId;
  ApplicationForRepository.getApplicationForByDepId(depId).then((appFor) => {
    if (!appFor) {
      res.status(404).json({
        message: 'Applications with IdDepartment: ' + depId + ' not found',
      });
    } else {
      res.status(200).json(appFor);
    }
  });
};

exports.getApplicationForDivId = (req, res, next) => {
  const divId = req.params.divId;
  ApplicationForRepository.getApplicationForByDepId(divId).then((appFor) => {
    if (!appFor) {
      res.status(404).json({
        message: 'Applications with IdDivision: ' + divId + ' not found',
      });
    } else {
      res.status(200).json(appFor);
    }
  });
};

exports.getApplicationForStatId = (req, res, next) => {
  const statId = req.params.statId;
  ApplicationForRepository.getApplicationForByStatId(statId).then((appFor) => {
    if (!appFor) {
      res.status(404).json({
        message: 'Applications with IdStatus: ' + statId + ' not found',
      });
    } else {
      res.status(200).json(appFor);
    }
  });
};
