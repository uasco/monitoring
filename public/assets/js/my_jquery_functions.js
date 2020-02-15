
function lntpn(ln){
    return $.latin2Arabic.toArabic(ln);s//ln must be string
}
function convertNumsLabelToNamesLabel(numsLabel){
    var collection = {1:'فروردین',2:'اردیبهشت',3:'خرداد',4:'تیر',5:'مرداد',6:'شهریور',7:'مهر',8:'آبان',9:'آذر',10:'دی',11:'بهمن',12:'اسفند'};
    var namesLabel=[]
    numsLabel.map(el=>{
        namesLabel.push(collection[el]);
    })
    return namesLabel;
}
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
function calcEachMonth(values){
    for(i=11;i>=0;i--){   
        x=values[i] - values[i-1];
        x=round(x, 2);
        values[i]=x;
        
    } 
    return values;
}
function drawCharts(station_ID,labels,valus){
    
        var chart_id = 'CountryChart' + station_ID;
        $('.chart-area' + ' canvas' + '#' +  chart_id).each(function (index, el) {
            $.getScript('/assets/js/mychart.js', function () {          
                myDrawChart(chart_id,labels,valus);  
             });  
        });
        
    
}
function getRainValues(rain_stations_names_and_ids,index){
    $.ajax({
        url: '/api/rainvalues/' + rain_stations_names_and_ids[index].id,
        type: 'GET',
        dataType: 'json',
        success: (response) =>{
                var i = rain_stations_names_and_ids[index].id;
                //$("div.card-title  span").text(response.data[2].value);
                var rt = JSON.stringify(response.data[2].value);
                var r24 = JSON.stringify(response.data[1].value);
                var r12 = JSON.stringify(response.data[0].value);
                // rt = lntpn(rt);
                // r24 = lntpn(r24);
                // r12 = lntpn(r12);

                $('#' + i + ' span' + '#rain_total').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append('باران تجمیعی').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");//.append(rt).append("&nbsp&nbsp&nbspمیلیمتر") // ->rain_total 
                $('#' + i + ' span' + '#rain_total_value').text("").append(rt).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                $('#' + i + ' span' + '#rain_total_unit').text("").append('میلیمتر');
                $('#' + i + ' span' + '#rain_24').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append('باران ۲۴ ساعته').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");//.append(response.data[1].value).append("&nbsp&nbsp&nbsp;میلیمتر");// 1->rain_24
                $('#' + i + ' span' + '#rain_24_value').text("").append(r24).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                $('#' + i + ' span' + '#rain_24_unit').text("").append('میلیمتر');
                $('#' + i + ' span' + '#rain_12').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append('باران ۱۲ ساعته').append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");//.append(response.data[0].value).append("&nbsp&nbsp&nbsp;میلیمتر");// 0 ->rain_12
                $('#' + i + ' span' + '#rain_12_value').text("").append(r12).append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;");
                $('#' + i + ' span' + '#rain_12_unit').text("").append('میلیمتر');

                //drawCharts(rain_stations_names_and_ids,labels,values);
                
        }
    })
}


function getRainStationsNamesAndIDs(rain_stations_names_and_ids){
    var rain_stations_names_and_ids;
    $.ajax({
        url: '/api/rainstations/' ,
        type: 'GET',
        dataType: 'json',
        success: (response) =>{
            rain_stations_names_and_ids = response.data;
            $('.card-category').each(function (index, el) {
            $(this).text("ایستگاه بارانسنجی   ").append("&nbsp&nbsp;").append(rain_stations_names_and_ids[index].name);
            getRainValues(rain_stations_names_and_ids,index);
            });
        }
    })
}
function getRainTotalOfEndOfPastMonthsForDrawingCharts(){
    var rain_stations_names_and_ids;
    $.ajax({
        url: '/api/rainstations/' ,
        type: 'GET',
        dataType: 'json',
        success: (response) =>{
            rain_stations_names_and_ids = response.data;

            rain_stations_names_and_ids.map(el=>{
                var rain_total_of_past_months;
                var station_ID = el.id;
                $.ajax({
                    url: '/api/raintotalsmonths/' + station_ID ,
                    type: 'GET',
                    dataType: 'json',
                    success: (response) =>{
                        rain_total_of_past_months = response.data;
                        var labels=[];
                        var values=[];
                        rain_total_of_past_months.map(el =>{
                            labels.push(el[0]+1);
                            values.push(el[1]);
                        })
                        labels=convertNumsLabelToNamesLabel(labels);
                        values=calcEachMonth(values);
            
                        drawCharts(station_ID,labels,values);
            
                    }
                })
            
            })


        }
    })
    
}
$(document).ready(() => {
    getRainStationsNamesAndIDs();
    $.getScript('assets/js/my_set_font_size.js', function () {          
        setFontSize();  
    });
  
    getRainTotalOfEndOfPastMonthsForDrawingCharts();
    //$('*').persiaNumber();
    $('*').persianNum();

});
// setInterval(function(){
//     getRainStationsNamesAndIDs(); // this will run after every 5 seconds
// }, 5000);