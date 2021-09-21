const express = require('express');
const router = express.Router();

const PasswordController = require('../api/Password');

router.post('/restore', PasswordController.restore);

module.exports = router;
