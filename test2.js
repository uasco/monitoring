const mongoose = require('mongoose');
const dotenv = require('dotenv');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
// const Station = require('./models2/stationModel');
// const Values = require('./models2/valuesModel');

let my_date = require('./utils/my_date');
const Values = require('./testValuesModel');
const Status = require('./test');
const Stn = require('./models/stnModel');
const moment = require('moment');
dotenv.config({ path: './config.env' });
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
const rain_alarm1_period= process.env.RAIN_ALARM1_PERIOD;
const rain_alarm8_period= process.env.RAIN_ALARM8_PERIOD;
const rain_alarm1_height= process.env.RAIN_ALARM1_HEIGHT;
const rain_alarm8_height= process.env.RAIN_ALARM8_HEIGHT;
const level_flood_height_diff= process.env.LEVEL_ALARM_HEIGHT_DIFF;
const level_flood_start_sample_count= process.env.LEVEL_FLOOD_START_SAMPLE_COUNT;
const level_flood_stop_sample_count= process.env.LEVEL_FLOOD_STOP_SAMPLE_COUNT;
const level_flood_stop_enough_time= process.env.LEVEL_FLOOD_STOP_ENOUGH_TIME;

const start_stop_rain_period= process.env.START_STOP_RAIN_PERIOD;

