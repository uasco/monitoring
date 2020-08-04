zeroCompensation = {
  renderZeroCompensation: function (chartInstance, d) {
    // get postion info from _view
    const view = d._view
    const context = chartInstance.chart.ctx

    // the view.x is the centeral point of the bar, so we need minus half width of the bar.
    const startX = view.x - view.width / 2
    // common canvas API, Check it out on MDN
    context.beginPath();
    // set line color, you can do more custom settings here.
    context.strokeStyle = '#1f8ef1';
    context.moveTo(startX, view.y);
    // draw the line!
    context.lineTo(startX + view.width, view.y);
    // bam！ you will see the lines.
    context.stroke();
  },

  afterDatasetsDraw: function (chart, easing) {
    // get data meta, we need the location info in _view property.
    const meta = chart.getDatasetMeta(0)
    // also you need get datasets to find which item is 0.
    const dataSet = chart.config.data.datasets[0].data
    meta.data.forEach((d, index) => {
      // for the item which value is 0, reander a line.
      if(dataSet[index] === 0) {
        this.renderZeroCompensation(chart, d)
      }
    })
  }
};
gradientBarChartConfiguration = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [{

      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: 80,
        padding: 10,
        fontColor: "#9e9e9e",
      }
    }],

    xAxes: [{

      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 10,
        fontColor: "#9e9e9e",
        fontSize: 8
      }
    }]
  }
};

// General configuration for the charts with Line gradientStroke
gradientLineChartConfiguration = {
  // maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    bodySpacing: 4,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10,
    fontFamily: "Bahij"
  },
  responsive: true,
  scales: {
    yAxes: [{
      // display: 0,
      gridLines: 0,
      ticks: {
        // display: false
        fontFamily: "Bahij",
        // suggestedMin: 0,
        // suggestedMax: 80,
        padding: 10,
        fontColor: "#9e9e9e",
        fontFamily: "Bahij"
      },
      gridLines: {
        zeroLineColor: "transparent",
        color: 'rgba(29,140,248,0.1)',
        // drawTicks: false,
        // display: false,
        drawBorder: false
      }
    }],
    xAxes: [{
      // display: 0,
      gridLines: 0,
      ticks: {
        // display: false
        fontFamily: "Bahij",
        fontSize: 14
      },
      gridLines: {
        zeroLineColor: "transparent",
        // drawTicks: false,
        // display: false,
        // drawBorder: false
      }
    }]
  },
  layout: {
    padding: {
      left: 5,
      right: 0,
      top: 15,
      bottom: 1
    }
  }
};

