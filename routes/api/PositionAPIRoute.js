const express = require('express');
const router = express.Router();

const posApiController = require('../../api/PositionAPI');
router.get('/', posApiController.getPositions);
router.get('/:posId', posApiController.getPositionById);

router.post('/', posApiController.createPosition);
router.put('/:posId', posApiController.updatePosition);
router.delete('/:posId', posApiController.deletePosition);
module.exports = router;