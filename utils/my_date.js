var moment = require('moment-jalaali');
let moment2 = require('moment');
//moment.loadPersian({usePersianDigits: true});
//moment.loadPersian({dialect: 'persian-modern'});

exports.get_name_of_month_of_given_date = function (d) {
    m = moment(d, 'jYYYY/jM/jD');
    switch (m.jMonth()) {
        case 0:
            return 'فروردین'

        case 1:
            return 'اردیبهشت'

        case 2:
            return 'خرداد'

        case 3:
            return 'تیر'

        case 4:
            return 'مرداد'

        case 5:
            return 'شهریور'

        case 6:
            return 'مهر'

        case 7:
            return 'آبان'

        case 8:
            return 'آذر'

        case 9:
            return 'دی'

        case 10:
            return 'بهمن'

        case 11:
            return 'اسفند'

    }
}
exports.convert_number_to_month = function (n) {
    switch (n) {
        case 0:
            return 'فروردین'
        case 1:
            return 'اردیبهشت'
        case 2:
            return 'خرداد'
        case 3:
            return 'تیر'
        case 4:
            return 'مرداد'
        case 5:
            return 'شهریور'
        case 6:
            return 'مهر'
        case 7:
            return 'آبان'
        case 8:
            return 'آذر'
        case 9:
            return 'دی'
        case 10:
            return 'بهمن'
        case 11:
            return 'اسفند'
    }
}
exports.get_number_of_month_of_given_date = function (d) {
    let m = moment(d, 'jYYYY/jM/jD');
    return m.jMonth();
}
exports.get_number_of_day_of_given_date = function (d) {
    let day = moment(d, 'jYYYY/jM/jD').format('jD');
    return day;
}
exports.get_number_of_month_of_given_date_georgian = function (d) {
    m = moment(d, 'YYYY/M/D');
    return m.format('M');;
}
// function get_end_of_mehr_in_georgian(){
//     var now = moment();
//     m=moment(now);
//     m=moment('1398/05/06', 'jYYYY/jM/jD');
//     jy = m.jYear();
//     jm = m.jMonth();
//     if(jm<7)
//         jy=jy-1;

//     end_of_mehr = moment(jy + "/07/30", 'jYYYY/jM/jD');
//     return end_of_mehr.format('YYYY/M/D');

// }
exports.get_end_of_months_in_georgian = function () {
    //function get_end_of_months_in_georgian(){
    var now = moment();
    //var m=moment(now);
    var end_of_months = [];
    var jy = now.jYear();
    var jm = now.jMonth();//  0 <= now.jMonth() =< 11
    var jmb = jm;


    end_of_months[jm] = now.format('YYYY-M-D');
    jm--;
    do {
        if (jm >= 0 && jm <= 5)
            end_of_months[jm] = moment(jy + "/" + `${jm + 1}` + "/31", 'jYYYY/jM/jD').format('YYYY-M-D');
        else if (jm >= 6 && jm <= 10)
            end_of_months[jm] = moment(jy + "/" + `${jm + 1}` + "/30", 'jYYYY/jM/jD').format('YYYY-M-D');
        else if (jm == 11)
            end_of_months[jm] = moment(jy + "/12/29", 'jYYYY/jM/jD').format('YYYY-M-D');
        jm--;
    } while (jm >= 0)
    jm = jmb + 1;
    jy--;
    do {
        if (jm >= 0 && jm <= 5)
            end_of_months[jm] = moment(jy + "/" + jm + "/31", 'jYYYY/jM/jD').format('YYYY-M-D');
        else if (jm >= 6 && jm <= 10)
            end_of_months[jm] = moment(jy + "/" + jm + "/30", 'jYYYY/jM/jD').format('YYYY-M-D');
        else if (jm == 11)
            end_of_months[jm] = moment(jy + "/12/29", 'jYYYY/jM/jD').format('YYYY-M-D');
        jm++;
    } while (jm <= 11)



    // end_of_months['مهر'] = moment(jy + "/07/30", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['آبان'] = moment(jy + "/08/30", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['آذر'] = moment(jy + "/09/30", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['دی'] = moment(jy + "/10/30", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['بهمن'] = moment(jy + "/11/30", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['اسفند'] = moment(jy + "/12/29", 'jYYYY/jM/jD').format('YYYY/M/D');
    // jy=jy+1;
    // end_of_months['فروردین'] = moment(jy + "/01/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['اردیبهشت'] = moment(jy + "/02/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['خرداد'] = moment(jy + "/03/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['تیر'] = moment(jy + "/04/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['مرداد'] = moment(jy + "/05/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    // end_of_months['شهریور'] = moment(jy + "/06/31", 'jYYYY/jM/jD').format('YYYY/M/D');
    //console.log("salam2");
    // for (var i in end_of_months) {

    //              console.log(i +' =  '+end_of_months[i]);
    //         }
    // end_of_months.map(date => {
    //     console.log(date);
    // });

    return end_of_months;

}

