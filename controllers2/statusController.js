const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Station = require('../models2/stationModel');
const Status = require('../models2/statusModel');
const Stn = require('../models/stnModel');
let my_date = require('../utils/my_date');
const moment = require('moment');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});
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
const rain_start_height= process.env.RAIN_START_HEIGHT;
const rain_alarm1_period= process.env.RAIN_ALARM1_PERIOD;
const rain_alarm8_period= process.env.RAIN_ALARM8_PERIOD;
const rain_alarm1_height= process.env.RAIN_ALARM1_HEIGHT;
const rain_alarm8_height= process.env.RAIN_ALARM8_HEIGHT;
const level_flood_height_diff= process.env.LEVEL_ALARM_HEIGHT_DIFF;
const level_flood_start_sample_count= process.env.LEVEL_FLOOD_START_SAMPLE_COUNT;
const level_flood_stop_sample_count= process.env.LEVEL_FLOOD_STOP_SAMPLE_COUNT;
const level_flood_stop_enough_time= process.env.LEVEL_FLOOD_STOP_ENOUGH_TIME;

const start_stop_rain_period= process.env.START_STOP_RAIN_PERIOD;
const rain_stop_time_no_data= process.env.RAIN_STOP_TIME_NO_DATA;
async  function setRainStationStartStatus(stnID,status,rainStartTime,lastSampleTime) {
    let date = new Date(); //ex 2019-01-18T16:26:44.982Z
    let offset = - date.getTimezoneOffset();
    date.setMinutes(date.getMinutes()+offset);

        if(status)
            await Stn.findOneAndUpdate({ client_id:stnID },{$set:{rain_start:status,rain_start_time:rainStartTime,last_time_check:lastSampleTime}});
        else
            await Stn.findOneAndUpdate({ client_id:stnID },{$set:{rain_start:status,rain_stop_time:date,last_time_check:lastSampleTime}});

}
async  function setRainStationAlarmStatus(stnID,statusType,status) {
    let date = new Date(); //ex 2019-01-18T16:26:44.982Z
    let offset = - date.getTimezoneOffset();
    date.setMinutes(date.getMinutes()+offset);
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
}
async  function setLevelStationFloodStatus(stnID,status,flood_started_time,lastSampleTime) {
    let date = new Date(); //ex 2019-01-18T16:26:44.982Z
    // let offset = - date.getTimezoneOffset();
    // date.setMinutes(date.getMinutes()+offset);
    if(status){
        await Stn.findOneAndUpdate({ client_id:stnID },{$set:{flood:status,flood_start_time:flood_started_time,last_time_check:lastSampleTime}});
        logger.info('setLevelStationFloodStatus', { message: `time : ${new Date()} , status : ${status} ${lastSampleTime}` });
    }
    else{
        await Stn.findOneAndUpdate({ client_id:stnID },{$set:{flood:status,flood_stop_time:date,last_time_check:lastSampleTime}});
        logger.info('setLevelStationFloodStatus', { message: `time : ${new Date()} , status : ${status}` });
    }
}
async  function setStationLastTimeCheck(stnType,stnID,lastSampleTime) {
    if(stnType==='rain'){
        await Stn.findOneAndUpdate({ client_id:stnID },{$set:{last_time_check:lastSampleTime}});
    }else if(stnType==='level'){
        await Stn.findOneAndUpdate({ client_id:stnID },{$set:{last_time_check:lastSampleTime}});
    }
}
exports.setStationLastTimeCheck = catchAsync(async (stnType,stnID,lastSampleTime) => {
    await setStationLastTimeCheck(stnType,stnID,lastSampleTime);
});
async function enoughSpentTimeAfterRainStop(stnID,statusType) {
    const res = await Stn.findOne({ client_id:stnID });
    //console.log(`res = ${res}`);
    let cd = new Date();
    let diff = Math.abs(res.rain_start_time - cd);
    let diffh = Math.ceil(diff / (1000 * 60 ));
    //console.log(`diffh = ${diffh}` );
    if(diffh >= start_stop_rain_period ){
        return true ;
    }else{
        return false;
    }
}
async function enoughSpentTimeWithoutNewData(lastSampleTime){
    let now = new Date();
    now.setHours(now.getHours() - 1);
    now = my_date.convert_mongodate_to_isodate(now);
    let a = moment(now,'YYYY-MM-DD HH:mm:ss');
    let b = moment(lastSampleTime,'YYYY-MM-DD HH:mm:ss');
    let diff = a.diff(b, 'minutes');
    console.log(`enoughSpentTimeWithoutNewData = ${now} >>> ${flood_started_time} >>> ${diff}`);
    if(diff >= rain_stop_time_no_data ){
        return true ;
    }else{
        return false;
    }
}
async function enoughSpentTimeAfterFloodStart(flood_started_time) {
    let now = new Date();
    now.setHours(now.getHours() - 1);
    now = my_date.convert_mongodate_to_isodate(now);

    let a = moment(now,'YYYY-MM-DD HH:mm:ss');
    let b = moment(flood_started_time,'YYYY-MM-DD HH:mm:ss');
    let diff = a.diff(b, 'minutes');

    // let diff = Math.abs( now - flood_started_time);
    // let diffm = Math.ceil(diff / (1000 * 60 ));
    console.log(`enoughSpentTimeAfterFloodStart = ${now} >>> ${flood_started_time} >>> ${diff}`);
    console.log(`diff = ${diff}` );
    if(diff >= level_flood_stop_enough_time ){
        return true ;
    }else{
        return false;
    }
}
async function getStatus(stnID,statusType) {
    const res = await Stn.findOne({client_id: stnID});
    if(res != null){
        if (statusType === 'rain-start') {
            return  res.rain_start;
        } else if (statusType === 'alarm1') {
            return  res.rain_alarm1;
        } else if (statusType === 'alarm8') {
            return  res.rain_alarm8;
        }
    }else return false;

}
async function getLevelStatus(stnID) {
    const res = await Stn.findOne({client_id: stnID});
    let flood = undefined;
    let floodStartedTime = undefined;
    let lastTimeCheck = undefined;
    if (res != null){
        logger.info('res ', {message: `res : ${res} `});
        flood = res.flood;
        floodStartedTime = res.flood_start_time;
        lastTimeCheck = res.last_time_check;
        logger.info('getLevelStatus', { message: `time : ${new Date()} , flood : ${flood} , floodStartedTime:${floodStartedTime}, lastTimeCheck:${lastTimeCheck}`});
        return  {'flood':flood,'floodStartedTime':floodStartedTime,'lastTimeCheck':lastTimeCheck};
    }else
        return -1;
}
async function checkRainNewData(stnID,channel_index){
    // const res = await Stn.findOne({client_id: stnID});
    // if(res != null){
    //     if(res.last_time_check == undefined)
    //         return  true;
    //     // console.log(`${stnID} from newData :res.last_time_check :  ${JSON.stringify(res.last_time_check)}`);
    //     let lastTimeCheck = my_date.convert_mongodate_to_isodate(res.last_time_check);
    //     let lastSampleTime = await Status.getLastSampleTime(stnID,channel_index);
    //     // console.log(`${stnID}   from newData :lastSampleTime :  ${JSON.stringify(lastSampleTime)}`);
    //     if(lastSampleTime[0] !== undefined){
    //         lastSampleTime = lastSampleTime[0]['sample_time'];
    //         if(lastSampleTime > lastTimeCheck)
    //             return true;
    //         else
    //             return false;
    //     }else
    //         return  true;
    // }else
        return  true;
}
async function checkRainNewData2(lastSampleTime,lastTimeCheck){
        lastTimeCheck = my_date.convert_mongodate_to_isodate(lastTimeCheck);
        if(lastSampleTime > lastTimeCheck)
            return true;
        else
            return false;
}
async function checkLevelNewData(stnID,channel_index,lastTimeCheck){
    if(lastTimeCheck != undefined && lastTimeCheck !=''){
        lastTimeCheck = my_date.convert_mongodate_to_isodate(lastTimeCheck);
        let lastSampleTime = await Status.getLastSampleTime(stnID,channel_index);
        console.log(`${stnID} from newData :lastSampleTime: ${JSON.stringify(lastSampleTime)} lastTimeCheck: ${lastTimeCheck}`);
        logger.info('checkLevelNewData', { message: `time : ${new Date()} , lastSampleTime: ${JSON.stringify(lastSampleTime)} lastTimeCheck: ${lastTimeCheck}` });
        if(lastSampleTime &&  lastSampleTime[0]!= undefined){
            lastSampleTime = lastSampleTime[0]['sample_time'];
            if(lastSampleTime > lastTimeCheck) {
                logger.info('checkLevelNewData dade jadid mojood ast ', {message: `time : ${new Date()} `});
                return  {'newData':1,'lastSampleTime':lastSampleTime};
            }
            else{
                logger.info('checkLevelNewData dade jadid mojood nist ', {message: `time : ${new Date()} `});
                return  {'newData':0,'lastSampleTime':lastSampleTime};
            }
        }
        else
            return -1;

    }else
        return -1;
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
    let resultJson = undefined;
    let st = false;
    let lastTimeCheck = undefined;
    let newData = true;
    ///////////////////////////////////////////////////////////////
    const stn = await Stn.findOne({client_id: client_id});
    if(stn != null){
        st = stn.rain_start;
        lastTimeCheck = stn.last_time_check;
    }else{
        st = false;
    }
    ///////////////////////////////////////////////////////////////




        let result = await Status.getRainStartStatus2(client_id,channelIndexRainTotal,rain_start_height,start_stop_rain_period);
        // console.log(`${client_id} status controller rain start = ${JSON.stringify(result)}`);
        // console.log('---------------------------------------------');
        if(result == -1){
            resultJson =-1;
        }else{
            let start = result['@result'];
            let rainStartTime =  result['@rain_start_time'];
            let lastSampleTime = result['@last_sample_time'];

            if(lastTimeCheck != undefined)
                newData = await checkRainNewData2(lastSampleTime,lastTimeCheck);
            let enoughSpentTimeNoData = await enoughSpentTimeWithoutNewData(lastSampleTime);
            if(!newData && enoughSpentTimeNoData){
                resultJson = 0;
                if(st)
                    await setRainStationStartStatus(client_id,false,rainStartTime,lastSampleTime);
            }else{
                if(start===1){//it's raining
                    await setRainStationStartStatus(client_id,true,rainStartTime,lastSampleTime);
                    resultJson =1;
                }else if(start===0){//it's not raining
                    if(st)
                        await setRainStationStartStatus(client_id,false,rainStartTime,lastSampleTime);
                    resultJson = 0;
                }
            }
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
    let result = await Status.getRainAlarm1Status(client_id,channelIndexRainTotal,rain_alarm1_period,rain_alarm1_height);
    let resultJson = JSON.stringify(result);
    resultJson = JSON.parse(resultJson);

    // let st = await getStatus(client_id,'alarm1');
    if(result===1){//shower
        resultJson =1;
        // if( !st) //no shower already
        // await setRainStationAlarmStatus(client_id,'alarm1',true);
    }else if(result===0){//No shower
        resultJson = 0;//rain stopped and enaugh  spent after stop
        // if(st) //shower already
        //     await setRainStationAlarmStatus(client_id, 'alarm1', false);
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

    let result = await Status.getRainAlarm8Status(client_id,channelIndexRainTotal,rain_alarm8_period,rain_alarm8_height);
    let resultJson = JSON.stringify(result);
    resultJson = JSON.parse(resultJson);

    // let st = await getStatus(client_id,'alarm8');
    if(result===1){//shower
        resultJson =1;
        // if( !st) //no shower already
        //     await setRainStationAlarmStatus(client_id,'alarm8',true);
    }else if(result===0){//No shower
        resultJson = 0;//rain stopped and enaugh  spent after stop
        // if(st) //shower already
        //     await setRainStationAlarmStatus(client_id, 'alarm8', false);
    }
    let apiResult = {};
    apiResult.data = resultJson;
    res.json(apiResult);
});
exports.getLevelFloodStatus = catchAsync(async (req, res) => {
    const client_id = req.params.id * 1;
    let channelIndexLevel = channel_index_level;
    let resultJson = -1;
    let floodStartedTime ='';
    let lastSampleTime = undefined;
    let lastTimeCheck ='';
    let resNewData = -1;
    let newData = -1;
    let st = undefined;
    let result = await getLevelStatus(client_id);
    console.log(`floodStatusAndTime = ${JSON.stringify(result)}`);
    if(result['flood'] != undefined) {
        st = result['flood'];
    }
    if(result['floodStartedTime'] != undefined){
        floodStartedTime = result['floodStartedTime'];
        floodStartedTime = my_date.convert_mongodate_to_isodate(floodStartedTime);
    }
    if(result['lastTimeCheck'] != undefined) {
        lastTimeCheck = result['lastTimeCheck'];
    }
    // console.log(`${client_id} floodStartedTime = ${floodStartedTime}`);
    console.log(`${client_id} st = ${st}`);

    resNewData = await checkLevelNewData(client_id,channelIndexLevel,lastTimeCheck);
    if(resNewData != -1) {
        newData = resNewData['newData'];// 1 or 0
        logger.info('newData', {message: `${newData} `});
        lastSampleTime = resNewData['lastSampleTime'];
    }


    let flood = 0;

    if(st != undefined) {
        if (!st) {//no flood already
            if (newData == 0) {
                resultJson = 0;
                logger.info('dade jadid mojood nist     no flood already', {message: `time : ${new Date()} , client_id : ${client_id} `});
                console.log(`${client_id} dade jadid mojood nist     no flood already`);
            } else if (newData == 1) {
                let result = await Status.getLevelFloodStart2(client_id, channelIndexLevel, level_flood_start_sample_count, level_flood_height_diff);
                logger.info('getLevelFloodStatus', {message: `time : ${new Date()} , client_id : ${client_id} , ${JSON.stringify(result)}`});
                console.log(`${client_id}  flood start check= ${result}  no flood already`);
                console.log('---------------------------------------------');
                // JSON.stringify(result) => [{"@flood":1,"@flood_started_time":"2020-08-02 06:04:01"}]
                if (result == -1) {
                    resultJson = -1;
                } else {
                    resultJson = JSON.stringify(result);
                    resultJson = JSON.parse(resultJson);
                    flood = result[0]['@flood'];
                    floodStartedTime = result[0]['@flood_started_time'];
                    lastSampleTime = result[0]['@last_sample_time'];
                    console.log(`floodStartedTime = ${floodStartedTime}  no flood already`);
                    if (flood === 1) {//flood-start
                        await setLevelStationFloodStatus(client_id, true, floodStartedTime, lastSampleTime);
                        resultJson = 1;
                    } else if (flood === 0) {//no flood-start
                        // console.log('inja1');
                        await setStationLastTimeCheck('level', client_id, lastSampleTime)
                        resultJson = 0;
                    }
                }

            }

        } else if (st) {//flood already
            if (newData == 0) {
                let enough = await enoughSpentTimeAfterFloodStart(floodStartedTime);
                if (enough) {
                    logger.info('getLevelFloodStatus', {message: `time : ${new Date()} , client_id : ${client_id} , enough time spent after flood started at  = ${JSON.stringify(floodStartedTime)}`});
                    console.log(`enough time spent after flood started at  = ${JSON.stringify(floodStartedTime)}`);
                    resultJson = 0;
                    await setLevelStationFloodStatus(client_id, false, floodStartedTime, lastSampleTime);
                } else {
                    resultJson = 1;
                    logger.info('getLevelFloodStatus', {message: `time : ${new Date()} , client_id : ${client_id} , dade jadid mojood nist     already flood`});
                    console.log(`${client_id} dade jadid mojood nist     already flood`);
                }
            } else if (newData == 1) {
                let result = await Status.getLevelFloodStop2(client_id, channelIndexLevel, level_flood_height_diff, level_flood_stop_sample_count, floodStartedTime);
                console.log(`${client_id} result = ${JSON.stringify(result)}`);
                //[{"@flood_stop":0,"@last_sample_time":"2020-08-10 09:52:01"}]

                let floodStoped = result[0]['@flood_stop'];
                lastSampleTime = result[0]['@last_sample_time'];
                logger.info('getLevelFloodStatus getLevelFloodStop2', {message: `time : ${new Date()} , client_id : ${client_id} ,result = ${JSON.stringify(result)}`});
                console.log(`result = ${result}`);
                if (floodStoped === 1) {//flood stoped
                    await setLevelStationFloodStatus(client_id, false, floodStartedTime, lastSampleTime);
                    resultJson = 2;
                    // let enough = await enoughSpentTimeAfterFloodStart(floodStartedTime);
                    // if(enough){
                    //     console.log(`enough time spent after flood started at  = ${JSON.stringify(floodStartedTime)}`);
                    //     resultJson =0;
                    //     await setLevelStationFloodStatus(client_id,false,floodStartedTime,lastSampleTime);
                    // }else{
                    //     resultJson =1;
                    // }
                } else if (floodStoped === 0) {//flood has not stoped yet
                    logger.info('getLevelFloodStatus getLevelFloodStop2', {message: `time : ${new Date()} , client_id : ${client_id} ,flood has not stoped yet , lastSampleTime : ${JSON.stringify(lastSampleTime)}`});
                    console.log(`${client_id} flood has not stoped yet , lastSampleTime : ${JSON.stringify(lastSampleTime)}`);
                    await setStationLastTimeCheck('level', client_id, lastSampleTime)
                    resultJson = 1;
                }
            }

        }
    }
    let apiResult = {};
    apiResult.data = resultJson;
    res.json(apiResult);

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

});