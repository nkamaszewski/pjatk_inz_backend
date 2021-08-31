const express = require('express');
const router = express.Router();

const authController = require('../../api/AuthAPI');

router.get('/:empId', authController.getEmployeeById);


router.post('/:empId', authController.signIn);
router.put('/:empId', authController.updateEmployee);
module.exports = router;