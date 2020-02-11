function drawCharts(rain_stations_names_and_ids){
    $('.card-body').each(function (index, el) {
        var chart_id = 'CountryChart' + rain_stations_names_and_ids[index].id;
        $.getScript('assets/js/mychart.js', function () {          
            myDrawChart(chart_id);  
      });  
    });
}
function getRainValues(rain_stations_names_and_ids,index){
    $.ajax({
        url: '/api/rainstations/' + rain_stations_names_and_ids[index].id,
        type: 'GET',
        dataType: 'json',
        success: (response) =>{
            var i = rain_stations_names_and_ids[index].id;
                //$("div.card-title  span").text(response.data[2].value);
                $('#' + i + ' span' + '#rain_total').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append('باران تجمیعی').append("&nbsp&nbsp&nbsp;").append(response.data[2].value);//2->rain_total 
                $('#' + i + ' span' + '#rain_24').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append('باران ۲۴ ساعته').append("&nbsp&nbsp&nbsp;").append(response.data[1].value);// 1->rain_24
                $('#' + i + ' span' + '#rain_12').text("").append("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;").append('باران ۱۲ ساعته').append("&nbsp&nbsp&nbsp;").append(response.data[0].value);// 0 ->rain_12

                drawCharts(rain_stations_names_and_ids);
                
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


$(document).ready(() => {
    getRainStationsNamesAndIDs();
    $.getScript('assets/js/my_set_font_size.js', function () {          
        setFontSize();  
  });  
    
});
// setInterval(function(){
//     getRainStationsNamesAndIDs(); // this will run after every 5 seconds
// }, 5000);