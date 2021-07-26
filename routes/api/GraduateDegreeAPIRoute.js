const express = require('express');
const router = express.Router();

const gradDegApiController = require('../../api/GraduateDegreeAPI');
router.get('/', gradDegApiController.getGraduateDegrees);
router.get('/:gradDegId', gradDegApiController.getGraduateDegreeById);

router.post('/', gradDegApiController.createGraduateDegree);
router.put('/:gradDegId', gradDegApiController.updateGraduateDegree);
router.delete('/:gradDegId', gradDegApiController.deleteGraduateDegree);
module.exports = router;