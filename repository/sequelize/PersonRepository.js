const Person = require('../../model/sequelize/Person');

exports.getPersons = () => {
  return Person.findAll();
};

exports.createPerson = (newPersonData) => {
  return Person.create({
    FirstName: newPersonData.FirstName,
    LastName: newPersonData.LastName,
    Email: newPersonData.Email,
    Phone: newPersonData.Phone,
  });
};

exports.deletePerson = (personId) => {
  return Person.destroy({
    where: { IdPerson: personId },
  });
};

exports.updatePerson = (personId, data) => {
  return Person.update(data, { where: { IdPerson: personId } });
};

exports.getPersonById = (perId) => {
  return Person.findByPk(perId);
};

exports.getPersonByEmail = (Email) => {
  return Person.findAll({ where: { Email } });
};
