function timer() {
    count = count + 1;
    document.getElementById("timer").innerHTML = count + " secs";
}

function StopFunction() {
    clearInterval(counter);
    window.count = 0;
    window.pause = 0;
    document.getElementById("pause").innerHTML = "Pause"
    window.stoped = 1
    document.getElementById("timer").innerHTML = count + " secs";
}

function ReStartFunction() {
    if (counter) {
        clearInterval(counter);
        window.pause = 0;
        window.count = 0;
        window.stoped = 0
        window.counter = setInterval(timer, 1000);
        count = count + 1;
        document.getElementById("pause").innerHTML = "Pause"
        document.getElementById("timer").innerHTML = count + " secs";
    }
}

function PauseFunction() {
    if (stoped == 0) {
        if (pause == 0) {
            clearInterval(counter);
            document.getElementById("pause").innerHTML = "Resume"
            pause = 1;
            return;
        }

        if (pause == 1) {
            window.counter = setInterval(timer, 1000);
            document.getElementById("timer").innerHTML = count + " secs";
            document.getElementById("pause").innerHTML = "Pause"
            pause = 0;
            return;
        }
    }
    return;
}
function playPause(x) {

    if (active == 1) {
        clearInterval(timerId);
        window.active = 0;
        // x.classList.toggle("fa-play-circle");
    } else {
        window.timerId = setInterval(() => mySiema.next(), 10000);
        window.active = 1;
        // x.classList.toggle("fa-pause-circle");
    }
    x.classList.toggle("fa-play-circle");

}
function mysiema() {
    window.mySiema = new Siema({
        selector: '.siema',
        duration: 2000,
        //- easing: 'ease-out',
        easing: 'cubic-bezier(.17,.67,.32,1.34)',
        perPage: 1,
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        threshold: 10,
        loop: true,
        rtl: true,
        onInit: () => { },
        onChange: () => { }
    });
    window.active = 1;
    //window.timerId = setInterval(() => mySiema.next(), 10000)


    document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
    document.querySelector('.next').addEventListener('click', () => mySiema.next());
    // document.querySelector(".pause").addEventListener("click", () => {
    //     if (active === true) {
    //         clearInterval(timerId);
    //         active = false;
    //     }
    // });
    // document.querySelector(".play").addEventListener("click", () => {
    //     if (active === false) {
    //         setInterval(timerId);
    //         active = true;
    //     }
    // });


    // $('.play-pause').click(function (ev) {
    //     if (active == 1) {
    //         clearInterval(timerId);
    //         window.active = 0;
    //         $('.play-pause').classList.toggle("fa-play-circle");
    //     } else {
    //         window.timerId = setInterval(() => mySiema.next(), 2000);
    //         window.active = 1;
    //         $('.play-pause').classList.toggle("fa-pause-circle");
    //     }
    // });

}
function hideSideBare() {
    var x = document.getElementsByClassName("sidebar");
    // if (x.style.display === "none") {
    // x.style.display = "block";
    // } else {
    x[0].style.display = "none";
    // }
}
function displayOverview() {
    var checkBoxes = document.querySelectorAll(".mycheck");
    var checked = { 'rain': '0', 'level': '0', 'clima': '0' };
    // var labels = { 'rain':'ایستگاه های بارانسنجی','level':'ایستگاه های سطح سنجی', 'clima':'ایستگاه های هواشناسی'};
    // var titles=[];
    checkBoxes.forEach(ch => {
        if (ch.checked == true) {
            switch (ch.id) {
                case 'rain':
                    checked['rain'] = '1';
                    break;
                case 'level':
                    checked['level'] = '1';
                    break;
                case 'clima':
                    checked['clima'] = '1';
                    break;
            }
        }
    })
    var codeView = checked['rain'] + checked['level'] + checked['clima'];
    // location.href = "/overview?codeview=" + codeView;
    location.href = '/overview/' + codeView;
}
function loadDetailCard(id,position,sensor){

// console.log("====================");
// console.log(id,position,sensor);
    //location.href = '/detail/' + stn.id + '-' + 'NAN';
}
function checkRainStart(stnID){
    var status=undefined;
    $.ajax({
        url: '/api/status/rain/start/' + stnID,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            console.log("RESPONSE");
            console.log(response);
                   status = response.data;
                   if(status===1){
                       $('#' + stnID + ' i' + '#rain_status').text("").append("&nbsp&nbsp&nbsp;").append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                       $('#' + stnID + ' i' + '#rain_status_result').text("").append('در حال بارش');
                   }else if(status===0){
                        $('#' + stnID + ' i' + '#rain_status').text("").append("&nbsp&nbsp&nbsp;").append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                        $('#' + stnID + ' i' + '#rain_status_result').text("").append('بدون بارش');
                    }
        }
    })
}

