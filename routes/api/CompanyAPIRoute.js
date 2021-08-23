const express = require('express');
const router = express.Router();

const comApiController = require('../../api/CompanyAPI');
router.get('/', comApiController.getCompanys);
router.get('/owner', comApiController.getCompanyOwner);
router.get('/:comId', comApiController.getCompanyById);

router.post('/', comApiController.createCompany);
router.put('/:comId', comApiController.updateCompany);
router.delete('/:comId', comApiController.deleteCompany);
module.exports = router;