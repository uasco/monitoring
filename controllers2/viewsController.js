const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const RainStation = require('../models2/rainStationModel');

exports.alerts = (req, res, next) => {
  const {
    alert
  } = req.query;
  if (alert === 'booking')
    res.locals.alert =
    "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {


  // 1) Get tour data from collection
  ///// const tours = await Tour.find();
  const stations = await RainStation.getAllRainStationsNamesAndIDs();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    pretty: true,
    stations

  });
});

exports.getStationsRainTotals = catchAsync(async (req, res, next) => {
  const rainTotal = await Station.getStationRainTotal();
});

exports.getStationsRainTotals = catchAsync(async (req, res, next) => {
  const stations = await Station.getAllStationNamesAndIDes();
  for (i = 0; i < stations.length; i++) {
    text += stations[i].id;
  }
});

exports.getStation = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const station = pool.query('SELECT client_infos.name FROM client_infos where client_id=79', function (err, result, fields) {
    if (err) throw new Error(err)
  })
  // Do something with result.
  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('station-detail', {
    pretty: true,
    station
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