function checkRainAlarm(stnID){
    var status=undefined;
    $.ajax({
        url: '/api/status/rain/alarm1/' + stnID,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            console.log("RESPONSE");
            console.log(response);
            status = response.data;
            if(status===1){
                $('#' + stnID + ' i' + '#rain_alarm').text("").append("&nbsp&nbsp&nbsp;").append(' هشدارها').append("&nbsp&nbsp&nbsp;");
                $('#' + stnID + ' i' + '#rain_alarm1').text("").append('رگبار ۱ میلی').append("&nbsp&nbsp&nbsp;");
            }else if(status===0){
                $('#' + stnID + ' i' + '#rain_alarm').text("").append("&nbsp&nbsp&nbsp;").append(' هشدارها').append("&nbsp&nbsp&nbsp;");
                $('#' + stnID + ' i' + '#rain_alarm1').text("").append('');
            }
        }
    })
    $.ajax({
        url: '/api/status/rain/alarm8/' + stnID,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            console.log("RESPONSE");
            console.log(response);
            status = response.data;
            if(status===1){
                $('#' + stnID + ' i' + '#rain_alarm').text("").append("&nbsp&nbsp&nbsp;").append(' هشدارها').append("&nbsp&nbsp&nbsp;");
                $('#' + stnID + ' i' + '#rain_alarm8').text("").append('رگبار ۸ میلی');
            }else if(status===0){
                $('#' + stnID + ' i' + '#rain_alarm').text("").append("&nbsp&nbsp&nbsp;").append(' هشدارها').append("&nbsp&nbsp&nbsp;");
                $('#' + stnID + ' i' + '#rain_alarm8').text("").append('');
            }
        }
    })
}
function lntpn(ln) {
    return $.latin2Arabic.toArabic(ln); s//ln must be string
}
function convertNumsLabelToNamesLabel(numsLabel) {
    var collection = { 1: 'فروردین', 2: 'اردیبهشت', 3: 'خرداد', 4: 'تیر', 5: 'مرداد', 6: 'شهریور', 7: 'مهر', 8: 'آبان', 9: 'آذر', 10: 'دی', 11: 'بهمن', 12: 'اسفند' };
    var namesLabel = []
    numsLabel.map(el => {
        namesLabel.push(collection[el]);
    })
    return namesLabel;
}
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
function calcEachMonth(values) {
    //console.log("values befor calc");
    //console.log(values);
    for (i = 12; i > 0; i--) {
        if(values[i-1]===-1 || values[i]===-1){
            x = values[i]
        }else{
            x = values[i] - values[i - 1];
            if (x < 0) {
                x = 0;
            }
        }

        x = round(x, 2);
        values[i] = x;

    }
    values.splice(0,1);
    return values;
}

