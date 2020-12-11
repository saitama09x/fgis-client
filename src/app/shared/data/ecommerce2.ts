
  //chart 5

  export var lineChartData: Array<any> = [

    { data: [33, 43, 43, 63, 53, 76, 63], label: 'Visits' },
    { data: [43, 59, 67, 91, 83, 106, 93], label: 'Sales' },
  
  ];
  export var lineChartLabels: Array<any> = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
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
          color: "rgba(225, 225, 225, 0.08)"
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
    },
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


  // Chart 8
  export var doughnutChartLabels: string[] = ["Google Chrome", "Opera", "Firefox"];
  export var doughnutChartData: number[] = [5856, 2602, 1802];
  export var doughnutChartColors: any[] = [{ backgroundColor: [ "#ffffff", "rgba(255, 255, 255, 0.50)", "rgba(255, 255, 255, 0.25)" ]
  ,borderWidth: [0, 0, 0]}];
  export var doughnutChartType = 'doughnut';
  export var doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 60,
    legend: {
      position :"bottom",	
      display: false,
        labels: {
        fontColor: '#ddd',  
        boxWidth:15
        },
      },
    tooltips: {
      displayColors:false
    }
    
  };