const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
var pool = require('../database');
var my_date = require('../utils/my_date');

/////
var moment = require('moment-jalaali')
//moment.loadPersian({usePersianDigits: true});

//var sql_query_rain_stations_names_and_IDs = "SELECT clients.id , client_infos.name , client_infos.nameofmodel FROM clients inner join client_infos on client_infos.id = clients.client_info_id";
var sql_query_rain_stations_names_and_IDs = "SELECT clients.id , client_infos.position  FROM client_infos   join clients on clients.client_info_id = client_infos.id where client_infos.nameofmodel='DLS0201'";
var sql_query_level_stations_names_and_IDs = "SELECT clients.id , client_infos.position  FROM client_infos   join clients on clients.client_info_id = client_infos.id where client_infos.nameofmodel='DLS0202'";
var sql_query_clima_stations_names_and_IDs = "SELECT clients.id , client_infos.position  FROM client_infos   join clients on clients.client_info_id = client_infos.id where client_infos.nameofmodel='DLS120'";
var queries = { 'rain': sql_query_rain_stations_names_and_IDs, 'level': sql_query_level_stations_names_and_IDs, 'clima': sql_query_clima_stations_names_and_IDs };
var sql_query_all_stations_names_and_IDs = "SELECT clients.id , client_infos.position  FROM client_infos   join clients on clients.client_info_id = client_infos.id";

module.exports = {
    getStationsNamesAndIDs: function (type) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(queries[type], function (error, rows, fields) {
                if (error) {
                    returnValue = "";
                    console.log("ERRRROR");
                } else {
                    returnValue = rows;
                }
                resolve(returnValue)
            });
        });
    },
    getAllStationsNamesAndIDs: function (type) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_all_stations_names_and_IDs, function (error, rows, fields) {
                if (error) {
                    returnValue = "";
                    console.log("ERRRROR  sql query all stations");
                } else {
                    console.log(`rows===${rows}`);
                    returnValue = rows;
                }
                resolve(returnValue)
            });
        });
    }
}