const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const Values = require('../models2/valuesModel');
const Station = require('../models2/stationModel');
const Stn = require('../models/stnModel');
const myDate = require('../utils/my_date');
//const Sensor = require('../models2/sensorModel');

/////
var my_date = require('../utils/my_date');
var helpers = require('../utils/helpers');
/////
var moment = require('moment-jalaali');
//var xl = require('excel4node');
const Excel = require('exceljs');
//const tempFile = require('tempfile');
//var XLSX = require('xlsx');

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
    const subtype = req.params.subtype;
    //const rainsensorides = await Sensor.getIDesOfRain();
    //const rainstationrainvalues = await RainStation.getRainStationRainValues(client_id,rainsensorides.rain_total);
    let rainvalues = undefined;
    if(subtype == 'r'){
        rainvalues = await Values.getRainValues(client_id, channel_index_rain_12,channel_index_rain_24,channel_index_rain_total);
    }else if(subtype == 'c'){
        rainvalues = await Values.getRainValues(client_id, channel_index_rainc_12,channel_index_rainc_24,channel_index_rainc_total);
    }


    var resultJson = JSON.stringify(rainvalues);
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
            let d = el.sample_time;
            //"2020-01-14T07:47:12.000Z"
            let date = moment(d, 'YYYY-M-D HH:mm:ss').format('jD jMMMM jYYYY');
            let hour = moment(d, 'YYYY-M-D HH:mm:ss').format('HH:mm');
            el.date = date;
            el.hour = hour;
        })
    }

    ///////////////////////

    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0},{"value":0},{"value":12.2}]}


});
exports.getAllRainStationsRainValues = catchAsync(async (req, res, next) => {
    let rainStations = await Station.getStationsNamesAndIDs('rain');
    let resultJson = JSON.stringify(rainStations);
    resultJson = JSON.parse(resultJson);
    let rainStationsIDs = [];
    if(resultJson.length>0) {
        resultJson.map(el => {
            let item = {'id': ''};
            item['id'] = el['id'];
            rainStationsIDs.push(item);
        })
    }



    let apiResult = {};

    apiResult.data = resultJson;

    res.json(apiResult);

});

exports.getRainTotalsOfPastMonths = catchAsync(async (req, res, next) => {

    const client_id = req.params.id * 1;
    const subtype = req.params.subtype;

    let raintotalofpastmonths = undefined;
    if(subtype == 'r'){
        raintotalofpastmonths = await Values.getRainTotalsOfPastMonths(client_id, channel_index_rain_total);
    }else if(subtype == 'c'){
        raintotalofpastmonths = await Values.getRainTotalsOfPastMonths(client_id, channel_index_rainc_total);
    }

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

exports.getRainAmariReport = catchAsync(async (req, res, next) => {

    const client_id = req.params.id * 1;
    const clima = req.params.c;
    const startDate = req.params.sd;
    const endDate = req.params.ed;
    const startHour = req.params.sh;
    const endHour = req.params.eh;
    const period = req.params.p;

    //console.log(client_id + '###' + startDate+startHour + '###' + endDate + '###' + endHour + '###' + period);

    let startTime = startDate+ ' ' + startHour;
    let endTime = endDate+ ' ' + endHour;

    let minutes = my_date.subtract_times(endDate,startDate,endHour,startHour);
    //console.log(`minutes ========== ${minutes}`);
    let rainAmariReport=undefined;
    // console.log(`clima bool == ${clima}`);
    // console.log(`channel_index_rainc_total == ${channel_index_rainc_total}`);
    // console.log(`channel_index_rain_total == ${channel_index_rain_total}`);

    if(clima=='true')
            rainAmariReport = await Values.getRainAmariReport(client_id, channel_index_rainc_total,startTime,endTime,period );
    else
            rainAmariReport = await Values.getRainAmariReport(client_id, channel_index_rain_total,startTime,endTime,period );
    var resultJson = JSON.stringify(rainAmariReport);
    // console.log("new pars:::::::::::::::");
    // console.log(resultJson);
    resultJson = JSON.parse(resultJson);
    /*
    [
  [
    { value: 673.5, sample_time: '2020-04-26 00:45:29' },
    { value: 689.3, sample_time: '2020-04-27 00:47:50' },
    { value: 701.3, sample_time: '2020-04-28 00:38:34' },
    { value: 704.4, sample_time: '2020-04-29 00:45:01' },
    { value: 704.4, sample_time: '2020-04-30 00:43:21' },
  ],
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    serverStatus: 34,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
  }
]
    */
    resultJson = resultJson[0];
    /*
        [
        { value: 673.5, sample_time: '2020-04-26 00:45:29' },
        { value: 689.3, sample_time: '2020-04-27 00:47:50' },
        { value: 701.3, sample_time: '2020-04-28 00:38:34' },
        { value: 704.4, sample_time: '2020-04-29 00:45:01' },
        { value: 704.4, sample_time: '2020-04-30 00:43:21' },
    ]
     */
    for(let i=0;i<resultJson.length;i++){

        resultJson[i]['sample_time']=myDate.convert_gdate_to_jdate(resultJson[i]['sample_time']);
    }

    var resultJson = JSON.stringify(resultJson);


    var apiResult = {};

    //add our JSON results to the data table
    //console.log(resultJson);
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0,"created_at":"07:47:12, 24 دی 1398"},{"value":0,"created_at":"07:47:12, 24 دی 1398"},{"value":207.9,"created_at":"07:47:12, 24 دی 1398"}]}


});

exports.getExcelRainAmariReport = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    const clima = req.params.c;
    const startDate = req.params.sd;
    const endDate = req.params.ed;
    const startHour = req.params.sh;
    const endHour = req.params.eh;
    const period = req.params.p;
    const rainType = req.params.rt;
    //console.log(client_id + '###' + startDate+startHour + '###' + endDate + '###' + endHour + '###' + period);
    let startTime = startDate+ ' ' + startHour;
    let endTime = endDate+ ' ' + endHour;
    let minutes = my_date.subtract_times(endDate,startDate,endHour,startHour);
    //console.log(`minutes ========== ${minutes}`);
    let rainAmariReport = undefined;
    if(clima=='true')
        rainAmariReport = await Values.getRainAmariReport(client_id, channel_index_rainc_total,startTime,endTime,period );
    else
        rainAmariReport = await Values.getRainAmariReport(client_id, channel_index_rain_total,startTime,endTime,period );
    let resultJson = JSON.stringify(rainAmariReport);
    //console.log("new pars:::::::::::::::");
    //console.log(resultJson);
    resultJson = JSON.parse(resultJson);
    /*
    [
  [
    { value: 673.5, sample_time: '2020-04-26 00:45:29' },
    { value: 689.3, sample_time: '2020-04-27 00:47:50' },
    { value: 701.3, sample_time: '2020-04-28 00:38:34' },
    { value: 704.4, sample_time: '2020-04-29 00:45:01' },
    { value: 704.4, sample_time: '2020-04-30 00:43:21' },
  ],
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    serverStatus: 34,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
  }
]
    */
    resultJson = resultJson[0];
    /*
        [
        { value: 673.5, sample_time: '2020-04-26 00:45:29' },
        { value: 689.3, sample_time: '2020-04-27 00:47:50' },
        { value: 701.3, sample_time: '2020-04-28 00:38:34' },
        { value: 704.4, sample_time: '2020-04-29 00:45:01' },
        { value: 704.4, sample_time: '2020-04-30 00:43:21' },
    ]
     */
    for(let i=0;i<resultJson.length;i++){
        resultJson[i]['sample_time']=myDate.convert_gdate_to_jdate(resultJson[i]['sample_time']);
    }


    function calcAmariAbsoluteValues(values) {
        let n = values.length;
        for (let i = n-1; i > 0; i--) {
            let x = values[i] - values[i - 1];
            if (x < 0) {
                x = 0;
            }
            values[i] = x;
        }
        return values;
    }
    function calcAmariRateValues(values,period) {
        let n = values.length;
        for (let i = n-1; i > 0; i--) {
            let x = values[i] - values[i - 1];
            if (x < 0) {
                x = 0;
            }else
                x = x / period;
            values[i] = x;
        }
        return values;
    }
    let labels = [];
    let values = [];
    for(let i=0;i<resultJson.length;i++){
        labels.push(resultJson[i]['sample_time']);
        values.push(resultJson[i]['value']);
    }
    switch(rainType){
        case 'total':
            values.splice(0,1);
            labels.splice(0,1);
            break;
        case 'absolute':
            values = calcAmariAbsoluteValues(values);
            values.splice(0,1);
            labels.splice(0,1);
            break;
        case 'rate':
            values = calcAmariRateValues(values,period);
            values.splice(0,1);
            labels.splice(0,1);
            break;
    }
    resultJson.splice(0,1);
    resultJson.map((el,i)=>{
        el['value']=values[i];
    })
    const workbook = new Excel.Workbook();
    // workbook.creator = 'Justin Williamson';
    //     workbook.lastModifiedBy = 'Justin Williamson';
        workbook.created = new Date();
        workbook.modified = new Date();
        workbook.date1904 = true;
    // (optional) - Freeze the header
    // workbook.views = [
    //    {
    //        state: 'frozen',
    //        ySplit: 1,
    //    },
    // ];
    const worksheet = workbook.addWorksheet(req.body.sheetName || 'Sheet 1');

    // worksheet.columns = [
    //    { header: 'sample_time', key: 'sample_time', width: 18, outlineLevel: 1 },
    //    { header: 'value', key: 'value', width: 10 }
    // ];
    switch(rainType){
        case 'total':
            worksheet.columns = [
                { header: '   تاریخ          و   ساعت', key: 'sample_time', width: 18, outlineLevel: 1 },
                { header: 'باران تجمیعی', key: 'value', width: 10 }
            ];
            break;
        case 'absolute':
            worksheet.columns = [
                { header: '   تاریخ          و   ساعت', key: 'sample_time', width: 18, outlineLevel: 1 },
                { header: 'مقدار بارش', key: 'value', width: 10 }
            ];
            break;
        case 'rate':
            worksheet.columns = [
                { header: '   تاریخ          و   ساعت', key: 'sample_time', width: 18, outlineLevel: 1 },
                { header: 'شدت بارش', key: 'value', width: 10 }
            ];
            break;
    }
    console.log(`worksheet.columns = ${worksheet.columns}`);
         // Add the row data
    let rows = [];
    resultJson.map(row => {
        rows.push(row);
    })
    worksheet.addRows(rows);
    console.log(`rows = ${JSON.stringify(rows)}`);
    // Format the header text
    worksheet.getRow(1).font = {
        name: 'Arial Black',
        size: 10,
    };

    // Set headers for download
    const fileName = 'amari-report.xlsx';


    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);


    const fileBuffer = await workbook.xlsx.writeBuffer()
    res.send(fileBuffer);




});

