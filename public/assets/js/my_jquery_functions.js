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
    //console.log(`SideIndex ======> ${window.currentSlideIndex}`);
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
    window.timerId = setInterval(() => mySiema.next(), 10000)

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
                checkBoxes = document.querySelectorAll(".mycheck-rc");//("[id^='rain']");
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
function settings(){
    const url = '/settings/';
    $.redirect(url, "POST");
}
function create_new_station(stnName,stnCode,zoneName,riverName,longitude,latitude,utmX,utmY,height,establishYear,stnType){
    let data = {'sn':stnName    , 'sc':stnCode, 'zn':zoneName, 'rn':riverName, 'ln':longitude, 'lt':latitude, 'ux':utmX, 'uy':utmY, 'h':height, 'ey':establishYear,'st':stnType};
    let url = '/api/stns/new/';
    $.ajax({
        // ' + stnName + '/' + stnCode + '/' + zoneName + '/' + riverName + '/' + longitude + '/' + latitude + '/' + utmX + '/' + utmY + '/' + height + '/' + establishYear + '/' + stnType ,
        url: url,
        type: 'POST',
        dataType: 'json',
        data: data,
        success: (response) => {
            if(response.data == 1)
                alert('ایستگاه با موفقیت ثبت شد');
            else if(response.data == -1)
                alert('ثبت ایستگاه با این کد مجاز نمی باشد');
        }
    })

}
function displayOverview() {
    let checkBoxes = document.querySelectorAll("[class^='mycheck-']");
    // console.log(checkBoxes);
    let rstations=[];
    let rcstations=[];
    let lstations=[];
    let cstations=[];
    checkBoxes.forEach(ch => {
        if(ch.checked === true){
            if(ch.className === 'mycheck-r')
                rstations.push(ch.id.split('-').pop());// ch.id => 'r-103'
            if(ch.className === 'mycheck-rc')
                rcstations.push(ch.id.split('-').pop());
            if(ch.className === 'mycheck-l')
                lstations.push(ch.id.split('-').pop());
            if(ch.className === 'mycheck-c')
                cstations.push(ch.id.split('-').pop());
        }
    })
    //console.log(`rstations === ${rstations}`);
    //console.log(`lstations === ${lstations}`);
    //console.log(`cstations === ${cstations}`);
    const url = '/overview/';
    let data ={
        rstations,
        rcstations,
        lstations,
        cstations
    }
    $.redirect(url, data, "POST");

}
function loadDetailCard(id,position,sensor,subtype){
    location.href = '/detail/' + id + '-' + sensor + '-' + position + '-' + subtype +'-' + window.currentSlideIndex;
}
function checkRainStart(stnID,clima){
    let result = undefined;
    var status=[0,0,0];
    let url = undefined;
    if(clima === 'true'){
        // console.log('/api/status/rainrc/start/' + stnID);
        url = '/api/status/rainrc/start/' + stnID
    }
    else
        url = '/api/status/rain/start/' + stnID
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            // console.log(`stnid = ${stnID} => RESPONSE = ${response.data}`);
            result = response.data;
            // console.log(`${stnID} => rainstart = ${response.data}`);
            if(result !== -1) {
                if (clima === 'false') {
                    if (result === 1) {
                        status[0] = 1;
                        //clear cache befor refresh here
                        $.ajax({
                            url: '/api/caches/rain/' + stnID + '/' + 'r', success: function () {
                            }
                        });
                        getRainValues(stnID, 'r')//for refreshing data
                        getRainValuesFromStartTimeForDrawingRainStartChart(stnID, 'r');
                        checkRainAlarm(stnID, clima, status);
                    } else if (result === 0) {
                        status[0] = 0;
                        $('#' + stnID + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//.append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                        $('#' + stnID + ' i' + '#rain_status_result').text("").append('بدون بارش');
                        $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-rain');
                        $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers');
                        $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers-heavy');
                        $('#' + stnID + ' svg' + '#icon-status').addClass('fa-sun-cloud');
                        $('#' + stnID).removeClass('raining');
                        $('#' + stnID).removeClass('shower');
                        $('#' + stnID).removeClass('shower-heavy');
                        $('#' + stnID + ' i' + '#rain_alarm').text("").append(' بدون هشدار').append("&nbsp&nbsp&nbsp;");
                        $('#' + stnID + ' i' + '#rain_alarm1').text("").append('');
                        $('#' + stnID + ' i' + '#rain_alarm8').text("").append('');
                        getRainValues(stnID, 'r')//for refreshing data
                        getRainTotalOfEndOfPastMonthsForDrawingCharts(stnID, 'r')//for refreshing chart
                    }
                } else if (clima === 'true') {
                    if (result === 1) {
                        status[0] = 1;
                        //clear cache befor refresh here
                        $.ajax({
                            url: '/api/caches/rain/' + stnID + '/' + 'c', success: function () {
                            }
                        });
                        getRainValues(stnID, 'c')//for refreshing data
                        getRainValuesFromStartTimeForDrawingRainStartChart(stnID, 'c');
                        ///////////////////////////////////////////////B alarm checking
                        checkRainAlarm(stnID, clima, status);
                        ///////////////////////////////////////////////E alarm checking
                    } else if (result === 0) {
                        status[0] = 0;
                        $('#' + stnID + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//.append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                        $('#' + stnID + ' i' + '#rain_status_result').text("").append('بدون بارش');
                        $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-rain');
                        $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers');
                        $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers-heavy');
                        $('#' + stnID + ' svg' + '#icon-status').addClass('fa-sun-cloud');
                        $('#' + stnID).removeClass('raining');
                        $('#' + stnID).removeClass('shower');
                        $('#' + stnID).removeClass('shower-heavy');
                        $('#' + stnID + ' i' + '#rain_alarm').text("").append(' بدون هشدار').append("&nbsp&nbsp&nbsp;");
                        $('#' + stnID + ' i' + '#rain_alarm1').text("").append('');
                        $('#' + stnID + ' i' + '#rain_alarm8').text("").append('');
                        getRainValues(stnID, 'c')//for refreshing data
                        getRainTotalOfEndOfPastMonthsForDrawingCharts(stnID, 'c')//for refreshing chart
                    }
                }


            }
        }//success
    })
}
function checkRainAlarm(stnID,clima,status){
    let result=undefined;
    let url1 = undefined;
    let url8 = undefined;
    if(clima === 'true') {
        url1 = '/api/status/rainrc/alarm1/' + stnID;
        url8 = '/api/status/rainrc/alarm8/' + stnID;
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
            //console.log("RESPONSE");
            // console.log(`${stnID} alarm 1 : ${response.data}`);
            result = response.data;
            if(clima === 'false') {
                if (result === 1) {
                    console.log("HEYYYYYYYY");
                    status[1] = 1;
                } else if (result === 0) {
                    status[1] = 0;
                }
            }else if(clima === 'true'){
                if (result === 1) {
                    status[1] = 1;
                } else if (result === 0) {
                    status[1] = 0;
                }
            }
            $.ajax({
                url: url8,
                type: 'GET',
                dataType: 'json',
                success: (response) => {
                    // console.log("RESPONSE");
                    // console.log(`${stnID} alarm 8 : ${response.data}`);
                    result = response.data;
                    if(clima === 'false') {
                        if (result === 1) {
                            status[2] = 1;


                        } else if (result === 0) {
                            status[2] = 0;

                            // $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers-heavy');
                        }
                    }else if(clima === 'true'){
                        if (result === 1) {
                            status[2] = 1;

                            // $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-rain');
                            // $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers');
                            // $('#' + stnID + ' svg' + '#icon-status').addClass('fa-cloud-showers-heavy');
                        } else if (result === 0) {
                            status[2] = 0;

                            // $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers-heavy');
                        }
                    }
                    let finalStatus = status[0].toString() + status[1].toString() + status[2].toString();
                    // console.log(`${stnID} finalStatus : ${finalStatus} ${status[0]} ${status[1]} ${status[2]}`);
                    switch (finalStatus) {

                        case '100' :

                            $('#' + stnID + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                            $('#' + stnID + ' i' + '#rain_status_result').text("").append('در حال بارش');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-sun-cloud');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers-heavy');
                            $('#' + stnID + ' svg' + '#icon-status').addClass('fa-cloud-rain');
                            $('#' + stnID).removeClass('shower');
                            $('#' + stnID).removeClass('shower-heavy');
                            $('#' + stnID).addClass('raining');
                            $('#' + stnID + ' i' + '#rain_alarm').text("").append(' بدون هشدار').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + ' i' + '#rain_alarm1').text("").append('');
                            $('#' + stnID + ' i' + '#rain_alarm8').text("").append('');

                            break;
                        case '110' :

                            $('#' + stnID + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                            $('#' + stnID + ' i' + '#rain_status_result').text("").append('در حال بارش');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-sun-cloud');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-rain');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers-heavy');
                            $('#' + stnID + ' svg' + '#icon-status').addClass('fa-cloud-showers');
                            $('#' + stnID).removeClass('raining');
                            $('#' + stnID).removeClass('shower-heavy');
                            $('#' + stnID).addClass('shower');
                            $('#' + stnID + ' i' + '#rain_alarm').text("").append(' هشدار').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + ' i' + '#rain_alarm1').text("").append('رگبار ۱ میلی').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + ' i' + '#rain_alarm8').text("").append('');

                            break;
                        case '101' :

                            $('#' + stnID + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                            $('#' + stnID + ' i' + '#rain_status_result').text("").append('در حال بارش');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-sun-cloud');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-rain');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers');
                            $('#' + stnID + ' svg' + '#icon-status').addClass('fa-cloud-showers-heavy');
                            $('#' + stnID).removeClass('raining');
                            $('#' + stnID).removeClass('shower');
                            $('#' + stnID).addClass('shower-heavy');
                            $('#' + stnID + ' i' + '#rain_alarm1').text("").append('');
                            $('#' + stnID + ' i' + '#rain_alarm').text("").append("&nbsp&nbsp&nbsp;").append(' هشدار').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + ' i' + '#rain_alarm8').text("").append('رگبار ۸ میلی');

                            break;
                        case '111' :

                            $('#' + stnID + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                            $('#' + stnID + ' i' + '#rain_status_result').text("").append('در حال بارش');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-sun-cloud');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-rain');
                            $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-cloud-showers');
                            $('#' + stnID + ' svg' + '#icon-status').addClass('fa-cloud-showers-heavy');
                            $('#' + stnID).removeClass('raining');
                            $('#' + stnID).removeClass('shower');
                            $('#' + stnID).addClass('shower-heavy');
                            $('#' + stnID + ' i' + '#rain_alarm').text("").append(' هشدار').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + ' i' + '#rain_alarm1').text("").append('رگبار ۱ میلی').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + ' i' + '#rain_alarm8').text("").append('رگبار ۸ میلی');

                            break;
                    }


                }//success 8m
            })
        }//success 1m
    })

}
function checkRainStartFromClima(stnID){
    let result = undefined;
    let status=[0,0,0];
    let url = '/api/status/rainc/start/' + stnID
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            // console.log(`stnid = ${stnID} => RESPONSE = ${response.data}`);
            result = response.data;
            // console.log(`${stnID} => rainstart = ${response.data}`);
            if(result !== -1) {
                if (result === 1) {
                    status[0] = 1;
                    //clear cache befor refresh here
                    $.ajax({url: '/api/caches/clima/' + 'rainc' + '/' + stnID, success: function(){}});
                    getClimaValues(stnID, 'RAINC', '');//for refreshing values
                    getRainValuesFromStartTimeForDrawingRainStartChartFromClima(stnID);
                    checkRainAlarmFromClima(stnID,status);
                } else if (result === 0) {
                    status[0] = 0;
                    $('#' + stnID + 'RAINC'  + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//.append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                    $('#' + stnID + 'RAINC'  + ' i' + '#rain_status_result').text("").append('بدون بارش');
                    $('#' + stnID + 'RAINC'  + ' svg' + '#icon-status').removeClass('fa-cloud-rain');
                    $('#' + stnID + 'RAINC'  + ' svg' + '#icon-status').removeClass('fa-cloud-showers');
                    $('#' + stnID + 'RAINC'  + ' svg' + '#icon-status').removeClass('fa-cloud-showers-heavy');
                    $('#' + stnID + 'RAINC'  + ' svg' + '#icon-status').addClass('fa-sun-cloud');
                    $('#' + stnID + 'RAINC' ).removeClass('raining');
                    $('#' + stnID + 'RAINC' ).removeClass('shower');
                    $('#' + stnID + 'RAINC' ).removeClass('shower-heavy');
                    $('#' + stnID + 'RAINC'  + ' i' + '#rain_alarm').text("").append(' بدون هشدار').append("&nbsp&nbsp&nbsp;");
                    $('#' + stnID + 'RAINC'  + ' i' + '#rain_alarm1').text("").append('');
                    $('#' + stnID + 'RAINC'  + ' i' + '#rain_alarm8').text("").append('');
                    // let sensor = ['RAINC', 'mm'];
                    getClimaValues(stnID, 'RAINC', '');
                    getClimaLastHoursForDrawingCharts(stnID, 'RAINC');//for refreshing values
                    // getClimaLastHoursForDrawingCharts(stnID, sensor);//for refreshing values
                }
            }
        }
    })
}
function checkRainAlarmFromClima(stnID){
    let result=undefined;
    let url1 = '/api/status/rainc/alarm1/' + stnID;
    let url8 = '/api/status/rainc/alarm8/' + stnID;

    $.ajax({
        url: url1,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            result = response.data;
            if (result === 1) {
                status[1] = 1;
            } else if (result === 0) {
                status[1] = 0;
            }
            $.ajax({
                url: url8,
                type: 'GET',
                dataType: 'json',
                success: (response) => {
                    status = response.data;
                    if (result === 1) {
                        status[2] = 1;
                    } else if (result === 0) {
                        status[2] = 0;
                    }
                    let finalStatus = status[0].toString() + status[1].toString() + status[2].toString();
                    // console.log(`${stnID} finalStatus : ${finalStatus} ${status[0]} ${status[1]} ${status[2]}`);
                    switch (finalStatus) {

                        case '100' :

                            $('#' + stnID + 'RAINC' + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_status_result').text("").append('در حال بارش');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-sun-cloud');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-cloud-showers');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-cloud-showers-heavy');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').addClass('fa-cloud-rain');
                            $('#' + stnID + 'RAINC').removeClass('shower');
                            $('#' + stnID + 'RAINC').removeClass('shower-heavy');
                            $('#' + stnID + 'RAINC').addClass('raining');
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm').text("").append(' بدون هشدار').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm1').text("").append('');
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm8').text("").append('');

                            break;
                        case '110' :

                            $('#' + stnID + 'RAINC' + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_status_result').text("").append('در حال بارش');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-sun-cloud');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-cloud-rain');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-cloud-showers-heavy');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').addClass('fa-cloud-showers');
                            $('#' + stnID + 'RAINC').removeClass('raining');
                            $('#' + stnID + 'RAINC').removeClass('shower-heavy');
                            $('#' + stnID + 'RAINC').addClass('shower');
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm').text("").append(' هشدار').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm1').text("").append('رگبار ۱ میلی').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm8').text("").append('');

                            break;
                        case '101' :

                            $('#' + stnID + 'RAINC' + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_status_result').text("").append('در حال بارش');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-sun-cloud');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-cloud-rain');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-cloud-showers');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').addClass('fa-cloud-showers-heavy');
                            $('#' + stnID + 'RAINC').removeClass('raining');
                            $('#' + stnID + 'RAINC').removeClass('shower');
                            $('#' + stnID + 'RAINC').addClass('shower-heavy');
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm1').text("").append('');
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm').text("").append("&nbsp&nbsp&nbsp;").append(' هشدار').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm8').text("").append('رگبار ۸ میلی');

                            break;
                        case '111' :

                            $('#' + stnID + 'RAINC' + ' i' + '#rain_status').text("");//.append("&nbsp&nbsp&nbsp;");//append(' وضعیت بارندگی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_status_result').text("").append('در حال بارش');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-sun-cloud');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-cloud-rain');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').removeClass('fa-cloud-showers');
                            $('#' + stnID + 'RAINC' + ' svg' + '#icon-status').addClass('fa-cloud-showers-heavy');
                            $('#' + stnID + 'RAINC').removeClass('raining');
                            $('#' + stnID + 'RAINC').removeClass('shower');
                            $('#' + stnID + 'RAINC').addClass('shower-heavy');
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm').text("").append(' هشدار').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm1').text("").append('رگبار ۱ میلی').append("&nbsp&nbsp&nbsp;");
                            $('#' + stnID + 'RAINC' + ' i' + '#rain_alarm8').text("").append('رگبار ۸ میلی');

                            break;
                    }

                }//success 8m
            })
        }//success 1m
    })

}
function checkFloodStatus(stnID){
    let status=undefined;
    let url = undefined;
    url = '/api/status/level/flood/' + stnID
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            console.log('inside checkFloodStatus:');
            console.log(`stnid = ${stnID} => RESPONSE = ${response.data}`);
            status = response.data;
            if(status !== -1) {
                if (status === 1) {
                    $('#' + stnID + ' i' + '#flood_status').text("");
                    $('#' + stnID + ' i' + '#flood_status').text("").append("&nbsp&nbsp&nbsp;").append('سیلاب');
                    $('#' + stnID + ' svg' + '#icon-status').removeClass('fa-water');
                    $('#' + stnID + ' svg' + '#icon-status').addClass('fa-water-rise');

                    $('#' + stnID).addClass('flooding');

                    //clear cache befor refresh here
                    try{
                        $.ajax({url: "/api/caches/level/" + stnID , success: function(result){}});
                    }catch (e){
                        console.log(`e = ${e}`);
                    }

                    getLevelValue(stnID);//for refreshing values
                    getLevelOfLastHoursForDrawingCharts(stnID);//for refreshing values

                    // console.log('HHHAAAAPPPEEEENNNIIIINNNGGGGG');
                } else if (status === 0) {
                    $('#' + stnID + ' i' + '#flood_status').text("").append("&nbsp&nbsp&nbsp;").append('بدون سیلاب');
                    $('#' + stnID + ' svg' + '#icon-status').removeClass('wi-flood');
                    $('#' + stnID + ' svg' + '#icon-status').removeClass('wi');
                    $('#' + stnID + ' svg' + '#icon-status').removeClass('fal');
                    $('#' + stnID + ' svg' + '#icon-status').addClass('fa-water');
                    $('#' + stnID).removeClass('flooding');
                } else if (status === 2) {
                    //clear cache befor refresh here
                    try{
                        $.ajax({url: "/api/caches/level/" + stnID , success: function(result){
                                getLevelValue(stnID);//for refreshing values
                                getLevelOfLastHoursForDrawingCharts(stnID);//for refreshing values
                            }});
                    }catch (e){
                        getLevelValue(stnID);//for refreshing values
                        getLevelOfLastHoursForDrawingCharts(stnID);//for refreshing values
                        console.log(`e = ${e}`);
                    }

                    $('#' + stnID + ' i' + '#flood_status').text("").append("&nbsp&nbsp&nbsp;").append('بدون سیلاب');
                    $('#' + stnID + ' svg' + '#icon-status').removeClass('wi-flood');
                    $('#' + stnID + ' svg' + '#icon-status').removeClass('wi');
                    $('#' + stnID + ' svg' + '#icon-status').removeClass('fal');
                    $('#' + stnID + ' svg' + '#icon-status').addClass('fa-water');
                    $('#' + stnID).removeClass('flooding');
                }
            }
        }
    })
}
function checkFloodStatusForDetailCard(stnID){
    let status=undefined;
    let url = undefined;
    url = '/api/status/level/flood/' + stnID
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            // console.log('inside checkFloodStatus:');
            // console.log(`stnid = ${stnID} => RESPONSE = ${response.data}`);
            status = response.data;

            if (status === 1) {
                $('#' + stnID + ' i' + '#level_alarm').text("");
                $('#' + stnID + ' i' + '#level_alarm').text("").append("&nbsp&nbsp&nbsp;").append('سیلاب');
                //clear cache befor refresh here
                try{
                    $.ajax({url: "/api/caches/level/" + stnID , success: function(result){}});
                }catch(e){
                    console.log(`e = ${e}`);
                }

                getLevelValueForDetailCard(stnID)//for refreshing values
                // console.log('HHHAAAAPPPEEEENNNIIIINNNGGGGG');
            } else if (status === 0) {
                $('#' + stnID + ' i' + '#flood_status').text("").append("&nbsp&nbsp&nbsp;").append('بدون سیلاب');
            }
            else if (status === 2) {
                //clear cache befor refresh here
                try{
                    $.ajax({url: "/api/caches/level/" + stnID , success: function(result){
                            getLevelValueForDetailCard(stnID);
                        }});
                }catch(e){
                    getLevelValueForDetailCard(stnID);
                    console.log(`e = ${e}`);
                }
                $('#' + stnID + ' i' + '#flood_status').text("").append("&nbsp&nbsp&nbsp;").append('بدون سیلاب');
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
function calcAmariAbsoluteValues(values) {
    let n = values.length;
    for (let i = n-1; i > 0; i--) {

            let x = values[i] - values[i - 1];
            if (x < 0) {
                x = 0;
            }


        x = round(x, 2);
        values[i] = x;

    }
    return values;
}
function calcStartRainValues(values) {
    let n = values.length;
    for (let i = n-1; i >= 0; i--) {

        let x = values[i] - values[0];
        if (x < 0) {
            x = 0;
        }


        x = round(x, 2);
        values[i] = x;

    }
    return values;
}
function calcAmariRateValues(values,period) {
    let n = values.length;
    for (let i = n-1; i > 0; i--) {

        let x = values[i] - values[i - 1];
        if (x < 0) {
            x = 0;
        }else
            x = x / period;


        x = round(x, 2);
        values[i] = x;

    }
    return values;
}
function resetRainChart(stnID) {
    let chID = 'small-chart' + stnID;
    // console.log(chID);
    // console.log($('#' + chID));
    $('#' + chID).remove(); // this is my <canvas> element
    $('.chartjs-size-monitor').remove();
    $('#chart-container' + stnID).append('<canvas id=' + chID + '></canvas>');
}
function resetLevelChart(stnID) {
    let chID = 'small-chart' + stnID;
    // console.log(chID);
    // console.log($('#' + chID));
    $('#' + chID).remove(); // this is my <canvas> element
    $('.chartjs-size-monitor').remove();
    $('#chart-container' + stnID).append('<canvas id=' + chID + '></canvas>');
}
function resetRainChartFromClima(stnID) {
    let chID = 'small-chart' + stnID + 'RAINC';
    // console.log(chID);
    // console.log($('#' + chID));
    $('#' + chID).remove(); // this is my <canvas> element
    $('.chartjs-size-monitor').remove();
    $('#chart-container' + stnID + 'RAINC').append('<canvas id=' + chID + '></canvas>');
}
function drawSmallChart_rl(station_ID, labels, values, label, stnType , chartType) {
    if (stnType === 'rain') {
        if(chartType === 'bar'){
            let chart_id = 'small-chart' + station_ID;
            $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
                $.getScript('/assets/js/mychart.js', function () {
                    drawSmallBarChart(chart_id, labels, values, label);
                });
            });
        }else if(chartType === 'line'){
            let chart_id = 'small-chart' + station_ID;
            $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
                $.getScript('/assets/js/mychart.js', function () {
                    drawSmallLineChart(chart_id, labels, values, 'میزان باران از شروع بارش');
                });
            });
        }

    }
    if (stnType === 'level') {
        let chart_id = 'small-chart' + station_ID;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawSmallLineChart(chart_id, labels, values, label );
            });
        });
    }
}
function drawLargeChart_rl(station_ID, labels, values, label, stnType, chartType) {
    let chart_id = 'large-chart' + station_ID;
    if (stnType === 'rain') {
        if(chartType == 'bar'){
            $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
                $.getScript('/assets/js/mychart.js', function () {
                    drawLargeBarChart(chart_id, labels, values, label);
                });
            });
        }else if(chartType == 'line'){
            $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
                $.getScript('/assets/js/mychart.js', function () {
                    drawLargeLineChart(chart_id, labels, values, label );
                });
            });
        }
    }else if (stnType === 'level') {
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawLargeLineChart(chart_id, labels, values, label , 'ارتفاع آب');
            });
        });
    }
}
function drawLargeChart_c(station_ID, labels, values, label , multiLineChart) {
    let chart_id = 'large-chart' + station_ID;
    let myChart = undefined;
    if(multiLineChart == true){
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                myChart = drawLargeMultiLineClimaChart(chart_id, labels, values,  label);
            });
        });
    }else{
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                myChart = drawLargeMultiLineClimaChart2(chart_id, labels, values,  label);
            });
        });
    }
}
function drawSmallChart_c(station_ID, labels, values, sensor, chartType) {
    const sensorNames = {'TMP': 'دما', 'HUM': 'رطوبت', 'PRS': 'فشار', 'WSP': 'سرعت باد','WDR': 'جهت باد', 'EVP': 'تبخیر', 'RAD': 'تشعشع'};
    if (sensor === 'RAINC') {
        if(chartType === 'bar'){
            let chart_id = 'small-chart' + station_ID + sensor;
            $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
                $.getScript('/assets/js/mychart.js', function () {
                    drawSmallBarChart(chart_id, labels, values, 'باران تجمیعی');
                });
            });
        }else if(chartType === 'line'){
            let chart_id = 'small-chart' + station_ID + sensor;
            $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
                $.getScript('/assets/js/mychart.js', function () {
                    drawSmallLineChart(chart_id, labels, values , 'میزان باران از شروع بارش');
                });
            });
        }

    } else {
        let chart_id = 'small-chart' + station_ID + sensor;
        $('.chart-area' + ' canvas' + '#' + chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {
                drawSmallLineChart(chart_id, labels, values, sensorNames[sensor]);
            });
        });
    }
}
function fillAmariTable(stationID, labels, values){
    //let table = $('#table' + stationID)[0];
    let table = document.getElementById('amari-table' + stationID).getElementsByTagName('tbody')[0];
    let n = values.length;
    for (let i = 0; i < n; i++) {
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        cell0.innerHTML = lntpn((i+1).toString());
        cell1.innerHTML = lntpn(values[i].toString());
        cell2.innerHTML = lntpn(labels[i].toString());
        //console.log(`HEY => ${i} ${labels[i]}`);
    }
}
function fillClimaAmariTable(stationID, labels, values){
    let table = document.getElementById('clima-amari-table' + stationID).getElementsByTagName('tbody')[0];
    let tb = document.getElementById('clima-amari-table' + stationID);
    let tmp_labels = labels[0];
    let tmp_values = values[0];
    let wsp_labels = labels[1];
    let wsp_values = values[1];
    let hum_labels = labels[2];
    let hum_values = values[2];
    let evp_labels = labels[3];
    let evp_values = values[3];
    let wdr_labels = labels[4];
    let wdr_values = values[4];
    let rad_labels = labels[5];
    let rad_values = values[5];
    let prs_labels = labels[6];
    let prs_values = values[6];

    let table_labels = [];
    let header = tb.createTHead();
    let hRow = header.insertRow(0);
    let hCell0 = hRow.insertCell(0);
    hCell0.innerHTML = "<b>ردیف</b>";
    let index = 0;
    if(tmp_labels.length >0){
        table_labels = tmp_labels;
        index++;
        let hCell1 = hRow.insertCell(index);
        hCell1.innerHTML = "<b>دما</b>";
    }
    if(wsp_labels.length >0){
        table_labels = wsp_labels;
        index++;
        let hCell2 = hRow.insertCell(index);
        hCell2.innerHTML = "<b>سرعت باد</b>";
    }
    if(hum_labels.length >0){
        table_labels = hum_labels;
        index++;
        let hCell3 = hRow.insertCell(index);
        hCell3.innerHTML = "<b>رطوبت</b>";
    }
    if(evp_labels.length >0){
        table_labels = evp_labels;
        index++;
        let hCell4 = hRow.insertCell(index);
        hCell4.innerHTML = "<b>تبخیر</b>";
    }
    if(wdr_labels.length >0){
        table_labels = wdr_labels;
        index++;
        let hCell5 = hRow.insertCell(index);
        hCell5.innerHTML = "<b>جهت باد</b>";
    }
    if(rad_labels.length >0){
        table_labels = rad_labels;
        index++;
        let hCell6 = hRow.insertCell(index);
        hCell6.innerHTML = "<b>تشعشع</b>";
    }
    if(prs_labels.length >0){
        table_labels = prs_labels;
        index++;
        let hCell7 = hRow.insertCell(index);
        hCell7.innerHTML = "<b>فشارهوا</b>";
    }
    index++;
    let hCell8 = hRow.insertCell(index);
    hCell8.innerHTML = "<b>تاریخ داده</b>";


    let n = table_labels.length;
    for (let i = 0; i < n; i++) {
        index = 0 ;
        let row = table.insertRow();
        let cell0 = row.insertCell(index);
        cell0.innerHTML = lntpn((i+1).toString());
        if(tmp_labels.length >0) {
            index++;
            let cell1 = row.insertCell(index);
            cell1.innerHTML = lntpn(values[0][i].toString());
        }
        if(wsp_labels.length >0) {
            index++;
            let cell2 = row.insertCell(index);
            cell2.innerHTML = lntpn(values[1][i].toString());
        }
        if(hum_labels.length >0) {
            index++;
            let cell3 = row.insertCell(index);
            cell3.innerHTML = lntpn(values[2][i].toString());
        }
        if(evp_labels.length >0) {
            index++;
            let cell4 = row.insertCell(index);
            cell4.innerHTML = lntpn(values[3][i].toString());
        }
        if(wdr_labels.length >0) {
            index++;
            let cell5 = row.insertCell(index);
            cell5.innerHTML = lntpn(values[4][i].toString());
        }
        if(rad_labels.length >0) {
            index++;
            let cell6 = row.insertCell(index);
            cell6.innerHTML = lntpn(values[5][i].toString());
        }
        if(prs_labels.length >0) {
            index++;
            let cell7 = row.insertCell(index);
            cell7.innerHTML = lntpn(values[6][i].toString());
        }
        index++;
        let cell8 = row.insertCell(index);
        cell8.innerHTML = lntpn(table_labels[i].toString());
    }

}
function fillClimaMantagheiTable(stationID, values){
    let table = document.getElementById('clima-mantaghei-table' + stationID).getElementsByTagName('tbody')[0];
    let tb = document.getElementById('clima-mantaghei-table' + stationID);

    let header = tb.createTHead();
    let hRow = header.insertRow(0);
    let hCell0 = hRow.insertCell(0);
    hCell0.innerHTML = "<b>ردیف</b>";
    let hCell1 = hRow.insertCell(1);
    hCell1.innerHTML = "<b>تاریخ</b>";
    let hCell2 = hRow.insertCell(2);
    hCell2.innerHTML = "<b>تبخیر ۶:۳۰</b>";
    let hCell3 = hRow.insertCell(3);
    hCell3.innerHTML = "<b>تبخیر ۱۸:۳۰</b>";
    let hCell4 = hRow.insertCell(4);
    hCell4.innerHTML = "<b>ارتفاع تبخیر</b>";
    let hCell5 = hRow.insertCell(5);
    hCell5.innerHTML = "<b>بارندگی ۶:۳۰</b>";
    let hCell6 = hRow.insertCell(6);
    hCell6.innerHTML = "<b>بارندگی ۱۸:۳۰</b>";
    let hCell7 = hRow.insertCell(7);
    hCell7.innerHTML = "<b>حداقل دما ۶:۳۰</b>";
    let hCell8 = hRow.insertCell(8);
    hCell8.innerHTML = "<b>حداکثر دما ۱۸:۳۰</b>";
    let hCell9 = hRow.insertCell(9);
    hCell9.innerHTML = "<b>دمای لحظه ای ۶:۳۰</b>";
    let hCell10 = hRow.insertCell(10);
    hCell10.innerHTML = "<b>رطوبت لحظه ای ۶:۳۰</b>";
    let hCell11 = hRow.insertCell(11);
    hCell11.innerHTML = "<b>دمای لحظه ای ۱۲:۳۰</b>";
    let hCell12 = hRow.insertCell(12);
    hCell12.innerHTML = "<b>رطوبت لحظه ای ۱۲:۳۰</b>";
    let hCell13 = hRow.insertCell(13);
    hCell13.innerHTML = "<b>دمای لحظه ای ۱۸:۳۰</b>";
    let hCell14 = hRow.insertCell(14);
    hCell14.innerHTML = "<b>رطوبت لحظه ای ۱۸:۳۰</b>";

    let n = values[0].length;
    for (let i = 0; i < n; i++) {
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        cell0.innerHTML = lntpn((i+1).toString());
        let cell1 = row.insertCell(1);
        if(values[0][i] != null)
            cell1.innerHTML = lntpn(values[0][i].toString());

        let cell2 = row.insertCell(2);
        if(values[1][i] != null)
            cell2.innerHTML = lntpn(values[1][i].toString());

        let cell3 = row.insertCell(3);
        if(values[2][i] != null)
            cell3.innerHTML = lntpn(values[2][i].toString());

        let cell4 = row.insertCell(4);
        if(values[1][i] != null && values[2][i] != null)
            cell4.innerHTML = lntpn((values[1][i]+values[2][i]).toFixed(2));

        let cell5 = row.insertCell(5);
        if(values[3][i] != null)
            cell5.innerHTML = lntpn(values[3][i].toString());

        let cell6 = row.insertCell(6);
        if(values[4][i] != null)
            cell6.innerHTML = lntpn(values[4][i].toString());

        let cell7 = row.insertCell(7);
        if(values[5][i] != null)
            cell7.innerHTML = lntpn(values[5][i].toString());

        let cell8 = row.insertCell(8);
        if(values[6][i] != null)
            cell8.innerHTML = lntpn(values[6][i].toString());

        let cell9 = row.insertCell(9);
        if(values[7][i] != null)
            cell9.innerHTML = lntpn(values[7][i].toString());

        let cell10 = row.insertCell(10);
        if(values[8][i] != null)
            cell10.innerHTML = lntpn(values[8][i].toString());

        let cell11 = row.insertCell(11);
        if(values[9][i] != null)
            cell11.innerHTML = lntpn(values[9][i].toString());

        let cell12 = row.insertCell(12);
        if(values[10][i] != null)
            cell12.innerHTML = lntpn(values[10][i].toString());

        let cell13 = row.insertCell(13);
        if(values[11][i] != null)
            cell13.innerHTML = lntpn(values[11][i].toString());

        let cell14 = row.insertCell(14);
        if(values[12][i] != null)
            cell14.innerHTML = lntpn(values[12][i].toString());

    }

}
function fillRainMantagheiTable(stationID, months, days,  values_6_30,values_18_30,values_24_00){
    //console.log("mmmmmmmmmmmmmmmmmmmmmmmmmm");
    //console.log(values.length.toString());
    //console.log(labels.length.toString());
    //console.log(values[values.length -1]);
    //console.log(labels[labels.length -1]);
    //let table = $('#table' + stationID)[0];
    let table = document.getElementById('mantaghei-table' + stationID).getElementsByTagName('tbody')[0];
    let n = days.length;
    for (let i = 0; i < n; i++) {
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        let cell4 = row.insertCell(4);
        cell0.innerHTML = months[i];
        cell1.innerHTML = lntpn(days[i].toString());
        cell2.innerHTML = lntpn(values_6_30[i].toString());
        cell3.innerHTML = lntpn(values_18_30[i].toString());
        cell4.innerHTML = lntpn(values_24_00[i].toString());
        //console.log(`HEY => ${i} ${labels[i]}`);
    }
}
function fillLevelMantagheiTable(stationID, months, days,  values_8,values_16){
    //console.log("mmmmmmmmmmmmmmmmmmmmmmmmmm");
    //console.log(values.length.toString());
    //console.log(labels.length.toString());
    //console.log(values[values.length -1]);
    //console.log(labels[labels.length -1]);
    //let table = $('#table' + stationID)[0];
    let table = document.getElementById('mantaghei-table' + stationID).getElementsByTagName('tbody')[0];
    let n = days.length;
    for (let i = 0; i < n; i++) {
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);

        cell0.innerHTML = months[i];
        cell1.innerHTML = lntpn(days[i].toString());
        cell2.innerHTML = lntpn(values_8[i].toString());
        cell3.innerHTML = lntpn(values_16[i].toString());
    }
}
function displayRainAmariReport(stationID,clima,totalRainBool,absoluteRainBool,rateRainBool,barDisplayBool,lineDisplayBool,startDate,endDate,startTime,endTime,period){
    //console.log(stationID,totalRainBool.toString() + '-' + absoluteRainBool.toString() + '-' + rateRainBool.toString() + '-' + barDisplayBool.toString() + '-' + lineDisplayBool.toString())
    //console.log(startDate.toString()+ '###' +endDate.toString()+ '###' +startTime.toString()+ '###' +endTime.toString()+ '###' + period.toString());
    let rainType = '';
    let chartType = '';
    if(totalRainBool)
        rainType = 'total';
    else if(absoluteRainBool)
        rainType = 'absolute';
    else if(rateRainBool)
        rainType = 'rate';
    if(barDisplayBool)
        chartType = 'bar';
    if(lineDisplayBool)
        chartType = 'line';

    $.ajax({
        url: '/api/values/rainamarireport/' + stationID +  '/' + clima + '/' +  startDate + '/' + endDate + '/' + startTime + '/' + endTime + '/' + period ,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data) {
                let RainAmariReort = response.data;
                /*
                [
                 {"value":673.5,"sample_time":"2020-04-26 00:45:29"},
                 {"value":689.3,"sample_time":"2020-04-27 00:47:50"},
                 {"value":701.3,"sample_time":"2020-04-28 00:38:34"}
                ]
                 */
                RainAmariReort = JSON.parse(RainAmariReort);
                if(RainAmariReort.length == 0){
                    alert('در بازه زمانی درخواستی داده ای وجود ندارد');
                    return;
                }
                $('#report-chart').show();
                $('#amari-table').show();

                let labels = [];
                let values = [];
                for(let i=0;i<RainAmariReort.length;i++){

                    labels.push(RainAmariReort[i]['sample_time']);
                    values.push(RainAmariReort[i]['value']);
                }
                switch(rainType){
                    case 'total':
                        values.splice(0,1);
                        labels.splice(0,1);
                        drawLargeChart_rl(stationID, labels, values, 'باران تجمیعی', 'rain',chartType);
                        break;
                    case 'absolute':
                        values = calcAmariAbsoluteValues(values);
                        values.splice(0, 1);
                        labels.splice(0, 1);
                            drawLargeChart_rl(stationID, labels, values, 'میزان بارش', 'rain', chartType);
                        break;
                    case 'rate':
                        values = calcAmariRateValues(values,period);
                        values.splice(0,1);
                        labels.splice(0,1);
                        drawLargeChart_rl(stationID, labels, values, 'شدت بارش', 'rain',chartType);
                        break;
                }
                fillAmariTable(stationID, labels, values);
                $('#download-button').removeClass("disabled");
            }
        }
    })
}
function getExcelRainAmariReport(stationID,clima,totalRainBool,absoluteRainBool,rateRainBool,barDisplayBool,lineDisplayBool,startDate,endDate,startTime,endTime,period) {
    let rainType = '';
    if(totalRainBool)
        rainType = 'total';
    else if(absoluteRainBool)
        rainType = 'absolute';
    else if(rateRainBool)
        rainType = 'rate';

    var oReq = new XMLHttpRequest();
    oReq.open("GET", '/api/values/excelrainamarireport/' + stationID + '/' + clima + '/' +  startDate + '/' + endDate + '/' + startTime + '/' + endTime + '/' + period + '/' + rainType , true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(oEvent) {
        var arrayBuffer = oReq.response;

        // if you want to access the bytes:
        var byteArray = new Uint8Array(arrayBuffer);
        // ...

        // If you want to use the image in your DOM:
        var blob = new Blob([arrayBuffer], {type: 'data:application/vnd.ms-excel'});
        saveAs(blob, 'rain-amari-report.xlsx');
        var saving = document.createElement('a');
        document.body.appendChild(saving);
        saving.click();
        document.body.removeChild(saving);
    };
    oReq.send();
}
function displayRainMantagheireport(stationID, clima, startDate, endDate){
    $.ajax({
        url: '/api/values/rainmantagheireport/' + stationID +  '/' + clima + '/' +  startDate + '/' + endDate  ,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data) {
                // console.log('response');
                // console.log(response);
                let RainMantagheiReort = response.data;
                // console.log('RainMantagheiReort');
                // console.log(RainMantagheiReort);
                /*

                 */
                // console.log('RainMantagheiReort[0]');
                // console.log(RainMantagheiReort[0]);
                // console.log(RainMantagheiReort[0]['time']);
                // console.log(RainMantagheiReort[0]['val_24_00']);
                //RainMantagheiReort = JSON.parse(RainMantagheiReort[0]);
                if(RainMantagheiReort.length == 0){
                    alert('در بازه زمانی درخواستی داده ای وجود ندارد');
                    return;
                }
                $('#report-chart').show();
                $('#mantaghei-table').show();

                let months = [];
                let days = [];
                let values_6_30 = [];
                let values_18_30 = [];
                let values_24_00 = [];
                for(let i=0;i<RainMantagheiReort.length;i++){

                    months.push(RainMantagheiReort[i]['month']);
                    days.push(RainMantagheiReort[i]['day']);
                    values_6_30.push(RainMantagheiReort[i]['val_6_30']);
                    values_18_30.push(RainMantagheiReort[i]['val_18_30']);
                    values_24_00.push(RainMantagheiReort[i]['val_24_00']);
                }
                //values.splice(0,1);
                //labels.splice(0,1);
                // console.log('days');
                // console.log(days);
                // console.log('values_24_00');
                // console.log(values_24_00);
                drawLargeChart_rl(stationID, days, values_24_00, 'باران تجمیعی', 'rain','bar');
                fillRainMantagheiTable(stationID,months, days, values_6_30,values_18_30,values_24_00);
                $('#download-button').removeClass("disabled");
            }
        }
    })
}
function getExcelRainMantagheiReport(stationID, clima, startDate, endDate){
    var oReq = new XMLHttpRequest();
    oReq.open("GET", '/api/values/excelrainmantagheireport/' + stationID + '/' + clima + '/' +  startDate + '/' + endDate , true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(oEvent) {
        var arrayBuffer = oReq.response;

        // if you want to access the bytes:
        var byteArray = new Uint8Array(arrayBuffer);
        // ...


        // If you want to use the image in your DOM:
        var blob = new Blob([arrayBuffer], {type: 'data:application/vnd.ms-excel'});
        saveAs(blob, 'Mantaghei-report.xlsx');
        var saving = document.createElement('a');
        document.body.appendChild(saving);
        saving.click();
        document.body.removeChild(saving);
    };
    oReq.send();
}
function getRainValuesForRainDetailCard(id) {
    $.ajax({
        url: '/api/values/rain/' + id+ '/' + 'r',
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
        url: '/api/stations/installdate/' + id  ,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                let date = response.data[0].date;
                //console.log(`date = ${date}`);
                date = lntpn(date);
                //console.log(`date = ${date}`);
                $('#' + id + ' i' + '#date_of_installation_label').text("").append('تاریخ نصب ایستگاه').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_installation_value').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);
            }
        }
    })
}
function getClimaRainValuesForRainDetailCard(id) {
    $.ajax({
        //url: '/api/values/clima/' + 'rainc' + '/' + id,
        url : '/api/values/rain/' + id+ '/' + 'c',
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
                // console.log(`date = ${date}`);
                date = lntpn(date);
                // console.log(`date = ${date}`);
                $('#' + id + ' i' + '#date_of_installation_label').text("").append('تاریخ نصب ایستگاه').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_installation_value').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);
            }
        }
    })
}
function getRainValuesFromStartTimeForDrawingRainStartChart(stnID, subtype){
    let url = '';
    if(subtype === 'r'){
        url = '/api/values/rainstartrainvalues/' + stnID + '/' + 'r';
    }else if(subtype === 'c'){
        url = '/api/values/rainstartrainvalues/' + stnID + '/' + 'c';
    }
    let rain_start_rain_values = undefined;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data) {
                // console.log("HHHHHHHHHHHHHHHH");
                // console.log(response.data);
                rain_start_rain_values = response.data;
                var labels = [];
                var values = [];
                rain_start_rain_values.map(el => {
                    if(el) {
                        labels.push(el['sample_time']);
                    }
                })
                rain_start_rain_values.map(el => {
                    if(el) {
                        values.push(el['value']);
                    }
                })
                values = calcStartRainValues(values);
                console.log(`values => ${values}`);
                console.log(`labels => ${labels}`);
                //resetSmallCanvas(station_ID,'rain');
                resetRainChart(stnID);
                drawSmallChart_rl(stnID, labels, values, 'باران تجمیعی', 'rain', 'line');
            }
        }
    })
}
function getRainValuesFromStartTimeForDrawingRainStartChartFromClima(stnID){
    let url = '';
    url = '/api/values/rainstartrainvalues/' + stnID + '/' + 'c';

    let rain_start_rain_values = undefined;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data) {
                // console.log("HHHHHHHHHHHHHHHH");
                // console.log(response.data);
                rain_start_rain_values = response.data;
                var labels = [];
                var values = [];
                rain_start_rain_values.map(el => {
                    if(el) {
                        labels.push(el['sample_time']);
                    }
                })
                rain_start_rain_values.map(el => {
                    if(el) {
                        values.push(el['value']);
                    }
                })

                console.log(`values => ${values}`);
                console.log(`labels => ${labels}`);
                //resetSmallCanvas(station_ID,'rain');
                resetRainChartFromClima(stnID);
                drawSmallChart_c(stnID, labels, values, 'باران تجمیعی', 'RAINC', 'line');
            }
        }
    })
}
function getRainValues(id,subtype) {
    let url = '';
    if(subtype === 'r'){
        url = '/api/values/rain/' + id + '/' + 'r';
    }else if(subtype === 'c'){
        url = '/api/values/rain/' + id+ '/' + 'c';
    }
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                //$("div.card-title  span").text(response.data[2].value);
                var rt = JSON.stringify(response.data[2].value);
                var r24 = JSON.stringify(response.data[1].value);
                var r12 = JSON.stringify(response.data[0].value);
                rt = lntpn(rt);
                // console.log(`rt ===>>> ${id} ->  ${rt}`);
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
                $('#' + id + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ آخرین داده').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_value').text("").append(hour).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);
            }
        }
    })
}
function getRainTotalOfEndOfPastMonthsForDrawingCharts(station_ID,subtype) {
    let url = '';
    if(subtype === 'r'){
        url = '/api/values/raintotalsmonths/' + station_ID + '/' + 'r';
    }else if(subtype === 'c'){
        console.log(`id = ${station_ID}`);
        url = '/api/values/raintotalsmonths/' + station_ID + '/' + 'c';
    }
        let rain_total_of_past_months;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                if (response.data) {
                    // console.log("HHHHHHHHHHHHHHHH");
                    // console.log(`${station_ID} response.data => ${response.data}`);
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
                    //resetSmallCanvas(station_ID,'rain');
                    resetRainChart(station_ID);
                    drawSmallChart_rl(station_ID, labels, values, 'باران تجمیعی', 'rain', 'bar');
                }
            }
        })
}
function getRainStationsNamesAndIDs() {
    let rain_stations_names_and_ids;
    $.ajax({
        url: '/api/stations/rain',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                rain_stations_names_and_ids = response.data;
                rain_stations_names_and_ids.map(el => {
                    // getRainValues(el.id,'r');
                    // getRainTotalOfEndOfPastMonthsForDrawingCharts(el.id,'r');
                });

            }
        }
    })
    let clima_rain_stations_names_and_ids;
    $.ajax({
        url: '/api/stations/clima',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                clima_rain_stations_names_and_ids = response.data;
                clima_rain_stations_names_and_ids.map(el => {
                    getRainValues(el.id,'c');
                    getRainTotalOfEndOfPastMonthsForDrawingCharts(el.id,'c');
                });

            }
        }
    })
}
function displayLevelAmariReport(stationID,startDate,endDate,startTime,endTime,period){
    //console.log(stationID,totalRainBool.toString() + '-' + absoluteRainBool.toString() + '-' + rateRainBool.toString() + '-' + barDisplayBool.toString() + '-' + lineDisplayBool.toString())
    //console.log(startDate.toString()+ '###' +endDate.toString()+ '###' +startTime.toString()+ '###' +endTime.toString()+ '###' + period.toString());

    $.ajax({
        url: '/api/values/levelamarireport/' + stationID +  '/' +  startDate + '/' + endDate + '/' + startTime+ '/' + endTime+'/'  + period ,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data) {
                let levelAmariReort = response.data;
                /*
                [
                 {"value":673.5,"sample_time":"2020-04-26 00:45:29"},
                 {"value":689.3,"sample_time":"2020-04-27 00:47:50"},
                 {"value":701.3,"sample_time":"2020-04-28 00:38:34"}
                ]
                 */
                levelAmariReort = JSON.parse(levelAmariReort);
                if(levelAmariReort.length == 0){
                    alert('در بازه زمانی درخواستی داده ای وجود ندارد');
                    return;
                }
                $('#report-chart').show();
                $('#amari-table').show();

                let labels = [];
                let values = [];
                for(let i=0;i<levelAmariReort.length;i++){

                    labels.push(levelAmariReort[i]['sample_time']);
                    values.push(levelAmariReort[i]['value']);
                }

                        drawLargeChart_rl(stationID, labels, values, 'ارتفاع آب', 'level','line');

                fillAmariTable(stationID, labels, values);
                $('#download-button').removeClass("disabled");
            }
        }
    })
}
function getExcelLevelAmariReport(stationID,startDate,endDate,startTime,endTime,period){
    var oReq = new XMLHttpRequest();
    oReq.open("GET", '/api/values/excellevelamarireport/' + stationID + '/'  +  startDate + '/' + endDate + '/' + startTime + '/' + endTime + '/' + period  , true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(oEvent) {
        var arrayBuffer = oReq.response;

        // if you want to access the bytes:
        var byteArray = new Uint8Array(arrayBuffer);
        // ...

        // If you want to use the image in your DOM:
        var blob = new Blob([arrayBuffer], {type: 'data:application/vnd.ms-excel'});
        saveAs(blob, 'hydrometry-amari-report.xlsx');
        var saving = document.createElement('a');
        document.body.appendChild(saving);
        saving.click();
        document.body.removeChild(saving);
    };
    oReq.send();

}
function displayLevelMantagheireport(stationID,startDate,endDate){
    $.ajax({
        url: '/api/values/levelmantagheireport/' + stationID + '/' +  startDate + '/' + endDate  ,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data) {
                // console.log('response');
                // console.log(response);
                let levelMantagheiReort = response.data;
                // console.log('levelMantagheiReort');
                // console.log(levelMantagheiReort);
                /*

                 */
                // console.log('levelMantagheiReort[0]');
                // console.log(levelMantagheiReort[0]);

                //levelMantagheiReort = JSON.parse(levelMantagheiReort[0]);
                if(levelMantagheiReort.length == 0){
                    alert('در بازه زمانی درخواستی داده ای وجود ندارد');
                    return;
                }
                $('#report-chart').show();
                $('#mantaghei-table').show();

                let months = [];
                let days = [];
                let values_8 = [];
                let values_16 = [];
                for(let i=0;i<levelMantagheiReort.length;i++){

                    months.push(levelMantagheiReort[i]['month']);
                    days.push(levelMantagheiReort[i]['day']);
                    values_8.push(levelMantagheiReort[i]['val_8']);
                    values_16.push(levelMantagheiReort[i]['val_16']);
                }

                // console.log('days');
                // console.log(days);
                let labels = [];
                let values = [];
                days.map(el=>{
                    labels.push(el);
                    labels.push(el);
                });
                values_8.map((el,i)=>{
                    values.push(el);
                    values.push(values_16[i]);
                });

                drawLargeChart_rl(stationID, labels, labels, 'ارتفاع آب', 'level','line');
                fillLevelMantagheiTable(stationID,months, days, values_8,values_16);
                $('#download-button').removeClass("disabled");
            }
        }
    })
}
function getExcelLevelMantagheiReport(stationID,startDate,endDate){
    var oReq = new XMLHttpRequest();
    oReq.open("GET", '/api/values/excellevelmantagheireport/' + stationID + '/' +  startDate + '/' + endDate , true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(oEvent) {
        var arrayBuffer = oReq.response;

        // if you want to access the bytes:
        var byteArray = new Uint8Array(arrayBuffer);
        // ...

        // If you want to use the image in your DOM:
        var blob = new Blob([arrayBuffer], {type: 'data:application/vnd.ms-excel'});
        saveAs(blob, 'Mantaghei-report.xlsx');
        var saving = document.createElement('a');
        document.body.appendChild(saving);
        saving.click();
        document.body.removeChild(saving);
    };
    oReq.send();
}
function getLevelValueForDetailCard(id) {
    $.ajax({
        url: '/api/values/level/' + id,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                //$("div.card-title  span").text(response.data[2].value);
                let lt = JSON.stringify(response.data[0].value);
                lt = lntpn(lt);
                let date = response.data[0].date;
                let hour = response.data[0].hour;
                date = lntpn(date);
                hour = lntpn(hour);
                $('#' + id + ' i' + '#level_total').text("").append("&nbsp&nbsp&nbsp;").append(' ارتفاع').append("&nbsp&nbsp&nbsp;");//.append(rt).append("&nbsp&nbsp&nbspmm") // ->rain_total
                $('#' + id + ' i' + '#level_total_value').text("").append(lt)
                $('#' + id + ' i' + '#level_total_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ آخرین داده').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_value').text("").append(hour).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);
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
                //console.log(`date = ${date}`);
                date = lntpn(date);
                //console.log(`date = ${date}`);
                $('#' + id + ' i' + '#date_of_installation_label').text("").append('تاریخ نصب ایستگاه').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_installation_value').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);
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
                console.log(`ckeck level value ${date}  ${hour}`);
                $('#' + id + ' i' + '#level_total').text("").append("&nbsp&nbsp&nbsp;").append('ارتفاع ').append("&nbsp&nbsp&nbsp;");//.append(rt).append("&nbsp&nbsp&nbspmm") // ->rain_total
                $('#' + id + ' i' + '#level_total_value').text("").append(lt)
                $('#' + id + ' i' + '#level_total_unit').text("").append('cm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ آخرین داده').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_value').text("").append(hour).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);

                //console.log(date);

                //drawCharts(rain_stations_names_and_ids,labels,values);
            }
        }
    })
}
function getLevelOfLastHoursForDrawingCharts(station_ID) {
        let level_last_hours;
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
                    // resetSmallCanvas(station_ID,'level');
                    resetLevelChart(station_ID)
                    drawSmallChart_rl(station_ID, labels, values, 'ارتفاع رودخانه', 'level', 'line');
                }
            }
        })
}
function getLevelStationsNamesAndIDs() {
    let level_stations_names_and_ids;
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
                    getLevelOfLastHoursForDrawingCharts(el.id)
                });
            }
        }
    })
}
function getLevelValueForDetailCard(id) {
    $.ajax({
        url: '/api/values/level/' + id,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            if (response.data.length > 0) {
                //$("div.card-title  span").text(response.data[2].value);
                let lt = JSON.stringify(response.data[0].value);
                lt = lntpn(lt);
                let date = response.data[0].date;
                let hour = response.data[0].hour;
                date = lntpn(date);
                hour = lntpn(hour);
                $('#' + id + ' i' + '#level_total').text("").append("&nbsp&nbsp&nbsp;").append(' ارتفاع').append("&nbsp&nbsp&nbsp;");//.append(rt).append("&nbsp&nbsp&nbspmm") // ->rain_total
                $('#' + id + ' i' + '#level_total_value').text("").append(lt)
                $('#' + id + ' i' + '#level_total_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ آخرین داده').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_last_recieved_data_value').text("").append(hour).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);
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
                //console.log(`date = ${date}`);
                date = lntpn(date);
                //console.log(`date = ${date}`);
                $('#' + id + ' i' + '#date_of_installation_label').text("").append('تاریخ نصب ایستگاه').append("&nbsp&nbsp&nbsp;");
                $('#' + id + ' i' + '#date_of_installation_value').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);
            }
        }
    })
}
function displayClimaAmariReport(stationID, startDate, endDate, startTime, endTime, period, sensors , multiLineChart) {
    // console.log(sensores);
    let url = '/api/values/climaamarireport/';
    let data = {
        stationID,
        startDate,
        endDate,
        startTime,
        endTime,
        period,
        sensors
    };

    $.ajax({
        url: url,
        type: 'POST',
        //dataType: 'json',
        data: data,

        success: (response) => {
            if (response.data) {
                let climaAmariReort = response.data;

                climaAmariReort = JSON.parse(climaAmariReort);
                if(climaAmariReort.length == 0){
                    alert('در بازه زمانی درخواستی داده ای وجود ندارد');
                    return;
                }
                $('#report-chart').show();
                $('#clima-amari-table').show();

                let labels =[];
                let values = [];

                let tmp_labels = [];
                let tmp_values = [];
                let wsp_labels = [];
                let wsp_values = [];
                let hum_labels = [];
                let hum_values = [];
                let evp_labels = [];
                let evp_values = [];
                let wdr_labels = [];
                let wdr_values = [];
                let rad_labels = [];
                let rad_values = [];
                let prs_labels = [];
                let prs_values = [];
                climaAmariReort.map(el => {
                    if(el['sensor']=='tmp'){
                        tmp_labels.push(el['sample_time']);
                        tmp_values.push(el['value']);
                    }
                    if(el['sensor']=='wsp'){
                        wsp_labels.push(el['sample_time']);
                        wsp_values.push(el['value']);
                    }
                    if(el['sensor']=='hum'){
                        hum_labels.push(el['sample_time']);
                        hum_values.push(el['value']);
                    }
                    if(el['sensor']=='evp'){
                        evp_labels.push(el['sample_time']);
                        evp_values.push(el['value']);
                    }
                    if(el['sensor']=='wdr'){
                        wdr_labels.push(el['sample_time']);
                        wdr_values.push(el['value']);
                    }
                    if(el['sensor']=='rad'){
                        rad_labels.push(el['sample_time']);
                        rad_values.push(el['value']);
                    }
                    if(el['sensor']=='prs'){
                        prs_labels.push(el['sample_time']);
                        prs_values.push(el['value']);
                    }
                })

                labels.push(tmp_labels);
                values.push(tmp_values);
                labels.push(wsp_labels);
                values.push(wsp_values);
                labels.push(hum_labels);
                values.push(hum_values);
                labels.push(evp_labels);
                values.push(evp_values);
                labels.push(wdr_labels);
                values.push(wdr_values);
                labels.push(rad_labels);
                values.push(rad_values);
                labels.push(prs_labels);
                values.push(prs_values);

                resultLabels = labels;
                resultValues = values;

                drawLargeChart_c(stationID, labels, values, 'آخرین مقدار',multiLineChart);


                fillClimaAmariTable(stationID, labels, values);
                $('#download-button').removeClass("disabled");
            }
        }
    });
}
function getExcelClimaAmariReport(stationID, startDate, endDate, startTime, endTime, period, sensors) {
    let url = '/api/values/excelclimaamarireport/';
    let data = JSON.stringify({
        stationID: stationID,
        startDate: startDate,
        endDate:endDate,
        startTime:startTime,
        endTime:endTime,
        period:period,
        sensors:sensors
    });
    var oReq = new XMLHttpRequest();
    oReq.open("POST", url, true);
    oReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    oReq.responseType = "arraybuffer";
    oReq.onload = function(oEvent) {
        var arrayBuffer = oReq.response;

        // if you want to access the bytes:
        var byteArray = new Uint8Array(arrayBuffer);
        // ...

        // If you want to use the image in your DOM:
        var blob = new Blob([arrayBuffer], {type: 'data:application/vnd.ms-excel'});
        saveAs(blob, 'clima-amari-report.xlsx');
        var saving = document.createElement('a');
        document.body.appendChild(saving);
        saving.click();
        document.body.removeChild(saving);
    };
    oReq.send(data);
}
function displayClimaMantagheireport(stationID, startDate, endDate) {
    let url = '/api/values/climamantagheireport/';
    let data = {
        stationID,
        startDate,
        endDate,
    };
    $.ajax({
        url: url,
        type: 'POST',
        //dataType: 'json',
        data: data,
        success: (response) => {
            if (response.data) {
                let climaAmariReort = response.data;

                climaAmariReort = JSON.parse(climaAmariReort);
                if(climaAmariReort.length == 0){
                    alert('در بازه زمانی درخواستی داده ای وجود ندارد');
                    return;
                }
                $('#clima-mantaghei-table').show();

                let values = [];

                let evp_a_6_30_values = [];
                let evp_a_18_30_values = [];
                let rainc_t_6_30_values = [];
                let rainc_t_18_30_values = [];
                let tmp_n_6_30_values = [];
                let tmp_x_18_30_values = [];
                let tmp_l_6_30_values = [];
                let hum_l_6_30_values = [];
                let tmp_l_12_30_values = [];
                let hum_l_12_30_values = [];
                let tmp_l_18_30_values = [];
                let hum_l_18_30_values = [];
                let sample_times = [];

                climaAmariReort.map(el => {
                    evp_a_6_30_values.push(el['evp_a_6_30']);
                    evp_a_18_30_values.push(el['evp_a_18_30']);
                    rainc_t_6_30_values.push(el['rainc_t_6_30']);
                    rainc_t_18_30_values.push(el['rainc_t_18_30']);
                    tmp_n_6_30_values.push(el['tmp_n_6_30']);
                    tmp_x_18_30_values.push(el['tmp_x_18_30']);
                    tmp_l_6_30_values.push(el['tmp_l_6_30']);
                    hum_l_6_30_values.push(el['hum_l_6_30']);
                    tmp_l_12_30_values.push(el['tmp_l_12_30']);
                    hum_l_12_30_values.push(el['hum_l_12_30']);
                    tmp_l_18_30_values.push(el['tmp_l_18_30']);
                    hum_l_18_30_values.push(el['hum_l_18_30']);
                    sample_times.push(el['sample_time']);
                })

                values.push(sample_times);
                values.push(evp_a_6_30_values);
                values.push(evp_a_18_30_values);
                values.push(rainc_t_6_30_values);
                values.push(rainc_t_18_30_values);
                values.push(tmp_n_6_30_values);
                values.push(tmp_x_18_30_values);
                values.push(tmp_l_6_30_values);
                values.push(hum_l_6_30_values);
                values.push(tmp_l_12_30_values);
                values.push(hum_l_12_30_values);
                values.push(tmp_l_18_30_values);
                values.push(hum_l_18_30_values);

                resultValues = values;

                fillClimaMantagheiTable(stationID, values);
                $('#download-button').removeClass("disabled");
            }
        }
    });
}
function getExcelClimaMantagheiReport(stationID, startDate, endDate) {
    let url = '/api/values/excelclimamantagheireport/';
    let data = JSON.stringify({
        stationID: stationID,
        startDate: startDate,
        endDate:endDate,
    });
    var oReq = new XMLHttpRequest();
    oReq.open("POST", url, true);
    oReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    oReq.responseType = "arraybuffer";
    oReq.onload = function(oEvent) {
        var arrayBuffer = oReq.response;

        // if you want to access the bytes:
        var byteArray = new Uint8Array(arrayBuffer);

        // If you want to use the image in your DOM:
        var blob = new Blob([arrayBuffer], {type: 'data:application/vnd.ms-excel'});
        saveAs(blob, 'clima-mantaghei-report.xlsx');
        var saving = document.createElement('a');
        document.body.appendChild(saving);
        saving.click();
        document.body.removeChild(saving);
    };
    oReq.send(data);
}
function getClimaRainValuesForClimaDetailCard(id) {
    $.ajax({
        //url: '/api/values/clima/' + 'rainc' + '/' + id,
        url : '/api/values/rain/' + id+ '/' + 'c',
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
                $('#' + id + 'RAINC' + ' i' + '#rain_total').text("").append("&nbsp&nbsp&nbsp;").append(' تجمیعی').append("&nbsp&nbsp&nbsp;");//.append(rt).append("&nbsp&nbsp&nbspmm") // ->rain_total
                $('#' + id + 'RAINC' + ' i' + '#rain_total_value').text("").append(rt)
                $('#' + id + 'RAINC' + ' i' + '#rain_total_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + 'RAINC' + ' i' + '#rain_24').text("").append("&nbsp&nbsp&nbsp;").append(' ۲۴ ساعته').append("&nbsp&nbsp&nbsp;");//.append(response.data[1].value).append("&nbsp&nbsp&nbsp;mm");// 1->rain_24
                $('#' + id + 'RAINC' + ' i' + '#rain_24_value').text("").append(r24)
                $('#' + id + 'RAINC' + ' i' + '#rain_24_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + 'RAINC' + ' i' + '#rain_12').text("").append("&nbsp&nbsp&nbsp;").append(' ۱۲ ساعته').append("&nbsp&nbsp&nbsp;");//.append(response.data[0].value).append("&nbsp&nbsp&nbsp;mm");// 0 ->rain_12
                $('#' + id + 'RAINC' + ' i' + '#rain_12_value').text("").append(r12)
                $('#' + id + 'RAINC' + ' i' + '#rain_12_unit').text("").append('mm').append("&nbsp&nbsp&nbsp;");
                $('#' + id + 'RAINC' + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ آخرین داده').append("&nbsp&nbsp&nbsp;");
                $('#' + id + 'RAINC' + ' i' + '#date_of_last_recieved_data_value').text("").append(hour).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);

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
                // console.log(`date = ${date}`);
                date = lntpn(date);
                // console.log(`date = ${date}`);
                $('#' + id + 'RAINC' + ' i' + '#date_of_installation_label').text("").append('تاریخ نصب ایستگاه').append("&nbsp&nbsp&nbsp;");
                $('#' + id + 'RAINC' + ' i' + '#date_of_installation_value').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);
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
            if (response.data != undefined && response.data.length > 0) {
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
                    $('#' + id + sensor + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ آخرین داده').append("&nbsp&nbsp&nbsp;");
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
                    $('#' + id + sensor + ' i' + '#date_of_last_recieved_data_label').text("").append('تاریخ آخرین داده').append("&nbsp&nbsp&nbsp;");
                    $('#' + id + sensor + ' i' + '#date_of_last_recieved_data_value').text("").append(hour).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append(date);

                }
            }
        }
    })
}
function getClimaLastHoursForDrawingCharts(station_ID, sensor) {
            let clima_last_hours;
            if (sensor === 'RAINC') {
                $.ajax({
                    url: '/api/values/climaraintotalsmonths/' + sensor.toLowerCase() + '/' + station_ID,
                    type: 'GET',
                    dataType: 'json',
                    success: (response) => {
                        if (response.data) {

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
                                drawSmallChart_c(station_ID, labels, values, sensor,'bar');
                        }
                    }
                })
            }else{
                $.ajax({
                    url: '/api/values/climalasthours/' + sensor.toLowerCase() + '/' + station_ID,
                    type: 'GET',
                    dataType: 'json',
                    success: (response) => {
                        if (response.data) {
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
                                drawSmallChart_c(station_ID, labels, values, sensor,'line');
                        }
                    }
                })
            }
}
function getClimaStationsNamesAndIDs() {
    var clima_stations_names_and_ids;
    const sensores = [['TMP', 'c'], ['HUM', '%'], ['PRS', 'mb'], ['WSP', 'm/s'], ['WDR', 'deg'], ['EVP', 'mm'], ['RAD', 'w/m2'], ['RAINC', 'mm']];

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
                        getClimaLastHoursForDrawingCharts(el.id,s[0]);
                    });

                });

            }
        }
    })
}
function refreshRainCard(id,subtype) {
    let url = '';
    if(subtype === 'r'){
        url = '/api/values/rain/' + id + '/' + 'r';
    }else if(subtype === 'c'){
        url = '/api/values/rain/' + id+ '/' + 'c';
    }
    $.ajax({
        url: url,
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
function refreshRaincCard(id) {
}
function refreshLevelCard(id) {
}
function refreshClimaCard(id) {
}
let this_js_script = $('script[src*=my_jquery_functions]'); // or better regexp to get the file name..
let pageType = this_js_script.attr('page_type');
if (typeof stnType === "undefined") {
    let stnType = 'some_default_value';
}
$(document).ready(() => {
    $.getScript('/assets/js/my_set_font_size.js', function () {
        setFontSize();
    });
    //$('*').persiaNumber();
    //$('*').persianNum();
    if (pageType == 'main') {

    }
    if (pageType.substr(0, 2) == 'ov') {
        let rv,lv,cv;
        rv = pageType.substr(2, 1);
        lv = pageType.substr(3, 1);
        cv = pageType.substr(4, 1);
        //console.log(`window.savedsi = ${window.savedsi}`);
        mysiema(window.savedsi);
        if(rv=='1'){
            // getRainStationsNamesAndIDs();
        }
        if(lv=='1'){
            // getLevelStationsNamesAndIDs();
        }
        if(cv=='1'){
            // getClimaStationsNamesAndIDs();
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
    // setInterval(function(){
    //     getRainStationsNamesAndIDs(); // this will run after every 50 minutes
    //     getLevelStationsNamesAndIDs();
    //     getClimaStationsNamesAndIDs();
    //     console.log('***');
    //     console.log('after 50 minutes executed')
    //     console.log('***');
    // }, 3000000);
});
