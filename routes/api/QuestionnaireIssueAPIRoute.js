const express = require('express');
const router = express.Router();

const questisApiController = require('../../api/QuestionnaireIssueAPI');
router.get('/', questisApiController.getQuestionnaireIssues);
router.get('/:questisId', questisApiController.getQuestionnaireIssueById);

router.post('/', questisApiController.createQuestionnaireIssue);
router.put('/:questisId', questisApiController.updateQuestionnaireIssue);
router.delete('/:questisId', questisApiController.deleteQuestionnaireIssue);
module.exports = router;