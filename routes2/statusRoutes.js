const express = require('express');
const statusController = require('../controllers2/statusController');
const authController = require('../controllers/authController');
const cacheController = require('../controllers2/cacheController');
const router = express.Router();
router
    .route('/rain/start/:id')
    .get(statusController.getRainStartStatus)//without cache
    //.get(cacheController.rainValuesFlatCacheMiddleWare, statusController.getRainStartStatus)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/rain/alarm1/:id')
    .get(statusController.getRainAlarm1Status)//without cache
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/rain/alarm8/:id')
    .get(statusController.getRainAlarm8Status)//without cache
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/level/:id')
    .get(cacheController.levelValueFlatCacheMiddleWare, statusController.getLevelAlarmStatus)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/clima/*/:id')
    //.get(valuesController.getStationValues)//without cache
    .get(cacheController.climaValuesFlatCacheMiddleWare, statusController.getClimaAlarmStatus)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
module.exports = router;