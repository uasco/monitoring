const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
let pool = require('../database');
let my_date = require('../utils/my_date');

/////
let moment = require('moment-jalaali')
//moment.loadPersian({usePersianDigits: true});

//let sql_query_rain_stations_names_and_IDs = "SELECT clients.id , client_infos.name , client_infos.nameofmodel FROM clients inner join client_infos on client_infos.id = clients.client_info_id";
let sql_query_rain_stations_names_and_IDs = "SELECT clients.id , client_infos.position  FROM client_infos   join clients on clients.client_info_id = client_infos.id where client_infos.nameofmodel='DLS0201'";
let sql_query_level_stations_names_and_IDs = "SELECT clients.id , client_infos.position  FROM client_infos   join clients on clients.client_info_id = client_infos.id where client_infos.nameofmodel='DLS0202'";
let sql_query_clima_stations_names_and_IDs = "SELECT clients.id , client_infos.position  FROM client_infos   join clients on clients.client_info_id = client_infos.id where client_infos.nameofmodel='DLS120'";
let sql_query_all_stations_names_and_IDs = "SELECT clients.id , client_infos.position  FROM client_infos   join clients on clients.client_info_id = client_infos.id where client_infos.nameofmodel='DLS0201' or client_infos.nameofmodel='DLS0202' or client_infos.nameofmodel='DLS120'";
let sql_query_station_install_date = "SELECT client_infos.product_date_time  FROM client_infos   join clients on clients.client_info_id = client_infos.id where clients.id=?";
let sql_query_station_client_id = "SELECT clients.id FROM client_infos   join clients on clients.client_info_id = client_infos.id where clients.operator_id = ? and client_infos.nameofmodel= ?";

let queries = { 'rain': sql_query_rain_stations_names_and_IDs, 'level': sql_query_level_stations_names_and_IDs, 'clima': sql_query_clima_stations_names_and_IDs, 'all':sql_query_all_stations_names_and_IDs };

module.exports = {
    getStationsNamesAndIDs: function (type) {
        return new Promise(function (resolve, reject) {
            let returnValue = "";
            pool.query(queries[type], function (error, rows, fields) {
                if (error) {
                    returnValue = "";
                    //console.log("ERRRROR");
                } else {
                    //console.log(`rows===${JSON.stringify(rows)}`);
                    returnValue = rows;
                }
                resolve(returnValue)
            });
        });
    },
    getInstallDate: function (client_id) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_station_install_date, [client_id], function (error, rows, fields) {
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
    },
    getClientID: function (stnCode,stnType) {
        return new Promise(function (resolve, reject) {
            let type = '';
            switch (stnType){
                case '1' : type = 'DLS0201';
                    break;
                case '2' : type = 'DLS0202';
                    break;
                case '3' : type = 'DLS120';
                    break;
            }
            let returnValue = "";
            console.log(`stnCode   stnType  type === ${stnCode}    ${stnType}  ${type}`);
            pool.query(sql_query_station_client_id, [stnCode,type], function (error, rows, fields) {
                if (error) {
                    console.log("EEERRRORRRRR");
                    returnValue = "";
                } else {
                    console.log("rows befor reverse===");
                    console.log(rows);
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