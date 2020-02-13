const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const RainTotalsMonths = require('../models2/rainTotalsMonthsModel');
//const Sensor = require('../models2/sensorModel');

exports.getRainTotalsOfPastMonths = catchAsync(async (req, res, next) => {

    const client_id = req.params.id * 1;

    const raintotalofpastmonths = await RainTotalsMonths.getRainTotalsOfPastMonths(client_id,25);
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