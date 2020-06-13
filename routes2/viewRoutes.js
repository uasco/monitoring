const express = require('express');
const viewsController = require('../controllers2/viewsController');
const authController = require('../controllers/authController');

const cacheController = require('../controllers2/cacheController');

const router = express.Router();

/////router.use(viewsController.alerts);

router.get('/', authController.isLoggedIn, viewsController.getConfigForm);
//router.get('/', authController.isLoggedIn, cacheController.configFormFlatCacheMiddleWare,viewsController.getConfigForm);


// router.get('/rain', authController.isLoggedIn, viewsController.getOverView);
// router.get('/level', authController.isLoggedIn, viewsController.getOverView);
// router.get('/clima', authController.isLoggedIn, viewsController.getOverView);
//router.get('/overview', authController.isLoggedIn, viewsController.getOverView);
//router.get('/overview/:codeview', authController.isLoggedIn, viewsController.getOverView);
router.post('/overview/', authController.isLoggedIn, viewsController.getOverView);

router.get('/detail/:stnid-:sensor-:position-:slideindex', authController.isLoggedIn,  viewsController.getDetail);

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
