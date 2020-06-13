const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const pool = require('../database');
const sql_query_rain_start_status = "call detect_rain_start(?,?,@result);select @result";
const sql_query_rain_alarm_status = "call detect_rain_alarm(?,?,?,?,@result);select @result";
module.exports = {
    getRainStartStatus: function (client_id , channel_index_rain_total) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_rain_start_status, [client_id, channel_index_rain_total], function (error, rows, fields) {
                if (error) {
                    console.log("EEERRRORRRRR");
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
                    returnValue = rows[1][0]['@result'];
                }
                resolve(returnValue)
            });
        });
    },
    getRainAlarmStatus: function (client_id, channel_index_rain_total,n,h) {
        console.log(`alarm db === ${client_id} ${channel_index_rain_total} ${n} ${h}`);
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_rain_alarm_status, [client_id, channel_index_rain_total,n,h], function (error, rows, fields) {
                if (error) {
                    console.log("EEERRRORRRRR");
                    returnValue = "";
                } else {
                    console.log(rows[1][0]['@result']);
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
                    returnValue = rows[1][0]['@result'];
                }
                resolve(returnValue)
            });
        });
    }

}