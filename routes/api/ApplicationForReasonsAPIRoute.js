const express = require('express');
const router = express.Router();

const appForReasonsApiController = require('../../api/ApplicationForReasonsAPI');
router.get('/', appForReasonsApiController.getApplicationForReasonss);
router.get('/:appForReasonsId', appForReasonsApiController.getApplicationForReasonsById);

router.post('/', appForReasonsApiController.createApplicationForReasons);
router.put('/:appForReasonsId', appForReasonsApiController.updateApplicationForReasons);
router.delete('/:appForReasonsId', appForReasonsApiController.deleteApplicationForReasons);
module.exports = router;