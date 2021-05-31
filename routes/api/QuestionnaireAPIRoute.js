const express = require('express');
const router = express.Router();

const questApiController = require('../../api/QuestionnaireAPI');
router.get('/', questApiController.getQuestionnaires);
router.get('/:questId', questApiController.getQuestionnaireById);

router.post('/', questApiController.createQuestionnaire);
router.put('/:questId', questApiController.updateQuestionnaire);
router.delete('/:questId', questApiController.deleteQuestionnaire);
module.exports = router;