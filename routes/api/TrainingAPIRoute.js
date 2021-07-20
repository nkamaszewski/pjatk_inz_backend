const express = require('express');
const router = express.Router();

const depApiController = require('../../api/TrainingAPI');
router.get('/', depApiController.getTrainings);
router.get('/:trnId', depApiController.getTrainingById);

router.post('/', depApiController.createTraining);
router.put('/:trnId', depApiController.updateTraining);
router.delete('/:trnId', depApiController.deleteTraining);
module.exports = router;