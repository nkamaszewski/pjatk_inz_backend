const express = require('express');
const router = express.Router();

const roleApiController = require('../../api/RoleAPI');
router.get('/', roleApiController.getRoles);
router.get('/:roleId', roleApiController.getRoleById);

router.post('/', roleApiController.createRole);
router.put('/:roleId', roleApiController.updateRole);
router.delete('/:roleId', roleApiController.deleteRole);
module.exports = router;