const express = require('express');
const valuesController = require('../controllers2/valuesController');

const authController = require('../controllers/authController');

const cacheController = require('../controllers2/cacheController');

const router = express.Router();


// router.param('id', tourController.checkID);

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews

//////////////////////////////////////////////////////////////////B
router
  .route('/rain/:id')
  //.get(valuesController.getRainStationRainValues)//without cache
  .get(cacheController.rainValuesFlatCacheMiddleWare, valuesController.getRainStationRainValues)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide')
  );
router
  .route('/raintotalsmonths/:id')
  //.get(valuesController.getRainTotalsOfPastMonths)//without cache
  .get(cacheController.rainTotalsMonthsFlatCacheMiddleWare, valuesController.getRainTotalsOfPastMonths)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide')
  );
router
    .route('/rainamarireport/:id/:sd/:ed/:sh/:eh/:p')
    //.get(valuesController.getRainTotalsOfPastMonths)//without cache
    .get(valuesController.getRainAmariReport)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
  .route('/level/:id')
  .get(cacheController.levelValueFlatCacheMiddleWare, valuesController.getLevelStationValue)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide')
  );
router
  .route('/levellasthours/:id')
  .get(cacheController.levelLastHoursFlatCacheMiddleWare, valuesController.getLevelStationLastHours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide')
  );
router
  .route('/climalasthours/*/:id')
  .get(cacheController.climaLastHoursFlatCacheMiddleWare, valuesController.getClimaStationLastHours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide')
  );
router
  .route('/clima/*/:id')
  //.get(valuesController.getStationValues)//without cache
  .get(cacheController.climaValuesFlatCacheMiddleWare, valuesController.getClimaStationValues)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide')
  );

//////////////////////////////////////////////////////////////////E

module.exports = router;