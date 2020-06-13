const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const Station = require('../models2/stationModel');
var moment = require('moment-jalaali');

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
    //console.log("from rainStationController : ");
    //console.log(apiResult.data[0].id);
});
exports.getStationInstallDate = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    //const rainsensorides = await Sensor.getIDesOfRain();
    //const rainstationrainvalues = await RainStation.getRainStationRainValues(client_id,rainsensorides.rain_total);
    const installDate = await Station.getInstallDate(client_id);

    var resultJson = JSON.stringify(installDate);
    resultJson = JSON.parse(resultJson);
    ////////////////////////
    //console.log('resultJson["data"] ====');
    //console.log(resultJson);
    if(resultJson.length>0){
        resultJson.map(el => {
            // d = el.sample_time;
            // //"2020-01-14T07:47:12.000Z"
            // d = moment(d, 'YYYY-M-D HH:mm:ss').format('HH:mm , jD jMMMM jYYYY');
            // el.sample_time = d;
            d = el.product_date_time;
            //'1396-12-07T00:09:24.000Z'
            date = moment(d, 'YYYY-M-D HH:mm:ss').format( 'D / MM / YYYY');
            //console.log(`date = ${date}`);
            el.date = date;
        })
    }

    ///////////////////////

    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0},{"value":0},{"value":12.2}]}


});
