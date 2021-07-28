const express = require('express');
const router = express.Router();

const reasForRefundApiController = require('../../api/ReasonForRefundAPI');
router.get('/', reasForRefundApiController.getReasonForRefunds);
router.get('/:reasForRefundId', reasForRefundApiController.getReasonForRefundById);

router.post('/', reasForRefundApiController.createReasonForRefund);
router.put('/:reasForRefundId', reasForRefundApiController.updateReasonForRefund);
router.delete('/:reasForRefundId', reasForRefundApiController.deleteReasonForRefund);
module.exports = router;
