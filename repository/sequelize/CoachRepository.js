const Person = require('../../model/sequelize/Person');
const Coach = require('../../model/sequelize/Coach');

exports.getCoachs = () => {
    return Coach.findAll({
        attributes: ['IdPerson', 'JobTitle'],
        include: [{
            model: Person,
            as: 'coachPerson'
        }]
    });
    // return Coach.findAll();

};

exports.createCoach = (newCoachData) => {
    return Coach.create({
        IdPerson: newCoachData.IdPerson,
        JobTitle: newCoachData.JobTitle
    });
};

exports.deleteCoach = (coachId) => {
    return Coach.destroy({
        where: { IdCoach: coachId }
    });
};

exports.updateCoach = (coachId, data) => {

    const IdPerson = data.IdPerson;
    const Pesel = data.Pesel;
    const Password = data.Password;

    return Coach.update(data, { where: { IdCoach: coachId } });
}

exports.getCoachById = (coachId) => {
    return Coach.findByPk(coachId);
};

