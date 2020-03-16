const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const Station = require('../models2/stationModel');


exports.getStationsNamesAndIDs = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    ///// const tours = await Tour.find();
    var stnType = req.url.substring(1);
    const stations = await Station.getStationsNamesAndIDs(stnType);
    var resultJson = JSON.stringify(stations);
    resultJson = JSON.parse(resultJson);
    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"id":5,"name":"shahrdari_15"},{"id":6,"name":"16 channel"},{"id":7,"name":"Level_Test"},{"id":8,"name":"r"}]}
    console.log("from rainStationController : ");
    console.log(apiResult.data[0].id);
});
