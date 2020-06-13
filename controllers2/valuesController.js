const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
const Values = require('../models2/valuesModel');
const myDate = require('../utils/my_date');
//const Sensor = require('../models2/sensorModel');

/////
var my_date = require('../utils/my_date');
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

exports.getRainAmariReport = catchAsync(async (req, res, next) => {

    const client_id = req.params.id * 1;
    const startDate = req.params.sd;
    const endDate = req.params.ed;
    const startHour = req.params.sh;
    const endHour = req.params.eh;
    const period = req.params.p;

    console.log(client_id + '###' + startDate+startHour + '###' + endDate + '###' + endHour + '###' + period);

    let startTime = startDate+ ' ' + startHour;
    let endTime = endDate+ ' ' + endHour;

    let minutes = my_date.subtract_times(endDate,startDate,endHour,startHour);
    console.log(`minutes ========== ${minutes}`);

    const rainAmariReport = await Values.getRainAmariReport(client_id, channel_index_rain_total,startTime,endTime,period );
    var resultJson = JSON.stringify(rainAmariReport);
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
    const startDate = req.params.sd;
    const endDate = req.params.ed;
    const startHour = req.params.sh;
    const endHour = req.params.eh;
    const period = req.params.p;
    const rainType = req.params.rt;
    console.log(client_id + '###' + startDate+startHour + '###' + endDate + '###' + endHour + '###' + period);
    let startTime = startDate+ ' ' + startHour;
    let endTime = endDate+ ' ' + endHour;
    let minutes = my_date.subtract_times(endDate,startDate,endHour,startHour);
    console.log(`minutes ========== ${minutes}`);
    const rainAmariReport = await Values.getRainAmariReport(client_id, channel_index_rain_total,startTime,endTime,period );
    var resultJson = JSON.stringify(rainAmariReport);
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
    // var resultJson = JSON.stringify(resultJson);
    // var apiResult = {};
    // //add our JSON results to the data table
    // //console.log(resultJson);
    // apiResult.data = resultJson;

//----------------------------------------------------------------------------------------------

//     // Create a new instance of a Workbook class
//     let workbook = new xl.Workbook();
// // Add Worksheets to the workbook
//     let worksheet = workbook.addWorksheet('Sheet 1');
// // Create a reusable style
//     let style = workbook.createStyle({
//         font: {
//             color: '#FF0800',
//             size: 12
//         },
//         numberFormat: '$#,##0.00; ($#,##0.00); -'
//     });
// // Set value of cell A1 to 100 as a number type styled with paramaters of style
//     worksheet.cell(1,1).number(100).style(style);
// // Set value of cell B1 to 300 as a number type styled with paramaters of style
//     worksheet.cell(1,2).number(200).style(style);
// // Set value of cell C1 to a formula styled with paramaters of style
//     worksheet.cell(1,3).formula('A1 + B1').style(style);
// // Set value of cell A2 to 'string' styled with paramaters of style
//     worksheet.cell(2,1).string('string').style(style);
// // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
//     worksheet.cell(3,1).bool(true).style(style).style({font: {size: 14}});
//     console.log('THIS IS EXCEL :');
//     console.log(workbook);
//     //workbook.write('Excel.xlsx');
//     let fileName = 'Excel.xlsx';
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
//     workbook.write('Excel1.xlsx', res);
//     console.log('//////////////////////////////////////////////////////////////////////');
//     console.log(res);
//-----------------------------------------------------------------------------------------------
    //console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //console.log(resultJson);



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
    // res.type('application/octet-stream');
    // res.set('Content-Disposition', `attachment;filename="${fileName}"`);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    // await workbook.xlsx.writeBuffer(res);
    // res.end();

    const fileBuffer = await workbook.xlsx.writeBuffer()
    res.send(fileBuffer);
    // return workbook.xlsx.writeBuffer()
    //      .then(buffer => res.send(buffer))
    //      .catch(next);






//     // Create workbook & add worksheet
//     const workbook = new Excel.Workbook();
//     const worksheet = workbook.addWorksheet('ExampleSheet');
//
// // add column headers
//     worksheet.columns = [
//         { header: 'Package', key: 'package_name' },
//         { header: 'Author', key: 'author_name' }
//     ];
//
// // Add row using key mapping to columns
//     worksheet.addRow(
//         { package_name: "ABC", author_name: "Author 1" },
//         { package_name: "XYZ", author_name: "Author 2" }
//     );
//
// // Add rows as Array values
//     worksheet
//         .addRow(["BCD", "Author Name 3"]);
//
// // Add rows using both the above of rows
//     const rows = [
//         ["FGH", "Author Name 4"],
//         { package_name: "PQR", author_name: "Author 5" }
//     ];
//
//
//     worksheet
//         .addRows(rows);
//
// // save workbook to disk
// //     workbook.xlsx.writeFile('myex.xlsx')
// //         .then(() => {
// //             console.log("saved");
// //         })
// //         .catch((err) => {
// //             console.log("err", err);
// //         });
//     const options = {
//         base64: true,
//     };
//     return workbook.xlsx.writeBuffer(options)
//              .then(buffer => res.send(buffer))
//              .catch(next);



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
