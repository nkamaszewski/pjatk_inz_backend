const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');
const PersonRepository = require('../repository/sequelize/PersonRepository');
const EmploymentRepository = require('../repository/sequelize/EmploymentRepository');

const bcrypt = require('bcrypt');
const salt = require('../auth/saltRound');
const jwt = require('jsonwebtoken');
const Role = require('../model/Role');

exports.register = (req, res, next) => {
	const { firstName, lastName, phone, email, pesel, password } = req.body;

	EmployeeRepository.getOwnersAccounts()
		.then((c) => {
			if (c.count >= 5) {
				res.status(403).json({
					message: 'Przekroczony limit samodzielnie rejestrowanych kont!',
				});
			} else {
				PersonRepository.createPerson({
					FirstName: firstName,
					LastName: lastName,
					Email: email,
					Phone: phone,
				})
					.then((newPerson) => {
						const { IdPerson } = newPerson;
						bcrypt.hash(password, salt.saltRounds, (err, hash) => {
							if (err) {
								console.error(err);
							}
							EmployeeRepository.createEmployee({
								IdPerson,
								Pesel: pesel,
								Password: hash,
								IsActive: true,
								OwnerAccount: true,
							})
								.then((newObj) => {
									// sukces
									const token = jwt.sign(
										{ id: newObj.IdPerson, idRole: Role.ADMIN },
										process.env.JWT_AUTH_TOKEN_SECRET,
										{
											expiresIn: '1d',
										}
									);

									res.status(200).json({
										user: { ...newPerson.dataValues, IdRole: Role.ADMIN },
										token,
									});
								})
								.then((newObj) => {
									EmploymentRepository.createEmployment({
										IdPerson,
										DateFrom: new Date(),
										IdPosition: 1,
										IdDivision: 1,
										IdDepartment: 1,
										IdRole: 4,
									});
								})
								.catch((err) => {
									console.log(err);
									if (!err.statusCode) {
										err.statusCode = 500;
										res.status(403).json({
											message: 'Rejestracja Employee nie powiodła się!',
										});
									}
									next(err);
								});
						});
					})
					.catch((err) => {
						err.statusCode = 500;
						res.status(403).json({
							message: 'Rejestracja Person nie powiodła się!',
						});
					});
			}
		})
		.catch((err) => {
			err.statusCode = 500;
			res.status(403).json({
				message: 'Rejestracja nie powiodła się!',
			});
		});
};
