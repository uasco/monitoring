const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const Station = require('../models2/stationModel');

exports.alerts = (req, res, next) => {
  const {
    alert
  } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getConfigForm = catchAsync(async (req, res, next) => {
  res.status(200).render('main', {
    pretty: true,
    stnType: 'main',
    types: [{ 'id': 'rain', 'label': 'بارانسنجی' }, { 'id': 'level', 'label': 'هیدرومتری' }, { 'id': 'clima', 'label': 'هواشناسی' }]
    // stations

  });
});

exports.getOverView = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  ///// const tours = await Tour.find();
  // const rainStations = await Station.getAllRainStationsNamesAndIDs();
  // const levelStations = await Station.getAllLevelStationsNamesAndIDs();
  // const climaStations = await Station.getAllClimaStationsNamesAndIDs();
  var stnType = req.url.substring(1);
  const stations = await Station.getStationsNamesAndIDs(stnType);//stnType = 'rain' or 'level' or 'clima'

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    pretty: true,
    stnType,
    stations
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({
    user: req.user.id
  });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({
    _id: {
      $in: tourIDs
    }
  });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id, {
    name: req.body.name,
    email: req.body.email
  }, {
    new: true,
    runValidators: true
  }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});