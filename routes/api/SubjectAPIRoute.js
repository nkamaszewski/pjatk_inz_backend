const express = require('express');
const router = express.Router();

const subApiController = require('../../api/SubjectAPI');
router.get('/', subApiController.getSubjects);
router.get('/:subId', subApiController.getSubjectById);

router.post('/', subApiController.createSubject);
router.put('/:subId', subApiController.updateSubject);
router.delete('/:subId', subApiController.deleteSubject);
module.exports = router;