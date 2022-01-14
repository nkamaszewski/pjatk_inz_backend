const express = require('express');
const router = express.Router();
const multer = require('multer');

const participApiController = require('../../api/ParticipationAPI');
router.get('/', participApiController.getParticipations);
router.get(
	'/withoutquest/',
	participApiController.getParticipationsWithoutQuest
);

router.get('/:participId', participApiController.getParticipationById);
router.get(
	'/:idEducation/education',
	participApiController.getParticipationsByIdEducation
);
router.get(
	'/:participId/certificate',
	participApiController.getCertificateByPartId
);
router.post(
	'/',
	multer().single('CertificateOfCompletion'),
	participApiController.createParticipation
);
router.put('/:participId', participApiController.updateParticipation);
router.delete('/:participId', participApiController.deleteParticipation);
module.exports = router;
