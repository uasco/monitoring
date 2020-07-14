const express = require('express');

const authController = require('../controllers/authController');

const cacheController = require('../controllers2/cacheController');

const router = express.Router();

//////////////////////////////////////////////////////////////////B
router
    .route('/rain/:id/:subtype')
    .get( cacheController.clearRainValuesCacheByClientID)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/raintotalsmonths/:id/:subtype')
    .get( cacheController.clearRainTotalsMonthsCacheByClientID)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/level/:id')
    .get(cacheController.clearLevelValueCacheByClientID)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/levellasthours/:id')
    .get(cacheController.clearlevelLastHoursCacheByClientID)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/clima/*/:id')
    .get(cacheController.clearClimaValuesCacheByClientID)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/climalasthours/*/:id')
    .get(cacheController.clearClimaLastHoursCacheByClientID)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/climaraintotalsmonths/*/:id')
    .get(cacheController.clearClimaRainTotalsMonthsCacheByClientID)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );


//////////////////////////////////////////////////////////////////E

module.exports = router;