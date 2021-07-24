const express = require('express');
const router = express.Router();

const comApiController = require('../../api/EducationAPI');
router.get('/', comApiController.getEducation);
router.get('/:eduId', comApiController.getEducationById);

router.post('/', comApiController.createEducation);
router.put('/:eduId', comApiController.updateEducation);
router.delete('/:eduId', comApiController.deleteEducation);
module.exports = router;