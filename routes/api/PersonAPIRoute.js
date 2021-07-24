const express = require('express');
const router = express.Router();

const perApiController = require('../../api/PersonAPI');
router.get('/', perApiController.getPersons);
router.get('/:perId', perApiController.getPersonById);

router.post('/', perApiController.createPerson);
router.put('/:perId', perApiController.updatePerson);
router.delete('/:perId', perApiController.deletePerson);
module.exports = router;