const express = require('express');
const router = express.Router();

const empApiController = require('../../api/EmployeeAPI');
router.get('/', empApiController.getEmployees);
router.get('/:empId', empApiController.getEmployeeById);
router.get('/:empId/questoffers', empApiController.getQuestionnaireOfferByEmpId);
router.get('/:empId/applications', empApiController.getApplicationForByEmpId);
router.get('/:empId/participations', empApiController.getParticipationByEmpId);



router.post('/', empApiController.createEmployee);
router.put('/:empId', empApiController.updateEmployee);
router.delete('/:empId', empApiController.deleteEmployee);
module.exports = router;