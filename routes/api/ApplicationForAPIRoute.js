const express = require('express');
const router = express.Router();

const appForApiController = require('../../api/ApplicationForAPI');
router.get('/', appForApiController.getApplicationFor);

router.get('/:appForId', appForApiController.getApplicationForById);
router.get('/dep/:depId', appForApiController.getApplicationForByDepId);
router.get('/div/:divId', appForApiController.getApplicationForDivId);
router.get('/status/:statId', appForApiController.getApplicationForStatId);


router.post('/', appForApiController.createApplicationFor);
router.put('/:appForId', appForApiController.updateApplicationFor);
router.delete('/:appForId', appForApiController.deleteApplicationFor);
module.exports = router;