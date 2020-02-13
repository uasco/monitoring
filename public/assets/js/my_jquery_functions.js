// insert = function insert(main_string, ins_string, pos) {
//     if(typeof(pos) == "undefined") {
//      pos = 0;
//    }
//     if(typeof(ins_string) == "undefined") {
//      ins_string = '';
//    }
//     return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
// }
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
                            labels.push(el[0]);
                            values.push(el[1]);
                        })
            
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
    
});
// setInterval(function(){
//     getRainStationsNamesAndIDs(); // this will run after every 5 seconds
// }, 5000);