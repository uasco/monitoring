const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
var pool = require('../database');
var my_date = require('../utils/my_date');

/////
var moment = require('moment-jalaali');
//moment.loadPersian({usePersianDigits: true});

var sql_query_rain_station_rain_values = "SELECT value,sample_time  FROM sample_values where client_id=? and (channel_index=? or channel_index=? or channel_index=?) ORDER BY sample_time DESC , channel_index DESC limit 3";
var sql_query_rain_total_of_end_of_month = "SELECT value FROM sample_values where client_id=? and channel_index=? and DATE(sample_time) <= ? and DATE(sample_time) >= (DATE_ADD(? , INTERVAL -1 DAY)) ORDER BY sample_time DESC limit 1";
var sql_query_level_station_level_value = "SELECT value,sample_time  FROM sample_values where client_id=? and channel_index=? ORDER BY sample_time DESC  limit 1";
var sql_query_level_station_last_hours = "SELECT value , sample_time FROM sample_values where client_id=? and channel_index=? ORDER BY sample_time DESC  limit ?";
// var sql_query_level_station_last_hours = "SELECT value , sample_time FROM sample_values where client_id=? and channel_index=? and sample_time >= ? and sample_time <= ? ORDER BY sample_time DESC , , sample_ordinal_num ASC";
var sql_query_clima_station_tmp_value = "SELECT value,sample_time  FROM sample_values where client_id=? and (channel_index=? or channel_index=? or channel_index=? or channel_index=?) ORDER BY sample_time DESC , channel_index DESC limit 4";
var sql_query_clima_station_hum_value = "SELECT value,sample_time  FROM sample_values where client_id=? and (channel_index=? or channel_index=? or channel_index=? or channel_index=?) ORDER BY sample_time DESC , channel_index DESC limit 4";
var sql_query_clima_station_prs_value = "SELECT value,sample_time  FROM sample_values where client_id=? and (channel_index=? or channel_index=? or channel_index=? or channel_index=?) ORDER BY sample_time DESC , channel_index DESC limit 4";
var sql_query_clima_station_wsp_value = "SELECT value,sample_time  FROM sample_values where client_id=? and (channel_index=? or channel_index=? or channel_index=? or channel_index=?) ORDER BY sample_time DESC , channel_index DESC limit 4";
var sql_query_clima_station_wdr_value = "SELECT value,sample_time  FROM sample_values where client_id=? and (channel_index=? or channel_index=? or channel_index=? or channel_index=?) ORDER BY sample_time DESC , channel_index DESC limit 4";
var sql_query_clima_station_evp_value = "SELECT value,sample_time  FROM sample_values where client_id=? and (channel_index=? or channel_index=? or channel_index=? or channel_index=?) ORDER BY sample_time DESC , channel_index DESC limit 4";
var sql_query_clima_station_rad_value = "SELECT value,sample_time  FROM sample_values where client_id=? and (channel_index=? or channel_index=? or channel_index=? or channel_index=?) ORDER BY sample_time DESC , channel_index DESC limit 4";
var sql_query_clima_station_last_hours = "SELECT value , sample_time FROM sample_values where client_id=? and channel_index=? ORDER BY sample_time DESC  limit ?";
var sql_queries_clima_values = {
    'rainc': sql_query_rain_station_rain_values,
    'level': sql_query_level_station_level_value,
    'tmp': sql_query_clima_station_tmp_value,
    'hum': sql_query_clima_station_hum_value,
    'prs': sql_query_clima_station_prs_value,
    'wsp': sql_query_clima_station_wsp_value,
    'wdr': sql_query_clima_station_wdr_value,
    'evp': sql_query_clima_station_evp_value,
    'rad': sql_query_clima_station_rad_value
}
let sql_query_rain_amari_report_values = "call amari_report(?,?,?,?,?);";

