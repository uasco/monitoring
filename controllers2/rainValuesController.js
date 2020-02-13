const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const RainValues = require('../models2/rainValuesModel');
//const Sensor = require('../models2/sensorModel');


exports.getRainStationRainValues = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    //const rainsensorides = await Sensor.getIDesOfRain();
    //const rainstationrainvalues = await RainStation.getRainStationRainValues(client_id,rainsensorides.rain_total);
    const rainvalues = await RainValues.getRainValues(client_id, 27, 26, 25);

    var resultJson = JSON.stringify(rainvalues);
    resultJson = JSON.parse(resultJson);
    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0},{"value":0},{"value":12.2}]}


});

exports.getRainTotalOfPastMonths = catchAsync(async (req, res, next) => {

    const client_id = req.params.id * 1;

    const raintotalofpastmonths = await RainStation.getRainTotalOfPastMonths(client_id,25);
    // new Promise(function (resolve, reject) { 
    //     var raintotalofpastmonths;
    //     RainStation.getRainTotalOfPastMonths(client_id,25);
    //     resolve(raintotalofpastmonths);
    // }).then(raintotalofpastmonths => {
    //     var resultJson = JSON.stringify(raintotalofpastmonths);
    //     console.log("new pars:::::::::::::::");
    //     console.log(resultJson);
    //     resultJson = JSON.parse(resultJson);
    //     var apiResult = {};

    //     //add our JSON results to the data table
    //     apiResult.data = resultJson;

    //     //send JSON to Express
    //     res.json(apiResult); //{"data":[{"value":0},{"value":0},{"value":12.2}]}
    // }) ;

    var resultJson = JSON.stringify(raintotalofpastmonths);
    console.log("new pars:::::::::::::::");
    console.log(resultJson);
    resultJson = JSON.parse(resultJson);
    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0},{"value":0},{"value":12.2}]}


});