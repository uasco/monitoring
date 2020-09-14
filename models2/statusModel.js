const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const pool = require('../database');
const sql_query_rain_start_status_2 = "set @result = 0;set @rain_start_time = '0';set @last_sample_time = '0';call detect_rain_start2(?,?,?,?,@result,@rain_start_time ,@last_sample_time);select @result, @rain_start_time, @last_sample_time;";
const sql_query_rain_alarm_1_status = "set @alarm = 0;call detect_rain_alarm_1(?,?,?,?,@result);select @result";
const sql_query_rain_alarm_8_status = "set @alarm = 0;call detect_rain_alarm_8(?,?,?,?,@result);select @result";

const sql_query_level_flood_start_2 = "set @flood = 0;set @flood_started_time = '0';set @last_sample_time = '0';call detect_flood_2(?, ?, ?, ?, @flood, @flood_started_time, @last_sample_time);select @flood, @flood_started_time, @last_sample_time;";
const sql_query_level_flood_stop_2 = "set @flood_stop = 0;set @last_sample_time = '0';call detect_flood_stop_2(?, ?, ?, ?, ?,@flood_stop,@last_sample_time);select @flood_stop,@last_sample_time;";

const sql_query_rain_start_status = "call detect_rain_start(?,?,@result);select @result";
const sql_query_level_flood_start = "call detect_flood(?,?,?,@result);select @result";
const sql_query_level_flood_stop = "call detect_flood_stop(?,?,?,?,@result);select @result";
const sql_query_last_sample_time = "SELECT sample_time  FROM sample_values where client_id=? and channel_index=?  ORDER BY sample_time DESC  limit 1";

