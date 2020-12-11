import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { WifiBeaconService } from '../../services/wifi-beacon.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { WifiBeaconLog } from '../../models/WifiBeaconLog';
// import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-wifi-beacon-report',
  templateUrl: './wifi-beacon-report.component.html',
  styleUrls: ['./wifi-beacon-report.component.scss']
})
export class WifiBeaconReportComponent implements OnInit {
  
  start = null;
  end = null;
  wifiBeaconLogs:WifiBeaconLog[];
  devices = [];

  chartOptions = {};
  // Highcharts = Highcharts;
  updateFlag = false;
  oneToOneFlag = false;

  constructor(
    public auth: AuthenticationService,
    private wifiBeaconService: WifiBeaconService, 
    private modalService: NgbModal, 
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getWifiBeaconLogs();
    this.initChart();    
  }

  getWifiBeaconLogs() :void {
    this.wifiBeaconService.getLogs(this.auth.getUserDetails().client.clientID, this.start, this.end).subscribe(
      (data) => {
        this.wifiBeaconLogs = data;
        this.devices = [];

        this.wifiBeaconLogs.forEach(log => {
          if (this.getDeviceIndex(log.sender_vendor) == -1) {           
            var count = this.getDeviceCount(log.sender_vendor);
            this.devices.push([ log.sender_vendor, count ]);
          }
        });

        this.initChart();
      },
      err => {
        console.error(err);
      }
    )
  }

  getDeviceIndex(device) {
    for (var i=0; i < this.devices.length; i++) {
      if (this.devices[i].name == device)
        return i;
    }

    return -1;
  }

  getDeviceCount(device) {
    var count = 0;

    for (var i=0; i < this.wifiBeaconLogs.length; i++) {
      var log = this.wifiBeaconLogs[i];

      if (log.sender_vendor == device)
        count++;
    }

    return count;
  }

  startDateChange(event){
    if (event.value) {
      var date = new Date(event.value);
      this.start = (date.getMonth() + 1)+"-"+date.getDate()+"-"+date.getFullYear();
    } else {
      this.start = null;
    }

    this.getWifiBeaconLogs();
  }

  endDateChange(event){
    if (event.value) {
      var date = new Date(event.value);
      this.end = (date.getMonth() + 1)+"-"+date.getDate()+"-"+date.getFullYear();      
    } else {
      this.end = null;
    }

    this.getWifiBeaconLogs();
  }

  initChart() {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true
      },
      title: {
          text: 'Devices'
      },
      xAxis: {
          type: 'category',
          labels: {
              rotation: 0,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Count'
          }
      },
      legend: {
          enabled: false
      },
      tooltip: {
          pointFormat: '<b>{point.y:.1f}</b>'
      },
      series: [{
          name: 'Devices',
          data: this.devices,
          dataLabels: {
              enabled: true,
              rotation: -90,
              color: '#FFFFFF',
              align: 'right',
              format: '{point.y:.1f}', // one decimal
              y: 10, // 10 pixels down from the top
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      }]
    }

    this.updateFlag = true;
  }
}