function drawBarChart(chart_id, months, values, label) {

  var ctx = document.getElementById(chart_id).getContext("2d");

  var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
  gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
  gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

  var mySugestedMax = 0;
   values.map(el=>{
    if(el > mySugestedMax)
      mySugestedMax = el;
  })
  mySugestedMax ++ ;

  var myChart = new Chart(ctx, {
    plugins: [zeroCompensation],
    type: 'bar',
    responsive: true,
    legend: {
      display: false
    },
    data: {
      // labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد' , 'شهریور'],
      labels: months,
      datasets: [{
        label: label,
        fill: true,
        backgroundColor: gradientStroke,
        hoverBackgroundColor: gradientStroke,
        borderColor: '#1f8ef1',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        // data: [53, 20, 10, 80, 100, 45],
        //data: [۵۳, ۲۰, ۱۰, ۸۰, ۱۰۰, ۴۵],
        data: values,
      }]
    },
    // options: gradientBarChartConfiguration
    options:
        {
          maintainAspectRatio: false,
          legend: {
            display: false
          },

          tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
          },
          responsive: true,
          scales: {
            yAxes: [{

              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 0,
                // suggestedMax: 80,
                suggestedMax: mySugestedMax,
                padding: 10,
                fontColor: "#9e9e9e",
                fontSize: 14
              }
            }],

            xAxes: [{

              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 10,
                fontColor: "#9e9e9e",
                fontSize: 8
              }
            }]
          }
        }
  });
}
function drawLineChart(chart_id, months, values , sensor, ) {

  var ctx = document.getElementById(chart_id).getContext("2d");

  var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
  gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
  gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

  var myChart = new Chart(ctx, {
    type: 'line',
    responsive: true,
    legend: {
      display: false
    },
    data: {
      // labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد' , 'شهریور'],
      labels: months,
      datasets: [{
        label: sensor,
        fill: true,
        backgroundColor: gradientStroke,
        hoverBackgroundColor: gradientStroke,
        borderColor: '#1f8ef1',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        // data: [53, 20, 10, 80, 100, 45],
        //data: [۵۳, ۲۰, ۱۰, ۸۰, ۱۰۰, ۴۵],
        data: values,
      }]
    },
    options: gradientLineChartConfiguration
  });
}
function drawBigBarChart(chart_id, months, values, label) {

  var ctx = document.getElementById(chart_id).getContext("2d");

  var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
  gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
  gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

  var mySugestedMax = 0;
  values.map(el=>{
    if(el > mySugestedMax)
      mySugestedMax = el;
  })
  mySugestedMax ++ ;

  var myChart = new Chart(ctx, {
    plugins: [zeroCompensation],
    type: 'bar',
    responsive: true,
    legend: {
      display: false
    },
    data: {
      // labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد' , 'شهریور'],
      labels: months,
      datasets: [{
        label: label,
        fill: true,
        backgroundColor: gradientStroke,
        hoverBackgroundColor: gradientStroke,
        borderColor: '#1f8ef1',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        // data: [53, 20, 10, 80, 100, 45],
        //data: [۵۳, ۲۰, ۱۰, ۸۰, ۱۰۰, ۴۵],
        data: values,
      }]
    },
    // options: gradientBarChartConfiguration
    options:
        {
          maintainAspectRatio: false,
          legend: {
            display: false
          },

          tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 8,
            xPadding: 20,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
          },
          responsive: true,
          scales: {
            yAxes: [{

              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 0,
                // suggestedMax: 80,
                suggestedMax: mySugestedMax,
                padding: 10,
                fontColor: "#9e9e9e",
                fontSize: 14
              }
            }],

            xAxes: [{

              gridLines: {
                drawBorder: true,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e",
                fontSize: 16
              }
            }]
          }
        }
  });
}
function drawBigLineChart(chart_id, months, values , sensor) {

  var ctx = document.getElementById(chart_id).getContext("2d");

  var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
  gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
  gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

  var mySugestedMax = 0;
  values.map(el=>{
    if(el > mySugestedMax)
      mySugestedMax = el;
  })
  mySugestedMax ++ ;

  var myChart = new Chart(ctx, {
    type: 'line',
    responsive: true,
    legend: {
      display: true
    },
    data: {
      // labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد' , 'شهریور'],
      labels: months,
      datasets: [{
        label: sensor,
        fill: true,
        backgroundColor: gradientStroke,
        hoverBackgroundColor: gradientStroke,
        borderColor: '#1f8ef1',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        // data: [53, 20, 10, 80, 100, 45],
        //data: [۵۳, ۲۰, ۱۰, ۸۰, ۱۰۰, ۴۵],
        data: values,
      }]
    },
    //options: gradientLineChartConfiguration
    options:
        {
          maintainAspectRatio: false,
          legend: {
            display: false
          },

          tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 8,
            xPadding: 20,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
          },
          responsive: true,
          scales: {
            yAxes: [{

              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 0,
                // suggestedMax: 80,
                suggestedMax: mySugestedMax,
                padding: 10,
                fontColor: "#9e9e9e",
                fontSize: 14
              }
            }],

            xAxes: [{

              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e",
                fontSize: 16
              }
            }]
          }
        }
  });
}
// function drawBigMultiLineClimaChart(chart_id, labels, values , label , sensor) {
//   console.log(`chart id ::: ${chart_id}`);
//   console.log(`tmp_values ::: ${values[0]}`);
//
//   let chart_labels = [];
//   let chart_data = [];
//
//
//
//   let tmp_labels = labels[0];
//   let tmp_values = values[0];
//   let wsp_labels = labels[1];
//   let wsp_values = values[1];
//   let hum_labels = labels[2];
//   let hum_values = values[2];
//   let evp_labels = labels[3];
//   let evp_values = values[3];
//   let wdr_labels = labels[4];
//   let wdr_values = values[4];
//   let rad_labels = labels[5];
//   let rad_values = values[5];
//   let prs_labels = labels[6];
//   let prs_values = values[6];
//
//   chart_data = tmp_values;
//   chart_labels = tmp_labels;
//   let ctx = document.getElementById(chart_id).getContext("2d");
//
//   let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
//
//   gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
//   gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
//   gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors
//
//   let mySugestedMax = 0;
//   values.map(el=>{
//     if(el > mySugestedMax)
//       mySugestedMax = el;
//   })
//   mySugestedMax ++ ;
//
//   let config = {
//     type: 'line',
//     data: {
//       labels: chart_labels,
//       datasets: [{
//         label: "My First dataset",
//         fill: true,
//         backgroundColor: gradientStroke,
//         borderColor: '#d346b1',
//         borderWidth: 2,
//         borderDash: [],
//         borderDashOffset: 0.0,
//         pointBackgroundColor: '#d346b1',
//         pointBorderColor: 'rgba(255,255,255,0)',
//         pointHoverBackgroundColor: '#d346b1',
//         pointBorderWidth: 20,
//         pointHoverRadius: 4,
//         pointHoverBorderWidth: 15,
//         pointRadius: 4,
//         data: chart_data,
//       }]
//     },
//     options:
//         {
//           maintainAspectRatio: false,
//           legend: {
//             display: false
//           },
//
//           tooltips: {
//             backgroundColor: '#f5f5f5',
//             titleFontColor: '#333',
//             bodyFontColor: '#666',
//             bodySpacing: 8,
//             xPadding: 20,
//             mode: "nearest",
//             intersect: 0,
//             position: "nearest",
//           },
//           responsive: true,
//           scales: {
//             yAxes: [{
//
//               gridLines: {
//                 drawBorder: false,
//                 color: 'rgba(29,140,248,0.1)',
//                 zeroLineColor: "transparent",
//               },
//               ticks: {
//                 suggestedMin: 0,
//                 // suggestedMax: 80,
//                 suggestedMax: mySugestedMax,
//                 padding: 10,
//                 fontColor: "#9e9e9e",
//                 fontSize: 14
//               }
//             }],
//
//             xAxes: [{
//
//               gridLines: {
//                 drawBorder: false,
//                 color: 'rgba(29,140,248,0.1)',
//                 zeroLineColor: "transparent",
//               },
//               ticks: {
//                 padding: 20,
//                 fontColor: "#9e9e9e",
//                 fontSize: 16
//               }
//             }]
//           }
//         }
//   };
//
//
//   let myChart = new Chart(ctx, config);
//
// }
function drawBigMultiLineClimaChart(chart_id, labels, values , label) {
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

  let def_labels = undefined;
  if(tmp_labels.length >0){
    def_labels = tmp_labels;
  }else if(wsp_labels.length >0){
    def_labels = wsp_labels;
  }else if(hum_labels.length >0){
    def_labels = hum_labels;
  }else if(evp_labels.length >0){
    def_labels = evp_labels;
  }else if(wdr_labels.length >0){
    def_labels = wdr_labels;
  }else if(rad_labels.length >0){
    def_labels = rad_labels;
  }else if(prs_labels.length >0){
    def_labels = prs_labels;
  }
  let datasets = [];
  if(tmp_labels.length >0){
    datasets.push({
      label: 'دما',
      borderColor: '#df0f0f',
      backgroundColor: '#df0f0f',
      fill: false,
      data: values[0],
      yAxisID: 'tmp-axis',
    });
  }
  if(wsp_labels.length >0){
    datasets.push({
      label: 'سرعت باد',
      borderColor: '#0f3bdb',
      backgroundColor: '#0f3bdb',
      fill: false,
      data: values[1],
      yAxisID: 'wsp-axis'
    });
  }
  if(hum_labels.length >0){
    datasets.push({
      label: 'رطوبت',
      borderColor: '#cadb0f',
      backgroundColor: '#cadb0f',
      fill: false,
      data: values[2],
      yAxisID: 'hum-axis'
    });
  }
  if(evp_labels.length >0){
    datasets.push({
      label: 'تبخیر',
      borderColor: '#49db0f',
      backgroundColor: '#49db0f',
      fill: false,
      data: values[3],
      yAxisID: 'evp-axis'
    });
  }
  if(wdr_labels.length >0){
    datasets.push({
      label: 'جهت باد',
      borderColor: '#ed5808',
      backgroundColor: '#ed5808',
      fill: false,
      data: values[4],
      yAxisID: 'wdr-axis'
    });
  }
  if(rad_labels.length >0){
    datasets.push({
      label: 'تشعشع',
      borderColor: '#0fbcdb',
      backgroundColor: '#0fbcdb',
      fill: false,
      data: values[5],
      yAxisID: 'rad-axis'
    });
  }
  if(prs_labels.length >0){
    datasets.push({
      label: 'فشار',
      borderColor: '#e319ed',
      backgroundColor: '#e319ed',
      fill: false,
      data: values[6],
      yAxisID: 'prs-axis'
    });
  }
  let lineChartData = {
    labels: def_labels,
    datasets: datasets
  };


  let ctx = document.getElementById(chart_id).getContext("2d");

  let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
  gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
  gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

  let SugestedTMPMax = 0;
  values[0].map(el=>{
    if(el > SugestedTMPMax)
      SugestedTMPMax = el;
  })
  SugestedTMPMax ++ ;

  let SugestedWSPMax = 0;
  values[1].map(el=>{
    if(el > SugestedWSPMax)
      SugestedWSPMax = el;
  })
  SugestedWSPMax ++ ;

  let SugestedHUMMax = 0;
  values[2].map(el=>{
    if(el > SugestedHUMMax)
      SugestedHUMMax = el;
  })
  SugestedHUMMax ++ ;

  let SugestedEVPMax = 0;
  values[3].map(el=>{
    if(el > SugestedEVPMax)
      SugestedEVPMax = el;
  })
  SugestedEVPMax ++ ;

  let SugestedWDRMax = 0;
  values[4].map(el=>{
    if(el > SugestedWDRMax)
      SugestedWDRMax = el;
  })
  SugestedWDRMax ++ ;

  let SugestedRADMax = 0;
  values[5].map(el=>{
    if(el > SugestedRADMax)
      SugestedRADMax = el;
  })
  SugestedRADMax ++ ;

  let SugestedPRSMax = 0;
  values[6].map(el=>{
    if(el > SugestedPRSMax)
      SugestedPRSMax = el;
  })
  SugestedPRSMax ++ ;
  let gridLines= {
        drawBorder: false,
        color: 'rgba(29,140,248,0)',
        zeroLineColor: "transparent",
      };
  let yAxes= [];
  if(tmp_labels.length >0){
    yAxes.push({
      gridLines: gridLines,
      ticks: {
        suggestedMin: 0,
        suggestedMax: SugestedTMPMax,
        padding: 10,
        fontColor: "#df0f0f",
        fontSize: 22
      },
      type: 'linear',
      display: true,
      id: 'tmp-axis',
    });
  }
  if(wsp_labels.length >0){
    yAxes.push({
      gridLines: gridLines,
      ticks: {
        suggestedMin: 0,
        suggestedMax: SugestedWSPMax,
        padding: 10,
        fontColor: "#0f3bdb",
        fontSize: 22
      },
      type: 'linear',
      display: true,
      id: 'wsp-axis',
    });
  }
  if(hum_labels.length >0){
    yAxes.push({
      gridLines: gridLines,
      ticks: {
        suggestedMin: 0,
        suggestedMax: SugestedHUMMax,
        padding: 10,
        fontColor: "#cadb0f",
        fontSize: 22
      },
      type: 'linear',
      display: true,
      id: 'hum-axis',
    });
  }
  if(evp_labels.length >0){
    yAxes.push({
      gridLines: gridLines,
      ticks: {
        suggestedMin: 0,
        suggestedMax: SugestedEVPMax,
        padding: 10,
        fontColor: "#49db0f",
        fontSize: 22
      },
      type: 'linear',
      display: true,
      id: 'evp-axis',
    });
  }
  if(wdr_labels.length >0){
    yAxes.push({
      gridLines: gridLines,
      ticks: {
        suggestedMin: 0,
        suggestedMax: SugestedWDRMax,
        padding: 10,
        fontColor: "#ed5808",
        fontSize: 22
      },
      type: 'linear',
      display: true,
      id: 'wdr-axis',
    });
  }
  if(rad_labels.length >0){
    yAxes.push({
      gridLines: gridLines,
      ticks: {
        suggestedMin: 0,
        suggestedMax: SugestedRADMax,
        padding: 10,
        fontColor: "#0fbcdb",
        fontSize: 22
      },
      type: 'linear',
      display: true,
      id: 'rad-axis',
    });
  }
  if(prs_labels.length >0){
    yAxes.push({
      gridLines: gridLines,
      ticks: {
        suggestedMin: 0,
        suggestedMax: SugestedPRSMax,
        padding: 10,
        fontColor: "#e319ed",
        fontSize: 22
      },
      type: 'linear',
      display: true,
      id: 'prs-axis',
    });
  }
    myChart1 = new Chart(ctx, {
    type: 'line',
    data: lineChartData,
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'right',
        align: 'center',
        labels: {
          fontColor: 'rgb(153,157,159)',
          fontSize: 25,
        }
      },
      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        titleFontSize: 18,
        bodyFontColor: '#666',
        bodyFontSize: 22,
        bodySpacing: 8,
        xPadding: 20,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      hoverMode: 'index',
      stacked: true,
      title: {
        display: false,
        text: ''
      },
      scales: {
        yAxes: yAxes,
        xAxes: [{
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
              fontSize: 18
            }
        }]
      }
    }
  });


}
function drawBigMultiLineClimaChart2(chart_id, labels, values , label , sensor) {


  let chart_labels = [];
  let chart_data = [];

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


  $("[id*='-lb']").hide();

  if(prs_labels.length >0){
    chart_data = prs_values;
    chart_labels = prs_labels;
    $("[id*='-lb']").removeClass('active');
    $("#prs-lb").show();
    $("#prs-lb").addClass('active');
  }
  if(rad_labels.length >0){
    chart_data = rad_values;
    chart_labels = rad_labels;
    $("[id*='-lb']").removeClass('active');
    $("#rad-lb").show();
    $("#rad-lb").addClass('active');
  }
  if(wdr_labels.length >0){
    chart_data = wdr_values;
    chart_labels = wdr_labels;
    $("[id*='-lb']").removeClass('active');
    $("#wdr-lb").show();
    $("#wdr-lb").addClass('active');
  }
  if(evp_labels.length >0){
    chart_data = evp_values;
    chart_labels = evp_labels;
    $("[id*='-lb']").removeClass('active');
    $("#evp-lb").show();
    $("#evp-lb").addClass('active');
  }
  if(hum_labels.length >0){
    chart_data = hum_values;
    chart_labels = hum_labels;
    $("[id*='-lb']").removeClass('active');
    $("#hum-lb").show();
    $("#hum-lb").addClass('active');
  }
  if(wsp_labels.length >0){
    chart_data = wsp_values;
    chart_labels = wsp_labels;
    $("[id*='-lb']").removeClass('active');
    $("#wsp-lb").show();
    $("#wsp-lb").addClass('active');
  }
  if(tmp_labels.length >0){
    chart_data = tmp_values;
    chart_labels = tmp_labels;
    $("[id*='-lb']").removeClass('active');
    $("#tmp-lb").show();
    $("#tmp-lb").addClass('active');
  }








  let ctx = document.getElementById(chart_id).getContext("2d");

  let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
  gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
  gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

  let SugestedTMPMax = 0;
  values[0].map(el=>{
    if(el > SugestedTMPMax)
      SugestedTMPMax = el;
  })
  SugestedTMPMax ++ ;

  let SugestedWSPMax = 0;
  values[1].map(el=>{
    if(el > SugestedWSPMax)
      SugestedWSPMax = el;
  })
  SugestedWSPMax ++ ;

  let SugestedHUMMax = 0;
  values[2].map(el=>{
    if(el > SugestedHUMMax)
      SugestedHUMMax = el;
  })
  SugestedHUMMax ++ ;

  let SugestedEVPMax = 0;
  values[3].map(el=>{
    if(el > SugestedEVPMax)
      SugestedEVPMax = el;
  })
  SugestedEVPMax ++ ;

  let SugestedWDRMax = 0;
  values[4].map(el=>{
    if(el > SugestedWDRMax)
      SugestedWDRMax = el;
  })
  SugestedWDRMax ++ ;

  let SugestedRADMax = 0;
  values[5].map(el=>{
    if(el > SugestedRADMax)
      SugestedRADMax = el;
  })
  SugestedRADMax ++ ;

  let SugestedPRSMax = 0;
  values[6].map(el=>{
    if(el > SugestedPRSMax)
      SugestedPRSMax = el;
  })
  SugestedPRSMax ++ ;

  let config = {
    type: 'line',
    data: {
      labels: chart_labels,
      datasets: [{
        label: "My First dataset",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#d346b1',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#d346b1',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#d346b1',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: chart_data,
      }]
    },
    options:
        {
          maintainAspectRatio: false,
          legend: {
            display: false
          },

          tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 8,
            xPadding: 20,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
          },
          responsive: true,
          scales: {
            yAxes: [{

              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 80,

                padding: 10,
                fontColor: "#9e9e9e",
                fontSize: 22
              }
            }],

            xAxes: [{

              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e",
                fontSize: 18
              }
            }]
          }
        }
  };


  myChart2 = new Chart(ctx, config);


}
function clearChart(chart_id) {
  let ctx = document.getElementById(chart_id).getContext("2d");
  let gradientStroke = ctx.createLinearGradient(0, 0, 0, 0);
  let myChart = new Chart(ctx, {

  });


}