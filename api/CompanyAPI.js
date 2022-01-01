const CompanyRepository = require('../repository/sequelize/CompanyRepository');

exports.getCompanys = (req, res, next) => {
    CompanyRepository.getCompanys()
        .then(coms => {
            res.status(200).json(coms);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCompanyOwner = (req, res, next) => {
    CompanyRepository.getCompanyOwner()
        .then(coms => {
            res.status(200).json(coms);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCompanyById = (req, res, next) => {
    const comId = req.params.comId;
    CompanyRepository.getCompanyById(comId)
        .then(com => {
            if (!com) {
                res.status(404).json({
                    message: 'Company with id: ' + comId + ' not found'
                })
            } else {
                res.status(200).json(com);
            }
        });
};

exports.createCompany = (req, res, next) => {
    CompanyRepository.createCompany(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError") {
                res.status(403).json({ message: `Niepowodzenie zapisu. ${err.errors[0].message}`});
              } 
              else if (!err.statusCode) {
                  err.statusCode = 500;
                }
                next(err);
        });
};

exports.updateCompany = (req, res, next) => {
    const comId = req.params.comId;
    CompanyRepository.updateCompany(comId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Firma zaktualizowana!', com: result });
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError") {
                res.status(403).json({ message: `Niepowodzenie zapisu. ${err.errors[0].message}`});
              } 
              else if (!err.statusCode) {
                  err.statusCode = 500;
                }
                next(err);
        });
};

exports.deleteCompany = (req, res, next) => {
    const comId = req.params.comId;
    CompanyRepository.deleteCompany(comId)
        .then(result => {
            res.status(200).json({ message: 'Usunięto firmę', com: result });
        })
        .catch(err => {
            if (err.name === "SequelizeForeignKeyConstraintError") {   
                res.status(403).json({ message: "Nie można usunąć firmy ze względu na przypisane szkolenia"});
            } else if(err.name === "SequelizeValidationError") {
              res.status(403).json({ message: err.errors[0].message});
            } 
            else if (!err.statusCode) {
                err.statusCode = 500;
              }
              next(err);
        });
};