function drawCharts_rl(station_ID, labels, valus, label, stnType) {
    if (stnType === 'rain') {
        var chart_id = 'CountryChart' + station_ID;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawBarChart(chart_id, labels, valus, label);
            });
        });
    }
    if (stnType === 'level') {
        var chart_id = 'chartLinePurple' + station_ID;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawLineChart(chart_id, labels, valus, label);
            });
        });
    }
}
function drawCharts_c(station_ID, labels, valus, label, sensor) {
    if (sensor === 'RAINC') {
        var chart_id = 'CountryChart' + station_ID + sensor;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawBarChart(chart_id, labels, valus, label);
            });
        });
    } else {
        var chart_id = 'chartLinePurple' + station_ID + sensor;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawLineChart(chart_id, labels, valus, label);
            });
        });
    }
}
function getRainValues(id) {
    $.ajax({
        url: '/api/values/rain/' + id,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                //$("div.card-title  span").text(response.data[2].value);
                var rt = JSON.stringify(response.data[2].value);
                var r24 = JSON.stringify(response.data[1].value);
                var r12 = JSON.stringify(response.data[0].value);
                rt = lntpn(rt);
                r24 = lntpn(r24);
                r12 = lntpn(r12);
                var date = response.data[2].sample_time;
                date = lntpn(date);
                $('#' + id + ' i' + '#rain_total').text("").append("&nbsp&nbsp&nbsp;").append(' تجمیعی').append("&nbsp&nbsp&nbsp;");//.append(rt).append("&nbsp&nbsp&nbspmm") // ->rain_total
                $('#' + id + ' i' + '#rain_total_value').text("").append(rt)
                $('#' + id + ' i' + '#rain_total_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#rain_24').text("").append("&nbsp&nbsp&nbsp;").append(' ۲۴ ساعته').append("&nbsp&nbsp&nbsp;");//.append(response.data[1].value).append("&nbsp&nbsp&nbsp;mm");// 1->rain_24
                $('#' + id + ' i' + '#rain_24_value').text("").append(r24)
                $('#' + id + ' i' + '#rain_24_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#rain_12').text("").append("&nbsp&nbsp&nbsp;").append(' ۱۲ ساعته').append("&nbsp&nbsp&nbsp;");//.append(response.data[0].value).append("&nbsp&nbsp&nbsp;mm");// 0 ->rain_12
                $('#' + id + ' i' + '#rain_12_value').text("").append(r12)
                $('#' + id + ' i' + '#rain_12_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ داده').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_value').text("").append(date);
                //console.log(date);
                //drawCharts(rain_stations_names_and_ids,labels,values);
            }
        }
    })
}
function getRainTotalOfEndOfPastMonthsForDrawingCharts(rain_stations_names_and_ids) {
    rain_stations_names_and_ids.map(el => {
        var rain_total_of_past_months;
        var station_ID = el.id;
        $.ajax({
            url: '/api/values/raintotalsmonths/' + station_ID,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                if (response.data) {
                    // console.log("HHHHHHHHHHHHHHHH");
                    // console.log(response.data);
                    rain_total_of_past_months = response.data;
                    var labels = [];
                    var values = [];
                    rain_total_of_past_months.slice(1).map(el => {//slice(1) for ignoring first item in array(the past year same cuurent month)
                        if(el) {
                            labels.push(el[0]);
                        }

                    })
                    rain_total_of_past_months.map(el => {
                        if(el){
                            values.push(el[1]);
                        }else{
                            values.push(-1);
                        }

                    })
                    labels = convertNumsLabelToNamesLabel(labels);
                    values = calcEachMonth(values);
                    // console.log("values after calc");
                    // console.log(values);
                    for( var i = 0; i < values.length; i++){
                        if ( values[i] === -1) {
                            values.splice(i, 1);
                            i--;
                        }
                    }
                    // console.log("values after prone");
                    // console.log(values);
                    drawCharts_rl(station_ID, labels, values, 'باران تجمیعی', 'rain');
                }
            }
        })

    })
}
function getRainStationsNamesAndIDs() {
    var rain_stations_names_and_ids;
    $.ajax({
        url: '/api/stations/rain',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                rain_stations_names_and_ids = response.data;
                // $('div.card-header.rain h3.card-category').each(function (index, el) {
                //$(this).text("ایستگاه بارانسنجی   ").append("&nbsp&nbsp;").append(rain_stations_names_and_ids[index].name);
                // $(this).text(" ").append("&nbsp&nbsp;").append(rain_stations_names_and_ids[index].position);
                rain_stations_names_and_ids.map(el => {
                    getRainValues(el.id);
                });
                getRainTotalOfEndOfPastMonthsForDrawingCharts(rain_stations_names_and_ids);
            }
        }
    })

}

