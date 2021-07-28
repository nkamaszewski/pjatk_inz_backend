const express = require('express');
const router = express.Router();

const statusApiController = require('../../api/StatusAPI');
router.get('/', statusApiController.getStatuss);
router.get('/:statusId', statusApiController.getStatusById);

router.post('/', statusApiController.createStatus);
router.put('/:statusId', statusApiController.updateStatus);
router.delete('/:statusId', statusApiController.deleteStatus);
module.exports = router;
