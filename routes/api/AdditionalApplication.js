const express = require('express');
const router = express.Router();

const addtionalApplicationController = require('../../api/AdditionalApplicationAPI');

router.post('/', addtionalApplicationController.createAdditionalApplication);

module.exports = router;
