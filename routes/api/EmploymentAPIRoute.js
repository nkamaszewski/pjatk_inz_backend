const express = require('express');
const router = express.Router();

const empApiController = require('../../api/EmploymentAPI');
router.get('/', empApiController.getEmployments);
router.get('/:empId', empApiController.getEmploymentById);

router.post('/', empApiController.createEmployment);
router.put('/:empId', empApiController.updateEmployment);
router.delete('/:empId', empApiController.deleteEmployment);
module.exports = router;