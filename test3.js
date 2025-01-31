div.content
style.
    /*.marker {*/
    /*    background-image: url('/assets/img/mapbox-icon-1.png');*/
    /*    background-size: cover;*/
    /*    width: 50px;*/
    /*    height: 50px;*/
    /*    border-radius: 50%;*/
    /*    cursor: pointer;*/
    /*}*/

    /*.mapboxgl-popup {*/
    /*    max-width: 800px;*/
    /*    font: 24px/30px 'Yekan', Arial, Helvetica, sans-serif;*/
    /*    text-align: right;*/
    /*}*/

    .mapboxgl-popup p {
    color: rgba(0, 0, 0, 0.8);
}

.legend {
    background-color: #fff;
    border-radius: 4px;
    bottom: 26px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    font: 18px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
    padding: 10px;
    position: absolute;
    right: 10px;
    opacity: 0.7;
    z-index: 1;
}

.legend h4 {
    margin: 0 0 10px;
    color: #212529;
    text-align:right;
    font-size : 1.5rem;
}

.legend div img {
    display: inline-block;
    height: 38px;
    margin-right: 0px;
    margin-top: 8px;
    width: 38px;
}
div.row(id='map-wrap')
//div.col-md-12
//    div.classcard.card-plain
//        div.card-body
div(id='map-wrapt')
div(id='mapid')
#state-legend.legend
h4 نماد ایستگاه ها :
    div(style='text-align:right')
img(src='/assets/img/mapbox-icon-1.png')
span &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
| ایستگاه بارانسنجی
div(style='text-align:right')
img(src='/assets/img/mapbox-icon-2.png')
span &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
| ایستگاه هیدرومتری
div(style='text-align:right')
img(src='/assets/img/mapbox-icon-3.png')
span &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
| ایستگاه هواشناسی
div(style='text-align:right')
img(src='/assets/img/pulsing-dot1.png')
span &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
| در حال بارش
div(style='text-align:right')
img(src='/assets/img/pulsing-dot2.png')
span &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
| وضعیت سیلاب

#county-legend.legend(style='display: none;')
h4 Population
div
span(style='background-color: #723122')
| 1,000,000
div
span(style='background-color: #8B4225')
| 500,000
div
span(style='background-color: #A25626')
| 100,000

script.
    let stns2 = undefined;
let features = [];
let url = undefined;
url = 'api/stns/properties'
$.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: (response) => {
        // console.log(`stns3 ===>>> ${response.data.length} `);
        // if (response.data.length > 0) {
        stns2 = response.data;
        stns2 = JSON.stringify(stns2);
        stns2 = JSON.parse(stns2);
        // console.log(`stns2 ===>>> ${JSON.stringify(stns2)} `);
        // }
    }
})
let features2 = [];

