const QuestionnaireOfferRepository = require('../repository/sequelize/QuestionnaireOfferRepository');

exports.getQuestionnaireOffers = (req, res, next) => {
  QuestionnaireOfferRepository.getQuestionnaireOffers()
    .then((questsoff) => {
      res.status(200).json(questsoff);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getQuestionnaireOfferById = (req, res, next) => {
  const questOffId = req.params.questOffId;
  QuestionnaireOfferRepository.getQuestionnaireOfferById(questOffId).then(
    (questoff) => {
      if (!questoff) {
        res.status(404).json({
          message: 'Questionnaire Offer with id: ' + questOffId + ' not found',
        });
      } else {
        res.status(200).json(questoff);
      }
    }
  );
};

exports.getQuestionnaireOfferByEmpId = (req, res, next) => {
  const empId = req.params.empId;
  QuestionnaireOfferRepository.getQuestionnaireOfferByEmpId(empId).then(
    (questoff) => {
      if (!questoff) {
        res.status(404).json({
          message: 'Questionnaire Offer with IdPerson: ' + empId + ' not found',
        });
      } else {
        res.status(200).json(questoff);
      }
    }
  );
};

exports.createQuestionnaireOffer = (req, res, next) => {
  QuestionnaireOfferRepository.createQuestionnaireOffer(req.body)
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

exports.updateQuestionnaireOffer = (req, res, next) => {
  const questoffId = req.params.questOffId;
  QuestionnaireOfferRepository.updateQuestionnaireOffer(questoffId, req.body)
    .then((result) => {
      res
        .status(200)
        .json({ message: 'Questionnaire Offer updated!', questoff: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteQuestionnaireOffer = (req, res, next) => {
  const questoffId = req.params.questOffId;
  QuestionnaireOfferRepository.deleteQuestionnaireOffer(questoffId)
    .then((result) => {
      res
        .status(200)
        .json({ message: 'Removed Questionnaire Offer', questoff: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