exports.getRainMantagheiReport = catchAsync(async (req, res, next) => {

    const client_id = req.params.id * 1;
    const clima = req.params.c;
    const startDate = req.params.sd;
    const endDate = req.params.ed;
    //console.log(client_id + '###' + startDate+startHour + '###' + endDate + '###' + endHour + '###' + period);
    let startTime = startDate;
    let endTime = endDate;
    //console.log(`minutes ========== ${minutes}`);
    let rainMantagheiReport=undefined;
    // console.log(`clima bool == ${clima}`);
    // console.log(`channel_index_rainc_total == ${channel_index_rainc_total}`);
    // console.log(`channel_index_rain_total == ${channel_index_rain_total}`);
    let resultJson = undefined;
    let resultJson2 =  [];
    if(clima=='true')
        rainMantagheiReport = await Values.getRainMantagheiReport(client_id, channel_index_rainc_total,startTime,endTime);
    else
        rainMantagheiReport = await Values.getRainMantagheiReport(client_id, channel_index_rain_total,startTime,endTime);

    /*
    [[{"val_0":721.7,"time_0":"2020-06-24 00:05:06","val_6_30":721.7,"time_6_30":"2020-06-24 06:25:31","val_18_30":721.7,"time_18_30":"2020-06-24 18:25:04","val_24_00":721.7,"time_24_00":"2020-
06-24 23:53:44"},{"val_0":0,"time_0":"1111-11-11 00:00:00","val_6_30":0,"time_6_30":"1111-11-11 00:00:00","val_18_30":0,"time_18_30":"1111-11-11 00:00:00","val_24_00":0,"time_24_00":"1111-1
1-11 00:00:00"}],{"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":34,"warningCount":0,"message":"","protocol41":true,"changedRows":0}]

    */

    resultJson = rainMantagheiReport[0];

    /*
        [{"val_0":721.7,"time_0":"2020-06-24 00:05:06","val_6_30":721.7,"time_6_30":"2020-06-24 06:25:31","val_18_30":721.7,"time_18_30":"2020-06-24 18:25:04","val_24_00":721.7,"time_24_00":"2020-
06-24 23:53:44"},{"val_0":0,"time_0":"1111-11-11 00:00:00","val_6_30":0,"time_6_30":"1111-11-11 00:00:00","val_18_30":0,"time_18_30":"1111-11-11 00:00:00","val_24_00":0,"time_24_00":"1111-1
1-11 00:00:00"}]
     */
    for(let i=0;i<resultJson.length;i++){
        if(resultJson[i]['time_0']!='1111-11-11 00:00:00')
            resultJson[i]['time_0']=myDate.convert_gdate_to_jdate(resultJson[i]['time_0']);
        if(resultJson[i]['time_6_30']!='1111-11-11 00:00:00')
            resultJson[i]['time_6_30']=myDate.convert_gdate_to_jdate(resultJson[i]['time_6_30']);
        if(resultJson[i]['time_18_30']!='1111-11-11 00:00:00')
            resultJson[i]['time_18_30']=myDate.convert_gdate_to_jdate(resultJson[i]['time_18_30']);
        if(resultJson[i]['time_24_00']!='1111-11-11 00:00:00')
            resultJson[i]['time_24_00']=myDate.convert_gdate_to_jdate(resultJson[i]['time_24_00']);
    }

    for(let i=0;i<resultJson.length;i++){
        let item = {'month':'','day':'','val_6_30':-1,'val_18_30':-1,'val_24_00':-1};
        if(resultJson[i]['time_0']!='1111-11-11 00:00:00') {
            item['month'] = myDate.get_name_of_month_of_given_date(resultJson[i]['time_0']);
            item['day'] = myDate.get_number_of_day_of_given_date(resultJson[i]['time_0']);
            if (resultJson[i]['val_6_30'] != -1 && resultJson[i]['val_0'] != -1) {
                item['val_6_30'] = resultJson[i]['val_6_30'] - resultJson[i]['val_0'];
                item['val_6_30'] = helpers.round(item['val_6_30'],2);
            }
            if (resultJson[i]['val_18_30'] != -1 && resultJson[i]['val_6_30'] != -1) {
                item['val_18_30'] = resultJson[i]['val_18_30'] - resultJson[i]['val_6_30'];
                item['val_18_30'] = helpers.round(item['val_18_30'],2);
            }
            if (resultJson[i]['val_24_00'] != -1 && resultJson[i]['val_0'] != -1) {
                item['val_24_00'] = resultJson[i]['val_24_00'] - resultJson[i]['val_0'];
                item['val_24_00'] = helpers.round(item['val_24_00'],2);
            }
            resultJson2.push(item);
        }
    }
    var apiResult = {};
    // [
    //     {
    //      time: '00:05        1399/4/3',
    //      val_6_30: 0,
    //      val_18_30: 0,
    //      val_24_00: 0
    //     },
    //     {
    //     time: '00:05        1399/4/4',
    //     val_6_30: 0,
    //     val_18_30: 0,
    //     val_24_00: 0
    //     },
    //     {
    //     time: '00:03        1399/4/5',
    //     val_6_30: 0,
    //     val_18_30: 0,
    //     val_24_00: 0
    //     }
    // ]

    apiResult.data = resultJson2;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0,"created_at":"07:47:12, 24 دی 1398"},{"value":0,"created_at":"07:47:12, 24 دی 1398"},{"value":207.9,"created_at":"07:47:12, 24 دی 1398"}]}


});

