const path = require('path');
let flatCache = require('flat-cache');
const cacheController = require('./controllers2/cacheController');
const my_date = require('./utils/my_date');
const CronJob = require('cron').CronJob;
const CronTime = require('cron').CronTime;



const job2 = new CronJob('0 */30 9-17 * * *', function() {
    const d = new Date();
    //console.log('Every 30 minutes between 9-17:', d);
});
const job3 = new CronJob('00 00 00 * * *', function() {
    const d = new Date();
    //console.log('Midnight:', d);
});


// let date = new Date();
// date.setSeconds(date.getSeconds()+4);
// console.log( `${date.getMinutes()}  ${date.getHours()}  ${date.getDate()}    ${date.getMonth()+1}    ${date.getFullYear()}  `);
// const job1 = new CronJob(
//     date,
//     function() {
//         console.log(`job1 executed at  ${date}`);
//         date.setSeconds(date.getSeconds()+4);
//         this.setTime(new CronTime(date));
//     },
//     function(){
//         let nextDate = date.getMinutes().toString()+' '+ date.getHours().toString() +' '+  date.getDate().toString() + ' ' + (date.getMonth()+1).toString() + ' ' + '*' ;
//         this.start();
//     },
//     false,
//     'Asia/Tehran'
// );
// job1.start();
// date.setSeconds(date.getSeconds()+4);
// job1.setTime(new CronTime(date));
//let start_of_next_month = new Date(my_date.get_start_of_next_month_in_georgian());

exports.clearRainValuesCache = () => {
    const clearRainValuesCacheJob = new CronJob('0 */30 * * * *', function() {
        flatCache.clearCacheById('rainValuesCache','../cache/');
        cacheController.clearRainValuesCache();
    });
    clearRainValuesCacheJob.start();
}
exports.clearLevelValueCache = () => {
    const clearLevelValueCacheJob = new CronJob('0 */30 * * * *', function() {
        flatCache.clearCacheById('levelValueCache','../cache/');
        cacheController.clearLevelValueCache();
    });
    clearLevelValueCacheJob.start();
}
exports.clearClimaValuesCache = () => {
    const clearClimaValuesCacheJob = new CronJob('0 */30 * * * *', function() {
        flatCache.clearCacheById('climaValuesCache','../cache/');
        cacheController.clearClimaValuesCache();
    });
    clearClimaValuesCacheJob.start();
}
exports.clearRainTotalsMonthsCache = () => {
    let start_of_next_month = new Date(my_date.get_start_of_next_month_in_georgian());
    const clearRainTotalsMonthsCacheJob = new CronJob(
        start_of_next_month,
        function() {
            flatCache.clearCacheById('rainTotalsMonthsCache','../cache/');
            cacheController.clearRainTotalsMonthsCache();
            this.setTime(new CronTime(new Date(my_date.get_start_of_next_month_in_georgian())));
            this.start();
        },
        function(){
        },
        true,
        'Asia/Tehran'
    );
    clearRainTotalsMonthsCacheJob.start();
}
exports.clearLevelLastHoursCache = () => {
    let after10HourFromNow = new Date();
    after10HourFromNow.setHours(after10HourFromNow.getHours()+10);
    const clearlevelLastHoursCacheJob = new CronJob(
        after10HourFromNow,
        function() {
            flatCache.clearCacheById('levelLastHoursCache','../cache/');
            cacheController.clearlevelLastHoursCache();
            after10HourFromNow.setHours(after10HourFromNow.getHours()+10);
            this.setTime(new CronTime(after10HourFromNow));
            this.start();
        },
        function(){
        },
        true,
        'Asia/Tehran'
    );
    clearlevelLastHoursCacheJob.start();
}
