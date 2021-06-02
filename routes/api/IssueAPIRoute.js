const express = require('express');
const router = express.Router();

const issueApiController = require('../../api/IssueAPI');
router.get('/', issueApiController.getIssues);
router.get('/:issueId', issueApiController.getIssueById);

router.post('/', issueApiController.createIssue);
router.put('/:issueId', issueApiController.updateIssue);
router.delete('/:issueId', issueApiController.deleteIssue);
module.exports = router;