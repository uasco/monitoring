const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const Station = require('../models2/stationModel');

const Stn = require('../models/stnModel');
exports.createStns = catchAsync( async (req, res, next) =>{
    const stations = await Station.getAllStationsNamesAndIDs();
    var resultJson = JSON.stringify(stations);
    resultJson = JSON.parse(resultJson);
    Stn.deleteMany({}, function(err) {})
    if(resultJson.length>0){
        resultJson.map(async el  => {
            await Stn.create({
                name: el.position,
                client_id: el.id
            });
        })
    }
});


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
        pageType: 'main',
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
    // var stnType = req.url.substring(1);
    // const stations = await Station.getStationsNamesAndIDs(stnType);//stnType = 'rain' or 'level' or 'clima'
    // var codeView = req.query.codeview;
    var codeView = req.params.codeview;
    var r = codeView.substr(0, 1);

    var l = codeView.substr(1, 1);

    var c = codeView.substr(2, 1);

    var rStations = [];// undefined;
    var lStations = [];
    var cStations = undefined;
    var rStations_temp = undefined;
    var lStations_temp = undefined;

    if (r === '1') {
        rStations_temp = await Station.getStationsNamesAndIDs('rain');

        if (rStations_temp.length > 8) {
            for (i = 0; i < rStations_temp.length; i = i + 8) {
                rStations.push(rStations_temp.slice(i, i + 8));
            }
        } else {
            rStations[0] = rStations_temp;
        }

    }
    if (l === '1') {
        lStations_temp = await Station.getStationsNamesAndIDs('level');
        if (lStations_temp.length > 8) {
            for (i = 0; i < lStations_temp.length; i = i + 8) {
                lStations.push(lStations_temp.slice(i, i + 8));
            }
        } else {
            lStations[0] = lStations_temp;
        }

    }
    if (c === '1') {
        cStations = await Station.getStationsNamesAndIDs('clima');

    }
    // 2) Build template
    // 3) Render that template using tour data from 1)
    const sensores = [['TMP', 'دما'], ['HUM', 'رطوبت'], ['PRS', 'فشار'], ['WSP', 'سرعت باد'],
    ['WDR', 'جهت باد'], ['EVP', 'تبخیر'], ['RAD', 'تشعشع'], ['RAINC', 'بارانسنج']];
    res.status(200).render('overview', {
        pretty: true,
        pageType: 'overview',
        rStations,
        lStations,
        cStations,
        sensores
    });
});
exports.getDetail = catchAsync(async (req, res, next) => {
    var stnID = req.params.stnid;
    var sensor = req.params.sensor;
    console.log("==============================");
    console.log(stnID  , sensor);
    res.status(200).render('detail', {
        pretty: true,
        pageType: 'overview',
        stnID,
        sensor
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