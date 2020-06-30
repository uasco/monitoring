const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();
router
    .route('/new')
    .get( userController.getUser);
module.exports = router;