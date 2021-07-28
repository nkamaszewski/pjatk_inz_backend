const express = require('express');
const router = express.Router();

const appForRefundApiController = require('../../api/ApplicationForRefundAPI');
router.get('/', appForRefundApiController.getApplicationForRefunds);
router.get('/:appForRefundId', appForRefundApiController.getApplicationForRefundById);

router.post('/', appForRefundApiController.createApplicationForRefund);
router.put('/:appForRefundId', appForRefundApiController.updateApplicationForRefund);
router.delete('/:appForRefundId', appForRefundApiController.deleteApplicationForRefund);
module.exports = router;