const express = require('express');
const router = express.Router();

const coachApiController = require('../../api/CoachAPI');
router.get('/', coachApiController.getCoachs);
router.get('/:coachId', coachApiController.getCoachById);

router.post('/', coachApiController.createCoach);
router.put('/:coachId', coachApiController.updateCoach);
router.delete('/:coachId', coachApiController.deleteCoach);
module.exports = router;