exports.getExcelRainMantagheiReport = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    const clima = req.params.c;
    const startDate = req.params.sd;
    const endDate = req.params.ed;
    let startTime = startDate;
    let endTime = endDate;
    let rainMantagheiReport = undefined;
    let resultJson = undefined;
    let resultJson2 =  [];
    let stnName = undefined;
    let stnCode = undefined;
    let zoneName = undefined;
    let riverName = undefined;
    let longitude = undefined;
    let latitude = undefined;
    let utmX = undefined;
    let utmY = undefined;
    let height = undefined;
    let establishYear = undefined;
    const stateName= process.env.STATE_NAME;
    const organizationCode= process.env.ORGANIZATION_CODE;
    await Stn.find({"client_id": client_id}).
    then(stn => {
        console.log(`stn['station_name'] ==>> ${stn[0].longitude}`);
        stnName =  stn[0].station_name;
        stnCode=  stn[0].station_code;
        zoneName=  stn[0].zone_name;
        riverName=  stn[0].river_name;
        longitude=  stn[0].longitude ;
        latitude = stn[0].latitude ;
        utmX=  stn[0].utm_x;
        utmY=  stn[0].utm_y;
        height=  stn[0].height;
        establishYear=  stn[0].establish_year;
    }).
    catch(err => {
        console.log('Caught:', err.message)
    });
    if(clima=='true')
        rainMantagheiReport = await Values.getRainMantagheiReport(client_id, channel_index_rainc_total,startTime,endTime);
    else
        rainMantagheiReport = await Values.getRainMantagheiReport(client_id, channel_index_rain_total,startTime,endTime);

    resultJson = rainMantagheiReport[0];

    for(let i=0;i<resultJson.length;i++){
        if(resultJson[i]['time_0']!='1111-11-11 00:00:00')
            resultJson[i]['time_0']=myDate.convert_gdate_to_jdate(resultJson[i]['time_0']);
        if(resultJson[i]['time_6_30']!='1111-11-11 00:00:00')
            resultJson[i]['time_6_30']=myDate.convert_gdate_to_jdate(resultJson[i]['time_6_30']);
        if(resultJson[i]['time_18_30']!='1111-11-11 00:00:00')
            resultJson[i]['time_18_30']=myDate.convert_gdate_to_jdate(resultJson[i]['time_18_30']);
        if(resultJson[i]['time_24_00']!='1111-11-11 00:00:00')
            resultJson[i]['time_24_00']=myDate.convert_gdate_to_jdate(resultJson[i]['time_24_00']);
    }

    for(let i=0;i<resultJson.length;i++){
        let item = {'month':'','day':'','val_6_30':-1,'val_18_30':-1,'val_24_00':-1};
        if(resultJson[i]['time_0']!='1111-11-11 00:00:00') {
            item['month'] = myDate.get_name_of_month_of_given_date(resultJson[i]['time_0']);
            item['day'] = myDate.get_number_of_day_of_given_date(resultJson[i]['time_0']);
            if (resultJson[i]['val_6_30'] != -1 && resultJson[i]['val_0'] != -1) {
                item['val_6_30'] = resultJson[i]['val_6_30'] - resultJson[i]['val_0'];
            }
            if (resultJson[i]['val_18_30'] != -1 && resultJson[i]['val_6_30'] != -1) {
                item['val_18_30'] = resultJson[i]['val_18_30'] - resultJson[i]['val_6_30'];
            }
            if (resultJson[i]['val_24_00'] != -1 && resultJson[i]['val_0'] != -1) {
                item['val_24_00'] = resultJson[i]['val_24_00'] - resultJson[i]['val_0'];
            }
            resultJson2.push(item);
        }
    }
    resultJson2 = JSON.stringify(resultJson2);
    resultJson2 = JSON.parse(resultJson2);



    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Export');

    worksheet.mergeCells('A1:L1');
    worksheet.getCell('A1').value = 'وزارت نیرو';
    worksheet.getCell('A1').alignment = { horizontal:'center'} ;

    worksheet.mergeCells('A2:B2');
    worksheet.getCell('A2').value = stateName;
    worksheet.getCell('A2').alignment = { horizontal:'center'} ;

    worksheet.mergeCells('C2:E2');
    worksheet.getCell('C2').value = 'شرکت سهامی آب منطقه اي: ';

    worksheet.mergeCells('F2:G2');
    worksheet.getCell('F2').value = 'فرم اندازه گيري بارش   ';
    worksheet.mergeCells('H2:L2');
    worksheet.getCell('H2').value = 'سازمان مديريت منابع آب ايران   ';
    worksheet.mergeCells('A3:B3');
    worksheet.getCell('A3').value = stateName;
    worksheet.mergeCells('C3:E3');
    worksheet.getCell('C3').value = 'استان:';
    worksheet.mergeCells('F3:G3');
    worksheet.getCell('F3').value = '(باران سنج معمولي)';
    worksheet.mergeCells('H3:L3');
    worksheet.getCell('H3').value = 'معاونت پژوهش و مطالعات پايه ';
    worksheet.mergeCells('A4:B4');
    worksheet.getCell('A4').value = organizationCode;
    worksheet.mergeCells('C4:E4');
    worksheet.getCell('C4').value = 'كد سازمان:';
    worksheet.mergeCells('F4:G4');
    worksheet.getCell('F4').value = 'كد: 210-410';
    worksheet.mergeCells('H4:L4');
    worksheet.getCell('H4').value = 'دفتر مطالعات پايه منابع آب ';
    worksheet.mergeCells('A5:L5');
    worksheet.getCell('A6').value = latitude;
    worksheet.mergeCells('B6:C6');
    worksheet.getCell('B6').value = 'عرض جغرافيائي:';
    worksheet.getCell('D6').value = longitude;
    worksheet.mergeCells('E6:F6');
    worksheet.getCell('E6').value = 'طول جغرافيائي:';
    worksheet.getCell('G6').value = stnName;
    worksheet.getCell('H6').value = 'نام ايستگاه:';
    worksheet.getCell('I6').value = zoneName;
    worksheet.mergeCells('J6:L6');
    worksheet.getCell('J6').value = 'نام حوزه آبريز:';
    worksheet.mergeCells('A7:L7');
    worksheet.getCell('A8').value = '  .نقطه ای U.T.M    X:';
    worksheet.mergeCells('B8:C8');
    worksheet.getCell('B8').value = utmX;
    worksheet.getCell('D8').value = height;
    worksheet.getCell('E8').value = 'ارتفاع:';
    worksheet.getCell('G8').value = stnCode;
    worksheet.getCell('H8').value = 'كد ايستگاه:';
    worksheet.getCell('I8').value = riverName;
    worksheet.mergeCells('J8:L8');
    worksheet.getCell('J8').value = 'نام رودخانه: ';
    worksheet.getCell('A9').value = 'Y:';
    worksheet.mergeCells('B9:C9');
    worksheet.getCell('B9').value = utmY;
    worksheet.mergeCells('C10:D10');
    worksheet.getCell('C10').value = resultJson2[0]['month'];
    worksheet.getCell('E10').value = 'ماه:';
    worksheet.mergeCells('H10:I10');
    worksheet.getCell('H10').value = '96-97';
    worksheet.mergeCells('J10:L10');
    worksheet.getCell('J10').value = 'سال آبي :';
    worksheet.mergeCells('A11:A12');
    worksheet.getCell('A11').value = 'ملاحظات';
    worksheet.mergeCells('B11:B12');
    worksheet.getCell('B11').value = 'مجموع بارش در روز' ;
    worksheet.mergeCells('C11:D11');
    worksheet.getCell('C11').value = 'ساعت بارندگي ';
    worksheet.mergeCells('E11:F11');
    worksheet.getCell('E11').value = 'ارتفاع برف تازه به سانتيمتر';
    worksheet.mergeCells('G11:H11');
    worksheet.getCell('G11').value = 'ارتفاع بارش به ميليمتر  ساعت 18:30';
    worksheet.mergeCells('I11:J11');
    worksheet.getCell('I11').value = 'ارتفاع بارش به ميليمتر  ساعت 6:30';
    worksheet.mergeCells('K11:K12');
    worksheet.getCell('K11').value = 'روز';
    worksheet.mergeCells('L11:L12');
    worksheet.getCell('L11').value = 'ماه';
    worksheet.getCell('C12').value = 'خاتمه ';
    worksheet.getCell('D12').value = 'شروع ';
    worksheet.getCell('E12').value = 'ساعت 18:30';
    worksheet.getCell('F12').value = 'ساعت 6:30';
    worksheet.getCell('G12').value = 'آب معادل برف ';
    worksheet.getCell('H12').value = 'باران ';
    worksheet.getCell('I12').value = 'آب معادل برف ';
    worksheet.getCell('J12').value = 'باران ';

    let sumOfTotalRain = 0;

    let cellIndex_trid = '';//trid : total rain in day
    let cellIndex1_r_18_30 = '';
    let cellIndex_r_6_30 = '';
    let cellIndex_day = '';
    let cellIndex_month = '';
    let i=0;
    let n = 0;
    cellIndex_trid = 'B' + n.toString();

    for(i=0;i<resultJson2.length;i++) {
        n=i+13;
        cellIndex_trid = 'B' + n.toString();
        sumOfTotalRain = sumOfTotalRain + resultJson2[i]['val_24_00'];
        worksheet.getCell(cellIndex_trid).value = resultJson2[i]['val_24_00'];
        cellIndex1_r_18_30 = 'H' + n.toString();
        worksheet.getCell(cellIndex1_r_18_30).value = resultJson2[i]['val_18_30'];
        cellIndex_r_6_30 = 'J' + n.toString();
        worksheet.getCell(cellIndex_r_6_30).value = resultJson2[i]['val_6_30'];
        cellIndex_day = 'K' + n.toString();
        worksheet.getCell(cellIndex_day).value = resultJson2[i]['day'];
        cellIndex_month = 'L' + n.toString();
        worksheet.getCell(cellIndex_month).value = resultJson2[i]['month'];
    }

    i = resultJson2.length;
    let cellIndex = undefined;
    n=i+13;
    cellIndex = 'B' + n.toString();
    worksheet.getCell(cellIndex).value = sumOfTotalRain;

    cellIndex = 'C' + n.toString() + ':' + 'L' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'C' + n.toString();
    worksheet.getCell(cellIndex).value = 'مجموع كل بارش در يك ماه';

    i = i+1;
    n=i+13;
    cellIndex = 'C' + n.toString();
    worksheet.getCell(cellIndex).value = 'تاريخ كنترل:';

    cellIndex = 'E' + n.toString() + ':' + 'F' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'E' + n.toString();
    worksheet.getCell(cellIndex).value = '';

    cellIndex = 'G' + n.toString();
    worksheet.getCell(cellIndex).value = 'نام كنترل كننده:';

    cellIndex = 'I' + n.toString() + ':' + 'J' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'I' + n.toString();
    worksheet.getCell(cellIndex).value = '';

    cellIndex = 'K' + n.toString() + ':' + 'L' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'K' + n.toString();
    worksheet.getCell(cellIndex).value = 'نام متصدي:';

    i = i+1;
    n=i+13;
    cellIndex = 'E' + n.toString() + ':' + 'F' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'E' + n.toString();
    worksheet.getCell(cellIndex).value = '';

    cellIndex = 'G' + n.toString();
    worksheet.getCell(cellIndex).value = 'امضاء';

    cellIndex = 'I' + n.toString() + ':' + 'J' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'I' + n.toString();
    worksheet.getCell(cellIndex).value = '';

    cellIndex = 'K' + n.toString() + ':' + 'L' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'K' + n.toString();
    worksheet.getCell(cellIndex).value = 'امضاء';

    worksheet.eachRow(function (Row, rowNum) {
        Row.eachCell(function (Cell, cellNum) {
            Cell.alignment = {horizontal: 'center'};
            Cell.font = { size: 8, bold: true};
        })
    })
    // Format the header text
    // worksheet.getRow(1).font = {
    //     name: 'Arial Black',
    //     size: 10,
    // };

    // Set headers for download
    const fileName = 'mantaghei-report.xlsx';

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    const fileBuffer = await workbook.xlsx.writeBuffer()
    res.send(fileBuffer);
});