async function getRainTotalOfmonth(client_id, channel_index_rain_total, date, returnValue, x) {
    console.log("DATE===============");
        console.log(date);
    return new Promise(function (resolve, reject) {
        pool.query(sql_query_rain_total_of_end_of_month, [client_id, channel_index_rain_total, date[1], date[1]], function (error, rows, fields) {
            if (error) {
                console.log("EEERRRORRRRR");
                return "";
            }
            if(rows.length) {
                var rainTotal = JSON.parse(JSON.stringify(rows))[0].value;
                var arr_item = [];
                arr_item[0] = date[0];// date[0] is jM
                arr_item[1] = rainTotal;
                //var objx={date:rainTotal};
                //returnValue.push(objx);
                returnValue[x] = arr_item;
                //console.log("NM===");
                //console.log(x);
                //console.log(returnValue);
                console.log("DATE======DATE=========");
                console.log(arr_item[0]);
                console.log(arr_item[1]);

            }
            resolve(returnValue);
        });
    });
}
module.exports = {
    getRainValues: function (client_id, channel_index_rain_12, channel_index_rain_24, channel_index_rain_total) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_rain_station_rain_values, [client_id, channel_index_rain_12, channel_index_rain_24, channel_index_rain_total], function (error, rows, fields) {
                if (error) {
                    console.log("EEERRRORRRRR");
                    returnValue = "";
                } else {
                    console.log("rows befor reverse===");
                    console.log(rows);
                    //rows.reverse();
                    console.log("rows after reverse=");
                    console.log(rows);
                    returnValue = rows;
                }

                resolve(returnValue)
            });
        });
    },
    getRainTotalsOfPastMonths: async function (client_id, channel_index_rain_total) {
        var end_of_months = my_date.get_end_of_months_in_georgian();
        var dates_array = [];

        var lastYearSameCurrentMonth = moment().endOf('jMonth').subtract(1, 'years').calendar();//  for making date of past year same current month
        lastYearSameCurrentMonth = moment(lastYearSameCurrentMonth, 'jYYYY/jM/jD').format('YYYY-M-D');

        var arr_item = new Array(0, lastYearSameCurrentMonth);
        dates_array.push(arr_item);

        var now = moment();
        var jm = now.jMonth();//  0 <= now.jMonth() =< 11
        jm++;
        if (jm > 11)
            jm = 0;
        for (var i = 0; i < end_of_months.length; i++) {
            var arr_item = new Array(jm + 1, end_of_months[jm]);
            dates_array.push(arr_item);
            jm++;
            if (jm > 11)
                jm = 0;
        }
        //console.log("dates_array====");
        //console.log(dates_array);
        let returnValue = [];



        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[0], returnValue, 0);//get rain total of past year of same current month

        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[1], returnValue, 1);
        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[2], returnValue, 2);
        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[3], returnValue, 3);
        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[4], returnValue, 4);
        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[5], returnValue, 5);
        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[6], returnValue, 6);
        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[7], returnValue, 7);
        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[8], returnValue, 8);
        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[9], returnValue, 9);
        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[10], returnValue, 10);
        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[11], returnValue, 11);
        returnValue = await getRainTotalOfmonth(client_id, channel_index_rain_total, dates_array[12], returnValue, 12);




        return returnValue;
        // const promises = dates_array.map(async date => {
        //   return await getRainTotalOfmonth(client_id, channel_index_rain_total,date,returnValue,counter);
        // });
        // console.log("returnValue==========");
        // console.log(returnValue);
        // return Promise.all(promises);
    },

    getRainAmariReport:  function (client_id, channel_index_rain_total,startTime,endTime,period) {
        return new Promise(function (resolve, reject) {
            let returnValue = "";
            let gStartTime = moment(startTime, 'jYYYY-jM-jD jHH:jmm').format('YYYY-MM-DD HH:mm');
            let gEndTime = moment(endTime, 'jYYYY-jM-jD jHH:jmm').format('YYYY-MM-DD HH:mm');
            console.log(`$$$$$$$$$$$$$$$$ startTime: ${gStartTime}`);
            console.log(`%%%%%%%%%%%%%%%% endTime: ${gEndTime}`);
            console.log(`$$$$$$$$$$$$$$$$ client_ID: ${client_id}`);
            console.log(`$$$$$$$$$$$$$$$$ channel_index_rain_total: ${channel_index_rain_total}`);
            pool.query(sql_query_rain_amari_report_values, [client_id, channel_index_rain_total,gStartTime,gEndTime,period], function (error, rows, fields) {
                if (error) {
                    console.log("EEERRRORRRRR");
                    returnValue = "";
                } else {
                    console.log("rows befor reverse===");
                    console.log(rows);

                    returnValue = rows;
                }
                resolve(returnValue)
            });
        });


    },
    getLevelValue: function (client_id, channel_index_level) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_level_station_level_value, [client_id, channel_index_level], function (error, rows, fields) {
                if (error) {
                    console.log("EEERRRORRRRR");
                    returnValue = "";
                } else {
                    //console.log(rows);
                    returnValue = rows;
                }

                resolve(returnValue)
            });
        });
    },
    getLevelLastHours: function (client_id, channel_index_level) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            var n = 10;
            //var dates = [];
            //dates = my_date.get_now_and_previus_day();
            pool.query(sql_query_level_station_last_hours, [client_id, channel_index_level, n], function (error, rows, fields) {
                // pool.query(sql_query_level_station_last_hours, [client_id, channel_index_level, dates[0], dates[1]], function (error, rows, fields) {
                if (error) {
                    console.log("EEERRRORRRRR");
                } else {
                    rows.reverse();
                    //console.log(rows);
                    returnValue = rows;
                }
                resolve(returnValue)
            });
        });
    },
    getClimaLastHours: function (client_id, channel_index) {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            var n = 10;
            pool.query(sql_query_clima_station_last_hours, [client_id, channel_index, n], function (error, rows, fields) {

                if (error) {
                    console.log("EEERRRORRRRR");
                } else {
                    rows.reverse();
                    //console.log(rows);
                    returnValue = rows;
                }
                resolve(returnValue)
            });
        });
    },
    getClimaValues: function (client_id, sensor, ci) {
        console.log("from model , sensor ===");
        console.log(sensor);
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            var query_params = [client_id, ci['l'], ci['a'], ci['x'], ci['n']];
            console.log("query_params:");
            console.log(query_params);
            console.log(sql_queries_clima_values[sensor]);
            pool.query(sql_queries_clima_values[sensor], query_params, function (error, rows, fields) {
                if (error) {
                    console.log("EEERRRORRRRR");
                    returnValue = "";
                } else {
                    console.log("rows befor reverse===");
                    console.log(rows);
                    //rows.reverse();
                    console.log("rows after reverse=");
                    console.log(rows);
                    returnValue = rows;
                }

                resolve(returnValue)
            });
        });
    }
}







