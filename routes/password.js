const express = require('express');
const router = express.Router();

const PasswordController = require('../api/Password');

router.post('/restore', PasswordController.restore);
router.post('/change', PasswordController.change);

module.exports = router;
