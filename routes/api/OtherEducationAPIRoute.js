const express = require('express');
const router = express.Router();

const depApiController = require('../../api/OtherEducationAPI');
router.get('/', depApiController.getOtherEducations);
router.get('/:eduId', depApiController.getOtherEducationById);

router.post('/', depApiController.createOtherEducation);
router.put('/:eduId', depApiController.updateOtherEducation);
router.delete('/:eduId', depApiController.deleteOtherEducation);
module.exports = router;