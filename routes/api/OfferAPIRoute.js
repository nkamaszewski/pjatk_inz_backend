const express = require('express');
const router = express.Router();

const offApiController = require('../../api/OfferAPI');
router.get('/', offApiController.getOffers);
// router.get('/:offId', meetApiController.getOfferById);

router.post('/', offApiController.createOffer);
router.put('/:offerId', offApiController.updateOffer);
router.delete('/:offerId', offApiController.deleteOffer);
module.exports = router;