// //*************************************************************************************************BBBBB
// //*************************************************************************************************BBBBB
// getRainTotalOfPastMonths: async (client_id, channel_index_rain_total) => { 
//         let returnValue=[{a:0},{b:0},{c:0},{d:0},{e:0},{f:0},{g:0},{h:0},{i:0},{j:0},{k:0},{l:0}];
//         let counter = {x:0};

//         var end_of_months = my_date.get_end_of_months_in_georgian();
//         var dates_array = [];
//         var now = moment();
//         var jm =now.jMonth();//  0 <= now.jMonth() =< 11
//         jm++;
//         for(i=0;i<=11;i++){
//             dates_array.push(end_of_months[jm]);
//             jm++;
//             if(jm>11)
//             jm=0;
//         } 

//         for(i=0;i<=11;i++){
//             console.log("DATES_ARRAY==================");
//             console.log(dates_array[i]);
//         }

//         var now = moment();
//         var jm =now.jMonth();//  0 <= now.jMonth() =< 11
//         function getRainTotalOfmonth2(client_id, channel_index_rain_total,date,returnValue,counter) {
//             return new Promise(function (resolve, reject) {            
//                     pool.query(sql_query_rain_total_of_end_of_month, [client_id, channel_index_rain_total ,date] , function (error, rows, fields) {
//                         if (error) {
//                             console.log("EEERRRORRRRR");
//                             rainTotal = "";
//                             resolve(rainTotal);
//                         } else {
//                             console.log(JSON.parse(JSON.stringify(rows))[0].value);
//                             var rainTotal = JSON.parse(JSON.stringify(rows))[0].value;

