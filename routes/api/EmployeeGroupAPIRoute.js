const express = require('express');
const router = express.Router();

const empGrpApiController = require('../../api/EmployeeGroupAPI');
router.get('/', empGrpApiController.getEmployeeGroups);
router.get('/:empGrpId', empGrpApiController.getEmployeeGroupById);

router.post('/', empGrpApiController.createEmployeeGroup);
router.put('/:empGrpId', empGrpApiController.updateEmployeeGroup);
router.delete('/:empGrpId', empGrpApiController.deleteEmployeeGroup);
module.exports = router;