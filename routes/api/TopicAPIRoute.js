const express = require('express');
const router = express.Router();

const topApiController = require('../../api/TopicAPI');
router.get('/', topApiController.getTopics);
router.get('/:topId', topApiController.getTopicById);

router.post('/', topApiController.createTopic);
router.put('/:topId', topApiController.updateTopic);
router.delete('/:topId', topApiController.deleteTopic);
module.exports = router;