const express = require('express');
const router = express.Router();

const participApiController = require('../../api/ParticipationAPI');
router.get('/', participApiController.getParticipations);
router.get('/:participId', participApiController.getParticipationById);
router.get(
	'/:idEducation/education',
	participApiController.getParticipationsByIdEducation
);
router.get(
	'/:participId/certificate',
	participApiController.getCertificateByPartId
);
router.post('/', participApiController.createParticipation);
router.put('/:participId', participApiController.updateParticipation);
router.delete('/:participId', participApiController.deleteParticipation);
module.exports = router;
