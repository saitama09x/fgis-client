import { Injectable, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexStroke,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexLegend,
  ApexDataLabels
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries,
  chart: ApexChart,
  plotOptions : ApexPlotOptions,
  stroke : ApexStroke,
  labels : string[],
  fill?: ApexFill;
};

export type ChartTotal = {

  series: ApexAxisChartSeries | ApexNonAxisChartSeries,
  chart: ApexChart,
  plotOptions : ApexPlotOptions,
  stroke : ApexStroke,
  labels : string[]
  fill : any
}

export type barlineOpt = {

  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any;
  dataLabels: ApexDataLabels;
  fill?: ApexFill;
  tooltip?: ApexTooltip,
  legend : any
  markers?: any
  colors?:any
}

export type polarOpt = {

  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  stroke: any;
  fill: ApexFill;
  labels: string[];
  dataLabels: ApexDataLabels;
  legend : any,
  yaxis?: any
}

export type barOpt = {

  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  plotOptions?: ApexPlotOptions,
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[]
  grid : any
  stroke : any
  fill : ApexFill
  markers : any,
  legend : any,
  colors?: any
}

export type barHorizontalOpt = {

  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
  legend?: ApexLegend;
  dataLabels?: ApexDataLabels;
  yaxis?: ApexYAxis | ApexYAxis[];
  tooltip?: ApexTooltip;
  fill?: any
}

export type pieChartOpt = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  legend : any,
  fill : any
}


@Injectable({
  providedIn: 'root'
})
export class LiveTrackingService {
 

  constructor(private http: HttpClient, private router: Router) { }

  getLiveTrackings() : Observable<any[]> {
    return this.http.get<any[]>('/liveTrackings/getLiveTrackings');
  }

  delete(trackingID): Observable<any> { 
    return this.http.delete<any>('/liveTrackings/delete/'+ trackingID);
  }

  getLiveTrackingUpdates(){

    var is_updating = false;
    var $this = this

    return function(deviceId : string, callback : any){

       if(is_updating==false){
           is_updating = true;
           $this.http.get<any>('/liveTrackings/get-tracking-update/' + deviceId).subscribe((res) => {
            is_updating = false;
            callback(res)
          });  
       }
       
    }
  }

  getTrackingReport(deviceId : string, date : string) : Promise<any>{

  	return new Promise((resolve, reject) => {
  		this.http.post<any[]>('/liveTrackings/get-tracking-analytics/', 
        { deviceId : deviceId, date : date }).subscribe((res) => {
  			resolve(res)
  		});		
  	})

  }

  getUpperColor() : pieChartOpt{

    return {
       series : [0, 0, 0, 0, 0, 0, 0],
       chart: {
        id : 'upperColor',
        width: 330,
        type: "pie",
      },
      fill : {
          colors : ['#000', '#fff', '#808080', '#ff0000', '#ffff00', '#0000ff', '#008000', '#800080'],
          opacity : 0.7
      },
      legend : {
         position : 'left',
         fontSize: '17px',
         labels : {
              colors : '#fff'
          },
          markers : {
            fillColors : ['#000', '#fff', '#808080', '#ff0000', '#ffff00', '#0000ff', '#008000', '#800080']
          }
      },
      labels : ["Black", "White", "Gray", "Red", "Yellow", "Blue", "Green", "Purple"]
    }

  }

  getLowerColor() : pieChartOpt{

    return {
       series : [0, 0, 0, 0, 0, 0, 0],
       chart: {
        id : 'lowerColor',
        width: 330,
        type: "pie"
      },
      fill : {
          colors : ['#000', '#fff', '#808080', '#ff0000', '#ffff00', '#0000ff', '#008000', '#800080'],
          opacity : 0.7
      },
      legend : {
         position : 'left',
         fontSize: '17px',
         labels : {
              colors : '#fff'
          },
          markers : {
            fillColors : ['#000', '#fff', '#808080', '#ff0000', '#ffff00', '#0000ff', '#008000', '#800080']
          }
      },
      labels : ["Black", "White", "Gray", "Red", "Yellow", "Blue", "Green", "Purple"]
    }

  }

