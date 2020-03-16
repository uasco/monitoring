const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const Values = require('../models2/valuesModel');

//const Sensor = require('../models2/sensorModel');

/////
var my_date = require('../utils/my_date');
/////
var moment = require('moment-jalaali');
moment.loadPersian({ usePersianDigits: true });
moment.loadPersian({ dialect: 'persian-modern' });
const channel_index_rain_12 = process.env.CHANNEL_INDEX_RAIN_12;
const channel_index_rain_24 = process.env.CHANNEL_INDEX_RAIN_24;
const channel_index_rain_total = process.env.CHANNEL_INDEX_RAIN_TOTAL;
const channel_index_level= process.env.CHANNEL_INDEX_LEVEL;
const channel_index_rainc_12= process.env.CHANNEL_INDEX_RAINC_12;
const channel_index_rainc_24= process.env.CHANNEL_INDEX_RAINC_24;
const channel_index_rainc_total= process.env.CHANNEL_INDEX_RAINC_TOTAL;
const channel_index_tmp_l= process.env.CHANNEL_INDEX_TMP_L;
const channel_index_tmp_a= process.env.CHANNEL_INDEX_TMP_A;
const channel_index_tmp_x= process.env.CHANNEL_INDEX_TMP_X;
const channel_index_tmp_n= process.env.CHANNEL_INDEX_TMP_N;
const channel_index_hum_l= process.env.CHANNEL_INDEX_HUM_L;
const channel_index_hum_a= process.env.CHANNEL_INDEX_HUM_A;
const channel_index_hum_x= process.env.CHANNEL_INDEX_HUM_X;
const channel_index_hum_n= process.env.CHANNEL_INDEX_HUM_N;
const channel_index_prs_l= process.env.CHANNEL_INDEX_PRS_L;
const channel_index_prs_a= process.env.CHANNEL_INDEX_PRS_A;
const channel_index_prs_x= process.env.CHANNEL_INDEX_PRS_X;
const channel_index_prs_n= process.env.CHANNEL_INDEX_PRS_N;
const channel_index_wsp_l= process.env.CHANNEL_INDEX_WSP_L;
const channel_index_wsp_a= process.env.CHANNEL_INDEX_WSP_A;
const channel_index_wsp_x= process.env.CHANNEL_INDEX_WSP_X;
const channel_index_wsp_n= process.env.CHANNEL_INDEX_WSP_N;
const channel_index_wdr_l= process.env.CHANNEL_INDEX_WDR_L;
const channel_index_wdr_a= process.env.CHANNEL_INDEX_WDR_A;
const channel_index_wdr_x= process.env.CHANNEL_INDEX_WDR_X;
const channel_index_wdr_n= process.env.CHANNEL_INDEX_WDR_N;
const channel_index_evp_l= process.env.CHANNEL_INDEX_EVP_L;
const channel_index_evp_a= process.env.CHANNEL_INDEX_EVP_A;
const channel_index_evp_x= process.env.CHANNEL_INDEX_EVP_X;
const channel_index_evp_n= process.env.CHANNEL_INDEX_EVP_N;
const channel_index_rad_l= process.env.CHANNEL_INDEX_RAD_L;
const channel_index_rad_a= process.env.CHANNEL_INDEX_RAD_A;
const channel_index_rad_x= process.env.CHANNEL_INDEX_RAD_X;
const channel_index_rad_n= process.env.CHANNEL_INDEX_RAD_N;

exports.getRainStationRainValues = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    //const rainsensorides = await Sensor.getIDesOfRain();
    //const rainstationrainvalues = await RainStation.getRainStationRainValues(client_id,rainsensorides.rain_total);
    const rainvalues = await Values.getRainValues(client_id, channel_index_rain_12,channel_index_rain_24,channel_index_rain_total);

    var resultJson = JSON.stringify(rainvalues);
    resultJson = JSON.parse(resultJson);
    ////////////////////////
    //console.log('resultJson["data"] ====');
    //console.log(resultJson);
    if(resultJson.length>0){
        resultJson.map(el => {
            d = el.sample_time;
            //"2020-01-14T07:47:12.000Z"
            d = moment(d, 'YYYY-M-D HH:mm:ss').format('HH:mm , jD jMMMM jYYYY');
            el.sample_time = d;
        })
    }

    ///////////////////////

    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0},{"value":0},{"value":12.2}]}


});

exports.getRainTotalsOfPastMonths = catchAsync(async (req, res, next) => {

    const client_id = req.params.id * 1;

    const raintotalofpastmonths = await Values.getRainTotalsOfPastMonths(client_id, channel_index_rain_total);
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
    //console.log("new pars:::::::::::::::");
    //console.log(resultJson);
    resultJson = JSON.parse(resultJson);
    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0,"created_at":"07:47:12, 24 دی 1398"},{"value":0,"created_at":"07:47:12, 24 دی 1398"},{"value":207.9,"created_at":"07:47:12, 24 دی 1398"}]}


});

exports.getLevelStationValue = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    //const rainsensorides = await Sensor.getIDesOfRain();
    //const rainstationrainvalues = await RainStation.getRainStationRainValues(client_id,rainsensorides.rain_total);
    const levelvalue = await Values.getLevelValue(client_id, channel_index_level);

    var resultJson = JSON.stringify(levelvalue);
    resultJson = JSON.parse(resultJson);
    ////////////////////////
    // console.log('resultJson["data"] ====');
    // console.log(resultJson);


    resultJson.map(el => {
        d = el.sample_time;
        //"2020-01-14T07:47:12.000Z"
        d = moment(d, 'YYYY-M-D HH:mm:ss').format('HH:mm , jD jMMMM jYYYY');
        el.sample_time = d;
    })
    var apiResult = {};
    //add our JSON results to the data table
    apiResult.data = resultJson;
    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":23.9,"created_at":"12:04:37, 5 اسفند 1398"}]}
});

