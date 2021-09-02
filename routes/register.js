const express = require('express');
const router = express.Router();

const RegisterController = require('../api/Register');

router.post('/', RegisterController.register);

module.exports = router;
