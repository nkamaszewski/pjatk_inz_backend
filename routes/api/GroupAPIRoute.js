const express = require('express');
const router = express.Router();

const grpApiController = require('../../api/GroupAPI');
router.get('/', grpApiController.getGroups);
router.get('/:grpId', grpApiController.getGroupById);

router.post('/', grpApiController.createGroup);
router.put('/:grpId', grpApiController.updateGroup);
router.delete('/:grpId', grpApiController.deleteGroup);
module.exports = router;