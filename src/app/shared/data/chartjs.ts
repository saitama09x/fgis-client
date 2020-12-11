//line chart

export var lineChartData: Array<any> = [

  { data: [13, 20, 4, 18, 7, 4, 8], label: 'Google' },
  { data: [3, 30, 6, 6, 3, 4, 11], label: 'Facebook' },

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
    boxWidth:40
    },
  },
  scales: {
    xAxes: [{
      
      ticks: {
        beginAtZero:true,
        fontColor: '#ddd',
        padding: 10
      },
      display: true,
      gridLines: {
        color: "rgba(221, 221, 221, 0.08)",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'week'
      }
    }],
    yAxes: [{
      
      ticks: {
        beginAtZero:true,
        fontColor: '#ddd',
        padding: 10
      },
      display: true,
      gridLines: {
        color: "rgba(221, 221, 221, 0.08)",
        drawTicks: false,
      },
      scaleLabel: {
        display: false,
        labelString: 'Value'
      }
    }]
  },
};
export var lineChartColors: Array<any> = [

  {

    fill: true,
    backgroundColor: "rgb(255, 255, 255)",
    borderColor: "transparent",
    pointRadius :"0",
    borderWidth: 1
  },
  {

    fill: true,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderColor: "transparent",
    pointRadius :"0",
    borderWidth: 1
  },

];
export var lineChartLegend = true;
export var lineChartType = 'line';


// barChart
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
export var barChartLabels: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
export var barChartType = 'bar';
export var barChartLegend = true;

export var barChartData: any[] = [
  { barPercentage: .5, data: [13, 20, 4, 18, 29, 25, 8], label: 'Google' },
  { barPercentage: .5, data: [31, 30, 6, 6, 21, 4, 11], label: 'Facebook' }
];

export var barChartColors: Array<any> = [
  
  {

    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  {

    backgroundColor: "rgb(255, 255, 255)",
  },
];

// Polor
export var polorChartLabels: string[] = ["Lable1", "Lable2", "Lable3", "Lable4"];
export var polorChartData: number[] = [13, 20, 11, 18];
export var polorChartType = 'polarArea';
export var polorChartColors: any[] = [{ backgroundColor: ["rgba(255, 255, 255, 0.35)", "#ffffff", "rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0.71)"], borderWidth: [0, 0, 0, 0] }];
export var polorChartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position :"right",	
    display: true,
       labels: {
       fontColor: '#ddd',  
       boxWidth:15
      }
   },
   scale: {
    gridLines: {
       color: "rgba(221, 221, 221, 0.12)" 
     }, 
  }

};


// Pie
export var pieChartLabels: string[] = ["Lable1", "Lable2", "Lable3", "Lable4"];
export var pieChartData: number[] = [13, 120, 11, 20];
export var pieChartType = 'pie';
export var pieChartColors: any[] = [{ backgroundColor: ["rgba(255, 255, 255, 0.35)", "#ffffff", "rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0.71)"], borderWidth: [0, 0, 0, 0] }];
export var pieChartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position :"right",	
    display: true,
       labels: {
       fontColor: '#ddd',  
       boxWidth:15
      }
   }

};


// Doughnut
export var doughnutChartLabels: string[] = ["Lable1", "Lable2", "Lable3", "Lable4"];
export var doughnutChartData: number[] = [13, 120, 11, 20];
export var doughnutChartColors: any[] = [{ backgroundColor: ["rgba(255, 255, 255, 0.35)", "#ffffff", "rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0.71)"] ,
                                            borderWidth: [0, 0, 0, 0]}];
export var doughnutChartType = 'doughnut';
export var doughnutChartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position :"right",	
    display: true,
       labels: {
       fontColor: '#ddd',  
       boxWidth:15
      }
   },
   
};
