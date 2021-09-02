const express = require('express');
const router = express.Router();

const LoginController = require('../api/Login');

router.post('/', LoginController.login);

module.exports = router;
