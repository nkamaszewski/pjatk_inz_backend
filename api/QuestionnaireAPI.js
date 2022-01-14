const QuestionnaireRepository = require('../repository/sequelize/QuestionnaireRepository');
const { mapToQuestionnaireList } = require('../mappers/mapToQuestionnaireList');

exports.getQuestionnaires = (req, res, next) => {
  QuestionnaireRepository.getQuestionnaires()
    .then((quests) => {
      res.status(200).json(mapToQuestionnaireList(quests));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getQuestionnaireById = (req, res, next) => {
  const questId = req.params.questId;
  QuestionnaireRepository.getQuestionnaireById(questId).then((quest) => {
    if (!quest) {
      res.status(404).json({
        message: 'Questionnaire with id: ' + questId + ' not found',
      });
    } else {
      res.status(200).json(quest);
    }
  });
};

exports.createQuestionnaire = (req, res, next) => {
  QuestionnaireRepository.createQuestionnaire(req.body)
    .then((newObj) => {
      res.status(201).json(newObj);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateQuestionnaire = (req, res, next) => {
  const questId = req.params.questId;
  QuestionnaireRepository.updateQuestionnaire(questId, req.body)
    .then((result) => {
      res
        .status(200)
        .json({ message: 'Questionnaire updated!', quest: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteQuestionnaire = (req, res, next) => {
  const questId = req.params.questId;
  QuestionnaireRepository.deleteQuestionnaire(questId)
    .then((result) => {
      res.status(200).json({ message: 'Removed Questionnaire', quest: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
