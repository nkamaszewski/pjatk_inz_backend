const OfferRepository = require('../repository/sequelize/OfferRepository');


exports.getOffers = (req, res, next) => {
    OfferRepository.getOffers()
        .then(offers => {
            res.status(200).json(offers);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOfferById = (req, res, next) => {
    const offerId = req.params.offerId;
    OfferRepository.getOfferById(offerId)
        .then(offer => {
            if (!offer) {
                res.status(404).json({
                    message: 'Offer with id: ' + offerId + ' not found'
                })
            } else {
                res.status(200).json(offer);
            }
        });
};

exports.createOffer = (req, res, next) => {
    OfferRepository.createOffer(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateOffer = (req, res, next) => {
    const offerId = req.params.offerId;
    const userId = req.userId;

    OfferRepository.updateOffer(offerId, userId, req.body)
        .then(result => {
            if(result == -1) {
                res.status(403).json({ message: 'Brak uprawnień!' });
            } else {
                 res.status(200).json({ message: 'Wniosek zaktualizowany!', offer: result });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteOffer = (req, res, next) => {
    const offerId = req.params.offerId;
    const userId = req.userId;
    OfferRepository.deleteOffer(offerId,userId)
        .then(result => {
            if(result == -1) {
                res.status(403).json({ message: 'Brak uprawnień!' });
            } else {
                 res.status(200).json({ message: 'Wniosek zaktualizowany!', offer: result });
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};