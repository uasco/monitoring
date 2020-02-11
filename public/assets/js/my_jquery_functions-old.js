// function getRainValues(){
//     $.ajax({
//         url: '/api/rainstations/' + rain_stations_names_and_ids[index].id),
//         type: 'GET',
//         dataType: 'json',
//         success: (response) =>{

//         }
//     })
// }
$(document).ready(() => {
    var rain_stations_names_and_ids;


        $.get("/api/rainstations",
            function (response) {
                console.log(':::', response.data[0].id);
                rain_stations_names_and_ids = response.data;
                $('.card-category').each(function (index, el) {
                    $(this).text("ایستگاه بارانسنجی   ").append("&nbsp&nbsp;").append(rain_stations_names_and_ids[index].name);
                    $.get("/api/rainstations/" + rain_stations_names_and_ids[index].id,
                        function (response) {
                            var i = rain_stations_names_and_ids[index].id;
                            //$("div.card-title  span").text(response.data[2].value);
                            $('#' + i + ' span' + '#rain_total').append('باران تجمیعی').append("&nbsp&nbsp&nbsp;").append(response.data[2].value);//2->rain_total 
                            $('#' + i + ' span' + '#rain_24').append('باران ۲۴ ساعته').append("&nbsp&nbsp&nbsp;").append(response.data[1].value);// 1->rain_24
                            $('#' + i + ' span' + '#rain_12').append('باران ۱۲ ساعته').append("&nbsp&nbsp&nbsp;").append(response.data[0].value);// 0 ->rain_12
                        }
                    )
                });
                $('.card-body').each(function (index, el) {
                    var chart_id = 'CountryChart' + rain_stations_names_and_ids[index].id;
                    $.getScript('assets/js/mychart.js', function () {          
                        myDrawChart(chart_id);  
                  });  
                });

});
});