exports.getLevelStationValue = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;

    const levelvalue = await Values.getLevelValue(client_id, channel_index_level);

    var resultJson = JSON.stringify(levelvalue);
    resultJson = JSON.parse(resultJson);

    resultJson.map(el => {
        let d = el.sample_time;
        //"2020-01-14T07:47:12.000Z"
        let date = moment(d, 'YYYY-M-D HH:mm:ss').format('jD jMMMM jYYYY');
        let hour = moment(d, 'YYYY-M-D HH:mm:ss').format('HH:mm');
        el.date = date;
        el.hour = hour;
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

exports.getLevelAmariReport = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    const startDate = req.params.sd;
    const endDate = req.params.ed;
    const startHour = req.params.sh;
    const endHour = req.params.eh;
    const period = req.params.p;

    //console.log(client_id + '###' + startDate+startHour + '###' + endDate + '###' + endHour + '###' + period);

    let startTime = startDate+ ' ' + startHour;
    let endTime = endDate+ ' ' + endHour;
    let levelAmariReport=undefined;

    levelAmariReport = await Values.getLevelAmariReport(client_id, channel_index_level,startTime,endTime,period );
    var resultJson = JSON.stringify(levelAmariReport);
    console.log("new pars:::::::::::::::");
    console.log(resultJson);
    resultJson = JSON.parse(resultJson);
    /*
    [
  [
    { value: 673.5, sample_time: '2020-04-26 00:45:29' },
    { value: 689.3, sample_time: '2020-04-27 00:47:50' },
    { value: 701.3, sample_time: '2020-04-28 00:38:34' },
    { value: 704.4, sample_time: '2020-04-29 00:45:01' },
    { value: 704.4, sample_time: '2020-04-30 00:43:21' },
  ],
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    serverStatus: 34,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
  }
]
    */
    resultJson = resultJson[0];
    /*
        [
        { value: 673.5, sample_time: '2020-04-26 00:45:29' },
        { value: 689.3, sample_time: '2020-04-27 00:47:50' },
        { value: 701.3, sample_time: '2020-04-28 00:38:34' },
        { value: 704.4, sample_time: '2020-04-29 00:45:01' },
        { value: 704.4, sample_time: '2020-04-30 00:43:21' },
    ]
     */
    for(let i=0;i<resultJson.length;i++){

        resultJson[i]['sample_time']=myDate.convert_gdate_to_jdate(resultJson[i]['sample_time']);
    }

    var resultJson = JSON.stringify(resultJson);


    var apiResult = {};

    //add our JSON results to the data table
    //console.log(resultJson);
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0,"created_at":"07:47:12, 24 دی 1398"},{"value":0,"created_at":"07:47:12, 24 دی 1398"},{"value":207.9,"created_at":"07:47:12, 24 دی 1398"}]}


});

exports.getExcelLevelAmariReport = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    const startDate = req.params.sd;
    const endDate = req.params.ed;
    const startHour = req.params.sh;
    const endHour = req.params.eh;
    const period = req.params.p;
    let startTime = startDate+ ' ' + startHour;
    let endTime = endDate+ ' ' + endHour;

    let levelAmariReport = undefined;
    levelAmariReport = await Values.getLevelAmariReport(client_id, channel_index_level,startTime,endTime,period );
    let resultJson = JSON.stringify(levelAmariReport);
    //console.log("new pars:::::::::::::::");
    //console.log(resultJson);
    resultJson = JSON.parse(resultJson);
    /*
    [
  [
    { value: 673.5, sample_time: '2020-04-26 00:45:29' },
    { value: 689.3, sample_time: '2020-04-27 00:47:50' },
    { value: 701.3, sample_time: '2020-04-28 00:38:34' },
    { value: 704.4, sample_time: '2020-04-29 00:45:01' },
    { value: 704.4, sample_time: '2020-04-30 00:43:21' },
  ],
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    serverStatus: 34,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
  }
]
    */
    resultJson = resultJson[0];
    /*
        [
        { value: 673.5, sample_time: '2020-04-26 00:45:29' },
        { value: 689.3, sample_time: '2020-04-27 00:47:50' },
        { value: 701.3, sample_time: '2020-04-28 00:38:34' },
        { value: 704.4, sample_time: '2020-04-29 00:45:01' },
        { value: 704.4, sample_time: '2020-04-30 00:43:21' },
    ]
     */
    for(let i=0;i<resultJson.length;i++){
        resultJson[i]['sample_time']=myDate.convert_gdate_to_jdate(resultJson[i]['sample_time']);
    }



    let labels = [];
    let values = [];
    for(let i=0;i<resultJson.length;i++){
        labels.push(resultJson[i]['sample_time']);
        values.push(resultJson[i]['value']);
    }

    const workbook = new Excel.Workbook();
    workbook.creator = 'Justin Williamson';
    workbook.lastModifiedBy = 'Justin Williamson';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.date1904 = true;
    // (optional) - Freeze the header
    workbook.views = [
        {
            state: 'frozen',
            ySplit: 1,
        },
    ];
    const worksheet = workbook.addWorksheet(req.body.sheetName || 'Sheet 1');

    worksheet.columns = [
        { header: 'sample_time', key: 'sample_time', width: 18, outlineLevel: 1 },
        { header: 'value', key: 'value', width: 10 }
    ];

    worksheet.columns = [
        { header: '   تاریخ          و   ساعت', key: 'sample_time', width: 18, outlineLevel: 1 },
        { header: 'ارتفاع آب', key: 'value', width: 10 }
    ];

    // Add the row data
    let rows = [];
    resultJson.map(row => {
        rows.push(row);
    })
    worksheet.addRows(rows);

    // Format the header text
    worksheet.getRow(1).font = {
        name: 'Arial Black',
        size: 10,
    };

    // Set headers for download
    const fileName = 'amari-report.xlsx';


    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);


    const fileBuffer = await workbook.xlsx.writeBuffer()
    res.send(fileBuffer);




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

