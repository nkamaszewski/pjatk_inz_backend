const express = require('express');
const router = express.Router();

const inviteUserController = require('../../api/InviteUser');

router.post('/', inviteUserController.invite);

module.exports = router;
