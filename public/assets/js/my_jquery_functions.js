function goBack() {
    window.history.back();
}
function setSavedSi(si){
    window.savedsi = si;
}
function goBackToMain() {
    location.href = '/';
}
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
        x.classList.toggle("fa-play-circle");
    } else {
        window.timerId = setInterval(() => mySiema.next(), 10000);
        window.active = 1;
        x.classList.toggle("fa-pause-circle");
    }
}
function setSlideIndex(){
    window.currentSlideIndex=this.currentSlide;
    console.log(`SideIndex ======> ${window.currentSlideIndex}`);
}
function mysiema(si) {
    if(si == undefined)
        si = 0;
    window.mySiema = new Siema({
        selector: '.siema',
        duration: 2000,
        //- easing: 'ease-out',
        easing: 'cubic-bezier(.17,.67,.32,1.34)',
        perPage: 1,
        startIndex: si,//0,
        draggable: true,
        multipleDrag: true,
        threshold: 10,
        loop: true,
        rtl: true,
        onInit: setSlideIndex,//()=>{},
        onChange: setSlideIndex,
    });
    window.active = 1;
    window.timerId = setInterval(() => mySiema.next(), 1000000)

    document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
    document.querySelector('.next').addEventListener('click', () => mySiema.next());
}
function hideSideBare() {
    let x = document.getElementsByClassName("sidebar");
    // if (x.style.display === "none") {
    // x.style.display = "block";
    // } else {
    x[0].style.display = "none";
    // }
}
function checkSubItems(chb){
    let checkBoxes = undefined;
        switch(chb.id) {
            case 'rain':
                checkBoxes = document.querySelectorAll(".mycheck-r");//("[id^='rain']");
                checkBoxes.forEach(ch => {
                    if (chb.checked === true)
                        ch.checked = true;
                    else
                        ch.checked = false;
                });
                break;
            case 'level':
                checkBoxes = document.querySelectorAll(".mycheck-l");//("[id^='rain']");
                checkBoxes.forEach(ch => {
                    if (chb.checked === true)
                        ch.checked = true;
                    else
                        ch.checked = false;
                });
                break;
            case 'clima':
                checkBoxes = document.querySelectorAll(".mycheck-c");//("[id^='rain']");
                checkBoxes.forEach(ch => {
                    if (chb.checked === true)
                        ch.checked = true;
                    else
                        ch.checked = false;
                });
                break;
        }
}
// function displayOverview() {
//     var checkBoxes = document.querySelectorAll(".mycheck");
//     var checked = { 'rain': '0', 'level': '0', 'clima': '0' };
//     // var labels = { 'rain':'ط§غŒط³طھع¯ط§ظ‡ ظ‡ط§غŒ ط¨ط§ط±ط§ظ†ط³ظ†ط¬غŒ','level':'ط§غŒط³طھع¯ط§ظ‡ ظ‡ط§غŒ ط³ط·ط­ ط³ظ†ط¬غŒ', 'clima':'ط§غŒط³طھع¯ط§ظ‡ ظ‡ط§غŒ ظ‡ظˆط§ط´ظ†ط§ط³غŒ'};
//     // var titles=[];
//     checkBoxes.forEach(ch => {
//         if (ch.checked == true) {
//             switch (ch.id) {
//                 case 'rain':
//                     checked['rain'] = '1';
//                     break;
//                 case 'level':
//                     checked['level'] = '1';
//                     break;
//                 case 'clima':
//                     checked['clima'] = '1';
//                     break;
//             }
//         }
//     })
//     var codeView = checked['rain'] + checked['level'] + checked['clima'];
//     // location.href = "/overview?codeview=" + codeView;
//     location.href = '/overview/' + codeView;
// }
function displayOverview() {
    let checkBoxes = document.querySelectorAll("[class^='mycheck-']");
    // console.log(checkBoxes);
    let rstations=[];
    let lstations=[];
    let cstations=[];
    checkBoxes.forEach(ch => {
        if(ch.checked === true){
            if(ch.className === 'mycheck-r')
                rstations.push(ch.id);
            if(ch.className === 'mycheck-l')
                lstations.push(ch.id);
            if(ch.className === 'mycheck-c')
                cstations.push(ch.id);
        }
    })
    console.log(`rstations === ${rstations}`);
    console.log(`lstations === ${lstations}`);
    console.log(`cstations === ${cstations}`);
    const url = '/overview/';
    let data ={
        rstations,
        lstations,
        cstations
    }
    $.redirect(url, data, "POST", );

}
function loadDetailCard(id,position,sensor){
    location.href = '/detail/' + id + '-' + sensor + '-' + position + '-' + window.currentSlideIndex;
}
function checkRainStart(stnID,clima){
    var status=undefined;
    let url = undefined;
    if(clima === 'true')
        url = '/api/status/rainc/start/' + stnID
    else
        url = '/api/status/rain/start/' + stnID
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            console.log(`stnid = ${stnID} => RESPONSE = ${response.data}`);
            status = response.data;
            if(clima === 'false') {
                if (status === 1) {
                    $('#' + stnID + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                    $('#' + stnID + ' i' + '#rain_status_result').text("").append('در حال بارش');
                    checkRainAlarm(stnID, clima);
                } else if (status === 0) {
                    $('#' + stnID + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//.append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                    $('#' + stnID + ' i' + '#rain_status_result').text("").append('بدون بارش');
                    $('#' + stnID + ' i' + '#rain_alarm').text("").append(' بدون هشدار').append("&nbsp&nbsp&nbsp;");
                    $('#' + stnID + ' i' + '#rain_alarm1').text("").append('');
                    $('#' + stnID + ' i' + '#rain_alarm8').text("").append('');
                }
            }else if(clima === 'true'){
                if (status === 1) {
                    $('#' + stnID +'RAINC'+ ' i' + '#rain_status').text("").append("&nbsp&nbsp&nbsp;");//.append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                    $('#' + stnID +'RAINC'+ ' i' + '#rain_status_result').text("").append('در حال بارش');
                    checkRainAlarm(stnID, clima);
                } else if (status === 0) {
                    $('#' + stnID +'RAINC'+ ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//.append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                    $('#' + stnID +'RAINC'+ ' i' + '#rain_status_result').text("").append('بدون بارش');
                    $('#' + stnID +'RAINC'+ ' i' + '#rain_alarm').text("").append(' بدون هشدار').append("&nbsp&nbsp&nbsp;");
                    $('#' + stnID +'RAINC'+ ' i' + '#rain_alarm1').text("").append('');
                    $('#' + stnID +'RAINC'+ ' i' + '#rain_alarm8').text("").append('');
                }
            }
        }
    })
}
function checkRainAlarm(stnID,clima){
    var status=undefined;
    let url1 = undefined;
    let url8 = undefined;
    if(clima === 'true') {
        url1 = '/api/status/rainc/alarm1/' + stnID;
        url8 = '/api/status/rainc/alarm8/' + stnID;
    }
    else {
        url1 = '/api/status/rain/alarm1/' + stnID;
        url8 = '/api/status/rain/alarm8/' + stnID;
    }
    $.ajax({
        url: url1,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            console.log("RESPONSE");
            console.log(response);
            status = response.data;
            if(clima === 'false') {
                if (status === 1) {
                    $('#' + stnID + ' i' + '#rain_alarm').text("").append(' هشدار').append("&nbsp&nbsp&nbsp;");
                    $('#' + stnID + ' i' + '#rain_alarm1').text("").append('رگبار ۱ میلی').append("&nbsp&nbsp&nbsp;");
                } else if (status === 0) {
                    $('#' + stnID + ' i' + '#rain_alarm').text("").append(' بدون هشدار').append("&nbsp&nbsp&nbsp;");
                    $('#' + stnID + ' i' + '#rain_alarm1').text("").append('');
                }
            }else if(clima === 'true'){
                if (status === 1) {
                    $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm').text("").append(' هشدار').append("&nbsp&nbsp&nbsp;");
                    $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm1').text("").append('رگبار ۱ میلی').append("&nbsp&nbsp&nbsp;");
                } else if (status === 0) {
                    $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm').text("").append(' بدون هشدار').append("&nbsp&nbsp&nbsp;");
                    $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm1').text("").append('');
                }
            }
        }
    })
    $.ajax({
        url: url8,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            // console.log("RESPONSE");
            // console.log(response);
            status = response.data;
            if(clima === 'false') {
                if (status === 1) {
                    $('#' + stnID + ' i' + '#rain_alarm').text("").append("&nbsp&nbsp&nbsp;").append(' هشدار').append("&nbsp&nbsp&nbsp;");
                    $('#' + stnID + ' i' + '#rain_alarm8').text("").append('رگبار ۸ میلی');
                } else if (status === 0) {
                    $('#' + stnID + ' i' + '#rain_alarm').text("").append("&nbsp&nbsp&nbsp;").append(' بدون هشدار').append("&nbsp&nbsp&nbsp;");
                    $('#' + stnID + ' i' + '#rain_alarm8').text("").append('');
                }
            }else if(clima === 'true'){
                if (status === 1) {
                    $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm').text("").append("&nbsp&nbsp&nbsp;").append(' هشدار').append("&nbsp&nbsp&nbsp;");
                    $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm8').text("").append('رگبار ۸ میلی');
                } else if (status === 0) {
                    $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm').text("").append("&nbsp&nbsp&nbsp;").append(' بدون هشدار').append("&nbsp&nbsp&nbsp;");
                    $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm8').text("").append('');
                }
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
                drawLineChart(chart_id, labels, valus, label , 'ارتفاع آب');
            });
        });
    }
}
function drawBigCharts_rl(station_ID, labels, valus, label, stnType) {
    if (stnType === 'rain') {
        var chart_id = 'CountryChart' + station_ID;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawBigBarChart(chart_id, labels, valus, label);
            });
        });
    }
    if (stnType === 'level') {
        var chart_id = 'chartLinePurple' + station_ID;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawBigLineChart(chart_id, labels, valus, label , 'ارتفاع آب');
            });
        });
    }
}
const sensorNames = {'TMP': 'دما', 'HUM': 'رطوبت', 'PRS': 'فشار', 'WSP': 'سرعت باد',
'WDR': 'جهت باد', 'EVP': 'تبخیر', 'RAD': 'تشعشع'};
function drawCharts_c(station_ID, labels, valus, sensor) {
    if (sensor === 'RAINC') {
        var chart_id = 'CountryChart' + station_ID + sensor;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawBarChart(chart_id, labels, valus, 'باران تجمیعی');
            });
        });
    } else {
        var chart_id = 'chartLinePurple' + station_ID + sensor;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawLineChart(chart_id, labels, valus, sensorNames[sensor]);
            });
        });
    }
}
function drawBigCharts_c(station_ID, labels, valus, sensor) {
    if (sensor === 'RAINC') {
        var chart_id = 'CountryChart' + station_ID + sensor;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawBigBarChart(chart_id, labels, valus, 'باران تجمیعی');
            });
        });
    } else {
        var chart_id = 'chartLinePurple' + station_ID + sensor;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawBigLineChart(chart_id, labels, valus, sensorNames[sensor]);
            });
        });
    }
}
function displayAmariReport(stationID,totalRainBool,absoluteRainBool,rateRainBool,barDisplayBool,lineDisplayBool,startDate,endDate,startTime,endTime,Period){
    console.log(stationID,totalRainBool.toString() + '-' + absoluteRainBool.toString() + '-' + rateRainBool.toString() + '-' + barDisplayBool.toString() + '-' + lineDisplayBool.toString())
    console.log(startDate.toString()+ '###' +endDate.toString()+ '###' +startTime.toString()+ '###' +endTime.toString()+ '###' + Period.toString());
    getRainAmariReortValues(stationID,startDate,endDate,startTime,endTime,Period)
}
function getRainAmariReortValues(stationID,startDate,endDate,startTime,endTime,Period) {
    let RainAmariReortValues;
    $.ajax({
        url: '/api/values/rainamarireport/' + stationID + '/' +  startDate + '/' + endDate + '/' + startTime + '/' + endTime + '/' + Period ,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data) {
                // console.log("HHHHHHHHHHHHHHHH");
                // console.log(response.data);
                let RainAmariReort = response.data;
                /*
                [
                 {"value":673.5,"sample_time":"2020-04-26 00:45:29"},
                 {"value":689.3,"sample_time":"2020-04-27 00:47:50"},
                 {"value":701.3,"sample_time":"2020-04-28 00:38:34"}
                ]
                 */

                RainAmariReort = JSON.parse(RainAmariReort);

                console.log(`HHHHHHHHHHHHHHHH ${RainAmariReort} EEEEEEEEEEEEEEE`);
                //console.log(RainAmariReort[0]['sample_time']);
                //console.log(RainAmariReort[0]['value']);
                 let labels = [];
                 let values = [];
                for(let i=0;i<RainAmariReort.length;i++){

                    labels.push(RainAmariReort[i]['sample_time']);
                    //values.push(lntpn(JSON.stringify(RainAmariReort[i]['value'])));
                    values.push(RainAmariReort[i]['value']);
                }
                // RainAmariReort.map(el => {
                //     if(el) {
                //         labels.push(el['sample_time']);
                //     }
                //
                // })
                // RainAmariReort.map(el => {
                //     if(el) {
                //         values.push(el['value']);
                //     }
                // })


                //labels = convertNumsLabelToNamesLabel(labels);
                //values = calcEachMonth(values);
                // console.log("values after calc");
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log(labels[0]);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log(values[0]);

                drawBigCharts_rl(stationID, labels, values, 'باران تجمیعی', 'rain');
            }
        }
    })
}
function getRainValuesForDetailCard(id) {
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
                let date = response.data[2].date;
                let hour = response.data[2].hour;
                date = lntpn(date);
                hour = lntpn(hour);
                $('#' + id + ' i' + '#rain_total').text("").append("&nbsp&nbsp&nbsp;").append(' تجمیعی').append("&nbsp&nbsp&nbsp;");//.append(rt).append("&nbsp&nbsp&nbspmm") // ->rain_total
                $('#' + id + ' i' + '#rain_total_value').text("").append(rt)
                $('#' + id + ' i' + '#rain_total_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#rain_24').text("").append("&nbsp&nbsp&nbsp;").append(' ۲۴ ساعته').append("&nbsp&nbsp&nbsp;");//.append(response.data[1].value).append("&nbsp&nbsp&nbsp;mm");// 1->rain_24
                $('#' + id + ' i' + '#rain_24_value').text("").append(r24)
                $('#' + id + ' i' + '#rain_24_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#rain_12').text("").append("&nbsp&nbsp&nbsp;").append(' ۱۲ ساعته').append("&nbsp&nbsp&nbsp;");//.append(response.data[0].value).append("&nbsp&nbsp&nbsp;mm");// 0 ->rain_12
                $('#' + id + ' i' + '#rain_12_value').text("").append(r12)
                $('#' + id + ' i' + '#rain_12_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ آخرین داده').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_value').text("").append(hour).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);

                //console.log(date);
                //drawCharts(rain_stations_names_and_ids,labels,values);
            }
        }
    })
    $.ajax({
        url: '/api/stations/installdate/' + id,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                let date = response.data[0].date;
                console.log(`date = ${date}`);
                date = lntpn(date);
                console.log(`date = ${date}`);
                $('#' + id + ' i' + '#date_of_installation_label').text("").append('تاریخ نصب ایستگاه').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_installation_value').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);
            }
        }
    })
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
                //let time = response.data[2].sample_time;
                let date = response.data[2].date;
                let hour = response.data[2].hour;
                date = lntpn(date);
                hour = lntpn(hour);
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
                $('#' + id + ' i' + '#date_of_last_recieved_data_value').text("").append(hour).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);
            }
        }
    })
}
function getRainTotalOfEndOfPastMonthsForDrawingCharts(station_ID) {
        let rain_total_of_past_months;
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
                    getRainTotalOfEndOfPastMonthsForDrawingCharts(el.id);
                });

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
                let date = response.data[0].date;
                let hour = response.data[0].hour;
                date = lntpn(date);
                hour = lntpn(hour);
                $('#' + id + ' i' + '#level_total').text("").append("&nbsp&nbsp&nbsp;").append('ارتفاع ').append("&nbsp&nbsp&nbsp;");//.append(rt).append("&nbsp&nbsp&nbspmm") // ->rain_total
                $('#' + id + ' i' + '#level_total_value').text("").append(lt)
                $('#' + id + ' i' + '#level_total_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ داده').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_value').text("").append(hour).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);

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
                    let date = response.data[2].date;
                    let hour = response.data[2].hour;
                    date = lntpn(date);
                    hour = lntpn(hour);
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
                    $('#' + id + sensor + ' i' + '#date_of_last_recieved_data_value').text("").append(hour).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);
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
                    let date = response.data[3].date;
                    let hour = response.data[3].hour;
                    date = lntpn(date);
                    hour = lntpn(hour);
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
                    $('#' + id + sensor + ' i' + '#date_of_last_recieved_data_value').text("").append(hour).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);

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
                            drawCharts_c(station_ID, labels, values, sensor[0]);

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
                            drawCharts_c(station_ID, labels, values, sensor[0]);
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
let this_js_script = $('script[src*=my_jquery_functions]'); // or better regexp to get the file name..
let pageType = this_js_script.attr('page_type');
if (typeof stnType === "undefined") {
    let stnType = 'some_default_value';
}
// let title = this_js_script.attr('title');
$(document).ready(() => {
    $.getScript('/assets/js/my_set_font_size.js', function () {
        setFontSize();
    });
    //$('*').persiaNumber();
    //$('*').persianNum();
    if (pageType.substr(0, 2) == 'ov') {
        let rv,lv,cv;
        rv = pageType.substr(2, 1);
        lv = pageType.substr(3, 1);
        cv = pageType.substr(4, 1);
        console.log(`window.savedsi = ${window.savedsi}`);
        mysiema(window.savedsi);
        if(rv=='1'){
            getRainStationsNamesAndIDs();
        }
        if(lv=='1'){
            getLevelStationsNamesAndIDs();
        }
        if(cv=='1'){
            getClimaStationsNamesAndIDs();
        }
    }
    if (pageType.substr(0, 2) == 'dt') {
        let s;
        s = pageType.substr(2, 1);
        switch(s){
            case 'r':;
            case 'l':;
            case '0':;
            case '1':;
            case '2':;
            case '3':;
            case '4':;
            case '5':;
            case '6':;
            case '7':;
        }
    }

});
// setInterval(function(){
//     getRainStationsNamesAndIDs(); // this will run after every 5 seconds
// }, 5000);