//                             var i = counter.x;
//                             switch(i) {
//                                 case 0:
//                                     returnValue[0].a = rainTotal;
//                                   break;
//                                   case 1:
//                                     returnValue[1].b = rainTotal;
//                                   break;
//                                   case 2:
//                                     returnValue[2].c = rainTotal;
//                                   break;
//                                   case 3:
//                                     returnValue[3].d = rainTotal;
//                                   break;
//                                   case 4:
//                                     returnValue[4].e = rainTotal;
//                                   break;
//                                   case 5:
//                                     returnValue[5].f = rainTotal;
//                                   break;
//                                   case 6:
//                                     returnValue[6].g = rainTotal;
//                                   break;
//                                   case 7:
//                                     returnValue[7].h = rainTotal;
//                                   break;
//                                   case 8:
//                                     returnValue[8].i = rainTotal;
//                                   break;
//                                   case 9:
//                                     returnValue[9].j = rainTotal;
//                                   break;
//                                   case 10:
//                                     returnValue[10].k = rainTotal;
//                                   break;
//                                   case 11:
//                                     returnValue[11].l = rainTotal;
//                                   break;

//                             }
//                             i++;
//                             counter.x = i;
//                             resolve(returnValue);
//                         }
//                     });
//             });
//         }
//   let result;
//         return result = dates_array.reduce( (accumulatorPromise, date) => {
//         return accumulatorPromise.then(() => {
//             return getRainTotalOfmonth2(client_id,channel_index_rain_total,date,returnValue,counter);
//             //returnValue.push=(getRainTotalOfmonth2(client_id,channel_index_rain_total,date))
//         });
//         }, Promise.resolve());
//         //} );

//         // result.then(e => {
//         //     return returnValue;
//         // });


//         // result.then(e => {
//         // console.log("Resolution is complete! Let's party.")
//         // for(i=0;i<=11;i++){
//         //     console.log("return_value===");
//         //     console.log(returnValue[i]);
//         // }
//         // });  


//     }


// }
// //*************************************************************************************************EEEEE
// //*************************************************************************************************EEEEE


////////////////////////////////////////////////////////////////////////////////////////////////REDIUS

// function methodThatReturnsAPromise(id) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(`Processing ${id}`);
//         resolve(id);
//       }, 1000);
//     });
//   }

//   let result = [1,2,3].reduce( (accumulatorPromise, nextID) => {
//     return accumulatorPromise.then(() => {
//       return methodThatReturnsAPromise(nextID);
//     });
//   }, Promise.resolve());

//   result.then(e => {
//     console.log("Resolution is complete! Let's party.")
//   });

// var end_of_months = my_date.get_end_of_months_in_georgian();
// var dates_array = [];
// var now = moment();
// var jm =now.jMonth();//  0 <= now.jMonth() =< 11
// jm++;
// for(i=0;i<=11;i++){
//     dates_array.push(end_of_months[jm]);
//     jm++;
//     if(jm>11)
//         jm=0;
// } 

// for(i=0;i<=11;i++){
//     console.log("DATES_ARRAY==================");
//     console.log(dates_array[i]);
// }

// var now = moment();
// var jm =now.jMonth();//  0 <= now.jMonth() =< 11
// function getRainTotalOfmonth2(client_id, channel_index_rain_total,date) {
//     return new Promise(function (resolve, reject) {            
//                 pool.query(sql_query_rain_total_of_end_of_month, [client_id, channel_index_rain_total ,date] , function (error, rows, fields) {
//                     if (error) {
//                         console.log("EEERRRORRRRR");
//                         rainTotal = "";
//                         resolve(rainTotal);
//                     } else {
//                         console.log(JSON.parse(JSON.stringify(rows))[0].value);
//                         var rainTotal = JSON.parse(JSON.stringify(rows))[0].value;
//                         resolve(rainTotal);
//                     }
//                 });
//     });
//   }

//   let result = dates_array.reduce( (accumulatorPromise, date) => {
//     return accumulatorPromise.then(() => {
//       return getRainTotalOfmonth2(101,25,date);
//     });
//   }, Promise.resolve());

//   result.then(e => {
//     console.log("Resolution is complete! Let's party.")
//   });
///////////////////////////////////////////////////////////////////////////////////////////////MAP
// function getRainTotalOfPastMonths(client_id, channel_index_rain_total) {
//     var now = moment();
//     var jm =now.jMonth()+1;//  0 <= now.jMonth() =< 11
//     var end_of_months = my_date.get_end_of_months_in_georgian();
//     var returnValue = [];
//     const promises = end_of_months.map(async date => {
//       return await getRainTotalOfmonth(client_id, channel_index_rain_total,date);

//     });
//     return Promise.all(promises);
// }
// function my(){
// console.log(getRainTotalOfPastMonths(101,25));
// }
// my();


///////////////////////////////////////////////////////////////////////////////////////

