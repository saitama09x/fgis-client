
  //chart 1

  export var lineChartData: Array<any> = [

    { data: [20, 41, 26, 46, 30, 50, 52, 53, 41, 30, 40, 25], label: 'Inpatients' },
    { data: [4, 75, 37, 56, 61, 58, 83, 60, 66, 70, 55, 60], label: 'Outpatients' },
  
  ];
  export var lineChartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  export var lineChartOptions: any = {
    animation: {
      duration: 1000, // general animation time
      easing: 'easeOutBack'
    },
    hover: {
      animationDuration: 1000, // duration of animations when hovering an item
      mode: 'label'
    },
    responsiveAnimationDuration: 1000, // animation duration after a resize
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      labels: {
      fontColor: '#ddd',  
      boxWidth:20
      }
    },
    tooltips: {
      enabled:false,
			displayColors:false,
    },  
    scales: {
      xAxes: [{
      ticks: {
        beginAtZero:true,
        fontColor: '#ddd'
      },
      gridLines: {
        display: true ,
        color: "rgba(255, 255, 255, 0.08)"
      },
      }],
       yAxes: [{
      ticks: {
        beginAtZero:true,
        fontColor: '#ddd'
      },
      gridLines: {
        display: true ,
        color: "rgba(255, 255, 255, 0.08)"
      },
      }]
     }
  };
  export var lineChartColors: Array<any> = [
  
    {
      backgroundColor: '#fff',
      borderColor: 'transparent',
      pointRadius :"0",
      pointHoverRadius:"0",
      borderWidth: 5
    },
    {
  
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderColor: 'transparent',
      pointRadius :"0",
      pointHoverRadius:"0",
      borderWidth: 5
    },
  
  ];
  export var lineChartLegend = true;
  export var lineChartType = 'line';
