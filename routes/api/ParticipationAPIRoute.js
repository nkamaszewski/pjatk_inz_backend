const express = require('express');
const router = express.Router();

const participApiController = require('../../api/ParticipationAPI');
router.get('/', participApiController.getParticipations);
router.get('/:participId', participApiController.getParticipationById);
router.get(
  '/education/:idEducation',
  participApiController.getParticipationsByIdEducation
);

router.post('/', participApiController.createParticipation);
router.put('/:participId', participApiController.updateParticipation);
router.delete('/:participId', participApiController.deleteParticipation);
module.exports = router;
