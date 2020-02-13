const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
var pool = require('../database');
var my_date = require('../utils/my_date');

/////
var moment = require('moment-jalaali')
//moment.loadPersian({usePersianDigits: true});

var sql_query_rain_station_rain_values = "SELECT value  FROM sample_values where client_id=? and (sensor_id=? or sensor_id=? or sensor_id=?) ORDER BY sample_time DESC , sensor_id DESC limit 3";

//var sql_query_rain_stations_names_and_IDs = "SELECT clients.id , client_infos.name , client_infos.nameofmodel FROM clients inner join client_infos on client_infos.id = clients.client_info_id";
var sql_query_rain_stations_names_and_IDs = "SELECT clients.id , client_infos.name   FROM client_infos   join clients on clients.client_info_id = client_infos.id where client_infos.nameofmodel='DLS0201'";
var sql_query_rain_total_of_end_of_month = "SELECT value FROM sample_values where client_id=? and sensor_id=? and DATE(sample_time) <= ? ORDER BY sample_time DESC limit 1";
async function getRainTotalOfmonth(client_id, sensor_id_rain_total,date,returnValue,x) {
    return new Promise(function (resolve, reject) {
        pool.query(sql_query_rain_total_of_end_of_month, [client_id, sensor_id_rain_total , date], function (error, rows, fields) {
        if (error) {
            console.log("EEERRRORRRRR");
            return "";
        } 
                            var rainTotal = JSON.parse(JSON.stringify(rows))[0].value;
                            //var objx={date:rainTotal};
                            //returnValue.push(objx);
                            returnValue[x]=rainTotal;
                            console.log("NM===");
                            console.log(x);
                            console.log(returnValue);
                            
            resolve(returnValue);               
    });
    });
}
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
    },
//     getRainTotalOfPastMonths: async (client_id, sensor_id_rain_total) => { 
//                 let returnValue=[{a:0},{b:0},{c:0},{d:0},{e:0},{f:0},{g:0},{h:0},{i:0},{j:0},{k:0},{l:0}];
//                 let counter = {x:0};
        
//                 var end_of_months = my_date.get_end_of_months_in_georgian();
//                 var dates_array = [];
//                 var now = moment();
//                 var jm =now.jMonth();//  0 <= now.jMonth() =< 11
//                 jm++;
//                 for(i=0;i<=11;i++){
//                     dates_array.push(end_of_months[jm]);
//                     jm++;
//                     if(jm>11)
//                     jm=0;
//                 } 
        
//                 for(i=0;i<=11;i++){
//                     console.log("DATES_ARRAY==================");
//                     console.log(dates_array[i]);
//                 }
        
//                 var now = moment();
//                 var jm =now.jMonth();//  0 <= now.jMonth() =< 11
//     }
// }




    getRainTotalOfPastMonths: async function(client_id, sensor_id_rain_total) {
                var end_of_months = my_date.get_end_of_months_in_georgian();
                var dates_array = [];
                var now = moment();
                var jm =now.jMonth();//  0 <= now.jMonth() =< 11
                jm++;
                for(i=0;i<=11;i++){
                    dates_array.push(end_of_months[jm]);
                    jm++;
                    if(jm>11)
                    jm=0;
                } 
                console.log("dates_array+++++++++");
                console.log(dates_array);
        let returnValue=[]; 
        var now = moment();
        //var jm =now.jMonth()+1;//  0 <= now.jMonth() =< 11
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[0],returnValue,0);
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[1],returnValue,1);
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[2],returnValue,2);
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[3],returnValue,3);
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[4],returnValue,4);
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[5],returnValue,5);
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[6],returnValue,6);
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[7],returnValue,7);
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[8],returnValue,8);
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[9],returnValue,9);
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[10],returnValue,10);
        returnValue = await getRainTotalOfmonth(client_id, sensor_id_rain_total,dates_array[11],returnValue,11);

        
        return returnValue;
        // const promises = dates_array.map(async date => {
        //   return await getRainTotalOfmonth(client_id, sensor_id_rain_total,date,returnValue,counter);
        // });
        // console.log("returnValue==========");
        // console.log(returnValue);
        // return Promise.all(promises);

    }
}



// //*************************************************************************************************BBBBB
// //*************************************************************************************************BBBBB
// getRainTotalOfPastMonths: async (client_id, sensor_id_rain_total) => { 
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
//         function getRainTotalOfmonth2(client_id, sensor_id_rain_total,date,returnValue,counter) {
//             return new Promise(function (resolve, reject) {            
//                     pool.query(sql_query_rain_total_of_end_of_month, [client_id, sensor_id_rain_total ,date] , function (error, rows, fields) {
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
//             return getRainTotalOfmonth2(client_id,sensor_id_rain_total,date,returnValue,counter);
//             //returnValue.push=(getRainTotalOfmonth2(client_id,sensor_id_rain_total,date))
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
// function getRainTotalOfmonth2(client_id, sensor_id_rain_total,date) {
//     return new Promise(function (resolve, reject) {            
//                 pool.query(sql_query_rain_total_of_end_of_month, [client_id, sensor_id_rain_total ,date] , function (error, rows, fields) {
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
// function getRainTotalOfPastMonths(client_id, sensor_id_rain_total) {
//     var now = moment();
//     var jm =now.jMonth()+1;//  0 <= now.jMonth() =< 11
//     var end_of_months = my_date.get_end_of_months_in_georgian();
//     var returnValue = [];
//     const promises = end_of_months.map(async date => {
//       return await getRainTotalOfmonth(client_id, sensor_id_rain_total,date);
      
//     });
//     return Promise.all(promises);
// }
// function my(){
// console.log(getRainTotalOfPastMonths(101,25));
// }
// my();