exports.getLevelStationLastHours = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    //const rainsensorides = await Sensor.getIDesOfRain();
    //const rainstationrainvalues = await RainStation.getRainStationRainValues(client_id,rainsensorides.rain_total);
    const levelLastHours = await Values.getLevelLastHours(client_id, 74);

    var resultJson = JSON.stringify(levelLastHours);
    resultJson = JSON.parse(resultJson);
    ////////////////////////
    //console.log('resultJson["data"] ====');
    //console.log(resultJson);
    resultJson.map(el => {
        d = el.sample_time;
        //"2020-01-14T07:47:12.000Z"
        d = moment(d, 'YYYY-M-D HH:mm:ss').format('HH:mm');
        el.sample_time = d;
    })
    ///////////////////////

    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult);//{"data":[{"value":23.9,"sample_time":"07:54:39, 6 اسفند 1398"},{"value":23.9,"sample_time":"05:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"03:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"01:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"23:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"21:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"19:54:41, 5 اسفند 1398"},{"value":23.9,"sample_time":"17:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"15:54:41, 5 اسفند 1398"}]}
});

var channel_indexes = {
    'rainc': { '12': channel_index_rainc_12, '24': channel_index_rainc_24, 't': channel_index_rainc_total },
    'tmp': { 'l': channel_index_tmp_l, 'a': channel_index_tmp_a, 'x': channel_index_tmp_x, 'n': channel_index_tmp_n },
    'hum': { 'l': channel_index_hum_l, 'a': channel_index_hum_a, 'x': channel_index_hum_x, 'n': channel_index_hum_n },
    'prs': { 'l': channel_index_prs_l, 'a': channel_index_prs_a, 'x': channel_index_prs_x, 'n': channel_index_prs_n },
    'wsp': { 'l': channel_index_wsp_l, 'a': channel_index_wsp_a, 'x': channel_index_wsp_x, 'n': channel_index_wsp_n },
    'wdr': { 'l': channel_index_wdr_l, 'a': channel_index_wdr_a, 'x': channel_index_wdr_x, 'n': channel_index_wdr_n },
    'evp': { 'l': channel_index_evp_l, 'a': channel_index_evp_a, 'x': channel_index_evp_x, 'n': channel_index_evp_n },
    'rad': { 'l': channel_index_rad_l, 'a': channel_index_rad_a, 'x': channel_index_rad_x, 'n': channel_index_rad_n }
}
exports.getClimaStationLastHours = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    const sensor = req.url.split('/')[2];

    //const rainsensorides = await Sensor.getIDesOfRain();
    //const rainstationrainvalues = await RainStation.getRainStationRainValues(client_id,rainsensorides.rain_total);
    var climaLastHours = undefined;
    var resultJson = undefined;
    if (sensor === 'rainc') {
        climaLastHours = await Values.getRainTotalsOfPastMonths(client_id, channel_indexes[sensor]['t']);
        resultJson = JSON.stringify(climaLastHours);
        resultJson = JSON.parse(resultJson);
    } else {
        climaLastHours = await Values.getClimaLastHours(client_id, channel_indexes[sensor]['l']);
        resultJson = JSON.stringify(climaLastHours);
        resultJson = JSON.parse(resultJson);
        ////////////////////////
        //console.log('resultJson["data"] ====');
        //console.log(resultJson);
        resultJson.map(el => {
            d = el.sample_time;
            //"2020-01-14T07:47:12.000Z"
            d = moment(d, 'YYYY-M-D HH:mm:ss').format('HH:mm');
            el.sample_time = d;
        })
        ///////////////////////
    }



    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult);//{"data":[{"value":23.9,"sample_time":"07:54:39, 6 اسفند 1398"},{"value":23.9,"sample_time":"05:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"03:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"01:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"23:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"21:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"19:54:41, 5 اسفند 1398"},{"value":23.9,"sample_time":"17:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"15:54:41, 5 اسفند 1398"}]}
});
exports.getClimaStationValues = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    const sensor = req.url.split('/')[2];
    var values = undefined;
    console.log("sensor============");
    console.log(sensor);
    var resultJson = undefined;
    if (sensor === 'rainc') {
        values = await Values.getRainValues(client_id, channel_indexes[sensor]['12'], channel_indexes[sensor]['24'], channel_indexes[sensor]['t']);
        resultJson = JSON.stringify(values);
        resultJson = JSON.parse(resultJson);
    } else {
        values = await Values.getClimaValues(client_id, sensor, channel_indexes[sensor]);
        resultJson = JSON.stringify(values);
        resultJson = JSON.parse(resultJson);
        ////////////////////////
        //console.log('resultJson["data"] ====');
        //console.log(resultJson);
        resultJson.map(el => {
            d = el.sample_time;
            //"2020-01-14T07:47:12.000Z"
            d = moment(d, 'YYYY-M-D HH:mm:ss').format('HH:mm , jD jMMMM jYYYY');
            el.sample_time = d;
        })
        ///////////////////////
    }



    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0},{"value":0},{"value":12.2}]}
});