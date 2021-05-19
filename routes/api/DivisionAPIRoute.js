const express = require('express');
const router = express.Router();

const divApiController = require('../../api/DivisionAPI');
router.get('/', divApiController.getDivisions);
router.get('/:divId', divApiController.getDivisionById);

router.post('/', divApiController.createDivision);
router.put('/:divId', divApiController.updateDivision);
router.delete('/:divId', divApiController.deleteDivision);
module.exports = router;