function getLevelValue(id) {
    $.ajax({
        url: '/api/values/level/' + id,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                //$("div.card-title  span").text(response.data[2].value);
                var lt = JSON.stringify(response.data[0].value);
                lt = lntpn(lt);
                var date = response.data[0].sample_time;
                date = lntpn(date);
                $('#' + id + ' i' + '#level_total').text("").append("&nbsp&nbsp&nbsp;").append('ارتفاع ').append("&nbsp&nbsp&nbsp;");//.append(rt).append("&nbsp&nbsp&nbspmm") // ->rain_total 
                $('#' + id + ' i' + '#level_total_value').text("").append(lt)
                $('#' + id + ' i' + '#level_total_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");

                $('#' + id + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ داده').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_value').text("").append(date);

                //console.log(date);

                //drawCharts(rain_stations_names_and_ids,labels,values);
            }
        }
    })
}
function getLevelOfLastHoursForDrawingCharts(level_stations_names_and_ids) {
    level_stations_names_and_ids.map(el => {
        var level_last_hours;
        var station_ID = el.id;
        $.ajax({
            url: '/api/values/levellasthours/' + station_ID,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                if (response.data.length > 0) {
                    level_last_hours = response.data;
                    var labels = [];
                    var values = [];
                    level_last_hours.map(el => {
                        labels.push(el['sample_time']);
                    })
                    level_last_hours.map(el => {
                        values.push(el['value']);
                    })
                    //labels = prepareLabels(labels);
                    //values = calcEachMonth(values);
                    // console.log(labels);
                    // console.log(values);
                    drawCharts_rl(station_ID, labels, values, 'ارتفاع رودخانه', 'level');
                }
            }
        })
    })
}
function getLevelStationsNamesAndIDs() {
    var level_stations_names_and_ids;
    $.ajax({
        url: '/api/stations/level',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                level_stations_names_and_ids = response.data;
                // $('div.card-header.level h3.card-category').each(function (index, el) {
                //$(this).text("ایستگاه بارانسنجی   ").append("&nbsp&nbsp;").append(rain_stations_names_and_ids[index].name);
                // $(this).text(" ").append("&nbsp&nbsp;").append(level_stations_names_and_ids[index].position);
                level_stations_names_and_ids.map(el => {
                    getLevelValue(el.id);
                });
                getLevelOfLastHoursForDrawingCharts(level_stations_names_and_ids)
            }
        }
    })
}