  getAgeChart() : polarOpt{

    return { 
      series: [0, 0, 0, 0, 0, 0, 0],
      labels : ["10 & below", "11-20", "21-30", "31-40", "41-50", "50-60", "60 & above"],
      chart: {
        id : 'ages',
        height: 350,
        toolbar : {
          show : false
        },
        type: 'polarArea',
        foreColor : '#fff',
      },
      stroke: {
        colors: ['#b6c1de', '#495fff', '#ff55ea', '#45e5ff', '#6fd05d', '#a6fb00', '#d86d55']
      },
      fill: {
        colors : ['#b6c1de', '#495fff', '#ff55ea', '#45e5ff', '#6fd05d', '#a6fb00', '#d86d55'],
        opacity: 0.8
      },
      dataLabels : {
         style : {
             colors : ['#fff']
         }
      },
      legend : {
         position : 'bottom',
         fontSize: '17px',
         labels : {
              colors : '#fff'
          },
          markers : {
            fillColors : ['#b6c1de', '#495fff', '#ff55ea', '#45e5ff', '#6fd05d', '#a6fb00', '#d86d55']
          }
      },
      yaxis : {
        show: false,
      }
    }

  }


  getMaskSettings() : ChartOptions{
  		return {
        series: [0],
        chart: {
          id : "mask",
          height: 330,
          type: "radialBar"
        },
        plotOptions: {
            radialBar: {
              
              hollow: {
                size: "50%"
              },
             
              dataLabels: {
                name: {
                  offsetY: -10,
                  show: false,
                  color: "#fff",
                  fontSize: "13px"
                },
                value: {
                  color: "#fff",
                  fontSize: "30px",
                  show: true
                }
              },
              track : {
                  strokeWidth: '95%',
                  opacity: 0.5,
              }
            }
          },
          fill: {
            colors : ['#fff']
          },
          stroke: {
            dashArray : 4
          },
          labels: ["Progress"],
      };

  }

  getBeardSettings() : ChartOptions{

  	return {
        series: [0],
        chart: {
          id : "beard",
          height: 330,
          type: "radialBar"
        },
        plotOptions: {
            radialBar: {
              
              hollow: {
                size: "50%"
              },
             
              dataLabels: {
                name: {
                  offsetY: -10,
                  show: false,
                  color: "#fff",
                  fontSize: "13px"
                },
                value: {
                  color: "#fff",
                  fontSize: "30px",
                  show: true
                }
              },
              track : {
                  strokeWidth: '95%',
                  opacity: 0.5,
              }
            }
          },
          fill: {
            colors : ['#fff']
          },
          stroke: {
            dashArray : 4
          },
          labels: ["Progress"],
      };
  }

  getSmileSettings() : ChartOptions{

    return {
        series: [0],
        chart: {
          id : "smile",
          height: 330,
          type: "radialBar"
        },
        plotOptions: {
            radialBar: {

              hollow: {
                size: "50%"
              },
             
              dataLabels: {
                name: {
                  offsetY: -10,
                  show: false,
                  color: "#fff",
                  fontSize: "13px"
                },
                value: {
                  color: "#fff",
                  fontSize: "30px",
                  show: true
                }
              },
              track : {
                  strokeWidth: '95%',
                  opacity: 0.5,
              }
            }
          },
          fill: {
            colors : ['#fff']
          },
          stroke: {
            dashArray : 4
          },
          labels: ["Progress"],
      };


  }


  getGenderSettings() : ChartTotal{

  	return {
        series: [0, 0],
        labels: ['Male', 'Female'],
        chart: {
          id : "gender",
          height: 330,
          type: "radialBar"
        },
        fill : {
          colors : ['#495fff', '#ff55ea']
        },
        plotOptions: {
            radialBar: {
              hollow: {
                margin: 15,
                size: "50%"
              },
             
              dataLabels: {
                name: {
                  offsetY: -10,
                  show: true,
                  color: "#fff",
                  fontSize: "13px"
                },
                value: {
                  color: "#fff",
                },
                total : {
                  show : true,
                  color : '#fff',
                  label : 'Total',
                  fontSize: '16px',
                  formatter: function (w) {
                    return w.globals.seriesTotals[0] + '%'
                  }
                },
              }
            }
          },
          stroke: {
            lineCap: "round",
          },
      };

  }

