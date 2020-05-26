var my_date = require('./utils/my_date');
var moment = require('moment-jalaali');
//const moment = require('moment');
var numsLable = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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

var c = { 'l': '108', 'a': '107', 'x': '106', 'n': '105' };
str = c['l'] + ' ,' + c['a'] + ' ,' + c['x'] + ' ,' + c['n'];
console.log(str);



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

