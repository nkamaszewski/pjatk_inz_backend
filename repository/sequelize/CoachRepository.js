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

};

exports.createCoach = (newCoachData) => {
    return Coach.create({
        IdPerson: newCoachData.IdPerson,
        JobTitle: newCoachData.JobTitle
    });
};

exports.deleteCoach = (personId) => {
    return Coach.destroy({
        where: { IdPerson: personId }
    });
};

exports.updateCoach = (personId, data) => {

    const IdPerson = data.IdPerson;
    const JobTitle = data.JobTitle;


    return Coach.update(data, { where: { IdPerson: personId } });
}

exports.getCoachById = (personId) => {
    return Coach.findByPk(personId);
};