exports.getLevelMantagheiReport = catchAsync(async (req, res, next) => {

    const client_id = req.params.id * 1;
    const startDate = req.params.sd;
    const endDate = req.params.ed;
    let startTime = startDate;
    let endTime = endDate;
    //console.log(`minutes ========== ${minutes}`);
    let levelMantagheiReport=undefined;
    // console.log(`clima bool == ${clima}`);
    // console.log(`channel_index_levelc_total == ${channel_index_levelc_total}`);
    // console.log(`channel_index_level_total == ${channel_index_level_total}`);
    let resultJson = undefined;
    let resultJson2 =  [];
    levelMantagheiReport = await Values.getLevelMantagheiReport(client_id, channel_index_level,startTime,endTime);

    resultJson = levelMantagheiReport[0];

    for(let i=0;i<resultJson.length;i++){
        if(resultJson[i]['time_8']!='1111-11-11 00:00:00')
            resultJson[i]['time_8']=myDate.convert_gdate_to_jdate(resultJson[i]['time_8']);
        if(resultJson[i]['time_16']!='1111-11-11 00:00:00')
            resultJson[i]['time_16']=myDate.convert_gdate_to_jdate(resultJson[i]['time_16']);
    }

    for(let i=0;i<resultJson.length;i++){
        let item = {'month':'','day':'','val_8':-1,'val_16':-1};
        if(resultJson[i]['time_8']!='1111-11-11 00:00:00') {
            item['month'] = myDate.get_name_of_month_of_given_date(resultJson[i]['time_8']);
            item['day'] = myDate.get_number_of_day_of_given_date(resultJson[i]['time_8']);
            if (resultJson[i]['val_8'] != -1) {
                item['val_8'] = resultJson[i]['val_8'];
            }
            if (resultJson[i]['val_16'] != -1) {
                item['val_16'] = resultJson[i]['val_16'];
            }
            resultJson2.push(item);
        }
    }
    let apiResult = {};

    apiResult.data = resultJson2;

    //send JSON to Express
    res.json(apiResult);

});
exports.getExcelLevelMantagheiReport = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    const startDate = req.params.sd;
    const endDate = req.params.ed;
    let startTime = startDate;
    let endTime = endDate;
    let levelMantagheiReport = undefined;
    let resultJson = undefined;
    let resultJson2 =  [];
    let stnName = undefined;
    let stnCode = undefined;
    let zoneName = undefined;
    let riverName = undefined;
    let longitude = undefined;
    let latitude = undefined;
    let utmX = undefined;
    let utmY = undefined;
    let height = undefined;
    let establishYear = undefined;
    const stateName= process.env.STATE_NAME;
    const organizationCode= process.env.ORGANIZATION_CODE;
    await Stn.find({"client_id": client_id}).
    then(stn => {
        console.log(`stn['station_name'] ==>> ${stn[0].longitude}`);
        stnName =  stn[0].station_name;
        stnCode=  stn[0].station_code;
        zoneName=  stn[0].zone_name;
        riverName=  stn[0].river_name;
        longitude=  stn[0].longitude ;
        latitude = stn[0].latitude ;
        utmX=  stn[0].utm_x;
        utmY=  stn[0].utm_y;
        height=  stn[0].height;
        establishYear=  stn[0].establish_year;
    }).
    catch(err => {
        console.log('Caught:', err.message)
    });

    levelMantagheiReport = await Values.getLevelMantagheiReport(client_id, channel_index_level,startTime,endTime);

    resultJson = levelMantagheiReport[0];

    for(let i=0;i<resultJson.length;i++){
        if(resultJson[i]['time_8']!='1111-11-11 00:00:00')
            resultJson[i]['time_8']=myDate.convert_gdate_to_jdate(resultJson[i]['time_8']);
        if(resultJson[i]['time_16']!='1111-11-11 00:00:00')
            resultJson[i]['time_16']=myDate.convert_gdate_to_jdate(resultJson[i]['time_16']);
    }

    for(let i=0;i<resultJson.length;i++){
        let item = {'month':'','day':'','val_8':-1,'val_16':-1};
        if(resultJson[i]['time_8']!='1111-11-11 00:00:00') {
            item['month'] = myDate.get_name_of_month_of_given_date(resultJson[i]['time_8']);
            item['day'] = myDate.get_number_of_day_of_given_date(resultJson[i]['time_8']);
            if (resultJson[i]['val_8'] != -1) {
                item['val_8'] = resultJson[i]['val_8'];
            }
            if (resultJson[i]['val_16'] != -1) {
                item['val_16'] = resultJson[i]['val_16'];
            }
            resultJson2.push(item);
        }
    }
    resultJson2 = JSON.stringify(resultJson2);
    resultJson2 = JSON.parse(resultJson2);

    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Export');

    worksheet.mergeCells('A1:L1');
    worksheet.getCell('A1').value = 'وزارت نیرو';
    worksheet.getCell('A1').alignment = { horizontal:'center'} ;

    worksheet.mergeCells('A2:B2');
    worksheet.getCell('A2').value = stateName;
    worksheet.getCell('A2').alignment = { horizontal:'center'} ;

    worksheet.mergeCells('C2:E2');
    worksheet.getCell('C2').value = 'شرکت سهامی آب منطقه اي: ';

    worksheet.mergeCells('F2:G2');
    worksheet.getCell('F2').value = 'فرم اندازه گيري بارش   ';
    worksheet.mergeCells('H2:L2');
    worksheet.getCell('H2').value = 'سازمان مديريت منابع آب ايران   ';
    worksheet.mergeCells('A3:B3');
    worksheet.getCell('A3').value = stateName;
    worksheet.mergeCells('C3:E3');
    worksheet.getCell('C3').value = 'استان:';
    worksheet.mergeCells('F3:G3');
    worksheet.getCell('F3').value = '(باران سنج معمولي)';
    worksheet.mergeCells('H3:L3');
    worksheet.getCell('H3').value = 'معاونت پژوهش و مطالعات پايه ';
    worksheet.mergeCells('A4:B4');
    worksheet.getCell('A4').value = organizationCode;
    worksheet.mergeCells('C4:E4');
    worksheet.getCell('C4').value = 'كد سازمان:';
    worksheet.mergeCells('F4:G4');
    worksheet.getCell('F4').value = 'كد: 210-410';
    worksheet.mergeCells('H4:L4');
    worksheet.getCell('H4').value = 'دفتر مطالعات پايه منابع آب ';
    worksheet.mergeCells('A5:L5');
    worksheet.getCell('A6').value = latitude;
    worksheet.mergeCells('B6:C6');
    worksheet.getCell('B6').value = 'عرض جغرافيائي:';
    worksheet.getCell('D6').value = longitude;
    worksheet.mergeCells('E6:F6');
    worksheet.getCell('E6').value = 'طول جغرافيائي:';
    worksheet.getCell('G6').value = stnName;
    worksheet.getCell('H6').value = 'نام ايستگاه:';
    worksheet.getCell('I6').value = zoneName;
    worksheet.mergeCells('J6:L6');
    worksheet.getCell('J6').value = 'نام حوزه آبريز:';
    worksheet.mergeCells('A7:L7');
    worksheet.getCell('A8').value = '  .نقطه ای U.T.M    X:';
    worksheet.mergeCells('B8:C8');
    worksheet.getCell('B8').value = utmX;
    worksheet.getCell('D8').value = height;
    worksheet.getCell('E8').value = 'ارتفاع:';
    worksheet.getCell('G8').value = stnCode;
    worksheet.getCell('H8').value = 'كد ايستگاه:';
    worksheet.getCell('I8').value = riverName;
    worksheet.mergeCells('J8:L8');
    worksheet.getCell('J8').value = 'نام رودخانه: ';
    worksheet.getCell('A9').value = 'Y:';
    worksheet.mergeCells('B9:C9');
    worksheet.getCell('B9').value = utmY;
    worksheet.mergeCells('C10:D10');
    worksheet.getCell('C10').value = resultJson2[0]['month'];
    worksheet.getCell('E10').value = 'ماه:';
    worksheet.getCell('F10').value = '';
    worksheet.getCell('G10').value = 'کبیسه:';
    worksheet.mergeCells('H10:I10');
    worksheet.getCell('H10').value = '96-97';
    worksheet.mergeCells('J10:L10');
    worksheet.getCell('J10').value = 'سال:';
    worksheet.mergeCells('B11:B12');
    worksheet.getCell('B11').value = 'ملاحظات' ;
    worksheet.mergeCells('C11:D12');
    worksheet.getCell('C11').value = 'ميانگين آبدهي';
    worksheet.mergeCells('E11:F11');
    worksheet.getCell('E11').value = 'آبدهي (متر مكعب در ثانيه)';
    worksheet.mergeCells('G11:H12');
    worksheet.getCell('G11').value = 'تصحيح اشل';
    worksheet.mergeCells('I11:J11');
    worksheet.getCell('I11').value = 'درجه سطح آب (سانتيمتر)';
    worksheet.mergeCells('K11:K12');
    worksheet.getCell('K11').value = 'روز';
    worksheet.mergeCells('L11:L12');
    worksheet.getCell('L11').value = 'ماه';
    worksheet.getCell('E12').value = 'ساعت 16';
    worksheet.getCell('F12').value = 'ساعت 8';
    worksheet.getCell('I12').value = 'ساعت 16';
    worksheet.getCell('J12').value = 'ساعت 8';

    let cellIndex1_r_16 = '';
    let cellIndex_r_8 = '';
    let cellIndex_day = '';
    let cellIndex_month = '';
    let i=0;
    let n = 0;

    for(i=0;i<resultJson2.length;i++) {
        n=i+13;
        cellIndex1_r_16 = 'I' + n.toString();
        worksheet.getCell(cellIndex1_r_16).value = resultJson2[i]['val_16'];
        cellIndex_r_8 = 'J' + n.toString();
        worksheet.getCell(cellIndex_r_8).value = resultJson2[i]['val_8'];
        cellIndex_day = 'K' + n.toString();
        worksheet.getCell(cellIndex_day).value = resultJson2[i]['day'];
        cellIndex_month = 'L' + n.toString();
        worksheet.getCell(cellIndex_month).value = resultJson2[i]['month'];
    }

    i = resultJson2.length;
    let cellIndex = undefined;
    n=i+13;
    cellIndex = 'B' + n.toString();

    cellIndex = 'C' + n.toString();
    worksheet.getCell(cellIndex).value = 'اشل حداقل';

    cellIndex = 'F' + n.toString();
    worksheet.getCell(cellIndex).value = 'حداقل';

    cellIndex = 'G' + n.toString() + ':' + 'G' + (n+1).toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'G' + n.toString();
    worksheet.getCell(cellIndex).value = 'آبدهي روزانه';


    cellIndex = 'I' + n.toString() + ':' + 'I' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'I' + n.toString();
    worksheet.getCell(cellIndex).value = 'آبدهي متوسط سالانه (m3/s)';

    i = i+1;
    n=i+13;

    cellIndex = 'C' + n.toString();
    worksheet.getCell(cellIndex).value = 'اشل حداكثر';

    cellIndex = 'F' + n.toString();
    worksheet.getCell(cellIndex).value = 'حداكثر';

    cellIndex = 'I' + n.toString() + ':' + 'I' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'I' + n.toString();
    worksheet.getCell(cellIndex).value = 'حجم جريان سالانه (MCM)';

    i = i+1;
    n=i+13;
    cellIndex = 'C' + n.toString();
    worksheet.getCell(cellIndex).value = 'تاريخ كنترل:';

    cellIndex = 'E' + n.toString() + ':' + 'F' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'E' + n.toString();
    worksheet.getCell(cellIndex).value = '';

    cellIndex = 'G' + n.toString();
    worksheet.getCell(cellIndex).value = 'نام كنترل كننده:';

    cellIndex = 'I' + n.toString() + ':' + 'J' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'I' + n.toString();
    worksheet.getCell(cellIndex).value = '';

    cellIndex = 'K' + n.toString() + ':' + 'L' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'K' + n.toString();
    worksheet.getCell(cellIndex).value = 'نام متصدي:';

    i = i+1;
    n=i+13;
    cellIndex = 'E' + n.toString() + ':' + 'F' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'E' + n.toString();
    worksheet.getCell(cellIndex).value = '';

    cellIndex = 'G' + n.toString();
    worksheet.getCell(cellIndex).value = 'امضاء';

    cellIndex = 'I' + n.toString() + ':' + 'J' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'I' + n.toString();
    worksheet.getCell(cellIndex).value = '';

    cellIndex = 'K' + n.toString() + ':' + 'L' + n.toString();
    worksheet.mergeCells(cellIndex);
    cellIndex = 'K' + n.toString();
    worksheet.getCell(cellIndex).value = 'امضاء';

    worksheet.eachRow(function (Row, rowNum) {
        Row.eachCell(function (Cell, cellNum) {
            Cell.alignment = {horizontal: 'center'};
            Cell.font = { size: 8, bold: true};
        })
    })
    // Format the header text
    // worksheet.getRow(1).font = {
    //     name: 'Arial Black',
    //     size: 10,
    // };

    // Set headers for download
    const fileName = 'mantaghei-report.xlsx';

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    const fileBuffer = await workbook.xlsx.writeBuffer()
    res.send(fileBuffer);
});
exports.getClimaStationValues = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    const sensor = req.url.split('/')[2];
    var values = undefined;
    //console.log("sensor============");
    //console.log(sensor);
    var resultJson = undefined;
    if (sensor === 'rainc') {
        values = await Values.getRainValues(client_id, channel_indexes[sensor]['12'], channel_indexes[sensor]['24'], channel_indexes[sensor]['t']);
    } else {
        values = await Values.getClimaValues(client_id, sensor, channel_indexes[sensor]);
    }
    resultJson = JSON.stringify(values);
    resultJson = JSON.parse(resultJson);
    ////////////////////////
    //console.log('resultJson["data"] ====');
    //console.log(resultJson);
    resultJson.map(el => {
        let d = el.sample_time;
        //"2020-01-14T07:47:12.000Z"
        let date = moment(d, 'YYYY-M-D HH:mm:ss').format('jD jMMMM jYYYY');
        let hour = moment(d, 'YYYY-M-D HH:mm:ss').format('HH:mm');
        el.date = date;
        el.hour = hour;
    })
    ///////////////////////

    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0},{"value":0},{"value":12.2}]}
});
exports.getClimaStationLastHours = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    const sensor = req.url.split('/')[2];

    //const rainsensorides = await Sensor.getIDesOfRain();
    //const rainstationrainvalues = await RainStation.getRainStationRainValues(client_id,rainsensorides.rain_total);
    var climaLastHours = undefined;
    var resultJson = undefined;
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
    var apiResult = {};
    //add our JSON results to the data table
    apiResult.data = resultJson;
    //send JSON to Express
    res.json(apiResult);//{"data":[{"value":23.9,"sample_time":"07:54:39, 6 اسفند 1398"},{"value":23.9,"sample_time":"05:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"03:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"01:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"23:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"21:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"19:54:41, 5 اسفند 1398"},{"value":23.9,"sample_time":"17:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"15:54:41, 5 اسفند 1398"}]}
});

