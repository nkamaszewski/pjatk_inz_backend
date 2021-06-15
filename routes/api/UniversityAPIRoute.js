const express = require('express');
const router = express.Router();

const univApiController = require('../../api/UniversityAPI');
router.get('/', univApiController.getUniversitys);
router.get('/:univId', univApiController.getUniversityById);

router.post('/', univApiController.createUniversity);
router.put('/:univId', univApiController.updateUniversity);
router.delete('/:univId', univApiController.deleteUniversity);
module.exports = router;