let stations = undefined;
url = '/api/stations/all';
$.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: (response) => {
        if (response.data.length > 0){
            stations = response.data;
            stations.map(el => {
                // console.log(`stn===>>> ${el.id}  `);
                let id = parseInt(el.id);
                // console.log(`stations ===>>> ${id}  ${JSON.stringify(stns2[id])}`);
                let stn = JSON.stringify(stns2[id]);
                // let stn = stns2[id];
                // console.log(`stn===>>> ${stn}  ${id} `);
                if(stn != undefined){
                    stn = JSON.parse(stn);
                    let stnName = stn.station_name;
                    let stnCode = stn.station_code;
                    let stnZone = stn.zone_name;
                    let stnRiver = stn.river_name;
                    let stnEstablishYear = stn.establish_year;
                    let stnUTMX = stn.utm_x;
                    let stnUTMY = stn.utm_y;
                    let stnLongtitude = stn.longitude;
                    let stnLatitude = stn.latitude;

                    let featurItem = {
                        'type': 'Feature',
                        'properties': {
                            'description': '',
                            'icon': '',
                            'id': '',
                            'sensor': '',
                            'position': ''
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': []
                        }
                    };
                    featurItem.properties.id = el.id;
                    featurItem.properties.position = el.position;
                    featurItem.geometry.coordinates = [stnLongtitude, stnLatitude];
                    switch (el.sensor) {
                        case 'DLS0201':
                            featurItem.properties.sensor = 'rain';
                            featurItem.properties.icon = 'marker1';
                            featurItem.properties.description = `<strong> ایستگاه بارانسنجی: ${stnName}</strong><p>کد ایستگاه : ${stnCode}-</p><p>محدوده : ${stnZone}</p><p>رودخانه ${stnRiver}</p><p>سال تاسیس : ${stnEstablishYear}</p><p>utmx : ${stnUTMX}</p><p>utmy : ${stnUTMY}</p>`;
                            break;
                        case 'DLS0202':
                            featurItem.properties.sensor = 'level';
                            featurItem.properties.icon = 'marker2';
                            featurItem.properties.description = `<strong> ایستگاه سطح سنجی: ${stnName}</strong><p>کد ایستگاه : ${stnCode}-</p><p>محدوده : ${stnZone}</p><p>رودخانه ${stnRiver}</p><p>سال تاسیس : ${stnEstablishYear}</p><p>utmx : ${stnUTMX}</p><p>utmy : ${stnUTMY}</p>`;
                            break;
                        case 'DLS120':
                            featurItem.properties.sensor = 'clima';
                            featurItem.properties.icon = 'marker3';
                            featurItem.properties.description = `<strong> ایستگاه هواشناسی: ${stnName}</strong><p>کد ایستگاه : ${stnCode}-</p><p>محدوده : ${stnZone}</p><p>رودخانه ${stnRiver}</p><p>سال تاسیس : ${stnEstablishYear}</p><p>utmx : ${stnUTMX}</p><p>utmy : ${stnUTMY}</p>`;
                            break;
                    }
                    console.log(`feature===>>> ${featurItem}   `);
                    features.push(featurItem);
                }

            });
        }


    }//end of success
})
console.log(`features===>>> ${features}   `);
// let features = [
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه بارانسنجی بن کوه</strong><p>کد ایستگاه : ۰۱۵-۴۷-</p><p>محدوده : گرمسار</p><p>رودخانه حبله رود</p><p>سال تاسیس : ۱۳۵۲</p><p>utmx : ۶۳۰۱۷۳</p><p>utmy : ۳۹۰۷۷۳۳</p>',
//             'icon': 'marker1',
//             'id': '101',
//             'sensor': 'rain',
//             'position': 'بن کوه',
//             //'client_id':
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [52.41179920638, 35.304329583645]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه بارانسنجی ابراهیم آباد</strong><p>کد ایستگاه : ۹۰۷-۴۷-</p><p>محدوده : میامی</p><p>رودخانه خيج</p><p>سال تاسیس : ۱۳۶۲</p><p>utmx : ۳۸۵۶۷۸</p><p>utmy : ۴۰۳۰۸۶۲</p>',
//             'icon': 'marker1',
//             'id': '141',
//             'sensor': 'rain',
//             'position': 'ابراهیم آباد'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [55.724852425923, 36.41614589227]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه هواشناسی تصفیه خانه</strong><p>کد ایستگاه : ۰۲۴-۴۷</p><p>محدوده : گرمسار</p><p>رودخانه حبله رود</p><p>سال تاسیس : ۱۳۸۴</p><p>utmx : ۶۲۵۲۷۸</p><p>utmy : ۳۹۰۲۷۶۰</p>',
//             'icon': 'marker3',
//             'id': '84',
//             'sensor': 'clima',
//             'position': 'تصفیه خانه'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [52.307212862161, 35.260126343602]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه سطح سنج لبرود</strong><p>کد ایستگاه : ۰۲۹-۴۷</p><p>محدوده : دامغان</p><p>رودخانه چشمه علی</p><p>سال تاسیس : ۱۳۶۰</p><p>utmx : ۲۴۹۷۷۸</p><p>utmy : ۴۰۱۳۳۳۲</p>',
//             'icon': 'marker2',
//             'id': '99',
//             'sensor': 'level',
//             'position': 'لبرود'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [54.215829045955, 36.232503404624]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه بارانسنج آستانه</strong><p>کد ایستگاه : ۰۲۵-۴۷</p><p>محدوده : دامغان</p><p>رودخانه سلطان ميدان</p><p>سال تاسیس : ۱۳۶۲</p><p>utmx : ۲۳۹۳۹۷</p><p>utmy : ۴۰۱۷۶۸۰</p>',
//             'icon': 'marker1',
//             'id': '128',
//             'sensor': 'rain',
//             'position': 'آستانه'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [54.099004459429, 36.268910176222]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه بارانسنج مجن دوراهي</strong><p>کد ایستگاه : ۰۳۳-۴۷</p><p>محدوده : بسطام</p><p>رودخانه مجن</p><p>سال تاسیس : ۱۳۶۲</p><p>utmx : ۲۸۹۴۹۸</p><p>utmy : ۴۰۳۹۳۱۲</p>',
//             'icon': 'marker1',
//             'id': '103',
//             'sensor': 'rain',
//             'position': 'مجن دوراهي'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [54.680393699234, 36.505994145582]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه بارانسنج بسطام</strong><p>کد ایستگاه ۰۴۴-۴۷</p><p>محدوده : بسطام</p><p>رودخانه مجن</p><p>سال تاسیس : ۱۳۵۱</p><p>utmx : ۳۱۹۲۴۰</p><p>utmy : ۴۰۳۷۹۱۰</p>',
//             'icon': 'marker1',
//             'id': '152',
//             'sensor': 'rain',
//             'position': 'بسطام'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [54.982497611023, 36.469436870006]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه بارانسنج بیارجمند</strong><p>کد ایستگاه : ۹۲۶-۴۷</p><p>محدوده : بيارجمند</p><p>رودخانه كالشور</p><p>سال تاسیس : ۱۳۶۲</p><p>utmx : ۳۹۱۸۹۱</p><p>utmy : ۳۹۹۳۸۸۳</p>',
//             'icon': 'marker1',
//             'id': '134',
//             'sensor': 'rain',
//             'position': 'بیارجمند'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [55.799249078673, 36.083552852237]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه بارانسنج خيراباد سمنان</strong><p>کد ایستگاه : ۰۳۸-۴۷</p><p>محدوده : سمنان</p><p>رودخانه گلرودبار</p><p>سال تاسیس : ۱۳۵۲</p><p>utmx : ۷۱۹۳۸۱</p><p>utmy : ۳۹۳۵۶۰۴</p>',
//             'icon': 'marker1',
//             'id': '102',
//             'sensor': 'rain',
//             'position': 'خیرآباد'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [53.419897976221, 35.539823938367]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه بارانسنج ده صوفيان</strong><p>کد ایستگاه : ۸۶۷-۴۷</p><p>محدوده : سمنان</p><p>رودخانه شهميرزاد</p><p>سال تاسیس : ۱۳۷۲</p><p>utmx : ۷۱۶۴۱۹</p><p>utmy : ۳۹۶۶۳۱۴</p>',
//             'icon': 'marker1',
//             'id': '150',
//             'sensor': 'rain',
//             'position': 'ده صوفیان'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [53.39550982055, 35.817127622356]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه سطح سنج بند انحرافي</strong><p>کد ایستگاه : ۰۳۱-۴۷</p><p>محدوده : بسطام</p><p>رودخانه مجن</p><p>سال تاسیس : ۱۳۵۱</p><p>utmx : ۲۸۹۴۳۸</p><p>utmy : ۴۰۳۹۳۲۶</p>',
//             'icon': 'marker2',
//             'id': '136',
//             'sensor': 'level',
//             'position': 'بند انحرافي'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [54.639161916469, 36.481666828162]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه سطح سنج شهمیرزاد</strong><p>کد ایستگاه : ۹۹۲-۴۷</p><p>محدوده : سمنان</p><p>رودخانه شهميرزاد</p><p>سال تاسیس : ۱۳۸۷</p><p>utmx : ۷۰۹۳۸۵</p><p>utmy : ۳۹۶۱۳۴۰</p>',
//             'icon': 'marker2',
//             'id': '157',
//             'sensor': 'level',
//             'position': 'شهمیرزاد'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [53.316407893155, 35.773843664332]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه سطح سنج بن کوه</strong><p>کد ایستگاه : ۰۱۵-۴۷</p><p>محدوده : گرمسار</p><p>رودخانه حبله رود</p><p>سال تاسیس : ۱۳۵۲</p><p>utmx : ۶۳۰۱۷۳</p><p>utmy : ۳۹۰۷۷۳۳</p>',
//             'icon': 'marker2',
//             'id': '98',
//             'sensor': 'level',
//             'position': 'بن کون'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [52.470005031003, 35.312998408637]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه بارانسنج طرود</strong><p>کد ایستگاه : ۱۱۰-۴۷</p><p>محدوده : طرود</p><p>رودخانه لب شورآب</p><p>سال تاسیس : ۱۳۵۲</p><p>utmx : ۳۱۸۶۱۹</p><p>utmy : ۳۹۲۲۱۴۶</p>',
//             'icon': 'marker1',
//             'id': '143',
//             'sensor': 'rain',
//             'position': 'طرود'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [55.002016442078, 35.426233495744]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong> ایستگاه بارانسنج زرتشت </strong><p>کد ایستگاه : ۱۱۰-۴۷</p><p>محدوده : طرود</p><p>رودخانه لب شورآب</p><p>سال تاسیس : ۱۳۵۲</p><p>utmx : ۳۱۸۶۱۹</p><p>utmy : ۳۹۲۲۱۴۶</p>',
//             'icon': 'marker1',
//             'id': '159',
//             'sensor': 'rain',
//             'position': 'زرتشت'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [55.902016442078, 35.526233495744]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه هواشناسی دانشگاه آزاد دامغان</strong><p>کد ایستگاه : ۳۰۱-۴۷</p><p>محدوده : دامغان</p><p>رودخانه چشمه علي</p><p>سال تاسیس : ۱۳۷۰</p><p>utmx : ۲۵۸۱۶۵</p><p>utmy : ۴۰۰۵۹۸۰</p>',
//             'icon': 'marker3',
//             'id': '93',
//             'sensor': 'clima',
//             'position': 'دانشگاه آزاد دامغان'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [54.311321944611, 36.168428285371]
//         }
//     },
//     {
//         'type': 'Feature',
//         'properties': {
//             'description':
//                 '<strong>ایستگاه بارانسنج چهارده دامغان</strong><p>کد ایستگاه : ۲۱۶-۴۷</p><p>محدوده : دامغان</p><p>رودخانه دامغانرود</p><p>سال تاسیس : ۱۳۶۲</p><p>utmx : ۲۵۰۷۲۷</p><p>utmy : ۴۰۳۳۶۷۵</p>',
//             'icon': 'marker1',
//             'id': '153',
//             'sensor': 'rain',
//             'position': 'چهارده دامغان'
//         },
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [54.219873006146, 36.415934010431]
//         }
//     }];
let stns = {
    'type': 'FeatureCollection',
    'features': features
};
let size = 200;
let pulsingDot1 = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // get rendering context for the map canvas when layer is added to the map
    onAdd: function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // called once before every frame where the icon will be used
    render: function () {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 0, 0,' + (1 - t) + ')';
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 0, 0, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // continuously repaint the map, resulting in the smooth animation of the dot
        mymap.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
    }
};
let pulsingDot2 = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // get rendering context for the map canvas when layer is added to the map
    onAdd: function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // called once before every frame where the icon will be used
    render: function () {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(0, 0, 255,' + (1 - t) + ')';
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // continuously repaint the map, resulting in the smooth animation of the dot
        mymap.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
    }
};
let lineColor = '#2732ff';
let lineWidth = 2;
let fillColor = '#77b4ff';
let fillOpacity = 0.3;
var w = window.innerWidth;
var h = window.innerHeight;
w = 0.82 * (w);
h = 0.90 * (h);
$('#map-wrap').css('width', w).css('height', h);
$('#mapid').css('width', w).css('height', h);
console.log('w=== ' + w.toString());
console.log('h=== ' + h.toString());
let centerOnLoadMap = undefined;
let zoomDegreeOnLoad = undefined;
let centerOnZoomMap = undefined;
let zoomDegreeOnZoomMap = undefined;
let textSize=undefined;
if(h>850){
    centerOnLoadMap = [53.8330078, 32.1942087];
    zoomDegreeOnLoad = 5;
    centerOnZoomMap = [54.6240234, 35.79067] ;
    zoomDegreeOnZoomMap = 7.3;
    textSize = 2;
}else if(w>700 ){
    centerOnLoadMap = [53.8330078, 32.1942087];
    zoomDegreeOnLoad = 4.5;
    centerOnZoomMap = [54.6240234, 35.79067];
    zoomDegreeOnZoomMap = 6.7;
    textSize = 1.5;
}else{
    centerOnLoadMap = [53.8330078, 35.1942087];
    zoomDegreeOnLoad = 3.8;
    centerOnZoomMap = [54.6240234, 35.65067];
    zoomDegreeOnZoomMap = 5.8;
    textSize = 0.9;
}