exports.getClimaRainTotalsOfPastMonths = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    const sensor = req.url.split('/')[2];

    //const rainsensorides = await Sensor.getIDesOfRain();
    //const rainstationrainvalues = await RainStation.getRainStationRainValues(client_id,rainsensorides.rain_total);
    var climaRainTotalsOfPastMonths = undefined;
    var resultJson = undefined;
    climaRainTotalsOfPastMonths = await Values.getRainTotalsOfPastMonths(client_id, channel_indexes[sensor]['t']);
    resultJson = JSON.stringify(climaRainTotalsOfPastMonths);
    resultJson = JSON.parse(resultJson);

    var apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult);//{"data":[{"value":23.9,"sample_time":"07:54:39, 6 اسفند 1398"},{"value":23.9,"sample_time":"05:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"03:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"01:54:40, 6 اسفند 1398"},{"value":23.9,"sample_time":"23:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"21:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"19:54:41, 5 اسفند 1398"},{"value":23.9,"sample_time":"17:54:40, 5 اسفند 1398"},{"value":23.9,"sample_time":"15:54:41, 5 اسفند 1398"}]}
});
exports.getClimaAmariReport = catchAsync(async (req, res, next) => {

    console.log('Post a Customer: ' + JSON.stringify(req.body));

    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    const client_id = data["stationID"] * 1;
    const startDate = data["startDate"];
    const endDate = data["endDate"];
    const startHour = data["startTime"];
    const endHour = data["endTime"];
    const period = data["period"];
    let sensors = JSON.stringify(data["sensors"]);
    sensors = JSON.parse(sensors);

    let sensors_indexes = {'tmp':'0','wsp':'0','hum':'0','evp':'0','wdr':'0','rad':'0','prs':'0'};

    if(sensors['tmp']=='true')
        sensors_indexes['tmp']= channel_index_tmp_l;

    if(sensors['wsp']=='true')
        sensors_indexes['wsp']= channel_index_wsp_l;

    if(sensors['hum']=='true')
        sensors_indexes['hum']= channel_index_hum_l;

    if(sensors['evp']=='true')
        sensors_indexes['evp']= channel_index_evp_l;

    if(sensors['wdr']=='true')
        sensors_indexes['wdr']= channel_index_wdr_l;

    if(sensors['rad']=='true')
        sensors_indexes['rad']= channel_index_rad_l;

    if(sensors['prs']=='true')
        sensors_indexes['prs']= channel_index_prs_l;

    // console.log( '### ' + sensors_indexes );

    let startTime = startDate+ ' ' + startHour;
    let endTime = endDate+ ' ' + endHour;

    let climaAmariReport=undefined;
    console.log(`befor call: ${client_id}, ${sensors_indexes}, ${startTime},  ${endTime},   ${period}  `);
    climaAmariReport = await Values.getClimaAmariReport(client_id, sensors_indexes,startTime,endTime,period );

    var resultJson = JSON.stringify(climaAmariReport);
    resultJson = JSON.parse(resultJson);

    resultJson = resultJson[0];


    var resultJson = JSON.stringify(resultJson);
    resultJson = JSON.parse(resultJson);


    for(let i=0;i<resultJson.length;i++){
        resultJson[i]['sample_time']=myDate.convert_gdate_to_jdate(resultJson[i]['sample_time']);
    }

    var resultJson = JSON.stringify(resultJson);


    var apiResult = {};

    //add our JSON results to the data table
    //console.log(resultJson);
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult);


});
exports.getExcelClimaAmariReport = catchAsync(async (req, res, next) => {
    //console.log('Post a Customer: ' + JSON.stringify(req.body));
    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    const client_id = data["stationID"] * 1;
    const startDate = data["startDate"];
    const endDate = data["endDate"];
    const startHour = data["startTime"];
    const endHour = data["endTime"];
    const period = data["period"];
    let sensors = JSON.stringify(data["sensors"]);
    sensors = JSON.parse(sensors);

    let sensors_indexes = {'tmp':'0','wsp':'0','hum':'0','evp':'0','wdr':'0','rad':'0','prs':'0'};

    if(sensors['tmp']==true)
        sensors_indexes['tmp']= channel_index_tmp_l;

    if(sensors['wsp']==true)
        sensors_indexes['wsp']= channel_index_wsp_l;

    if(sensors['hum']==true)
        sensors_indexes['hum']= channel_index_hum_l;

    if(sensors['evp']==true)
        sensors_indexes['evp']= channel_index_evp_l;

    if(sensors['wdr']==true)
        sensors_indexes['wdr']= channel_index_wdr_l;

    if(sensors['rad']==true)
        sensors_indexes['rad']= channel_index_rad_l;

    if(sensors['prs']==true)
        sensors_indexes['prs']= channel_index_prs_l;

    // console.log( '### ' + JSON.stringify(sensors_indexes) );

    let startTime = startDate+ ' ' + startHour;
    let endTime = endDate+ ' ' + endHour;

    let climaAmariReport=undefined;

    console.log(`befor call: ${client_id}, ${sensors_indexes}, ${startTime},  ${endTime},   ${period}  `);
    climaAmariReport = await Values.getClimaAmariReport(client_id, sensors_indexes,startTime,endTime,period );

    var resultJson = JSON.stringify(climaAmariReport);
    resultJson = JSON.parse(resultJson);

    resultJson = resultJson[0];

    var resultJson = JSON.stringify(resultJson);
    resultJson = JSON.parse(resultJson);

    for(let i=0;i<resultJson.length;i++){
        resultJson[i]['sample_time']=myDate.convert_gdate_to_jdate(resultJson[i]['sample_time']);
    }

    //var resultJson = JSON.stringify(resultJson);


    var apiResult = {};

    // console.log(`resultJson: ${JSON.stringify(resultJson)}`);


    //console.log(resultJson);




    let tmp_labels = [];
    let tmp_values = [];
    let wsp_labels = [];
    let wsp_values = [];
    let hum_labels = [];
    let hum_values = [];
    let evp_labels = [];
    let evp_values = [];
    let wdr_labels = [];
    let wdr_values = [];
    let rad_labels = [];
    let rad_values = [];
    let prs_labels = [];
    let prs_values = [];
    resultJson.map(el => {
        if(el['sensor']=='tmp'){
            tmp_labels.push(el['sample_time']);
            tmp_values.push(el['value']);
        }
        if(el['sensor']=='wsp'){
            wsp_labels.push(el['sample_time']);
            wsp_values.push(el['value']);
        }
        if(el['sensor']=='hum'){
            hum_labels.push(el['sample_time']);
            hum_values.push(el['value']);
        }
        if(el['sensor']=='evp'){
            evp_labels.push(el['sample_time']);
            evp_values.push(el['value']);
        }
        if(el['sensor']=='wdr'){
            wdr_labels.push(el['sample_time']);
            wdr_values.push(el['value']);
        }
        if(el['sensor']=='rad'){
            rad_labels.push(el['sample_time']);
            rad_values.push(el['value']);
        }
        if(el['sensor']=='prs'){
            prs_labels.push(el['sample_time']);
            prs_values.push(el['value']);
        }
    })

    const workbook = new Excel.Workbook();
    // workbook.creator = 'Justin Williamson';
    // workbook.lastModifiedBy = 'Justin Williamson';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.date1904 = true;
    // // (optional) - Freeze the header
    // workbook.views = [
    //     {
    //         state: 'frozen',
    //         ySplit: 1,
    //     },
    // ];
    const worksheet = workbook.addWorksheet(req.body.sheetName || 'Sheet 1');

    //worksheet.columns = [{ header: '   تاریخ          و   ساعت', key: 'sample_time', width: 18, outlineLevel: 1 }];
    worksheet.columns = [
        { header: '   تاریخ          و   ساعت', key: 'sample_time', width: 18, outlineLevel: 1 },
        { header: 'دما', key: 'tmp', width: 10 },
        { header: 'سرعت باد', key: 'wsp', width: 10 },
        { header: 'رطوبت', key: 'hum', width: 10 },
        { header: 'تبخیر', key: 'evp', width: 10 },
        { header: 'جهت باد', key: 'wdr', width: 10 },
        { header: 'تشعشع', key: 'rad', width: 10 },
        { header: 'فشارهوا', key: 'prs', width: 10 }
    ];

    let def_labels = undefined;
    let spliceIndex = 2;
    if(tmp_labels.length >0) {
        def_labels = tmp_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex, 1);
    if(wsp_labels.length >0) {
        def_labels = wsp_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);
    if(hum_labels.length >0) {
        def_labels = hum_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);
    if(evp_labels.length >0) {
        def_labels = evp_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);
    if(wdr_labels.length >0) {
        def_labels = wdr_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);
    if(rad_labels.length >0) {
        def_labels = rad_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);
    if(prs_labels.length >0) {
        def_labels = prs_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);






    console.log(`worksheet.columns = ${worksheet.columns}`);
    let result_data = [];

    for(let i=0;i<def_labels.length;i++){
        let item = {};
        item['sample_time'] = def_labels[i];
        if(tmp_values.length >0){
            item['tmp'] = tmp_values[i];
        }
        if(wsp_values.length >0) {
            item['wsp'] = wsp_values[i];
        }
        if(hum_values.length >0){
            item['hum'] = hum_values[i];
        }
        if(evp_values.length >0){
            item['evp'] = evp_values[i];
        }
        if(wdr_values.length >0){
            item['wdr'] = wdr_values[i];
        }
        if(rad_values.length >0){
            item['rad'] = rad_values[i];
        }
        if(prs_values.length >0){
            item['prs'] = prs_values[i];
        }

        result_data.push(item);
    }

    //console.log(`result_data: ${JSON.stringify(result_data)}`);
    let rows = [];
    result_data.map(row => {
        rows.push(row);
    })
    worksheet.addRows(rows);
    // console.log(`rows = ${JSON.stringify(rows)}`);
    // Format the header text
    worksheet.getRow(1).font = {
        name: 'Arial Black',
        size: 10,
    };

    const fileName = 'clima-amari-report.xlsx';

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    const fileBuffer = await workbook.xlsx.writeBuffer()
    res.send(fileBuffer);
});
exports.getClimaMantagheiReport = catchAsync(async (req, res, next) => {
    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    const client_id = data["stationID"] * 1;
    const startDate = data["startDate"];
    const endDate = data["endDate"];
    const period = 1440;
    let sensors = JSON.stringify(data["sensors"]);
    sensors = JSON.parse(sensors);

    let sensors_indexes = {'tmp':'0','wsp':'0','hum':'0','evp':'0','wdr':'0','rad':'0','prs':'0'};

    if(sensors['tmp']=='true')
        sensors_indexes['tmp']= channel_index_tmp_l;

    if(sensors['wsp']=='true')
        sensors_indexes['wsp']= channel_index_wsp_l;

    if(sensors['hum']=='true')
        sensors_indexes['hum']= channel_index_hum_l;

    if(sensors['evp']=='true')
        sensors_indexes['evp']= channel_index_evp_l;

    if(sensors['wdr']=='true')
        sensors_indexes['wdr']= channel_index_wdr_l;

    if(sensors['rad']=='true')
        sensors_indexes['rad']= channel_index_rad_l;

    if(sensors['prs']=='true')
        sensors_indexes['prs']= channel_index_prs_l;

    // console.log( '### ' + sensors_indexes );

    let startTime = startDate;
    let endTime = endDate;

    let climaMantagheiReport=undefined;
    console.log(`befor call: ${client_id}, ${sensors_indexes}, ${startTime},  ${endTime},   ${period}  `);
    climaMantagheiReport = await Values.getClimaAmariReport(client_id, sensors_indexes,startTime,endTime,period );

    var resultJson = JSON.stringify(climaMantagheiReport);
    resultJson = JSON.parse(resultJson);

    resultJson = resultJson[0];


    var resultJson = JSON.stringify(resultJson);
    resultJson = JSON.parse(resultJson);


    for(let i=0;i<resultJson.length;i++){
        resultJson[i]['sample_time']=myDate.convert_gdate_to_jdate_2(resultJson[i]['sample_time']);
    }

    var resultJson = JSON.stringify(resultJson);


    var apiResult = {};

    //add our JSON results to the data table
    //console.log(resultJson);
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult);


});
exports.getEXcelClimaMantagheiReport = catchAsync(async (req,res,next)=>{
    let data = JSON.stringify(req.body);
    data = JSON.parse(data);

    const client_id = data["stationID"] * 1;
    const startDate = data["startDate"];
    const endDate = data["endDate"];
    const period = 1440;
    let sensors = JSON.stringify(data["sensors"]);
    sensors = JSON.parse(sensors);

    let sensors_indexes = {'tmp':'0','wsp':'0','hum':'0','evp':'0','wdr':'0','rad':'0','prs':'0'};

    if(sensors['tmp']==true)
        sensors_indexes['tmp']= channel_index_tmp_l;

    if(sensors['wsp']==true)
        sensors_indexes['wsp']= channel_index_wsp_l;

    if(sensors['hum']==true)
        sensors_indexes['hum']= channel_index_hum_l;

    if(sensors['evp']==true)
        sensors_indexes['evp']= channel_index_evp_l;

    if(sensors['wdr']==true)
        sensors_indexes['wdr']= channel_index_wdr_l;

    if(sensors['rad']==true)
        sensors_indexes['rad']= channel_index_rad_l;

    if(sensors['prs']==true)
        sensors_indexes['prs']= channel_index_prs_l;

    // console.log( '### ' + JSON.stringify(sensors_indexes) );

    let startTime = startDate;
    let endTime = endDate;

    let stnName = undefined;
    let stnCode = undefined;
    let zoneName = undefined;
    let riverName = undefined;
    let longitude = undefined;
    let latitude = undefined;
    let utmX = undefined;
    let utmY = undefined;
    let height = undefined;
    let establishYear = undefined;
    const stateName= process.env.STATE_NAME;
    const organizationCode= process.env.ORGANIZATION_CODE;
    await Stn.find({"client_id": client_id}).
    then(stn => {
        console.log(`stn['station_name'] ==>> ${stn[0].longitude}`);
        stnName =  stn[0].station_name;
        stnCode=  stn[0].station_code;
        zoneName=  stn[0].zone_name;
        riverName=  stn[0].river_name;
        longitude=  stn[0].longitude ;
        latitude = stn[0].latitude ;
        utmX=  stn[0].utm_x;
        utmY=  stn[0].utm_y;
        height=  stn[0].height;
        establishYear=  stn[0].establish_year;
    }).
    catch(err => {
        console.log('Caught:', err.message)
    });

    let rainMantagheiReport = await Values.getRainMantagheiReport(client_id, channel_index_rainc_total,startTime,endTime);
    let climaMantagheiReport = await Values.getClimaAmariReport(client_id, sensors_indexes,startTime,endTime,period );

    let rainResultJson2 =  [];
    let rainResultJson = rainMantagheiReport[0];

    for(let i=0;i<rainResultJson.length;i++){
        if(rainResultJson[i]['time_0']!='1111-11-11 00:00:00')
            rainResultJson[i]['time_0']=myDate.convert_gdate_to_jdate(rainResultJson[i]['time_0']);
        if(rainResultJson[i]['time_6_30']!='1111-11-11 00:00:00')
            rainResultJson[i]['time_6_30']=myDate.convert_gdate_to_jdate(rainResultJson[i]['time_6_30']);
        if(rainResultJson[i]['time_18_30']!='1111-11-11 00:00:00')
            rainResultJson[i]['time_18_30']=myDate.convert_gdate_to_jdate(rainResultJson[i]['time_18_30']);
        if(rainResultJson[i]['time_24_00']!='1111-11-11 00:00:00')
            rainResultJson[i]['time_24_00']=myDate.convert_gdate_to_jdate(rainResultJson[i]['time_24_00']);
    }

    for(let i=0;i<rainResultJson.length;i++){
        let item = {'month':'','day':'','val_6_30':-1,'val_18_30':-1,'val_24_00':-1};
        if(rainResultJson[i]['time_0']!='1111-11-11 00:00:00') {
            item['month'] = myDate.get_name_of_month_of_given_date(rainResultJson[i]['time_0']);
            item['day'] = myDate.get_number_of_day_of_given_date(rainResultJson[i]['time_0']);
            if (rainResultJson[i]['val_6_30'] != -1 && rainResultJson[i]['val_0'] != -1) {
                item['val_6_30'] = rainResultJson[i]['val_6_30'] - rainResultJson[i]['val_0'];
            }
            if (rainResultJson[i]['val_18_30'] != -1 && rainResultJson[i]['val_6_30'] != -1) {
                item['val_18_30'] = rainResultJson[i]['val_18_30'] - rainResultJson[i]['val_6_30'];
            }
            if (rainResultJson[i]['val_24_00'] != -1 && rainResultJson[i]['val_0'] != -1) {
                item['val_24_00'] = rainResultJson[i]['val_24_00'] - rainResultJson[i]['val_0'];
            }
            rainResultJson2.push(item);
        }
    }
    rainResultJson2 = JSON.stringify(rainResultJson2);
    rainResultJson2 = JSON.parse(rainResultJson2);










    let climaResultJson = JSON.stringify(climaMantagheiReport);
    climaResultJson = JSON.parse(climaResultJson);

    climaResultJson = climaResultJson[0];

    for(let i=0;i<climaResultJson.length;i++){
        climaResultJson[i]['sample_time']=myDate.convert_gdate_to_jdate_2(climaResultJson[i]['sample_time']);
    }

    let tmp_labels = [];
    let tmp_values = [];
    let wsp_labels = [];
    let wsp_values = [];
    let hum_labels = [];
    let hum_values = [];
    let evp_labels = [];
    let evp_values = [];
    let wdr_labels = [];
    let wdr_values = [];
    let rad_labels = [];
    let rad_values = [];
    let prs_labels = [];
    let prs_values = [];
    climaResultJson.map(el => {
        if(el['sensor']=='tmp'){
            tmp_labels.push(el['sample_time']);
            tmp_values.push(el['value']);
        }
        if(el['sensor']=='wsp'){
            wsp_labels.push(el['sample_time']);
            wsp_values.push(el['value']);
        }
        if(el['sensor']=='hum'){
            hum_labels.push(el['sample_time']);
            hum_values.push(el['value']);
        }
        if(el['sensor']=='evp'){
            evp_labels.push(el['sample_time']);
            evp_values.push(el['value']);
        }
        if(el['sensor']=='wdr'){
            wdr_labels.push(el['sample_time']);
            wdr_values.push(el['value']);
        }
        if(el['sensor']=='rad'){
            rad_labels.push(el['sample_time']);
            rad_values.push(el['value']);
        }
        if(el['sensor']=='prs'){
            prs_labels.push(el['sample_time']);
            prs_values.push(el['value']);
        }
    })

    const workbook = new Excel.Workbook();
    // workbook.creator = 'Justin Williamson';
    // workbook.lastModifiedBy = 'Justin Williamson';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.date1904 = true;
    // // (optional) - Freeze the header
    // workbook.views = [
    //     {
    //         state: 'frozen',
    //         ySplit: 1,
    //     },
    // ];
    const worksheet = workbook.addWorksheet(req.body.sheetName || 'Sheet 1');

    //worksheet.columns = [{ header: '   تاریخ          و   ساعت', key: 'sample_time', width: 18, outlineLevel: 1 }];
    worksheet.columns = [
        { header: '   تاریخ          و   ساعت', key: 'sample_time', width: 18, outlineLevel: 1 },
        { header: 'دما', key: 'tmp', width: 10 },
        { header: 'سرعت باد', key: 'wsp', width: 10 },
        { header: 'رطوبت', key: 'hum', width: 10 },
        { header: 'تبخیر', key: 'evp', width: 10 },
        { header: 'جهت باد', key: 'wdr', width: 10 },
        { header: 'تشعشع', key: 'rad', width: 10 },
        { header: 'فشارهوا', key: 'prs', width: 10 }
    ];

    let def_labels = undefined;
    let spliceIndex = 2;
    if(tmp_labels.length >0) {
        def_labels = tmp_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex, 1);
    if(wsp_labels.length >0) {
        def_labels = wsp_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);
    if(hum_labels.length >0) {
        def_labels = hum_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);
    if(evp_labels.length >0) {
        def_labels = evp_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);
    if(wdr_labels.length >0) {
        def_labels = wdr_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);
    if(rad_labels.length >0) {
        def_labels = rad_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);
    if(prs_labels.length >0) {
        def_labels = prs_labels;
        spliceIndex++;
    }
    else
        worksheet.spliceColumns(spliceIndex,1);






    console.log(`worksheet.columns = ${worksheet.columns}`);
    let result_data = [];

    for(let i=0;i<def_labels.length;i++){
        let item = {};
        item['sample_time'] = def_labels[i];
        if(tmp_values.length >0){
            item['tmp'] = tmp_values[i];
        }
        if(wsp_values.length >0) {
            item['wsp'] = wsp_values[i];
        }
        if(hum_values.length >0){
            item['hum'] = hum_values[i];
        }
        if(evp_values.length >0){
            item['evp'] = evp_values[i];
        }
        if(wdr_values.length >0){
            item['wdr'] = wdr_values[i];
        }
        if(rad_values.length >0){
            item['rad'] = rad_values[i];
        }
        if(prs_values.length >0){
            item['prs'] = prs_values[i];
        }

        result_data.push(item);
    }

    //console.log(`result_data: ${JSON.stringify(result_data)}`);
    let rows = [];
    result_data.map(row => {
        rows.push(row);
    })
    worksheet.addRows(rows);
    // console.log(`rows = ${JSON.stringify(rows)}`);
    // Format the header text
    worksheet.getRow(1).font = {
        name: 'Arial Black',
        size: 10,
    };

    const fileName = 'clima-amari-report.xlsx';

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    const fileBuffer = await workbook.xlsx.writeBuffer()
    res.send(fileBuffer);
});