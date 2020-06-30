const express = require('express');
const stnController = require('../controllers2/stnController');
const authController = require('../controllers/authController');
const router = express.Router();
router
    .route('/new/')
    .post(stnController.createNewStn);
module.exports = router;