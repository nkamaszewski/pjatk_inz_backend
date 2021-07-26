const express = require('express');
const router = express.Router();

const studModApiController = require('../../api/StudyModeAPI');
router.get('/', studModApiController.getStudyModes);
router.get('/:studModId', studModApiController.getStudyModeById);

router.post('/', studModApiController.createStudyMode);
router.put('/:studModId', studModApiController.updateStudyMode);
router.delete('/:studModId', studModApiController.deleteStudyMode);
module.exports = router;