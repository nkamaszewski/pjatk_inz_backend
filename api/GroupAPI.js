const GroupRepository = require('../repository/sequelize/GroupRepository');
const { mapToGroupList } = require('../mappers/mapToGroupList');
const Role = require('../model/Role');

exports.getGroups = (req, res, next) => {
	const params = req.query;

	GroupRepository.getGroups(params)
		.then((groups) => {
			const groupList = mapToGroupList(groups);
			res.status(200).json(groupList);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getGroupById = (req, res, next) => {
	const grpId = req.params.grpId;
	GroupRepository.getGroupById(grpId).then((per) => {
		if (!per) {
			res.status(404).json({
				message: 'Group with id: ' + grpId + ' not found',
			});
		} else {
			res.status(200).json(per);
		}
	});
};

exports.createGroup = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		GroupRepository.createGroup(req.body)
			.then((newObj) => {
				res.status(201).json(newObj);
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje grupa o takiej nazwie`,
					});
				} else if (err.name === 'SequelizeValidationError') {
					let message = '';
					for (let m of err.errors) {
						message += m.message + '\n';
					}
					res.status(403).json({
						message,
					});
				} else {
					if (!err.statusCode) {
						err.statusCode = 500;
					}
					res.status(403).json({
						message: `Nie udało się zaktualizować grupy`,
					});
				}
			});
	}
};

exports.updateGroup = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const grpId = req.params.grpId;
		GroupRepository.updateGroup(grpId, req.body)
			.then((result) => {
				res.status(200).json({
					message: 'Grupa zaktualizowana!',
					per: result,
				});
			})
			.catch((err) => {
				if (err.name === 'SequelizeUniqueConstraintError') {
					res.status(403).json({
						message: `Istnieje grupa o takiej nazwie`,
					});
				} else if (err.name === 'SequelizeValidationError') {
					let message = '';
					for (let m of err.errors) {
						message += m.message + '\n';
					}
					res.status(403).json({
						message,
					});
				} else {
					if (!err.statusCode) {
						err.statusCode = 500;
					}
					res.status(403).json({
						message: `Nie udało się zaktualizować grupy`,
					});
				}
			});
	}
};

exports.deleteGroup = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: 'Brak uprawnień',
		});
	} else {
		const grpId = req.params.grpId;
		GroupRepository.deleteGroup(grpId)
			.then((result) => {
				res.status(200).json({ message: 'Usunięto grupę', per: result });
			})
			.catch((err) => {
				if (err.name === 'SequelizeForeignKeyConstraintError') {
					res.status(403).json({
						message: 'Nie można usunąć grupy, jeśli ma przypisane spotkania',
					});
				} else {
					err.statusCode = 500;
					res.status(403).json({
						message: 'Nie udało się usunąć grupy!',
					});
				}
			});
	}
};

exports.getGroupsByActive = (req, res, next) => {
	GroupRepository.getGroupsByActive()
		.then((groups) => {
			res.status(200).json(groups);
		})
		.catch((err) => {
			console.log(err);
		});
};
