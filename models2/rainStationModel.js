const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
var pool = require('../database');

var sql_query_rain_station_rain_values = "SELECT value  FROM sample_values where client_id=? and (sensor_id=? or sensor_id=? or sensor_id=?) ORDER BY sample_time DESC , sensor_id DESC limit 3";

//var sql_query_rain_stations_names_and_IDs = "SELECT clients.id , client_infos.name , client_infos.nameofmodel FROM clients inner join client_infos on client_infos.id = clients.client_info_id";
var sql_query_rain_stations_names_and_IDs = "SELECT clients.id , client_infos.name   FROM client_infos   join clients on clients.client_info_id = client_infos.id where client_infos.nameofmodel='DLS0201'";

module.exports = {
    getAllRainStationsNamesAndIDs: function () {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_rain_stations_names_and_IDs, function (error, rows, fields) {
                if (error) {
                    returnValue = "";
                } else {
                    returnValue = rows;
                }
                resolve(returnValue)
            });
        });
    },
    getRainStationRainValues: function (client_id, sensor_id_rain_12, sensor_id_rain_24, sensor_id_rain_total) {
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