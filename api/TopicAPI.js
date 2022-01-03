const TopicRepository = require("../repository/sequelize/TopicRepository");
const Role = require("../model/Role");

exports.getTopics = (req, res, next) => {
	TopicRepository.getTopics()
		.then((tops) => {
			res.status(200).json(tops);
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getTopicById = (req, res, next) => {
	const topId = req.params.topId;
	TopicRepository.getTopicById(topId).then((top) => {
		if (!top) {
			res.status(404).json({
				message: "Topic with id: " + topId + " not found",
			});
		} else {
			res.status(200).json(top);
		}
	});
};

exports.createTopic = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	TopicRepository.createTopic(req.body)
		.then((newObj) => {
			res.status(201).json(newObj);
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje już taki temat`,
				});
			} else if (err.name === "SequelizeValidationError") {
				let message = "";
				for (let m of err.errors) {
					message += m.message + "\n";
				}
				res.status(403).json({
					message,
				});
			} else {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				res.status(403).json({
					message: `Nie udało się dodać tematu`,
				});
			}
		});
};

exports.updateTopic = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	const topId = req.params.topId;
	TopicRepository.updateTopic(topId, req.body)
		.then((result) => {
			res.status(200).json({ message: "Topic updated!", top: result });
		})
		.catch((err) => {
			if (err.name === "SequelizeUniqueConstraintError") {
				res.status(403).json({
					message: `Istnieje już taki temat`,
				});
			} else if (err.name === "SequelizeValidationError") {
				let message = "";
				for (let m of err.errors) {
					message += m.message + "\n";
				}
				res.status(403).json({
					message,
				});
			} else {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				res.status(403).json({
					message: `Nie udało się zaktualizować tematu`,
				});
			}
		});
};

exports.deleteTopic = (req, res, next) => {
	if (req.userIdRole != Role.ADMIN) {
		res.status(403).json({
			message: "Brak uprawnień",
		});
	}
	const topId = req.params.topId;
	TopicRepository.deleteTopic(topId)
		.then((result) => {
			res.status(200).json({ message: "Removed Topic", top: result });
		})
		.catch((err) => {
			if (err.name === "SequelizeForeignKeyConstraintError") {
				res.status(403).json({
					message:
						"Nie można usunąć tematu ze względu na przypisane szkolenia",
				});
			} else {
				err.statusCode = 500;
				res.status(403).json({
					message: "Nie udało się usunąć tematu!",
				});
			}
		});
};
