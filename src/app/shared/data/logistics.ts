
// Doughnut -chart 1
export var doughnutChartLabels: string[] = ["Within Time Limit", "Out of Time Limit"];
export var doughnutChartData: number[] = [325, 145];
export var doughnutChartColors: any[] = [{ backgroundColor: [ "#ffffff", "rgba(255, 255, 255, 0.30)" ]
,borderWidth: [0, 0,]}];
export var doughnutChartType = 'doughnut';
export var doughnutChartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  //cutoutPercentage: 80,
  legend: {
    position :"bottom",	
    display: false,
       labels: {
         fontColor: '#ddd',  
         boxWidth:15
      }
   }
   ,
   tooltips: {
     displayColors:false
   }
   
};


// Pie -Chart 2
export var pieChartLabels: string[] = ["Germany", "France", "Switzerland", "Australia"];
export var pieChartData: number[] = [55, 220, 40, 40];
export var pieChartType = 'pie';
export var pieChartColors: any[] = [{ backgroundColor: ["rgba(255, 255, 255, 0.35)", "#ffffff", "rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.71)"], borderWidth: [0, 0, 0, 0] }];
export var pieChartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position :"bottom",	
    display: true,
       labels: {
         fontColor: '#ddd',  
         boxWidth:10
      }
   }
  
};


//line -chart 3

export var lineChartData: Array<any> = [

    { data: [10, 18, 12, 8, 15, 10], label: 'Total Revenue' },
  
  ];
  export var lineChartLabels: Array<any> = ['01', '02', '03', '04', '05', '06'];
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
        display: false,
        labels: {
        fontColor: '#ddd',  
        boxWidth:40
        },
        tooltips: {
            enabled: false
       },
      },
    scales: {
      xAxes: [{
            display: false,
            gridLines: false
          }],
      yAxes: [{
            display: false,
            gridLines: false
          }]
    },
  };
  export var lineChartColors: Array<any> = [
  
    {
  
      fill: true,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderColor: '#fff',
            pointBackgroundColor:'#fff',
            pointHoverBackgroundColor:'#fff',
            pointBorderColor :'#fff',
            pointHoverBorderColor :'#fff',
            pointBorderWidth :1,
            pointRadius :0,
            pointHoverRadius :4,
            borderWidth: 2
    },
   
  
  ];
  export var lineChartLegend = true;
  export var lineChartType = 'line';



  //line -chart 4

export var lineChart2Data: Array<any> = [

    { data: [10, 18, 12, 8, 15, 10], label: 'Total Revenue' },
  
  ];
  export var lineChart2Labels: Array<any> = ['01', '02', '03', '04', '05', '06'];
  export var lineChart2Options: any = {
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
        display: false,
        labels: {
        fontColor: '#ddd',  
        boxWidth:40
        },
        tooltips: {
            enabled: false
       },
      },
    scales: {
      xAxes: [{
            display: false,
            gridLines: false
          }],
      yAxes: [{
            display: false,
            gridLines: false
          }]
    },
  };
  export var lineChart2Colors: Array<any> = [
  
    {
  
      fill: true,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderColor: '#fff',
            pointBackgroundColor:'#fff',
            pointHoverBackgroundColor:'#fff',
            pointBorderColor :'#fff',
            pointHoverBorderColor :'#fff',
            pointBorderWidth :1,
            pointRadius :0,
            pointHoverRadius :4,
            borderWidth: 2
    },
   
  
  ];
  export var lineChart2Legend = true;
  export var lineChart2Type = 'line';





  //line -chart 5

  export var lineChart3Data: Array<any> = [

    { data: [10, 18, 12, 8, 15, 10], label: 'Total Revenue' },
  
  ];
  export var lineChart3Labels: Array<any> = ['01', '02', '03', '04', '05', '06'];
  export var lineChart3Options: any = {
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
        display: false,
        labels: {
        fontColor: '#ddd',  
        boxWidth:40
        },
        tooltips: {
            enabled: false
       },
      },
    scales: {
      xAxes: [{
            display: false,
            gridLines: false
          }],
      yAxes: [{
            display: false,
            gridLines: false
          }]
    },
  };
  export var lineChart3Colors: Array<any> = [
  
    {
  
      fill: true,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderColor: '#fff',
        pointBackgroundColor:'#fff',
        pointHoverBackgroundColor:'#fff',
        pointBorderColor :'#fff',
        pointHoverBorderColor :'#fff',
        pointBorderWidth :1,
        pointRadius :0,
        pointHoverRadius :4,
        borderWidth: 2
    },
   
  
  ];
  export var lineChart3Legend = true;
  export var lineChart3Type = 'line';
  

  
// bar -Chart 6
export var barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        display: true,
        labels: {
          fontColor: '#ddd',  
          boxWidth:40
        }
      },
      tooltips: {
        enabled:false
      },
    scales: {
      xAxes: [{
        
    ticks: {
        beginAtZero:true,
        fontColor: '#ddd'
    },
    gridLines: {
      display: true ,
      color: "rgba(221, 221, 221, 0.08)"
    },
  }],
      
      yAxes: [{
        ticks: {
            beginAtZero:true,
            fontColor: '#ddd'
        },
        gridLines: {
          display: true ,
          color: "rgba(221, 221, 221, 0.08)"
        },
      }]
       
    }
  
  };
  export var barChartLabels: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  export var barChartType = 'bar';
  export var barChartLegend = true;
  
  export var barChartData: any[] = [
    { categoryPercentage: 0.3, data: [15, 8, 12, 5, 12, 8, 16, 25, 15, 10, 20, 10], label: 'Route' },
    { categoryPercentage: 0.3, data: [25, 18, 22, 15, 22, 18, 26, 35, 25, 20, 30, 20], label: 'Time' }
  ];
  
  export var barChartColors: Array<any> = [
    
    {
  
      backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
    {
  
      backgroundColor: "#fff",
    },
  ];
  