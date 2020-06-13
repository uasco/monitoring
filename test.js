var my_date = require('./utils/my_date');
var moment = require('moment-jalaali');
//const moment = require('moment');
var numsLable = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let CronJob = require('cron').CronJob;
let CronTime = require('cron').CronTime;
function convertNumsLabelToNamesLabel(numsLabel) {
    var collection = { 1: 'فروردین', 2: 'اردیبهشت', 3: 'خرداد', 4: 'تیر', 5: 'مرداد', 6: 'شهریور', 7: 'مهر', 8: 'آبان', 9: 'آذر', 10: 'دی', 11: 'بهمن', 12: 'اسفند' };
    var namesLabel = []
    numsLabel.map(el => {
        namesLabel.push(collection[el]);
    })
    return namesLabel;
}
//var namesLabel = convertNumsLabelToNamesLabel(numsLable);
//console.log(namesLabel);

//var larYearSameCurrentMonth = moment().endOf('jMonth').subtract(1, 'years').calendar();
//console.log(larYearSameCurrentMonth);


// let now = moment();
// var t1 = now.format('YYYY-M-D HH:mm:ss');
// now.subtract('1', 'days');
// var t2 = now.format('YYYY-M-D HH:mm:ss');
// console.log(`Now: ${t1} ${t2}`);





// let date_ob = new Date();
// // current date
// // adjust 0 before single digit date
// let date = ("0" + date_ob.getDate()).slice(-2);

// // current month
// let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// // current year
// let year = date_ob.getFullYear();

// // current hours
// let hours = date_ob.getHours();

// // current minutes
// let minutes = date_ob.getMinutes();

// // current seconds
// let seconds = date_ob.getSeconds();

// // prints date in YYYY-MM-DD format
// console.log(year + "-" + month + "-" + date);

// // prints date & time in YYYY-MM-DD HH:MM:SS format
// console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

// // prints time in HH:MM format
// console.log(hours + ":" + minutes);


// var today = new Date();
// var yesterday = new Date(today.getTime() - (1000 * 60 * 60 * 24));
// var hourago = new Date(today.getTime() - (1000 * 60 * 60));

// console.log(today);
// console.log(yesterday);
// console.log(hourago);

// let now = moment();
// let end_of_this_months = undefined;
// let jy = now.jYear();
// let jm = now.jMonth();//  0 <= now.jMonth() =< 11
// let jmb = jm;
// console.log(`now=${now} , end_of_this_months= ${end_of_this_months}, jy= ${jy} , jm=${jm}, my=${my_date.get_end_of_this_month_in_georgian()} \n, my2=${my_date.get_start_of_next_month_in_georgian()} \n my3 = ${new Date(my_date.get_start_of_next_month_in_georgian())}`);

let date = new Date();
date.setSeconds(date.getSeconds()+4);
//console.log( `${date.getMinutes()}  ${date.getHours()}  ${date.getDate()}    ${date.getMonth()+1}    ${date.getFullYear()}  `);
const job1 = new CronJob(
    date,
    function() {
        console.log(`job1 executed at  ${date}`);
        date.setSeconds(date.getSeconds()+4);
        this.setTime(new CronTime(date));
    },
    function(){
        console.log(`job1 was reset at  ${date}`);
        //let nextDate = date.getMinutes().toString()+' '+ date.getHours().toString() +' '+  date.getDate().toString() + ' ' + (date.getMonth()+1).toString() + ' ' + '*' ;
        this.start();
    },
    false,
    'Asia/Tehran'
);
job1.start();
date.setSeconds(date.getSeconds()+4);
job1.setTime(new CronTime(date));
