const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const Station = require('../models2/stationModel');

const Stn = require('../models/stnModel');
exports.createStns = catchAsync( async (req, res, next) =>{
    // console.log("OKKKKKKKKKKKKKKKKKKKKKKKKKKKK111111111111");
    const stations = await Station.getStationsNamesAndIDs('all');
    let resultJson = JSON.stringify(stations);
    resultJson = JSON.parse(resultJson);
    Stn.deleteMany({}, function(err) {})
    if(resultJson.length>0){
        resultJson.map(async el  => {
            await Stn.create({
                station_name: el.position,
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
    const rStations = await Station.getStationsNamesAndIDs('rain');
    const lStations = await Station.getStationsNamesAndIDs('level');
    const cStations = await Station.getStationsNamesAndIDs('clima');
    global.si = 0;
    res.status(200).render('main', {
        pretty: true,
        pageType: 'main',
        types: [{ 'id': 'rain', 'label': 'بارانسنجی' }, { 'id': 'level', 'label': 'هیدرومتری' }, { 'id': 'clima', 'label': 'هواشناسی' }],
        rStations,
        lStations,
        cStations
    });
    // res.status(200).render('temp', {
    //     pretty: true,
    //     pageType: 'dfgrdfg'
    // });
});
function pruneArray(stations,stns) {
    // console.log(`stns !!!!! ${stns}`);
    let returnArray=[];
    stations.map(stn=> {
        stn = JSON.stringify(stn);
        // console.log(`stn >>>>>>>>>>>>> ${stn}`);
        stn = JSON.parse(stn);
        // console.log(`stn >>>>>>>>>>>>> ${stn.id}`);
        let matched = false;
        for (let i = 0; i < stns.length; i++) {
            // console.log(`stn ++++++++++ ${stn.id}  ${stns[i]}`);
            if (stn.id == stns[i]) {
                // console.log(`stn ########### ${stn.id} ${stns[i]}`);
                matched = true;
                break;
            }
        }
        if (matched) {
            // console.log(`stn $$$$$$$$$ ${stn}`);
            returnArray.push(stn);
        }
    })
    // console.log(`pruneArray ================= ${returnArray}`);
    return returnArray;
}
exports.getOverView = catchAsync(async (req, res, next) => {

    // var codeView = req.params.codeview;
    // codeView = '100';
    // var r = codeView.substr(0, 1);
    //
    // var l = codeView.substr(1, 1);
    //
    // var c = codeView.substr(2, 1);
    //
    // var rStations = [];// undefined;
    // var lStations = [];
    // var cStations = undefined;
    // var rStations_temp = undefined;
    // var lStations_temp = undefined;
    //
    // if (r === '1') {
    //     rStations_temp = await Station.getStationsNamesAndIDs('rain');
    //
    //     if (rStations_temp.length > 8) {
    //         for (i = 0; i < rStations_temp.length; i = i + 8) {
    //             rStations.push(rStations_temp.slice(i, i + 8));
    //         }
    //     } else {
    //         rStations[0] = rStations_temp;
    //     }
    //
    // }
    // //rStations ===>>> [[{"id":101,"position":"بن کوه"},{"id":102,"position":"خیرآباد"},{"id":103,"position":"شاهرود"}]]
    // if (l === '1') {
    //     lStations_temp = await Station.getStationsNamesAndIDs('level');
    //     if (lStations_temp.length > 8) {
    //         for (i = 0; i < lStations_temp.length; i = i + 8) {
    //             lStations.push(lStations_temp.slice(i, i + 8));
    //         }
    //     } else {
    //         lStations[0] = lStations_temp;
    //     }
    //
    // }
    // if (c === '1') {
    //     cStations = await Station.getStationsNamesAndIDs('clima');
    //
    // }
    // const sensores = [['TMP', 'دما'], ['HUM', 'رطوبت'], ['PRS', 'فشار'], ['WSP', 'سرعت باد'],
    //     ['WDR', 'جهت باد'], ['EVP', 'تبخیر'], ['RAD', 'تشعشع'], ['RAINC', 'بارانسنج']];
    // res.status(200).render('overview', {
    //     pretty: true,
    //     pageType: 'overview',
    //     rStations,
    //     lStations,
    //     cStations,
    //     sensores
    // });


    // console.log(`req.body=====================================${JSON.stringify(req.body)} `);
    let pageTypeArr = [0,0,0];
    let data = req.body;// =  {"rstations":["101","102","103"],"lstations":["98","99","100"],"cstations":["84","93","104"]}
    // console.log(`data=====================================${JSON.stringify(data)} `);
    let rStns = data["rstations"];
    // console.log(`rStns=====================================${JSON.stringify(rStns)} `);
    let lStns = data["lstations"];
    // console.log(`lStns=====================================${JSON.stringify(lStns)} `);
    let cStns = data["cstations"];
    // console.log(`cStns=====================================${JSON.stringify(cStns)} `);
    ////////////////////////////////////////////////
    var rStations = [];// undefined;
    var lStations = [];
    var cStations = undefined;
    var rStations_temp = undefined;
    var lStations_temp = undefined;
    if (rStns) {
        rStations_temp = await Station.getStationsNamesAndIDs('rain');
        rStations_temp = JSON.stringify(rStations_temp);
        // console.log(`rStations_temp >>>>> ${rStations_temp}`);
        rStations_temp = JSON.parse(rStations_temp);
        // console.log(`rStations_temp ==== ${rStations_temp}`);
        if(rStations_temp.length>0)
            rStations_temp = pruneArray(rStations_temp,rStns);
        // console.log(`rStations_temp *** ${rStations_temp}`);
        if (rStations_temp.length > 8) {
            for (i = 0; i < rStations_temp.length; i = i + 8) {
                rStations.push(rStations_temp.slice(i, i + 8));
            }
        } else {
            rStations[0] = rStations_temp;
        }
        pageTypeArr[0] = 1;
    }
    if (lStns) {
        lStations_temp = await Station.getStationsNamesAndIDs('level');
        // console.log(`lStations_temp >>>>> ${lStations_temp}`);
        if(lStations_temp.length > 0)
            lStations_temp = pruneArray(lStations_temp,lStns);
        if (lStations_temp.length > 8) {
            for (i = 0; i < lStations_temp.length; i = i + 8) {
                lStations.push(lStations_temp.slice(i, i + 8));
            }
        } else {
            lStations[0] = lStations_temp;
        }
        pageTypeArr[1] = 1;
    }
    if (cStns) {
        cStations = await Station.getStationsNamesAndIDs('clima');
        cStations = pruneArray(cStations, cStns);
        pageTypeArr[2] = 1;
    }
    ////////////////////////////////////////////////
    let pageType = 'ov' + pageTypeArr[0].toString() + pageTypeArr[1].toString() + pageTypeArr[2].toString();
    // console.log(`pageType********************= ${pageType}`);
    const sensores = [['TMP', 'دما'], ['HUM', 'رطوبت'], ['PRS', 'فشار'], ['WSP', 'سرعت باد'],
        ['WDR', 'جهت باد'], ['EVP', 'تبخیر'], ['RAD', 'تشعشع'], ['RAINC', 'بارانسنج']];
    //console.log(`global.si ======================>>>>>>>>>>>>>>>>>> ${global.si}`);
    let slideIndex;
    if(global.si == undefined)
        slideIndex = 0;
    else
        slideIndex = global.si;
    res.status(200).render('overview', {
        pretty: true,
        pageType: pageType,//'overview'
        rStations,
        lStations,
        cStations,
        sensores,
        slideIndex
    });
});
exports.getDetail = catchAsync(async (req, res, next) => {
    //console.log(`url = ${req.originalUrl}`);
    let stnID = req.params.stnid;
    //console.log(`StnID=========== ${stnID}`);
    let sensor = req.params.sensor;
    let slideIndex = req.params.slideindex;
    global.si=slideIndex;
    let position = req.params.position;
    let pageType = 'dt';
    switch (sensor) {
        case 'rain': pageType = pageType + 'r';
        case 'level': pageType = pageType + 'l';
        case 'clima0': pageType = pageType + '0';
        case 'clima1': pageType = pageType + '1';
        case 'clima2': pageType = pageType + '2';
        case 'clima3': pageType = pageType + '3';
        case 'clima4': pageType = pageType + '4';
        case 'clima5': pageType = pageType + '5';
        case 'clima6': pageType = pageType + '6';
        case 'clima7': pageType = pageType + '7';
    }
    console.log(`stnID === ${stnID}`);
    console.log(`sensor === ${sensor}`);
    console.log(`position === ${position}`);
    res.status(200).render('detail', {
        pretty: true,
        pageType: pageType,//'detail',
        stnID,
        sensor,
        position
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
exports.getSettings = catchAsync(async (req, res, next) => {

    res.status(200).render('settings', {
        pretty: true,
        pageType: 'settings',//'detail',
    });
});