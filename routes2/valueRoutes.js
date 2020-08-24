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
  .route('/rain/:id/:subtype')
  //.get(valuesController.getRainStationRainValues)//without cache
  .get(cacheController.rainValuesFlatCacheMiddleWare, valuesController.getRainStationRainValues)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide')
  );
router
    .route('/allrain/')
    .get(valuesController.getAllRainStationsRainValues)
router
  .route('/raintotalsmonths/:id/:subtype')
  //.get(valuesController.getRainTotalsOfPastMonths)//without cache
  .get(cacheController.rainTotalsMonthsFlatCacheMiddleWare, valuesController.getRainTotalsOfPastMonths)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide')
  );
router
    .route('/rainstartrainvalues/:id/:subtype')
    .get(valuesController.getRainStartRainValues)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/rainamarireport/:id/:c/:sd/:ed/:sh/:eh/:p')
    //.get(valuesController.getRainTotalsOfPastMonths)//without cache
    .get(valuesController.getRainAmariReport)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/excelrainamarireport/:id/:c/:sd/:ed/:sh/:eh/:p/:rt')
    .get(valuesController.getExcelRainAmariReport)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/rainmantagheireport/:id/:c/:sd/:ed')
    //.get(valuesController.getRainTotalsOfPastMonths)//without cache
    .get(valuesController.getRainMantagheiReport)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/excelrainmantagheireport/:id/:c/:sd/:ed')
    .get(valuesController.getExcelRainMantagheiReport)
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
    .route('/levelamarireport/:id/:sd/:ed/:sh/:eh/:p')
    //.get(valuesController.getRainTotalsOfPastMonths)//without cache
    .get(valuesController.getLevelAmariReport)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/excellevelamarireport/:id/:sd/:ed/:sh/:eh/:p')
    .get(valuesController.getExcelLevelAmariReport)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/levelmantagheireport/:id/:sd/:ed')
    //.get(valuesController.getRainTotalsOfPastMonths)//without cache
    .get(valuesController.getLevelMantagheiReport)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/excellevelmantagheireport/:id/:sd/:ed')
    .get(valuesController.getExcelLevelMantagheiReport)
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
router
    .route('/climalasthours/*/:id')
    .get(cacheController.climaLastHoursFlatCacheMiddleWare, valuesController.getClimaStationLastHours)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
router
    .route('/climaraintotalsmonths/*/:id')
    .get(cacheController.climaRainTotalsMonthsFlatCacheMiddleWare, valuesController.getClimaRainTotalsOfPastMonths)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide')
    );
// router
//     .route('/climaamarireport/')
//     .get(valuesController.getClimaStationLastHours)
//     .post(valuesController.getClimaAmariReport);
router.post('/climaamarireport/', valuesController.getClimaAmariReport);
router.post('/excelclimaamarireport/', valuesController.getExcelClimaAmariReport);
router.post('/climamantagheireport/', valuesController.getClimaMantagheiReport);
router.post('/excelclimamantagheireport/', valuesController.getExcelClimaMantagheiReport);

//////////////////////////////////////////////////////////////////E

module.exports = router;