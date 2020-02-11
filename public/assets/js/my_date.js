var moment = require('jalali-moment');
//moment().locale('fa').format('YYYY/M/D');
//var d = moment('2020/02/09', 'YYYY/MM/DD').locale('fa').format('MMMM'); 
//console.log(d);
function get_name_of_month(d){
    return moment(d, 'YYYY/MM/DD').locale('fa').format('MMMM'); 
}