module.exports = {
    getRainStartStatus: function (client_id , channel_index_rain_total) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_rain_start_status, [client_id, channel_index_rain_total], function (error, rows, fields) {
                if (error) {
                    //console.log("EEERRRORRRRR");
                    returnValue = -1;
                } else {
                    //console.log(rows[1][0]['@result']);
                    //rows is like this :
                    // [
                    //   OkPacket {
                    //     fieldCount: 0,
                    //     affectedRows: 1,
                    //     insertId: 0,
                    //     serverStatus: 42,
                    //     warningCount: 0,
                    //     message: '',
                    //     protocol41: true,
                    //     changedRows: 0
                    //   },
                    //   [ RowDataPacket { '@result': 0 } ]
                    // ]
                    let n = rows.length - 1;
                    returnValue = rows[n][0]['@result'];
                }
                resolve(returnValue)
            });
        });
    },
    getRainStartStatus2: function (client_id , channel_index_rain_total,rain_start_height , start_stop_rain_period) {
        // console.log(`${client_id} ${channel_index_rain_total} ${rain_start_height} ${start_stop_rain_period}`);
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_rain_start_status_2, [client_id, channel_index_rain_total,rain_start_height, start_stop_rain_period], function (error, rows, fields) {
                if (error) {
                    // console.log(`${client_id}  EEERRRORRRRR getRainStartStatus2 `);
                    // console.log('---------------------------------------------');
                    returnValue = -1;
                } else {
                    // console.log(rows);
                    // [
                    //     OkPacket {
                    //     fieldCount: 0,
                    //     affectedRows: 0,
                    //     insertId: 0,
                    //     serverStatus: 10,
                    //     warningCount: 0,
                    //     message: '',
                    //     protocol41: true,
                    //     changedRows: 0
                    // },
                    //     OkPacket {
                    //     fieldCount: 0,
                    //     affectedRows: 0,
                    //     insertId: 0,
                    //     serverStatus: 42,
                    //     warningCount: 0,
                    //     message: '',
                    //     protocol41: true,
                    //     changedRows: 0
                    // },
                    //     [ RowDataPacket { '@result': 0 } ]
                    // ]
                    let n = rows.length - 1;
                    returnValue = rows[n][0];
                }
                resolve(returnValue)
            });
        });
    },
    getRainAlarm1Status: function (client_id, channel_index_rain_total,n,h) {
        //console.log(`alarm db === ${client_id} ${channel_index_rain_total} ${n} ${h}`);
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_rain_alarm_1_status, [client_id, channel_index_rain_total,n,h], function (error, rows, fields) {
                if (error) {
                    //console.log("EEERRRORRRRR getRainAlarmStatus");
                    // console.log(`${client_id}  EEERRRORRRRR getRainAlarmStatus `);
                    // console.log('---------------------------------------------');
                    returnValue = -1;
                } else {
                    //console.log(rows[1][0]['@result']);
                    //rows is like this :
                    // [
                    //   OkPacket {
                    //     fieldCount: 0,
                    //     affectedRows: 1,
                    //     insertId: 0,
                    //     serverStatus: 42,
                    //     warningCount: 0,
                    //     message: '',
                    //     protocol41: true,
                    //     changedRows: 0
                    //   },
                    //   [ RowDataPacket { '@result': 0 } ]
                    // ]
                    let n = rows.length - 1;
                    returnValue = rows[n][0]['@result'];
                }
                resolve(returnValue)
            });
        });
    },
    getRainAlarm8Status: function (client_id, channel_index_rain_total,n,h) {
        //console.log(`alarm db === ${client_id} ${channel_index_rain_total} ${n} ${h}`);
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_rain_alarm_8_status, [client_id, channel_index_rain_total,n,h], function (error, rows, fields) {
                if (error) {
                    //console.log("EEERRRORRRRR getRainAlarmStatus");
                    // console.log(`${client_id}  EEERRRORRRRR getRainAlarmStatus `);
                    // console.log('---------------------------------------------');
                    returnValue = -1;
                } else {
                    //console.log(rows[1][0]['@result']);
                    //rows is like this :
                    // [
                    //   OkPacket {
                    //     fieldCount: 0,
                    //     affectedRows: 1,
                    //     insertId: 0,
                    //     serverStatus: 42,
                    //     warningCount: 0,
                    //     message: '',
                    //     protocol41: true,
                    //     changedRows: 0
                    //   },
                    //   [ RowDataPacket { '@result': 0 } ]
                    // ]
                    let n = rows.length - 1;
                    returnValue = rows[n][0]['@result'];
                }
                resolve(returnValue)
            });
        });
    },
    getLevelFloodStart2: function (client_id,channelIndexLevel,level_flood_number_of_samples,level_flood_height_diff) {
        return new Promise(function (resolve, reject) {
            // console.log(`from status model client_id= ${JSON.stringify(client_id)}`);
            // console.log(`from status model channelIndexLevel= ${JSON.stringify(channelIndexLevel)}`);
            // console.log(`from status model level_flood_number_of_samples= ${JSON.stringify(level_flood_number_of_samples)}`);
            // console.log(`from status model level_flood_height_diff= ${JSON.stringify(level_flood_height_diff)}`);
            var returnValue = "";
            pool.query(sql_query_level_flood_start_2, [client_id, channelIndexLevel,level_flood_number_of_samples,level_flood_height_diff ], function (error, rows, fields) {
                // console.log(`salm3 ${client_id}`);
                if (error) {
                    // console.log(`EEERRRORRRRR ${client_id} LevelFloodStart2`);
                    // console.log('---------------------------------------------');
                    returnValue = -1;
                } else {

                    // returnValue = rows[1][0]['@result'];
                    //console.log(`from status model = ${JSON.stringify(rows)}`);
                    // [{"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":10,"warningCount":0,"message":"","protocol41":true,"
                    //     changedRows":0},{"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":10,"warningCount":0,"message":"","protocol41":true,"chang
                    //     edRows":0},{"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":42,"warningCount":0,"message":"","protocol41":true,"changedRow
                    //     s":0},[{"@flood":1,"@start_flood":"2020-08-02 06:04:01"}]]

                    let n = rows.length - 1;
                    // console.log(`from status model = ${JSON.stringify(rows[n])}`);
                    returnValue = rows[n];
                }
                resolve(returnValue)
            });
        });
    },
    getLevelFloodStop2: function (client_id,channelIndexLevel,level_flood_height_diff,level_flood_stop_sample_count,flood_started_time) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_level_flood_stop_2, [client_id, channelIndexLevel,level_flood_height_diff,level_flood_stop_sample_count,flood_started_time ], function (error, rows, fields) {
                if (error) {
                    // console.log(`${client_id} EERRRORRRRR LevelFloodStop2`);
                    // console.log('---------------------------------------------');
                    returnValue = -1;
                } else {
                    // console.log(`rows = ${JSON.stringify(rows)}`);
                    // rows = [{"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":10,"warningCount":0,"message":"","protocol41":true,"changedRows":
                    //         0},{"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":42,"warningCount":0,"message":"","protocol41":true,"changedRows":0},[{
                    //     "@flood_stop":0}]]

                    let n = rows.length - 1;
                    // console.log(`rows = ${JSON.stringify(rows[n])}`);
                    returnValue = rows[n];
                }
                resolve(returnValue)
            });
        });
    },
    getLevelFloodStart: function (client_id,channelIndexLevel,level_alarm_height_diff) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_level_flood_start, [client_id, channelIndexLevel,level_alarm_height_diff ], function (error, rows, fields) {
                if (error) {
                    //console.log("EEERRRORRRRR");
                    returnValue = "";
                } else {
                    //console.log(rows[1][0]['@result']);
                    //rows is like this :
                    // [
                    //   OkPacket {
                    //     fieldCount: 0,
                    //     affectedRows: 1,
                    //     insertId: 0,
                    //     serverStatus: 42,
                    //     warningCount: 0,
                    //     message: '',
                    //     protocol41: true,
                    //     changedRows: 0
                    //   },
                    //   [ RowDataPacket { '@result': 0 } ]
                    // ]
                    let n = rows.length - 1;
                    returnValue = rows[n][0]['@result'];
                }
                resolve(returnValue)
            });
        });
    },
    getLevelFloodStop: function (client_id,channelIndexLevel,level_alarm_height_diff,level_flood_sample_count) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_level_flood_stop, [client_id, channelIndexLevel,level_alarm_height_diff,level_flood_sample_count ], function (error, rows, fields) {
                if (error) {
                    //console.log("EEERRRORRRRR");
                    returnValue = "";
                } else {
                    //console.log(rows[1][0]['@result']);
                    //rows is like this :
                    // [
                    //   OkPacket {
                    //     fieldCount: 0,
                    //     affectedRows: 1,
                    //     insertId: 0,
                    //     serverStatus: 42,
                    //     warningCount: 0,
                    //     message: '',
                    //     protocol41: true,
                    //     changedRows: 0
                    //   },
                    //   [ RowDataPacket { '@result': 0 } ]
                    // ]
                    let n = rows.length - 1;
                    returnValue = rows[n][0]['@result'];
                }
                resolve(returnValue)
            });
        });
    },
    getLastSampleTime: function (client_id,channel_index) {
        return new Promise(function (resolve, reject) {
            let returnValue = "";
            pool.query(sql_query_last_sample_time, [client_id, channel_index], function (error, rows, fields) {
                if (error) {
                    //console.log("EEERRRORRRRR");
                    returnValue = "";
                } else {
                    //console.log("rows befor reverse===");
                    //console.log(rows);
                    //rows.reverse();
                    //console.log("rows after reverse=");
                    //console.log(rows);
                    returnValue = rows;
                }
                resolve(returnValue)
            });
        });
    }

}