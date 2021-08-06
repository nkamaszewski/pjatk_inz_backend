const express = require('express');
const router = express.Router();

const appForApiController = require('../../api/ApplicationForAPI');
router.get('/', appForApiController.getApplicationFor);
router.get('/:appForId', appForApiController.getApplicationForById);

router.post('/', appForApiController.createApplicationFor);
router.put('/:appForId', appForApiController.updateApplicationFor);
router.delete('/:appForId', appForApiController.deleteApplicationFor);
module.exports = router;