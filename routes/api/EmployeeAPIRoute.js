const express = require('express');
const router = express.Router();

const empApiController = require('../../api/EmployeeAPI');
router.get('/', empApiController.getEmployees);
router.get('/:empId', empApiController.getEmployeeById);
router.get('/:empId/questoffers', empApiController.getQuestionnaireOffersByEmpId);

router.get('/:empId/applications/studies', empApiController.getAppStudiesByEmpId);
router.get('/:empId/applications/trainings', empApiController.getAppTrainingsByEmpId);
router.get('/:empId/applications/others', empApiController.getAppOthersByEmpId);
router.get('/:empId/applications', empApiController.getApplicationsForByEmpId);


router.get('/:empId/participations/studies', empApiController.getPartStudiesByEmpId);
router.get('/:empId/participations/trainings', empApiController.getPartTrainingsByEmpId);
router.get('/:empId/participations/others', empApiController.getPartOthersByEmpId);
router.get('/:empId/participations', empApiController.getParticipationsByEmpId);

router.get('/:empId/participations', empApiController.getParticipationsByEmpId);



router.post('/', empApiController.createEmployee);
router.put('/:empId', empApiController.updateEmployee);
router.delete('/:empId', empApiController.deleteEmployee);
module.exports = router;