const DB = process.env.DATABASE_LOCAL;
mongoose
    .connect(DB, {
        auth: {
            user: process.env.DB_USER,
            password: process.env.DATABASE_PASSWORD,
            port: process.env.DB_PORT
        },
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connection successful!'));



async  function setStationStatus(stnType,stnID,statusType,status,flood_started_time,lastSampleTime) {
    let date = new Date(); //ex 2019-01-18T16:26:44.982Z
    let offset = - date.getTimezoneOffset();
    date.setMinutes(date.getMinutes()+offset);
    if(stnType==='rain'){
        if(statusType==='start'){
            await Stn.findOneAndUpdate({ client_id:stnID },{$set:{rain_start:status,rain_start_time:date}});
        }
        if(statusType==='stop'){
            await Stn.findOneAndUpdate({ client_id:stnID },{$set:{rain_start:status,rain_stop_time:date}});
        }
        if(statusType==='alarm1'){
            if(status)
                await Stn.findOneAndUpdate({ client_id:stnID },{$set:{rain_alarm_1m:status,rain_alarm1_start_time:date}});
            else
                await Stn.findOneAndUpdate({ client_id:stnID },{$set:{rain_alarm_1m:status,rain_alarm1_stop_time:date}});
        }
        if(statusType==='alarm8'){
            if(status)
                await Stn.findOneAndUpdate({ client_id:stnID },{$set:{rain_alarm_8m:status,rain_alarm1_start_time:date}});
            else
                await Stn.findOneAndUpdate({ client_id:stnID },{$set:{rain_alarm_8m:status,rain_alarm1_stop_time:date}});
        }
    }else if(stnType==='level'){
        if(statusType==='flood'){
            if(status)
                await Stn.findOneAndUpdate({ client_id:stnID },{$set:{flood:status,flood_start_time:flood_started_time,last_time_check:lastSampleTime}});
            else
                await Stn.findOneAndUpdate({ client_id:stnID },{$set:{flood:status,flood_stop_time:date,last_time_check:lastSampleTime}});
        }
    }
}
async  function setStationLastTimeCheck(stnType,stnID,lastSampleTime) {
    if(stnType==='rain'){
       await Stn.findOneAndUpdate({ client_id:stnID },{$set:{last_time_check:lastSampleTime}});
    }else if(stnType==='level'){
        // console.log('inja');
       await Stn.findOneAndUpdate({ client_id:stnID },{$set:{last_time_check:lastSampleTime}});
    }
}
async function enoughSpentTimeAfterRainStop(stnID,statusType) {
    const res = await Stn.findOne({ client_id:stnID });
    //console.log(`res = ${res}`);
    let cd = new Date();
    let diff = Math.abs(res.rain_start_time - cd);
    let diffm = Math.ceil(diff / (1000 * 60 ));
    //console.log(`diffm = ${diffm}` );
    if(diffm >= start_stop_rain_period ){
        return true ;
    }else{
        return false;
    }
}
async function enoughSpentTimeAfterFloodStart(flood_started_time) {
    let now = new Date();
    now = my_date.convert_mongodate_to_isodate(now);
    let a = moment(now,'YYYY-MM-DD HH:mm:ss');
    let b = moment(flood_started_time,'YYYY-MM-DD HH:mm:ss');
    let diff = a.diff(b, 'minutes');

    // let diff = Math.abs( now - flood_started_time);
    // let diffm = Math.ceil(diff / (1000 * 60 ));
    console.log(`enough = ${now} >>> ${flood_started_time} >>> ${diff}`);
    console.log(`diff = ${diff}` );
    if(diff >= level_flood_stop_enough_time ){
        return true ;
    }else{
        return false;
    }
}
async function getStatus(stnID,statusType) {
    const res = await Stn.findOne({client_id: stnID});
    // console.log(`res = ${res}`);
    if (statusType === 'rain-start') {
        return  res.rain_start;
    } else if (statusType === 'alarm1') {
        return  res.rain_alarm1;
    } else if (statusType === 'alarm8') {
        return  res.rain_alarm8;
    }
    else if (statusType === 'flood') {
        return  {'flood':res.flood,'flood_started_time':res.flood_start_time};
    }
}
async function checkNewData(stnID){
    const res = await Stn.findOne({client_id: stnID});
    console.log(`from newData :res :  ${JSON.stringify(res)}`);
    if(res.last_time_check != undefined){
        let lastTimeCheck = my_date.convert_mongodate_to_isodate(res.last_time_check);
        let lastSampleTime = await Values.getLastSampleTime(stnID,channel_index_level);
        console.log(`from newData :lastSampleTime :  ${JSON.stringify(lastSampleTime)}`);
        lastSampleTime = lastSampleTime[0]['sample_time'];

        if(lastSampleTime > lastTimeCheck)
            return true;
        else
            return false;
    }else
        return  true;
}
async function isFloodStoped(stnID,statusType) {
    const res = await Stn.findOne({ client_id:stnID });
    //console.log(`res = ${res}`);
    let cd = new Date();
    let diff = Math.abs(res.rain_start_time - cd);
    let diffh = Math.ceil(diff / (1000 * 60 ));
    //console.log(`diffh = ${diffh}` );
    if(diffh >= 4 ){
        return true ;
    }else{
        return false;
    }
}
exports.getRainStartStatus = catchAsync(async (req, res, next) => {
    // console.log(`url === ${req.url.split('/')[1]}`);
    const rain_rainrc_rainc = req.url.split('/')[1];
    const client_id = req.params.id * 1;
    let channelIndexRainTotal = undefined;
    if(rain_rainrc_rainc === 'rain')
        channelIndexRainTotal = channel_index_rain_total;
    else if(rain_rainrc_rainc === 'rainrc' )
        channelIndexRainTotal = channel_index_rainc_total;
    else if(rain_rainrc_rainc === 'rainc' )
        channelIndexRainTotal = channel_index_rainc_total;

    let result = await Status.getRainStartStatus2(client_id,channelIndexRainTotal,start_stop_rain_period);
    let resultJson = JSON.stringify(result);
    resultJson = JSON.parse(resultJson);

    //let st = await getStatus(client_id,'rain-start');
    if(result===1){//it's raining
        resultJson =1;
    }else if(result===0){//it's not raining
        resultJson = 0;
    }
    let apiResult = {};
    apiResult.data = resultJson;
    res.json(apiResult);
});
exports.getRainAlarm1Status = catchAsync(async (req, res) => {
    const client_id = req.params.id * 1;
    const rain_rainrc_rainc = req.url.split('/')[1];
    let channelIndexRainTotal = undefined;
    if(rain_rainrc_rainc === 'rain')
        channelIndexRainTotal = channel_index_rain_total;
    else if(rain_rainrc_rainc === 'rainrc' )
        channelIndexRainTotal = channel_index_rainc_total;
    else if(rain_rainrc_rainc === 'rainc' )
        channelIndexRainTotal = channel_index_rainc_total;
    let result = await Status.getRainAlarmStatus(client_id,channelIndexRainTotal,rain_alarm1_period,rain_alarm1_height);
    let resultJson = JSON.stringify(result);
    resultJson = JSON.parse(resultJson);

    // let st = await getStatus(client_id,'alarm1');
    if(result===1){//shower
        resultJson =1;
        // if( !st) //no shower already
        //     await setStationStatus('rain',client_id,'alarm1',true);
    }else if(result===0){//No shower
        resultJson = 0;//rain stopped and enaugh  spent after stop
        // if(st) //shower already
        //     await setStationStatus('rain', client_id, 'alarm1', false);
    }
    let apiResult = {};
    apiResult.data = resultJson;
    res.json(apiResult);
});
exports.getRainAlarm8Status = catchAsync(async (req, res) => {
    const client_id = req.params.id * 1;
    const rain_rainrc_rainc = req.url.split('/')[1];
    let channelIndexRainTotal = undefined;

    if(rain_rainrc_rainc === 'rain')
        channelIndexRainTotal = channel_index_rain_total;
    else if(rain_rainrc_rainc === 'rainrc' )
        channelIndexRainTotal = channel_index_rainc_total;
    else if(rain_rainrc_rainc === 'rainc' )
        channelIndexRainTotal = channel_index_rainc_total;

    let result = await Status.getRainAlarmStatus(client_id,channelIndexRainTotal,rain_alarm8_period,rain_alarm8_height);
    let resultJson = JSON.stringify(result);
    resultJson = JSON.parse(resultJson);

    // let st = await getStatus(client_id,'alarm8');
    if(result===1){//shower
        resultJson =1;
        // if( !st) //no shower already
        //     await setStationStatus('rain',client_id,'alarm8',true);
    }else if(result===0){//No shower
        resultJson = 0;//rain stopped and enaugh  spent after stop
        // if(st) //shower already
        //     await setStationStatus('rain', client_id, 'alarm8', false);
    }
    let apiResult = {};
    apiResult.data = resultJson;
    res.json(apiResult);
});
exports.getLevelFloodStatus = catchAsync(async (req, res) => {

    let client_id = 136;
    let channelIndexLevel = channel_index_level;

    let newData = await checkNewData(client_id);

    let floodStatusAndTime = await getStatus(136,'flood');
    console.log(`floodStatusAndTime = ${JSON.stringify(floodStatusAndTime)}`);
    let st = floodStatusAndTime['flood'];
    let flood_started_time = floodStatusAndTime['flood_started_time'];
    flood_started_time = my_date.convert_mongodate_to_isodate(flood_started_time);
    console.log(`flood_started_time = ${flood_started_time}`);
    console.log(`st = ${st}`);
    let resultJson = undefined;

    let flood = 0;
    let lastSampleTime = undefined;
    if(!st) {//no flood already
        if (!newData){
            resultJson = 0;
            console.log('dade jadid mojood nist');
        }else{
            let result = await Status.getLevelFloodStart2(client_id,channelIndexLevel,level_flood_start_sample_count,level_flood_height_diff);
            console.log(`from status controller flood start check= ${JSON.stringify(result)}`);
            // JSON.stringify(result) => [{"@flood":1,"@flood_started_time":"2020-08-02 06:04:01"}]
            resultJson = JSON.stringify(result);
            resultJson = JSON.parse(resultJson);
            flood = result[0]['@flood'];
            flood_started_time = result[0]['@flood_started_time'];
            lastSampleTime = result[0]['@last_sample_time'];
            console.log(`flood_started_time = ${flood_started_time}`);
            if(flood===1) {//flood-start
                await setStationStatus('level',client_id,'flood',true,flood_started_time,lastSampleTime);
                resultJson =1;
            }else if(flood===0) {//no flood-start
                console.log('inja1');
                await setStationLastTimeCheck('level',client_id,lastSampleTime)
                resultJson = 0;
            }
        }

    }
    else if(st){//flood already
        if (!newData){
            let enough = await enoughSpentTimeAfterFloodStart(flood_started_time);
            if(enough){
                console.log(`enough time spent after flood started at  = ${JSON.stringify(flood_started_time)}`);
                resultJson =0;
                await setStationStatus('level',client_id,'flood',false);
            }else{
                resultJson =1;
            }
            console.log('dade jadid mojood nist');
        }else{
            let result = await Status.getLevelFloodStop2(client_id,channelIndexLevel,level_flood_height_diff,level_flood_stop_sample_count,flood_started_time);
            console.log(`from status controller flood stop check = ${JSON.stringify(result)}`);
            //result => [{"@flood_stop":0}]

            result = result[0]['@flood_stop'];
            lastSampleTime = result[0]['@last_sample_time'];
            console.log(`result = ${result}`);
            if(result===1){//flood stoped
                let enough = await enoughSpentTimeAfterFloodStart(flood_started_time);
                if(enough){
                    console.log(`enough time spent after flood started at  = ${JSON.stringify(flood_started_time)}`);
                    resultJson =0;
                    await setStationStatus('level',client_id,'flood',false,lastSampleTime);
                }else{
                    resultJson =1;
                }
            }else if(result===0) {//flood has not stoped yet
                await setStationLastTimeCheck('level',client_id,lastSampleTime)
                resultJson =1;
            }
        }

    }




    // let apiResult = {};
    // apiResult.data = resultJson;
    // res.json(apiResult);
});
exports.getLevelFloodStop = catchAsync(async (req, res) => {
    const client_id = req.params.id * 1;
    let channelIndexLevel = channel_index_level;
    let result = await Status.getLevelFloodStop(client_id,channelIndexLevel,level_alarm_height_diff,level_flood_sample_count);
    let resultJson = JSON.stringify(result);
    resultJson = JSON.parse(resultJson);
    if(result===1){//shower
        resultJson =1;
        await setStationStatus('level',client_id,'flood',false);
    }
    // else if(result===0){//No shower
    //     resultJson = 0;//rain stopped and enaugh  spent after stop
    //     if(st) //shower already
    //         await setStationStatus('level', client_id, 'flood', false);
    // }
    let apiResult = {};
    apiResult.data = resultJson;
    res.json(apiResult);
});
const channel_indexes = {
    'rainc': { '12': channel_index_rainc_12, '24': channel_index_rainc_24, 't': channel_index_rainc_total },
    'tmp': { 'l': channel_index_tmp_l, 'a': channel_index_tmp_a, 'x': channel_index_tmp_x, 'n': channel_index_tmp_n },
    'hum': { 'l': channel_index_hum_l, 'a': channel_index_hum_a, 'x': channel_index_hum_x, 'n': channel_index_hum_n },
    'prs': { 'l': channel_index_prs_l, 'a': channel_index_prs_a, 'x': channel_index_prs_x, 'n': channel_index_prs_n },
    'wsp': { 'l': channel_index_wsp_l, 'a': channel_index_wsp_a, 'x': channel_index_wsp_x, 'n': channel_index_wsp_n },
    'wdr': { 'l': channel_index_wdr_l, 'a': channel_index_wdr_a, 'x': channel_index_wdr_x, 'n': channel_index_wdr_n },
    'evp': { 'l': channel_index_evp_l, 'a': channel_index_evp_a, 'x': channel_index_evp_x, 'n': channel_index_evp_n },
    'rad': { 'l': channel_index_rad_l, 'a': channel_index_rad_a, 'x': channel_index_rad_x, 'n': channel_index_rad_n }
}
exports.getClimaAlarmStatus = catchAsync(async (req, res, next) => {
    const client_id = req.params.id * 1;
    const sensor = req.url.split('/')[2];
    let values = undefined;
    //console.log("sensor============");
    //console.log(sensor);
    if (sensor === 'rainc') {
        values = await Values.getRainValues(client_id, channel_indexes[sensor]['12'], channel_indexes[sensor]['24'], channel_indexes[sensor]['t']);
    } else {
        values = await Values.getClimaValues(client_id, sensor, channel_indexes[sensor]);
    }

    let resultJson = JSON.stringify(values);
    resultJson = JSON.parse(resultJson);
    ////////////////////////
    //console.log('resultJson["data"] ====');
    //console.log(resultJson);
    if(resultJson.length>0){
        resultJson.map(el => {
            let d = el.sample_time;
            //"2020-01-14T07:47:12.000Z"
            d = moment(d, 'YYYY-M-D HH:mm:ss').format('HH:mm , jD jMMMM jYYYY');
            el.sample_time = d;
        })
    }

    ///////////////////////

    let apiResult = {};

    //add our JSON results to the data table
    apiResult.data = resultJson;

    //send JSON to Express
    res.json(apiResult); //{"data":[{"value":0},{"value":0},{"value":12.2}]}
});