exports.get_end_of_this_month_in_georgian = function () {
    let now = moment();
    let end_of_this_month = undefined;
    let jy = now.jYear();
    let jm = now.jMonth();//  0 <= now.jMonth() =< 11
    end_of_this_month = now.format('YYYY-M-D');
    if (jm >= 0 && jm <= 5)
        end_of_this_month = moment(jy + "/" + `${jm + 1}` + "/31", 'jYYYY/jM/jD').format('YYYY-M-D');
    else if (jm >= 6 && jm <= 10)
        end_of_this_month = moment(jy + "/" + `${jm + 1}` + "/30", 'jYYYY/jM/jD').format('YYYY-M-D');
    else if (jm == 11)
        end_of_this_month = moment(jy + "/12/29", 'jYYYY/jM/jD').format('YYYY-M-D');
    return end_of_this_month;
}
exports.get_start_of_next_month_in_georgian = function () {
    let now = moment();
    let end_of_this_month = undefined;
    let jy = now.jYear();
    let jm = now.jMonth();//  0 <= now.jMonth() =< 11
    end_of_this_month = now.format('YYYY-M-D');
    if (jm >= 0 && jm <= 4)
        end_of_this_month = moment(jy + "/" + `${jm + 2}` + "/1", 'jYYYY/jM/jD').format('YYYY-M-D 00:30:00');
    else if (jm >= 5 && jm <= 10)
        end_of_this_month = moment(jy + "/" + `${jm + 2}` + "/1", 'jYYYY/jM/jD').format('YYYY-M-D 00:30:00');
    else if (jm == 11)
        end_of_this_month = moment(jy+1 + "/1/1", 'jYYYY/jM/jD').format('YYYY-M-D 00:30:00');
    return end_of_this_month;
}

exports.get_last_hours = function (n) {
    let now = moment();
    var hours = [];
    for (i = n - 1; i >= 0; i--) {
        hours[i] = now.format('YYYY-M-D HH:mm:ss');
        now.subtract('1', 'hours');
    }
    return hours;
}

exports.get_now_and_previus_day = function () {
    let now = moment();
    var dates = []
    dates[1] = now.format('YYYY-M-D HH:mm:ss');
    now.subtract('1', 'days');
    dates[0] = now.format('YYYY-M-D HH:mm:ss');
    return dates;
}

exports.convert_gdate_to_jdate = function(gTime){
    let jTime = moment(gTime,'YYYY/MM/DD HH:mm:ss').format('HH:mm        jYYYY/jM/jD');
    return jTime;
}
exports.convert_gdate_to_jdate_2 = function(gTime){
    let jTime = moment(gTime,'YYYY/MM/DD HH:mm:ss').format('jYYYY/jM/jD');
    return jTime;
}
exports.subtract_times = function (endDate,startDate,endHour,startHour) {
    endDate = moment(endDate, 'jYYYY/jM/jD').format('MM/DD/YYYY');
    startDate = moment(startDate, 'jYYYY/jM/jD').format('MM/DD/YYYY');
    let startTime = startDate.toString()  + ' ' + startHour.toString() + ':00';
    let endTime = endDate.toString()  + ' ' + endHour.toString() + ':00';
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    let diff =(endTime.getTime() - startTime.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}
exports.convert_mongodate_to_isodate = function(mongoTime){
    let isoTime = mongoTime.toISOString();
    isoTime = moment(isoTime).format('YYYY-MM-DD HH:mm:ss');
    return isoTime
}
exports.jNow = function (){
    let now = moment();
    return moment(now).format('jYYYY-jM-jD HH:mm:ss');
}
