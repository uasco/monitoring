const express = require('express');
const rainTotalsMonthsController = require('../controllers2/rainTotalsMonthsController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews

//////////////////////////////////////////////////////////////////B

  router
  .route('/:id')
  .get(rainTotalsMonthsController.getRainTotalsOfPastMonths)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide')
  );



//////////////////////////////////////////////////////////////////E

// router.use('/:stationId/reviews', reviewRouter);

// router
//   .route('/top-5-cheap')
//   .get(stationController.aliasTopStations, stationController.getAllStations);

// router.route('/station-stats').get(stationController.getStationStats);
// router
//   .route('/monthly-plan/:year')
//   .get(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide', 'guide'),
//     stationController.getMonthlyPlan
//   );

// router
//   .route('/station-within/:distance/center/:latlng/unit/:unit')
//   .get(stationController.getStationWithin);
// // /tours-within?distance=233&center=-40,45&unit=mi
// // /tours-within/233/center/-40,45/unit/mi

// router.route('/distances/:latlng/unit/:unit').get(stationController.getDistances);

// router
//   .route('/')
//   .get(stationController.getAllStations)
//   .post(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
//     stationController.createStation
//   );

// router
//   .route('/:id')
//   .get(stationController.getStation)
//   .patch(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
//     stationController.uploadStationImages,
//     stationController.resizeStationImages,
//     stationController.updateStation
//   )
//   .delete(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-guide'),
//     stationController.deleteStation
//   );

module.exports = router;