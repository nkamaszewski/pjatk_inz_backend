const express = require('express');
const router = express.Router();

const studApiController = require('../../api/StudyAPI');
router.get('/', studApiController.getStudys);
router.get('/:studId', studApiController.getStudyById);

router.post('/', studApiController.createStudy);
router.put('/:studId', studApiController.updateStudy);
router.delete('/:studId', studApiController.deleteStudy);
module.exports = router;