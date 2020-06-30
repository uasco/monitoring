const multer = require('multer');
const sharp = require('sharp');
const Station = require('../models2/stationModel');
/////
const Stn = require('../models/stnModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('../controllers/handlerFactory');
const AppError = require('./../utils/appError');
exports.createNewStn = catchAsync(async (req, res, next) => {
    //stnName,stnCode,zoneName,riverName,longitude,latitude,utmX,utmY,height,establishYear
    const stnName = req.body.sn;
    const stnCode = req.body.sc;
    const zoneName = req.body.zn;
    const riverName = req.body.rn;
    const longitude = req.body.ln;
    const latitude = req.body.lt;
    const utmX = req.body.ux;
    const utmY = req.body.uy;
    const height = req.body.h;
    const establishYear = req.body.ey;
    const stnType = req.body.st;
    console.log('body: ' + JSON.stringify(req.body));
    let resultJson = await Station.getClientID(stnCode,stnType);
    resultJson = JSON.stringify(resultJson);
    resultJson = JSON.parse(resultJson);
    let clientID= resultJson[0]['id'];
    console.log(`client_id ===>>> ${clientID}`);
    console.log(`stnName ===>>> ${stnName} -- ${stnCode} -- ${zoneName} -- ${riverName} -- ${longitude} -- ${latitude} -- ${utmX} -- ${utmY} -- ${height} -- ${establishYear} -- ${stnType}`);
    const stn = await Stn.create({
        station_name: stnName,
        station_code: stnCode,
        zone_name:zoneName,
        river_name:riverName,
        longitude:longitude,
        latitude:latitude,
        utm_x:utmX,
        utm_y:utmY,
        height:height,
        establish_year:establishYear,
        station_type:stnType,
        client_id:clientID
    });

    //exports.createStn = factory.createOne(Stn);
    console.log(`stn ===>>> ${stn} `);
    res.status(201).json({
        status: 'success',
        data: {
            data: stn
        }
    });
});
