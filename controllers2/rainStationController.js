const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const RainStation = require('../models2/rainStationModel');
//const Sensor = require('../models2/sensorModel');


exports.getAllRainStationsNamesAndIDs = catchAsync(async (req, res, next) => {


    // 1) Get tour data from collection
    ///// const tours = await Tour.find();
    const rainstations = await RainStation.getAllRainStationsNamesAndIDs();
    var resultJson = JSON.stringify(rainstations);
    resultJson = JSON.parse(resultJson);
    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"id":5,"name":"shahrdari_15"},{"id":6,"name":"16 channel"},{"id":7,"name":"Level_Test"},{"id":8,"name":"r"}]}
    console.log("from rainStationController : ");
    console.log(apiResult.data[0].id);

});