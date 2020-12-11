import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private http: HttpClient, private router: Router) { }

  getTrackings() : Observable<any[]> {
    return this.http.get<any[]>('/tracking/getTrackings');
  }

  getClientTrackingCameras(clientID) : Observable<any[]> {
    return this.http.get<any[]>('/tracking/getClientTrackingCameras/'+clientID);
  }

  getClientTrackingSingle(trackingID) : Promise<any> {
    return new Promise((resolve, reject) => {
        this.http.get<any>('/tracking/getClientTrackingSingle/'+trackingID)
        .subscribe((data) => {
            if(data){
                resolve(data.result)
            }else{
                resolve(false);
            }
        });
    });
  }

  getClientLiveTrackingCameras(clientID) : Observable<any[]> {
    return this.http.get<any[]>('/tracking/getClientLiveTrackingCameras/'+clientID);
  }

  getClientTrackingCameraIDs(clientID) : Observable<any[]> {
    return this.http.get<any[]>('/tracking/getClientTrackingCameraIDs/'+clientID);
  }

  delete(trackingID): Observable<any> { 
    return this.http.delete<any>('/tracking/delete/'+ trackingID);
  }

  getClientTrackingReport(clientID, startDate, endDate, deviceUuid = null) : Observable<any[]> {
    var query = '?startDate='+startDate+'&endDate='+endDate;

    if (deviceUuid != null)
      query += '&deviceUuid='+deviceUuid;

    return this.http.get<any[]>('/tracking/getClientTrackingReport/'+clientID+query);
  }

  getClientTrackingFaceList(clientID, startDate, endDate, pageSize = 10, pageIndex = 0, deviceUuid = null) : Observable<any[]> {
    var query = '?startDate='+startDate+'&endDate='+endDate+'&pageSize='+pageSize+'&pageIndex='+pageIndex;

    if (deviceUuid != null)
      query += '&deviceUuid='+deviceUuid;

    return this.http.get<any[]>('/tracking/getClientTrackingFaceList/'+clientID+query);
  }

  getClientLiveTrackingReport(clientID, startDate, endDate, deviceUuid = null) : Observable<any[]> {
    var query = '?startDate='+startDate+'&endDate='+endDate;

    if (deviceUuid != null)
      query += '&deviceUuid='+deviceUuid;

    return this.http.get<any[]>('/tracking/getClientLiveTrackingReport/'+clientID+query);
  }

  updateTracking(tracking_id, form_data) : Promise<any>{
      return new Promise((resolve, reject) => {
          this.http.put<any[]>('/tracking/updateTracking/' + tracking_id, form_data)
          .subscribe((res) => {
                resolve(res)
          });
      })      
  }  

  getMemoryChart(id : string) : ChartOptions{
      return {
        series: [0],
        chart: {
          id : id,
          height: 280,
          type: "radialBar",
          background : '#fff'
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
                  color: "#000",
                  fontSize: "13px"
                },
                value: {
                  color: "#000",
                  fontSize: "20px",
                  show: true,
                  formatter : function(val){
                      return val + "%"
                  }
                }
              },
              track : {
                  strokeWidth: '95%',
                  opacity: 0.5,
                  background: '#cacaca',
              }
            }
          },
          fill: {
            colors : ['#000']
          },
          stroke: {
            dashArray : 4
          },
          labels: ["Progress"],
      };

  }

  getStorageChart() : ChartOptions{
      return {
        series: [0],
        chart: {
          id : 'storage',
          height: 280,
          type: "radialBar",
          background : '#fff'
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
                  color: "#000",
                  fontSize: "13px"
                },
                value: {
                  color: "#000",
                  fontSize: "20px",
                  show: true,
                  formatter : function(val){
                      return val + "%"
                  }
                }
              },
              track : {
                  strokeWidth: '95%',
                  opacity: 0.5,
                  background: '#cacaca',
              }
            }
          },
          fill: {
            colors : ['#000']
          },
          stroke: {
            dashArray : 4
          },
          labels: ["Progress"],
      };

  }

  getTempChart() : ChartOptions{
      return {
        series: [0],
        chart: {
          id : 'temperature',
          height: 280,
          type: "radialBar",
          background : '#fff'
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
                  color: "#000",
                  fontSize: "13px"
                },
                value: {
                  color: "#000",
                  fontSize: "20px",
                  show: true,
                  formatter : function(val){
                      return val + "%"
                  }
                }
              },
              track : {
                  strokeWidth: '95%',
                  background: '#cacaca',
                  opacity: 0.5,
              }
            }
          },
          fill: {
            colors : ['#000']
          },
          stroke: {
            dashArray : 4,
          },
          labels: ["Progress"],
      };

  }

}
