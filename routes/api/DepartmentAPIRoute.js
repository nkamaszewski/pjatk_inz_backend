const express = require('express');
const router = express.Router();

const depApiController = require('../../api/DepartmentAPI');
router.get('/', depApiController.getDepartments);
router.get('/:depId', depApiController.getDepartmentById);

router.post('/', depApiController.createDepartment);
router.put('/:depId', depApiController.updateDepartment);
router.delete('/:depId', depApiController.deleteDepartment);
module.exports = router;