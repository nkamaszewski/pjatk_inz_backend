const express = require('express');
const router = express.Router();

const meetApiController = require('../../api/MeetingAPI');
router.get('/', meetApiController.getMeetings);
router.get('/:meetId', meetApiController.getMeetingById);

router.post('/', meetApiController.createMeeting);
router.put('/:meetId', meetApiController.updateMeeting);
router.delete('/:meetId', meetApiController.deleteMeeting);
module.exports = router;