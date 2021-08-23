const RoleRepository = require('../repository/sequelize/RoleRepository');

exports.getRoles = (req, res, next) => {
    RoleRepository.getRoles()
        .then(roles => {
            res.status(200).json(roles);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getRoleById = (req, res, next) => {
    const roleId = req.params.roleId;
    RoleRepository.getRoleById(roleId)
        .then(role => {
            if (!role) {
                res.status(404).json({
                    message: 'Role with id: ' + roleId + ' not found'
                })
            } else {
                res.status(200).json(role);
            }
        });
};

exports.createRole = (req, res, next) => {
    RoleRepository.createRole(req.body)
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

exports.updateRole = (req, res, next) => {
    const roleId = req.params.roleId;
    RoleRepository.updateRole(roleId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Role updated!', role: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteRole = (req, res, next) => {
    const roleId = req.params.roleId;
    RoleRepository.deleteRole(roleId)
        .then(result => {
            res.status(200).json({ message: 'Removed Role', role: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};