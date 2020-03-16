const express = require('express');
const viewsController = require('../controllers2/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

/////router.use(viewsController.alerts);
router.get('/', authController.isLoggedIn, viewsController.getConfigForm, viewsController.createStns);
// router.get('/rain', authController.isLoggedIn, viewsController.getOverView);
// router.get('/level', authController.isLoggedIn, viewsController.getOverView);
// router.get('/clima', authController.isLoggedIn, viewsController.getOverView);
//router.get('/overview', authController.isLoggedIn, viewsController.getOverView);
router.get('/overview/:codeview', authController.isLoggedIn, viewsController.getOverView);

router.get('/detail/:stnid-:sensor', authController.isLoggedIn, viewsController.getDetail);

/////router.get('/tour/:slug', authController.isLoggedIn, viewsController.getStation);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
