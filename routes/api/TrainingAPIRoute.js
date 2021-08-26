const express = require('express');
const router = express.Router();

const depApiController = require('../../api/TrainingAPI');
router.get('/', depApiController.getTrainings);
router.get('/:eduId', depApiController.getTrainingById);
router.get('/internal/:int', depApiController.getTrainingByInternal);

router.post('/', depApiController.createTraining);
router.put('/:eduId', depApiController.updateTraining);
router.delete('/:eduId', depApiController.deleteTraining);
module.exports = router;