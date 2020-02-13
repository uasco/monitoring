const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
var pool = require('../database');
var my_date = require('../utils/my_date');

/////
var moment = require('moment-jalaali')
//moment.loadPersian({usePersianDigits: true});

var sql_query_rain_station_rain_values = "SELECT value  FROM sample_values where client_id=? and (sensor_id=? or sensor_id=? or sensor_id=?) ORDER BY sample_time DESC , sensor_id DESC limit 3";

module.exports = {

    getRainValues: function (client_id, sensor_id_rain_12, sensor_id_rain_24, sensor_id_rain_total) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_rain_station_rain_values, [client_id, sensor_id_rain_12, sensor_id_rain_24, sensor_id_rain_total], function (error, rows, fields) {
                if (error) {
                    console.log("EEERRRORRRRR");
                    returnValue = "";
                } else {
                    console.log(rows);
                    returnValue = rows;
                }
                resolve(returnValue)
            });
        });
    }
}