mapboxgl.accessToken = 'pk.eyJ1IjoicmV6YXNoODEiLCJhIjoiY2thOWZ1enBhMG1naTM2cXdnaHplYjVlaiJ9.qyXFnvzifd20ocz6eGP8Cg';
mapboxgl.setRTLTextPlugin('/assets/js/mapbox-gl-rtl-text.js',
    null,
    true // Lazy load the plugin
);
var mymap = new mapboxgl.Map({
    container: 'mapid',
    zoom: zoomDegreeOnLoad,
    center: centerOnLoadMap,
    style: 'mapbox://styles/mapbox/satellite-v9',
    localIdeographFontFamily: "'Yekan','sans-serif'"
});
mymap.on('load', function () {
    mymap.addSource('ostan-semnan-polygon', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'properties': {
                    'title': 'استان سمنان'
                },
                'coordinates': [
                    [
                        [54.1556386, 36.4787238],
                        [54.2820445, 36.4875572],
                        [54.3754749, 36.5096362],
                        [54.5183686, 36.4875572],
                        [54.6392786, 36.5934789],
                        [54.7052295, 36.6287539],
                        [54.7821722, 36.5934789],
                        [54.8865945, 36.6111184],
                        [55.0130004, 36.7696923],
                        [55.4032100, 36.8180802],
                        [55.5021363, 36.8971945],
                        [55.5845750, 36.9235477],
                        [55.6230463, 37.0683275],
                        [55.7164768, 37.1778256],
                        [55.7329645, 37.2740528],
                        [55.8318909, 37.3133831],
                        [55.9198254, 37.3264886],
                        [55.9143295, 37.2084567],
                        [56.0077600, 37.2215805],
                        [56.0688738, 37.1559387],
                        [55.9974270, 37.1252863],
                        [56.0578820, 37.0902398],
                        [56.0194106, 37.0069394],
                        [55.9589556, 37.0069394],
                        [56.0194106, 36.8224776],
                        [56.1293288, 36.8752265],
                        [56.2117675, 36.9103722],
                        [56.2722225, 36.8268747],
                        [56.3821407, 36.7520892],
                        [56.3601570, 36.6596062],
                        [56.4590834, 36.7036596],
                        [56.5250343, 36.6816361],
                        [56.6514402, 36.6640127],
                        [56.6734238, 36.7036596],
                        [56.7558625, 36.6948509],
                        [56.7558625, 36.6596062],
                        [56.7558625, 36.6419778],
                        [56.8657807, 36.5714238],
                        [56.8602848, 36.5272948],
                        [56.7998298, 36.4257025],
                        [56.7063993, 36.3814904],
                        [56.7063993, 36.3284027],
                        [56.7668543, 36.2974182],
                        [56.7888379, 36.2619922],
                        [56.7283829, 36.0713023],
                        [56.7393748, 35.8445345],
                        [56.9317316, 35.6840715],
                        [56.9647070, 35.5992523],
                        [57.0141702, 35.6037187],
                        [57.0691293, 35.5232852],
                        [56.9921866, 35.4561956],
                        [57.0581375, 35.3218484],
                        [57.0086743, 35.2052333],
                        [56.9317316, 35.2097216],
                        [56.8328052, 35.1917670],
                        [56.7723502, 35.1648275],
                        [56.7009034, 35.0434895],
                        [56.6239607, 35.0569804],
                        [56.5140425, 35.0209997],
                        [56.4316038, 34.9850031],
                        [55.9314761, 34.2345124],
                        [55.6017215, 34.2345124],
                        [55.5137870, 34.2526761],
                        [54.2002647, 34.2526761],
                        [52.8867424, 34.2345124],
                        [52.6724019, 34.3525067],
                        [52.4855410, 34.4250361],
                        [52.3866146, 34.4205049],
                        [52.1228110, 34.4069097],
                        [51.8370237, 34.5110832],
                        [51.8370237, 34.5744295],
                        [51.9579337, 34.7732038],
                        [51.9689255, 34.8588905],
                        [52.0513641, 35.0344943],
                        [52.0513641, 35.0974398],
                        [51.9579337, 35.1558457],
                        [51.8809910, 35.2635619],
                        [51.9414460, 35.3218484],
                        [51.9634296, 35.3666557],
                        [51.9029746, 35.4069609],
                        [51.9249582, 35.4651441],
                        [51.9359501, 35.5456359],
                        [51.9909091, 35.5947857],
                        [52.0348764, 35.5054001],
                        [52.2437210, 35.4338199],
                        [52.3536392, 35.3397743],
                        [52.4195901, 35.3487357],
                        [52.5514919, 35.4024836],
                        [52.6339305, 35.4696180],
                        [52.6943855, 35.5322262],
                        [52.7218651, 35.5724486],
                        [52.7988078, 35.5188143],
                        [52.8922383, 35.6215819],
                        [52.9911646, 35.6706850],
                        [53.0351319, 35.7242176],
                        [53.1010828, 35.7509704],
                        [53.1560419, 35.7821707],
                        [53.1175705, 35.8267213],
                        [53.0241401, 35.8133587],
                        [53.0241401, 35.8623437],
                        [53.0900910, 35.9246445],
                        [53.2274887, 35.9157474],
                        [53.2110010, 35.9780062],
                        [53.3044315, 35.9824514],
                        [53.3813742, 36.0668621],
                        [53.5572433, 36.0846213],
                        [53.6836492, 36.0890605],
                        [53.7825756, 36.1511824],
                        [53.8979897, 36.2309813],
                        [53.9474528, 36.3106988],
                        [53.8815019, 36.3726450],
                        [53.9529488, 36.4433803],
                        [54.0079079, 36.4433803],
                        [54.0903465, 36.4743068],
                        [54.1288179, 36.4919735]
                    ]
                ]
            }
        }
    });
    mymap.addLayer({
        'id': 'ostan-semnan-polygon',
        'type': 'fill',
        'source': 'ostan-semnan-polygon',
        'layout': {},
        'paint': {
            'fill-color': fillColor,
            'fill-opacity': fillOpacity
        }
    });
    mymap.addSource('ostan-semnan-border', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [54.1556386, 36.4787238],
                    [54.2820445, 36.4875572],
                    [54.3754749, 36.5096362],
                    [54.5183686, 36.4875572],
                    [54.6392786, 36.5934789],
                    [54.7052295, 36.6287539],
                    [54.7821722, 36.5934789],
                    [54.8865945, 36.6111184],
                    [55.0130004, 36.7696923],
                    [55.4032100, 36.8180802],
                    [55.5021363, 36.8971945],
                    [55.5845750, 36.9235477],
                    [55.6230463, 37.0683275],
                    [55.7164768, 37.1778256],
                    [55.7329645, 37.2740528],
                    [55.8318909, 37.3133831],
                    [55.9198254, 37.3264886],
                    [55.9143295, 37.2084567],
                    [56.0077600, 37.2215805],
                    [56.0688738, 37.1559387],
                    [55.9974270, 37.1252863],
                    [56.0578820, 37.0902398],
                    [56.0194106, 37.0069394],
                    [55.9589556, 37.0069394],
                    [56.0194106, 36.8224776],
                    [56.1293288, 36.8752265],
                    [56.2117675, 36.9103722],
                    [56.2722225, 36.8268747],
                    [56.3821407, 36.7520892],
                    [56.3601570, 36.6596062],
                    [56.4590834, 36.7036596],
                    [56.5250343, 36.6816361],
                    [56.6514402, 36.6640127],
                    [56.6734238, 36.7036596],
                    [56.7558625, 36.6948509],
                    [56.7558625, 36.6596062],
                    [56.7558625, 36.6419778],
                    [56.8657807, 36.5714238],
                    [56.8602848, 36.5272948],
                    [56.7998298, 36.4257025],
                    [56.7063993, 36.3814904],
                    [56.7063993, 36.3284027],
                    [56.7668543, 36.2974182],
                    [56.7888379, 36.2619922],
                    [56.7283829, 36.0713023],
                    [56.7393748, 35.8445345],
                    [56.9317316, 35.6840715],
                    [56.9647070, 35.5992523],
                    [57.0141702, 35.6037187],
                    [57.0691293, 35.5232852],
                    [56.9921866, 35.4561956],
                    [57.0581375, 35.3218484],
                    [57.0086743, 35.2052333],
                    [56.9317316, 35.2097216],
                    [56.8328052, 35.1917670],
                    [56.7723502, 35.1648275],
                    [56.7009034, 35.0434895],
                    [56.6239607, 35.0569804],
                    [56.5140425, 35.0209997],
                    [56.4316038, 34.9850031],
                    [55.9314761, 34.2345124],
                    [55.6017215, 34.2345124],
                    [55.5137870, 34.2526761],
                    [54.2002647, 34.2526761],
                    [52.8867424, 34.2345124],
                    [52.6724019, 34.3525067],
                    [52.4855410, 34.4250361],
                    [52.3866146, 34.4205049],
                    [52.1228110, 34.4069097],
                    [51.8370237, 34.5110832],
                    [51.8370237, 34.5744295],
                    [51.9579337, 34.7732038],
                    [51.9689255, 34.8588905],
                    [52.0513641, 35.0344943],
                    [52.0513641, 35.0974398],
                    [51.9579337, 35.1558457],
                    [51.8809910, 35.2635619],
                    [51.9414460, 35.3218484],
                    [51.9634296, 35.3666557],
                    [51.9029746, 35.4069609],
                    [51.9249582, 35.4651441],
                    [51.9359501, 35.5456359],
                    [51.9909091, 35.5947857],
                    [52.0348764, 35.5054001],
                    [52.2437210, 35.4338199],
                    [52.3536392, 35.3397743],
                    [52.4195901, 35.3487357],
                    [52.5514919, 35.4024836],
                    [52.6339305, 35.4696180],
                    [52.6943855, 35.5322262],
                    [52.7218651, 35.5724486],
                    [52.7988078, 35.5188143],
                    [52.8922383, 35.6215819],
                    [52.9911646, 35.6706850],
                    [53.0351319, 35.7242176],
                    [53.1010828, 35.7509704],
                    [53.1560419, 35.7821707],
                    [53.1175705, 35.8267213],
                    [53.0241401, 35.8133587],
                    [53.0241401, 35.8623437],
                    [53.0900910, 35.9246445],
                    [53.2274887, 35.9157474],
                    [53.2110010, 35.9780062],
                    [53.3044315, 35.9824514],
                    [53.3813742, 36.0668621],
                    [53.5572433, 36.0846213],
                    [53.6836492, 36.0890605],
                    [53.7825756, 36.1511824],
                    [53.8979897, 36.2309813],
                    [53.9474528, 36.3106988],
                    [53.8815019, 36.3726450],
                    [53.9529488, 36.4433803],
                    [54.0079079, 36.4433803],
                    [54.0903465, 36.4743068],
                    [54.1282654, 36.4798280],
                    [54.1529846, 36.4809322]
                ]
            }
        }
    });
    mymap.addLayer({
        'id': 'ostan-semnan-border',
        'type': 'line',
        'source': 'ostan-semnan-border',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': lineColor,
            'line-width': lineWidth
        }
    });

    mymap.addSource('aradan-border', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [52.8222656, 34.2717565],
                    [52.8222656, 34.3207553],
                    [52.7783203, 34.3706449],
                    [52.8057861, 34.4205049],
                    [52.8112793, 34.4839200],
                    [52.8112793, 34.5337124],
                    [52.8112793, 34.5970415],
                    [52.8277588, 34.6603224],
                    [52.8222656, 34.7280697],
                    [52.8222656, 34.7777158],
                    [52.8277588, 34.8318411],
                    [52.8277588, 34.8859309],
                    [52.8167725, 34.9489907],
                    [52.8167725, 35.0209997],
                    [52.8167725, 35.0659731],
                    [52.8167725, 35.1378791],
                    [52.8167725, 35.2231850],
                    [52.8057861, 35.2635619],
                    [52.7893066, 35.2904686],
                    [52.8112793, 35.3173663],
                    [52.8277588, 35.3397743],
                    [52.8442383, 35.3621761],
                    [52.8442383, 35.3980059],
                    [52.8002930, 35.4114381],
                    [52.7893066, 35.4427709],
                    [52.7673340, 35.4830381],
                    [52.7728271, 35.5098717],
                    [52.7783203, 35.5356359],
                    // [52.7783203, 35.5769165]
                ]
            }
        }
    });
    mymap.addLayer({
        'id': 'aradan-border',
        'type': 'line',
        'source': 'aradan-border',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': lineColor,
            'line-width': lineWidth
        }
    });
    mymap.addSource('sorkhe-border', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [53.5034180, 34.2427164],
                    [53.5034180, 34.2572164],
                    [53.4869385, 34.3071439],
                    [53.4924316, 34.3525067],
                    [53.5034180, 34.3978449],
                    [53.5089111, 34.4386284],
                    [53.5089111, 34.4929754],
                    [53.4979248, 34.5608594],
                    [53.4979248, 34.6060846],
                    [53.4979248, 34.6512852],
                    [53.4979248, 34.6874279],
                    [53.4869385, 34.7145247],
                    [53.4869385, 34.7551531],
                    [53.4869385, 34.7777158],
                    [53.4594727, 34.8092932],
                    [53.4759521, 34.8318411],
                    [53.4814453, 34.8633979],
                    [53.4759521, 34.8949424],
                    [53.4704590, 34.9309786],
                    [53.4649658, 34.9624972],
                    [53.4649658, 34.9895036],
                    [53.4649658, 35.0254982],
                    [53.4704590, 35.0389920],
                    [53.4814453, 35.0704691],
                    [53.4429932, 35.0839556],
                    [53.4649658, 35.1064281],
                    [53.4649658, 35.1333869],
                    [53.4649658, 35.1603367],
                    [53.4375000, 35.1693180],
                    [53.4704590, 35.1917670],
                    [53.4759521, 35.2231850],
                    [53.4704590, 35.2590765],
                    [53.4484863, 35.2815007],
                    [53.4484863, 35.3039186],
                    [53.4484863, 35.3263303],
                    [53.4375000, 35.3532161],
                    [53.4375000, 35.3845716],
                    [53.4320068, 35.4159149],
                    [53.3935547, 35.4248679],
                    [53.3715820, 35.4293440],
                    [53.3496094, 35.4517209],
                    [53.3221436, 35.4606700],
                    [53.3056641, 35.4740916],
                    [53.3001709, 35.5054001],
                    [53.2946777, 35.5277558],
                    [53.2946777, 35.5411663],
                    [53.3056641, 35.5679805],
                    [53.3166504, 35.5858516],
                    [53.3166504, 35.5947857],
                    [53.3166504, 35.6171165]
                ]
            }
        }
    });
    mymap.addLayer({
        'id': 'sorkhe-border',
        'type': 'line',
        'source': 'sorkhe-border',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': lineColor,
            'line-width': lineWidth
        }
    });
    mymap.addSource('shahroud-border', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    // [56.7608643, 36.0979380],
                    [56.7433984, 36.1378747],
                    [56.6784668, 36.1644879],
                    [56.6564941, 36.1822250],
                    [56.6070557, 36.1955252],
                    [56.5521240, 36.1955252],
                    [56.5191650, 36.1910920],
                    [56.4752197, 36.1910920],
                    [56.4257813, 36.1822250],
                    [56.4257813, 36.1644879],
                    [56.4093018, 36.1999581],
                    [56.3983154, 36.2354122],
                    [56.4147949, 36.2575628],
                    [56.4367676, 36.2708502],
                    [56.4587402, 36.2841353],
                    [56.3818359, 36.2929908],
                    [56.2994385, 36.3106988],
                    [56.2994385, 36.3106988],
                    [56.2774658, 36.3106988],
                    [56.2390137, 36.2708502],
                    [56.2005615, 36.2929908],
                    [56.1785889, 36.3106988],
                    [56.1511230, 36.3151251],
                    [56.1016846, 36.3239771],
                    [56.0577393, 36.3284027],
                    [56.0357666, 36.3505270],
                    [56.0137939, 36.3682219],
                    [55.9808350, 36.3682219],
                    [55.9643555, 36.3682219],
                    [55.9423828, 36.3593750],
                    [55.9149170, 36.3593750],
                    [55.8874512, 36.3593750],
                    [55.8544922, 36.3593750],
                    [55.8215332, 36.3593750],
                    [55.8050537, 36.3593750],
                    [55.7720947, 36.3372532],
                    [55.7391357, 36.3328281],
                    [55.7116699, 36.3195513],
                    [55.6896973, 36.2929908],
                    [55.6567383, 36.2708502],
                    [55.6292725, 36.2398428],
                    [55.5908203, 36.2088231],
                    [55.5523682, 36.2088231],
                    [55.5084229, 36.2132552],
                    [55.4809570, 36.2132552],
                    [55.4589844, 36.2265501],
                    [55.4205322, 36.2309813],
                    [55.3985596, 36.2354122],
                    [55.3820801, 36.2487033],
                    [55.3491211, 36.2619922],
                    [55.3326416, 36.2841353],
                    [55.3271484, 36.3062722],
                    [55.3161621, 36.3328281],
                    [55.2996826, 36.3549511],
                    [55.3161621, 36.3726450],
                    [55.3436279, 36.4035996],
                    [55.3491211, 36.4301223],
                    [55.3491211, 36.4477991],
                    [55.3765869, 36.4654719],
                    [55.4370117, 36.4566360],
                    [55.4479980, 36.4477991],
                    [55.4754639, 36.4477991],
                    [55.5194092, 36.4389612],
                    [55.5578613, 36.4566360],
                    [55.5908203, 36.4787238],
                    [55.6127930, 36.4919735],
                    [55.6347656, 36.5052209],
                    [55.6347656, 36.5449494],
                    [55.6292725, 36.5581878],
                    [55.6292725, 36.5890684],
                    [55.6292725, 36.6155276],
                    [55.6237793, 36.6507925],
                    [55.6182861, 36.6772306],
                    [55.5743408, 36.6992554],
                    [55.5523682, 36.6992554],
                    [55.5468750, 36.7080635],
                    [55.5249023, 36.7432861],
                    [55.5249023, 36.7652919],
                    [55.5249023, 36.7740925],
                    [55.5139160, 36.8004882],
                    [55.5029297, 36.8048866],
                    [55.5029297, 36.8180802],
                    [55.5139160, 36.8356682],
                    [55.5468750, 36.8444607],
                    [55.5578613, 36.8708322],
                    [55.5578613, 36.8752265],
                    [55.5523682, 36.8928014],
                    [55.5403955, 36.9047643]
                ]
            }
        }
    });
    mymap.addLayer({
        'id': 'shahroud-border',
        'type': 'line',
        'source': 'shahroud-border',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': lineColor,
            'line-width': lineWidth
        }
    });
    mymap.addSource('garmsar-border', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [52.4102783, 34.4178449],
                    [52.3937988, 34.4522185],
                    [52.3443604, 34.5337124],
                    [52.3443604, 34.5925196],
                    [52.3498535, 34.6377276],
                    [52.3443604, 34.6783937],
                    [52.3883057, 34.7235549],
                    [52.4047852, 34.7732038],
                    [52.4102783, 34.8138033],
                    [52.4267578, 34.8588905],
                    [52.4322510, 34.9084579],
                    [52.4212646, 34.9624972],
                    [52.4212646, 34.9985037],
                    [52.4542236, 35.0209997],
                    [52.4871826, 35.0569804],
                    [52.4871826, 35.0929453],
                    [52.4871826, 35.1244016],
                    [52.4816895, 35.1558457],
                    [52.4707031, 35.1782984],
                    [52.4487305, 35.1917670],
                    [52.4322510, 35.2052333],
                    [52.4212646, 35.2186975],
                    [52.3992920, 35.2501052],
                    [52.4047852, 35.2815007],
                    [52.4157715, 35.2994355],
                    [52.4432373, 35.3128840],
                    [52.4487305, 35.3352932],
                    [52.4707031, 35.3442551],
                    [52.4816895, 35.3621761],
                    [52.4981689, 35.3845716]
                    // [52.4926758, 35.4024836]
                    // [52.4871826, 35.4248679]
                ]
            }
        }
    });
    mymap.addLayer({
        'id': 'garmsar-border',
        'type': 'line',
        'source': 'garmsar-border',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': lineColor,
            'line-width': lineWidth
        }
    });
    mymap.addSource('mehdishahr-border', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [53.0492000, 35.7292980],
                    [53.0574854, 35.7152980],
                    [53.0969238, 35.7108378],
                    [53.1353760, 35.6974558],
                    [53.1683350, 35.7019167],
                    [53.2067871, 35.6796096],
                    [53.2287598, 35.6706850],
                    [53.2562256, 35.6483692],
                    [53.2781982, 35.6305120],
                    [53.3166504, 35.6215819],
                    [53.3276367, 35.6439052],
                    [53.3660889, 35.6662223],
                    [53.3825684, 35.6885332],
                    [53.3825684, 35.7152980],
                    [53.3825684, 35.7331362],
                    [53.4100342, 35.7509704],
                    [53.4759521, 35.7286770],
                    [53.4979248, 35.7465123],
                    [53.5144043, 35.7643435],
                    [53.5253906, 35.7910828],
                    [53.5583496, 35.7999939],
                    [53.5803223, 35.8178132],
                    [53.5693359, 35.8445345],
                    [53.5693359, 35.8712469],
                    [53.5803223, 35.9068493],
                    [53.6077881, 35.9246445],
                    [53.6077881, 35.9468829],
                    [53.6297607, 35.9735608],
                    [53.6462402, 35.9824514],
                    [53.6682129, 36.0002296],
                    [53.6791992, 36.0135606],
                    [53.7561035, 35.9913410],
                    [53.7670898, 36.0313318],
                    [53.7890625, 36.0624217],
                    [53.7890625, 36.0846213],
                    [53.7725830, 36.0934994],
                    [53.7725830, 36.1068146],
                    [53.7725830, 36.1201276],
                    [53.8110352, 36.1201276],
                    [53.8330078, 36.1290017],
                    [53.8275146, 36.1556178],
                    [53.8220215, 36.1600530],
                    [53.8055420, 36.1689225]
                    // [53.7990762, 36.1693569]
                    // [53.7670898, 36.2043907]
                ]
            }
        }
    });
    mymap.addLayer({
        'id': 'mehdishahr-border',
        'type': 'line',
        'source': 'mehdishahr-border',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': lineColor,
            'line-width': lineWidth
        }
    });
    mymap.addSource('semnan-border', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [54.1790771, 34.2484290],
                    [54.1680908, 34.2708360],
                    [54.1680908, 34.3116812],
                    [54.1680908, 34.3434361],
                    [54.1735840, 34.3842460],
                    [54.1680908, 34.4340979],
                    [54.1625977, 34.4839200],
                    [54.1625977, 34.5065566],
                    [54.1571045, 34.5427624],
                    [54.1735840, 34.5653830],
                    [54.1735840, 34.6060846],
                    [54.1900635, 34.6558039],
                    [54.1900635, 34.6874279],
                    [54.1735840, 34.7370985],
                    [54.1625977, 34.8092932],
                    [54.1735840, 34.8453669],
                    [54.1680908, 34.8679050],
                    [54.1680908, 34.8994478],
                    [54.1625977, 34.9174669],
                    [54.1790771, 34.9444881],
                    [54.1680908, 34.9985037],
                    [54.1516113, 35.0389920],
                    [54.1571045, 35.0794603],
                    [54.1571045, 35.1154153],
                    [54.1735840, 35.1333869],
                    [54.1571045, 35.1693180],
                    [54.1406250, 35.1962560],
                    [54.1625977, 35.2366462],
                    [54.1680908, 35.2680469],
                    [54.1680908, 35.3039186],
                    [54.1735840, 35.3308119],
                    [54.1790771, 35.3442551],
                    [54.1351318, 35.3666557],
                    [54.0911865, 35.3800930],
                    [54.0637207, 35.4114381],
                    [54.0472412, 35.4338199],
                    [54.0307617, 35.4517209],
                    [54.0087891, 35.4785650],
                    [54.0032959, 35.5143431],
                    [53.9978027, 35.5366964],
                    [54.0087891, 35.5590434],
                    [54.0197754, 35.5947857],
                    [54.0197754, 35.6171165],
                    [54.0142822, 35.6528328],
                    [53.9923096, 35.6796096],
                    [53.9868164, 35.7019167],
                    [53.9923096, 35.7331362],
                    [53.9978027, 35.7643435],
                    [53.9978027, 35.7955385],
                    [53.9978027, 35.8267213],
                    [53.9538574, 35.8400816],
                    [53.9208984, 35.8578918],
                    [53.8769531, 35.8801490],
                    [53.8549805, 35.8801490],
                    [53.8385010, 35.9023999],
                    [53.7890625, 35.9157474],
                    [53.7725830, 35.9201961],
                    [53.7451172, 35.9335406],
                    [53.7231445, 35.9468829],
                    [53.7176514, 35.9602230],
                    [53.7066650, 35.9735608],
                    [53.7010000, 35.9999999]
                ]
            }
        }
    });
    mymap.addLayer({
        'id': 'semnan-border',
        'type': 'line',
        'source': 'semnan-border',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': lineColor,
            'line-width': lineWidth
        }
    });
    mymap.addSource('damghan-border', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [54.5416260, 36.5084660],
                    [54.5471191, 36.4433803],
                    [54.5635986, 36.3637986],
                    [54.5855713, 36.3062722],
                    [54.6185303, 36.2929908],
                    [54.6514893, 36.2708502],
                    [54.7009277, 36.2398428],
                    [54.7503662, 36.1600530],
                    [54.7723389, 36.1290017],
                    [54.7888184, 36.0757422],
                    [54.8382568, 35.9824514],
                    [54.8382568, 35.8935003],
                    [54.8382568, 35.8222673],
                    [54.8492432, 35.7554284],
                    [54.8382568, 35.6706850],
                    [54.8052979, 35.6171165],
                    [54.8107910, 35.4964561],
                    [54.7503662, 35.4203915],
                    [54.7503662, 35.3487357],
                    [54.7558594, 35.3128840],
                    [54.7558594, 35.2815007],
                    [54.7778320, 35.2097216],
                    [54.6789551, 35.1513544],
                    [54.6844482, 35.0614769],
                    [54.6844482, 34.9399852],
                    [54.6789551, 34.8092932],
                    [54.6844482, 34.6783937],
                    [54.6679688, 34.5744295],
                    [54.6679688, 34.4658063],
                    [54.6624756, 34.3479715],
                    [54.6569824, 34.2753753],
                    [54.6624756, 34.2505124]
                ]
            }
        }
    });
    mymap.addLayer({
        'id': 'damghan-border',
        'type': 'line',
        'source': 'damghan-border',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': lineColor,
            'line-width': lineWidth
        }
    });
    mymap.loadImage('/assets/img/mapbox-icon-1.png',
        function (error, image) {
            if (error) throw error;
            mymap.addImage('marker1', image);
        });
    mymap.loadImage('/assets/img/mapbox-icon-2.png',
        function (error, image) {
            if (error) throw error;
            mymap.addImage('marker2', image);
        });
    mymap.loadImage('/assets/img/mapbox-icon-3.png',
        function (error, image) {
            if (error) throw error;
            mymap.addImage('marker3', image);
        });


    mymap.addSource('shahrestan-labels', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    // feature for Mapbox Garmsar
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [52.1740723, 34.8638033]
                    },
                    'properties': {
                        'title': 'گرمسار',
                        'icon': ''
                    }
                },
                {
                    // feature for Mapbox Aradan
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [52.5640869, 34.7338033]
                    },
                    'properties': {
                        'title': 'آرادان',
                        'icon': ''
                    }
                },
                {
                    // feature for Mapbox Sorkhe
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [53.1793213, 34.8047829]
                    },
                    'properties': {
                        'title': 'سرخه',
                        'icon': ''
                    }
                },
                {
                    // feature for Mapbox Garmsar
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [53.7945557, 34.867905]
                    },
                    'properties': {
                        'title': 'سمنان',
                        'icon': ''
                    }
                },
                {
                    // feature for Mapbox Garmsar
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [54.4317627, 34.935482]
                    },
                    'properties': {
                        'title': 'دامغان',
                        'icon': ''
                    }
                },
                {
                    // feature for Mapbox Garmsar
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [55.8929443, 35.2659731]
                    },
                    'properties': {
                        'title': 'شاهرود',
                        'icon': ''
                    }
                },
                {
                    // feature for Mapbox Garmsar
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [55.9863281, 36.6860413]
                    },
                    'properties': {
                        'title': 'میامی',
                        'icon': ''
                    }
                },
                {
                    // feature for Mapbox Garmsar
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [53.5418701, 36.1000000]
                    },
                    'properties': {
                        'title': 'مهدی شهر',
                        'icon': ''
                    }
                },
            ]
        }
    });
    mymap.addSource('ostan-label', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [55.102016442078, 35.526233495744]
                    },
                    'properties': {
                        'title': 'استان سمنان',
                        'icon': ''
                    }
                }
            ]
        }
    });
    mymap.addSource('stations', {
        'type': 'geojson',
        'data': stns
    });
    // Add a layer showing the places.
    mymap.addLayer({
        'id': 'stations',
        'type': 'symbol',
        'source': 'stations',
        'minzoom': zoomDegreeOnZoomMap -1 ,
        'layout': {
            'icon-image': '{icon}',
            //'icon-ignore-placement':true,
            'icon-allow-overlap': true,
            'text-allow-overlap':true,
            'text-field': ['get', 'position'],
            //'text-font': ['Yekan'],
            'text-offset': [0, 0.5],
            'text-anchor': 'top'
        }
    });
    mymap.addLayer({
        'id': 'shahrestan-labels',
        'type': 'symbol',
        'source': 'shahrestan-labels',
        'minzoom': zoomDegreeOnZoomMap - 1,
        'layout': {
            'icon-allow-overlap': true,
            'text-allow-overlap':true,
            'text-field': [
                'format',
                ['get', 'title'],
                {'font-scale': textSize}
            ],
            //- 'text-font': ['Yekan'],
            'text-offset': [0, 0],
            'text-anchor': 'top'
        },
        paint: {
            'text-color' : '#2732ff'
        }
    });
    mymap.addLayer({
        'id': 'ostan-label',
        'type': 'symbol',
        'source': 'ostan-label',
        'minzoom': zoomDegreeOnLoad -0.5,
        'maxzoom': zoomDegreeOnLoad +1.3,
        'layout': {
            'icon-allow-overlap': true,
            'text-allow-overlap': true,
            'text-field': [
                'format',
                ['get', 'title'],
                {'font-scale': textSize}
            ],
            //- 'text-font': ['Yekan'],
            'text-offset': [0, 0],
            'text-anchor': 'center',
        },
        paint: {
            'text-color' : '#ff1d25',
        }
    });
    mymap.addImage('pulsing-dot1', pulsingDot1, { pixelRatio: 2 });
    mymap.addImage('pulsing-dot2', pulsingDot2, { pixelRatio: 2 });
});//end of on Load

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});
mymap.on('mouseenter', 'stations', function (e) {
    // Change the cursor style as a UI indicator.
    mymap.getCanvas().style.cursor = 'pointer';

    var coordinates = e.features[0].geometry.coordinates;
    var description = e.features[0].properties.description;
    popup
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(mymap);
});