function getClimaValues(id, sensor, fa_unit) {
    $.ajax({
        url: '/api/values/clima/' + sensor.toLowerCase() + '/' + id,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                if (sensor === 'RAINC') {
                    //$("div.card-title  span").text(response.data[2].value);
                    var rt = JSON.stringify(response.data[2].value);
                    var r24 = JSON.stringify(response.data[1].value);
                    var r12 = JSON.stringify(response.data[0].value);
                    rt = lntpn(rt);
                    r24 = lntpn(r24);
                    r12 = lntpn(r12);
                    var date = response.data[2].sample_time;
                    date = lntpn(date);
                    $('#' + id + sensor + ' i' + '#rain_total').text("").append("&nbsp&nbsp&nbsp;").append(' تجمیعی').append("&nbsp&nbsp&nbsp;");//.append(rt).append("&nbsp&nbsp&nbspmm") // ->rain_total
                    $('#' + id + sensor + ' i' + '#rain_total_value').text("").append(rt)
                    $('#' + id + sensor + ' i' + '#rain_total_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                    $('#' + id + sensor + ' i' + '#rain_24').text("").append("&nbsp&nbsp&nbsp;").append(' ۲۴ ساعته').append("&nbsp&nbsp&nbsp;");//.append(response.data[1].value).append("&nbsp&nbsp&nbsp;mm");// 1->rain_24
                    $('#' + id + sensor + ' i' + '#rain_24_value').text("").append(r24)
                    $('#' + id + sensor + ' i' + '#rain_24_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                    $('#' + id + sensor + ' i' + '#rain_12').text("").append("&nbsp&nbsp&nbsp;").append(' ۱۲ ساعته').append("&nbsp&nbsp&nbsp;");//.append(response.data[0].value).append("&nbsp&nbsp&nbsp;mm");// 0 ->rain_12
                    $('#' + id + sensor + ' i' + '#rain_12_value').text("").append(r12)
                    $('#' + id + sensor + ' i' + '#rain_12_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                    $('#' + id + sensor + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ داده').append("&nbsp&nbsp&nbsp;");
                    $('#' + id + sensor + ' i' + '#date_of_last_recieved_data_value').text("").append(date);
                    //console.log(date);
                    //drawCharts(rain_stations_names_and_ids,labels,values);
                } else {
                    //$("div.card-title  span").text(response.data[2].value);
                    var vl = JSON.stringify(response.data[3].value);
                    var va = JSON.stringify(response.data[0].value);
                    var vx = JSON.stringify(response.data[1].value);
                    var vn = JSON.stringify(response.data[2].value);
                    vl = lntpn(vl);
                    va = lntpn(va);
                    vx = lntpn(vx);
                    vn = lntpn(vn);
                    var date = response.data[3].sample_time;
                    date = lntpn(date);
                    $('#' + id + sensor + ' i' + '#' + sensor + '_last').text("").append("&nbsp&nbsp&nbsp;").append('آخرین مقدار').append("&nbsp&nbsp&nbsp;");//.append(rt).append("&nbsp&nbsp&nbspسانتیگراد") // ->tmp_last
                    $('#' + id + sensor + ' i' + '#' + sensor + '_last_value').text("").append(vl)
                    $('#' + id + sensor + ' i' + '#' + sensor + '_last_unit').text("").append(fa_unit).append("&nbsp&nbsp&nbsp;");
                    $('#' + id + sensor + ' i' + '#' + sensor + '_avg').text("").append("&nbsp&nbsp&nbsp;").append('متوسط').append("&nbsp&nbsp&nbsp;");//.append(response.data[1].value).append("&nbsp&nbsp&nbsp;سانتیگراد");// 1->tmp_avg
                    $('#' + id + sensor + ' i' + '#' + sensor + '_avg_value').text("").append(va)
                    $('#' + id + sensor + ' i' + '#' + sensor + '_avg_unit').text("").append(fa_unit).append("&nbsp&nbsp&nbsp;");
                    $('#' + id + sensor + ' i' + '#' + sensor + '_max').text("").append("&nbsp&nbsp&nbsp;").append('بیشینه').append("&nbsp&nbsp&nbsp;");//.append(response.data[0].value).append("&nbsp&nbsp&nbsp;سانتیگراد");// 0`${sensor`+->_max
                    $('#' + id + sensor + ' i' + '#' + sensor + '_max_value').text("").append(vx)
                    $('#' + id + sensor + ' i' + '#' + sensor + '_max_unit').text("").append(fa_unit).append("&nbsp&nbsp&nbsp;");
                    $('#' + id + sensor + ' i' + '#' + sensor + '_min').text("").append("&nbsp&nbsp&nbsp;").append('کمینه').append("&nbsp&nbsp&nbsp;");//.append(response.data[0].value).append("&nbsp&nbsp&nbsp;سانتیگراد");// 0`${sensor`+->_min
                    $('#' + id + sensor + ' i' + '#' + sensor + '_min_value').text("").append(vn)
                    $('#' + id + sensor + ' i' + '#' + sensor + '_min_unit').text("").append(fa_unit).append("&nbsp&nbsp&nbsp;");
                    $('#' + id + sensor + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ داده').append("&nbsp&nbsp&nbsp;");
                    $('#' + id + sensor + ' i' + '#date_of_last_recieved_data_value').text("").append(date);
                    //console.log(date);
                    //drawCharts(tmp_stations_names_and_ids,labels,values);

                }
            }
        }
    })
}
function getClimaLastHoursForDrawingCharts(clima_stations_names_and_ids, sensores) {
    clima_stations_names_and_ids.map(el => {
        sensores.map(sensor => {
            var clima_last_hours;
            var station_ID = el.id;
            $.ajax({
                url: '/api/values/climalasthours/' + sensor[0].toLowerCase() + '/' + station_ID,
                type: 'GET',
                dataType: 'json',
                success: (response) => {
                    if (response.data) {
                        if (sensor[0] === 'RAINC') {
                            rain_total_of_past_months = response.data;
                            var labels = [];
                            var values = [];
                            rain_total_of_past_months.slice(1).map(elm => {//slice(1) for ignoring first item in array(the past year same cuurent month)
                                if(elm) {
                                    labels.push(elm[0]);
                                }
                            })
                            rain_total_of_past_months.map(elm => {
                                if(elm){
                                    values.push(elm[1]);
                                }else{
                                    values.push(-1);
                                }
                            })
                            labels = convertNumsLabelToNamesLabel(labels);
                            values = calcEachMonth(values);
                            for( var i = 0; i < values.length; i++){
                                if ( values[i] === -1) {
                                    values.splice(i, 1);
                                    i--;
                                }
                            }
                            drawCharts_c(station_ID, labels, values, 'باران تجمیعی', sensor[0]);

                        } else {
                            clima_last_hours = response.data;
                            var labels = [];
                            var values = [];
                            clima_last_hours.map(elm => {
                                labels.push(elm['sample_time']);
                            })
                            clima_last_hours.map(elm => {
                                values.push(elm['value']);
                            })
                            //labels = prepareLabels(labels);
                            //values = calcEachMonth(values);
                            // console.log(labels);
                            // console.log(values);
                            drawCharts_c(station_ID, labels, values, 'مقدار', sensor[0]);
                        }
                    }
                }
            })
        })
    })
}

function getClimaStationsNamesAndIDs() {
    var clima_stations_names_and_ids;
    const sensores = [['TMP', 'c'], ['HUM', '%'], ['PRS', 'mb'], ['WSP', 'm/s'], ['WDR', 'deg'], ['EVP', 'mm'], ['RAD', 'w/m2'], ['RAINC', 'mm']]
    sensores.map(s => {
    })
    $.ajax({
        url: '/api/stations/clima',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                clima_stations_names_and_ids = response.data;
                // $('div.card-header.rain h3.card-category').each(function (index, el) {
                //$(this).text("ایستگاه بارانسنجی   ").append("&nbsp&nbsp;").append(rain_stations_names_and_ids[index].name);
                // $(this).text(" ").append("&nbsp&nbsp;").append(rain_stations_names_and_ids[index].position);
                clima_stations_names_and_ids.map(el => {
                    sensores.map(s => {
                        getClimaValues(el.id, s[0], s[1]);
                    });
                });
                getClimaLastHoursForDrawingCharts(clima_stations_names_and_ids, sensores);
            }
        }
    })
}

var this_js_script = $('script[src*=my_jquery_functions]'); // or better regexp to get the file name..

var pageType = this_js_script.attr('page_type');
if (typeof stnType === "undefined") {
    var stnType = 'some_default_value';
}
var title = this_js_script.attr('title');


$(document).ready(() => {

    $.getScript('/assets/js/my_set_font_size.js', function () {
        setFontSize();
    });
    //$('*').persiaNumber();
    //$('*').persianNum();


    if (pageType === 'overview') {
        mysiema(title);

        getRainStationsNamesAndIDs();

        // getLevelStationsNamesAndIDs();

        // getClimaStationsNamesAndIDs();



    }
});
// setInterval(function(){
//     getRainStationsNamesAndIDs(); // this will run after every 5 seconds
// }, 5000);