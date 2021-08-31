const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const employee = require("../model/sequelize/Employee");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.empId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    // const empId = req.params.empId;
    const empId = req.empId;
    employee.findByPk(empId)
        .then(emp => {
            if (emp.IdRole == 4) {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Admin HR Role!"
            });
        });
};

isDirector = (req, res, next) => {
    // const empId = req.params.empId;
    const empId = req.empId;
    employee.findByPk(empId)
        .then(emp => {
            if (emp.IdRole == 3) {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Director Role!"
            });
        });
};
isManager = (req, res, next) => {
    // const empId = req.params.empId;
    const empId = req.empId;
    employee.findByPk(empId)
        .then(emp => {
            if (emp.IdRole == 2) {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Manager Role!"
            });
        });
};

isEmployee = (req, res, next) => {
    // const empId = req.params.empId;
    const empId = req.empId;
    employee.findByPk(empId)
        .then(emp => {
            if (emp.IdRole == 1) {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Employee Role!"
            });
        });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isDirector: isDirector,
    isEmployee: isEmployee
};
module.exports = authJwt;
