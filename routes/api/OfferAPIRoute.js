const express = require('express');
const router = express.Router();

const offApiController = require('../../api/OfferAPI');
router.get('/', offApiController.getOffers);
router.get('/:offId', meetApiController.getOfferById);

router.post('/', offApiController.createOffer);
router.put('/:offId', offApiController.updateOffer);
router.delete('/:offId', offApiController.deleteOffer);
module.exports = router;