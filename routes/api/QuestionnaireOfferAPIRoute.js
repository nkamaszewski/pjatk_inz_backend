const express = require('express');
const router = express.Router();

const questOffApiController = require('../../api/QuestionnaireOfferAPI');
router.get('/', questOffApiController.getQuestionnaireOffers);
router.get('/:questOffId', meetApiController.getQuestionnaireOfferById);

router.post('/', questOffApiController.createQuestionnaireOffer);
router.put('/:questOffId', questOffApiController.updateQuestionnaireOffer);
router.delete('/:questOffId', questOffApiController.deleteQuestionnaireOffer);
module.exports = router;