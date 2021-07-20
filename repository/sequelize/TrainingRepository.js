// const Division = require('../../model/sequelize/Division');
const Training = require('../../model/sequelize/Training');

exports.getTrainings = () => {
    return Training.findAll();
};

exports.createTraining = (newTrainingData) => {
    return Training.create({
        IdEducation: newTrainingData.IdEducation,
        IdTopic: newTrainingData.IdTopic,
        IdCompany: newTrainingData.IdCompany,
        IdPerson: newTrainingData.IdPerson,
        Internal: newTrainingData.Internat,
        DateFrom: newTrainingData.DateFrom
    });
};

exports.deleteTraining = (trainingId) => {
    return Training.destroy({
        where: { IdTraining: trainingId }
    });
};

exports.updateTraining = (trainingId, data) => {
    const name = data.Name;
    const idDivision = data.IdDivision;

    const IdEducation = data.IdEducation;
    const IdTopic = data.IdTopic;
    const IdCompany = data.IdCompany;
    const IdPerson = data.IdPerson;
    const Internal = data.Internat;
    const DateFrom = data.DateFrom;

    return Training.update(data, { where: { IdTraining: trainingId } });
}

exports.getTrainingById = (trnId) => {
    return Training.findByPk(trnId);
};