  getGenderAudienceChart() : barlineOpt{

  	return  {
        series: [
          {
            name: "Audience",
            type: "column",
            data: [0]
          },
          {
            name: "Male",
            type: "line",
            data: [0]
          },
          {
            name: "Female",
            type: "line",
            data: [0]
          }
        ],
        colors : ['#b6c1de', '#495fff', '#ff55ea'],
        chart: {
          id : "genderAud",
          height: 350,
          type: "line",
          foreColor : '#000',
          dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 3,
              color: '#000',
              opacity: 0.35
          },
          toolbar : {
              show : false
          }
        },
        stroke: {
          width: [0, 4, 4],
          curve : ['straight', 'smooth', 'smooth'],
          colors: ['#b6c1de', '#495fff', '#ff55ea']
        },
        title: {
          text: "Traffic Sources"
        },
        markers : {
          colors : ['#b6c1de', '#495fff', '#ff55ea']
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
          style : {
            colors : ['#000']
          } 
        },
        labels: [""],
        fill : {
          colors : ['#b6c1de', '#495fff', '#ff55ea']
        },
        legend : {
           labels : {
                colors : '#fff'
            },
            markers : {
              fillColors : ['#b6c1de', '#495fff', '#ff55ea']
            }
        },
        xaxis: {
          type: "category",
          labels : {
             style : {
                 colors : '#fff'
             }
          }
        },
        yaxis: [
          {
            labels : {
              style : {
                  colors : '#fff'
              }
            },
            title: {
              text: "Audience Group",
              style : {
                color : '#FFF',
                fontSize: '17px',
                fontWeight: 300,
              }
            }
          },
        ],
        tooltip : {
          enabled: true,
        	y : {
        		formatter : function(value){
        			return '<span style="color:#000">' + value + '</span>'
        		}
        	}
        }
      };

  }


  getExpressionChart() : barOpt{

  	return {
        series: [
          {
            name: "Calm",
            data: []
          },
          {
            name: "Happy",
            data: []
          },
          {
            name: "Others",
            data: []
          },
        ],
        chart: {
          id : "expression",
          height: 350,
          type: "bar",
          foreColor: 'rgba(255, 255, 255, 0.85)',
        },
        colors : ['#e8eef5', '#b6c1de', '#89a0c7'],
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'rounded'
          },
        },
        title: {
          text: "Expression Group",
          style : {
            color : '#FFF',
            fontSize: '17px',
            fontWeight: 300,
          }
        },
        markers : {
          colors : ['#e8eef5', '#b6c1de', '#89a0c7']
        },
        legend : {
            markers : {
              fillColors : ['#e8eef5', '#b6c1de', '#89a0c7']
            }
        },
        labels : [],
        grid: {
          show: true,
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
        fill : {
          colors : ['#e8eef5', '#b6c1de', '#89a0c7']
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          type : 'category',
          labels : {
             style : {
                 colors : '#fff'
             }
          }
        },
        yaxis: {
            labels : {
              style : {
                  colors : '#fff'
              }
           },
            
        },
      }

  }

  upperTypeGroup() : barHorizontalOpt{

  	return {
  		 series: [
	        {
            name : 'Total',
	          data: [0]
	        }
	      ],
	      chart: {
          id: 'upperType',
	        type: "bar",
	        height: 380
	      },
        fill : {
          colors : ['#525e62', '#525e62', '#525e62', '#525e62', '#525e62', '#525e62', '#525e62', '#525e62']
        },
        legend : {
          show : false
        },
	      plotOptions: {
	        bar: {
	          horizontal: true,
            distributed: true,
            barHeight : '100%',
            dataLabels: {
              position: "bottom"
            },
            endingShape : 'rounded'
	        }
	      },
        yaxis : {
           labels : {
             show: false,
             style : {
                 colors : '#fff'
             }
           }
        },
	      stroke: {
	        width: 1,
          curve : 'smooth',
          lineCap : 'butt',
	        colors: ["#fff"],
          show: true,
	      },
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"]
          },
          formatter: function(val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
	      xaxis: {
           labels : {
             style : {
                 colors : '#fff'
             }
          },
	        categories: [
            "longcoat",
            "jacket",
            "shirt",
            "tshirt",
            "sports",
            "downcoat",
            "dress",
            "business",
          ]
	      },
	      title: {
	        text: "Upper Type Group",
	        align: "center",
	        floating: true,
          style : {
            color : '#fff'
          }
	      },
        tooltip : {
          theme: "dark",
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function() {
                return "";
              }
            }
          },
          marker : {
            show : false
          }
        }
    	};

  }

  upperClothGroup() : barHorizontalOpt{

    return {
       series: [
          {
            name : 'Total',
            data: [0]
          }
        ],
        chart: {
          id: 'upperCloth',
          type: "bar",
          height: 380
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            barHeight : '50%',
            dataLabels: {
              position: "bottom"
            },
            endingShape : 'rounded'
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"]
          },
          formatter: function(val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        yaxis : {
           labels : {
             show : false,
             style : {
                 colors : '#fff'
             }
           }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          labels : {
             style : {
                 colors : '#fff'
             }
          },
          categories: [
            "ShortSleeve",
            "LongSleeve"
          ]
        },
        title: {
          text: "Upper Clothing Group",
          align: "center",
          floating: true,
           style : {
            color : '#fff'
          }
        },
        tooltip : {
          theme: "dark",
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function() {
                return "";
              }
            }
          },
           marker : {
            show : false
          }
        }
      };

  }

  lowerClothGroup() : barHorizontalOpt{

    return {
       series: [
          {
            name : 'Total',
            data: [0]
          }
        ],
        chart: {
          id: 'lowerCloth',
          type: "bar",
          height: 380
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            barHeight : '70%',
            dataLabels: {
              position: "bottom"
            },
            endingShape : 'rounded'
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        yaxis : {
           labels : {
             style : {
                 colors : '#fff'
             }
           }
        },
        xaxis: {
          labels : {
             style : {
                 colors : '#fff'
             }
          },
          categories: [
            "Trousers",
            "Shorts",
            "Skirt"
          ]
        },
        title: {
          text: "Lower Clothing Group",
          align: "center",
          floating: true,
           style : {
            color : '#fff'
          }
        },
      };

  }

  upperModeGroup() : barHorizontalOpt{

    return {
       series: [
          {
            name : 'Total',
            data: [0]
          }
        ],
        chart: {
          id: 'upperMode',
          type: "bar",
          height: 380
        },
        plotOptions: {
           bar: {
            horizontal: true,
            distributed: true,
            barHeight : '100%',
            dataLabels: {
              position: "bottom"
            },
            endingShape : 'rounded'
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          labels : {
             style : {
                 colors : '#fff'
             }
          },
          categories: [
            "Pure",
            "Stripe",
            "Design",
            "Joint",
            "Lattice",
          ]
        },
        title: {
          text: "Upper Mode Group",
          align: "center",
          floating: true,
          style : {
            color : '#fff'
          }
        },
      };

  }

  lowerModeGroup() : barHorizontalOpt{

    return {
       series: [
          {
            name : 'Total',
            data: [0]
          }
        ],
        chart: {
          id: 'lowerMode',
          type: "bar",
          height: 380
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            barHeight : '100%',
            dataLabels: {
              position: "bottom"
            },
            endingShape : 'rounded'
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          labels : {
             style : {
                 colors : '#fff'
             }
          },
          categories: [
            "Pure",
            "Stripe",
            "Design",
            "Joint",
            "Lattice",
          ]
        },
        title: {
          text: "Lower Mode Group",
          align: "center",
          floating: true,
          style : {
            color : '#fff'
          }
        },
      };

  }

  getGlassSettingChart() : ChartOptions{

  	return {
        series: [0],
        chart: {
          id : 'glass',
          height: 350,
          type: "radialBar"
        },
        plotOptions: {
            radialBar: {
              startAngle : -135,
              endAngle : 135,  
              hollow: {
                margin: 15,
                size: "50%"
              },
              dataLabels: {
                name: {
                  offsetY: -10,
                  show: false,
                  color: "#fff",
                  fontSize: "13px"
                },
                value: {
                  color: "#fff",
                  fontSize: "30px",
                  show: true
                }
              },
              track : {
                  strokeWidth: '50%',
                  opacity: 0.5,
                  margin: 10,
              }
            }
          },
          fill: {
            colors : ['#fff']
          },
          stroke: {
            show: true,
            curve : 'smooth',
            lineCap : 'round',
            dashArray : 0,
            width : 2
          },
          labels: ["Progress"],
      };

  }

}