mymap.on('mouseleave', 'stations', function () {
    mymap.getCanvas().style.cursor = '';
    popup.remove();
});
mymap.on('click', 'stations', function (e) {
    let id = e.features[0].properties.id;
    let sensor = e.features[0].properties.sensor;
    let position = e.features[0].properties.position;
    switch(sensor){
        case ('rain'):
            location.href = '/detail/' + id + '-' + sensor + '-' + position + '-' + 'r' + '-' + window.currentSlideIndex;
            break;
        case ('level'):
            location.href = '/detail/' + id + '-' + sensor + '-' + position + '-' + 'l' + '-' + window.currentSlideIndex;
            break;
        // case ('clima'):
        //     location.href = '/detail/' + id + '-' + sensor + '-' + position + '-' + 'c' + '-' + window.currentSlideIndex;
        //     break;
        case ('clima'):
            let checkBox = document.getElementById('c-' + id);
            checkBox.checked = true;
            displayOverview();
            break;
    }
});
mymap.on('click', 'ostan-semnan-polygon', function (e) {
    mymap.setZoom(zoomDegreeOnZoomMap);
    mymap.flyTo({
        center: centerOnZoomMap,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
    mymap.setPaintProperty(
        'ostan-semnan-polygon',
        'fill-opacity',
        0
    );
    mymap.setPaintProperty(
        'ostan-semnan-border',
        'line-width',
        lineWidth + 2
    );
});
// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
mymap.on('mouseenter', 'ostan-semnan-polygon', function () {
    mymap.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
mymap.on('mouseleave', 'ostan-semnan-polygon', function () {
    mymap.getCanvas().style.cursor = '';
});





// var updatePopup = function (lng, lat) {
//     self.popup.setLngLat([lng, lat])
//         .setHTML(markerPoint.features[0].properties.description)
//         .addTo(self.map);
// }


function checkRainStationStatusForMap(stnID, clima,i) {
    let result = '000';
    let rain = 0;
    let alarm1 = 0;
    let alarm8 = 0;
    var status = undefined;
    let url = undefined;
    if (clima === 'true')
        url = '/api/status/rainrc/start/' + stnID
    else
        url = '/api/status/rain/start/' + stnID
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            status = response.data;
            if (status !== -1) {

                if (status == 1) {
                    // if(clima === 'true')
                    //     $.ajax({url: '/api/caches/rain/' + stnID + '/' + 'c' , success: function(){}});
                    // else
                    //     $.ajax({url: '/api/caches/rain/' + stnID + '/' + 'r' , success: function(){}});
                    // console.log(`stnID= ${stnID} , status= ${status}`);
                    rain = 1;
                    //////////////////////////////B

                    let url1 = undefined;
                    let url8 = undefined;
                    if (clima === 'true') {
                        url1 = '/api/status/rainrc/alarm1/' + stnID;
                        url8 = '/api/status/rainrc/alarm8/' + stnID;
                    } else {
                        url1 = '/api/status/rain/alarm1/' + stnID;
                        url8 = '/api/status/rain/alarm8/' + stnID;
                    }
                    $.ajax({
                        url: url1,
                        type: 'GET',
                        dataType: 'json',
                        success: (response) => {
                            status = response.data;
                            if (status === 1) {
                                alarm1 = 1;
                            } else if (status === 0) {
                                alarm1 = 0;
                            }
                        }
                    })
                    $.ajax({
                        url: url8,
                        type: 'GET',
                        dataType: 'json',
                        success: (response) => {
                            status = response.data;
                            if (status === 1) {
                                alarm8 = 1;
                            } else if (status === 0) {
                                alarm8 = 0;
                            }
                        }
                    })
                    //////////////////////////////E
                } else if (status == 0) {
                    rain = 0;
                }
                result = rain.toString() + alarm1.toString() + alarm8.toString();
                // console.log(`resultresult= ${result} , rain= ${rain}`);
                switch (result) {
                    case '000':
                        if (clima == true) {
                            // console.log(`i= ${i}`);
                            stns.features[i].properties.icon = 'marker3';
                        }
                        else {
                            // console.log(`i= ${i}`);
                            stns.features[i].properties.icon = 'marker1';
                        }
                        mymap.getSource('stations').setData(stns);
                        break;
                    case '100':
                        stns.features[i].properties.icon = 'pulsing-dot1';
                        mymap.getSource('stations').setData(stns);
                        break;
                    case '110':
                        stns.features[i].properties.icon = 'pulsing-dot1';
                        mymap.getSource('stations').setData(stns);
                        break;
                    case '101':
                        stns.features[i].properties.icon = 'pulsing-dot1';
                        mymap.getSource('stations').setData(stns);
                        break;
                    case '111':
                        stns.features[i].properties.icon = 'pulsing-dot1';
                        mymap.getSource('stations').setData(stns);
                        break;
                }
            }

        }
    })
}
function checkLevelStationFloodForMap(stnID,i) {
    let flood = 0;
    let status = undefined;
    let url = undefined;
    url = '/api/status/level/flood/' + stnID
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            status = response.data;
            if (status !== -1) {
                if (status === 1) {
                    // $.ajax({url: "/api/caches/level/" + stnID , success: function(){}});
                    flood = 1;
                } else if (status === 0) {
                    flood = 0;
                }
            }
            switch (flood) {
                case 0:
                    stns.features[i].properties.icon = 'marker2';
                    mymap.getSource('stations').setData(stns);
                    break;
                case 1:
                    stns.features[i].properties.icon = 'pulsing-dot2';
                    mymap.getSource('stations').setData(stns);
                    break;
            }

        }
    })

}

setTimeout(function () {
    for(let i=0;i<stns.features.length;i++){
        let id = stns.features[i].properties.id;
        let type = stns.features[i].properties.sensor;
        // console.log(`id= ${id} , type= ${type}`);
        if (type == 'rain') {
            checkRainStationStatusForMap(id, false,i);

        }
        if (type == 'level') {
            checkLevelStationFloodForMap(id,i);

        }
        if (type == 'clima') {
            checkRainStationStatusForMap(id, true,i);
        }

    }

    // stns.features[0].properties.icon = 'pulsing-dot1';
    // stns.features[5].properties.icon = 'pulsing-dot2';
    // mymap.getSource('stations').setData(stns);

}, 8000);
let chackAlarm = setInterval(function () {
    for (let i = 0; i < stns.features.length; i++) {
        let id = stns.features[i].properties.id;
        let type = stns.features[i].properties.sensor;
        // console.log(`id= ${id} , type= ${type}`);
        if (type == 'rain') {
            checkRainStationStatusForMap(id, false, i);

        }
        if (type == 'level') {
            checkLevelStationFloodForMap(id, i);

        }
        if (type == 'clima') {
            checkRainStationStatusForMap(id, true, i);
        }

    }


}, 180000);//180000