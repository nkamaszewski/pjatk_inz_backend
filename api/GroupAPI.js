const GroupRepository = require('../repository/sequelize/GroupRepository');

exports.getGroups = (req, res, next) => {
    const params = req.query

    GroupRepository.getGroups(params)
        .then(groups => {
            res.status(200).json(groups);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getGroupById = (req, res, next) => {
    const grpId = req.params.grpId;
    GroupRepository.getGroupById(grpId)
        .then(per => {
            if (!per) {
                res.status(404).json({
                    message: 'Group with id: ' + grpId + ' not found'
                })
            } else {
                res.status(200).json(per);
            }
        });
};

exports.createGroup = (req, res, next) => {
    GroupRepository.createGroup(req.body)
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

exports.updateGroup = (req, res, next) => {
    const grpId = req.params.grpId;
    GroupRepository.updateGroup(grpId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Group updated!', per: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteGroup = (req, res, next) => {
    const grpId = req.params.grpId;
    GroupRepository.deleteGroup(grpId)
        .then(result => {
            res.status(200).json({ message: 'Removed Group', per: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getGroupsByActive = (req, res, next) => {
    GroupRepository.getGroupsByActive()
        .then(groups => {
            res.status(200).json(groups);
        })
        .catch(err => {
            console.log(err);
        });
};