const express = require('express');
const router = express.Router();

const InviteUserController = require('../api/InviteUser');

router.post('/', InviteUserController.invite);

module.exports = router;
