const express = require('express');
const router = express.Router();

const roomApiController = require('../../api/RoomAPI');
router.get('/', roomApiController.getRooms);
router.get('/:roomId', roomApiController.getRoomById);

router.post('/', roomApiController.createRoom);
router.put('/:roomId', roomApiController.updateRoom);
router.delete('/:roomId', roomApiController.deleteRoom);
module.exports = router;