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
   // $('.logo-normal').click(() => {
        // $.ajax({
        //     url: '/api/rainstations',
        //     type: 'GET',
        //     dataType: 'json',
        //     success: (response) => {
        //         console.log(':::', response.data[0].id);
        //         rain_stations_names_and_ids = response.data;
        //         $('.card-category').each(function (index, el) {
        //             $(this).text("ایستگاه بارانسنجی   " + rain_stations_names_and_ids[index].name);
        //         });
        //         getRainValues();
        //     }
        // })

        $.get("/api/rainstations",
            function (response) {
                console.log(':::', response.data[0].id);
                rain_stations_names_and_ids = response.data;
                $('.card-category').each(function (index, el) {
                    $(this).text("ایستگاه بارانسنجی   " + rain_stations_names_and_ids[index].name);
                    $.get("/api/rainstations/" + rain_stations_names_and_ids[index].id,
                        function (response) {
                            var i = rain_stations_names_and_ids[index].id;
                            //$("div.card-title  span").text(response.data[2].value);
                            $('#' + i + ' span' + '#rain_total').text('   ' + 'باران تجمیعی' + '   ' + response.data[2].value);//2->rain_total 
                            $('#' + i + ' span' + '#rain_24').text('   ' + 'باران ۲۴ ساعته' + '   ' + response.data[1].value);// 1->rain_24
                            $('#' + i + ' span' + '#rain_12').text('   ' + 'باران ۱۲ ساعته' + '   ' + response.data[0].value);// 0 ->rain_12
                        }
                    )
                });
                $('.card-category').each(function (index, el) {


            }
        )
 //   });
});
});