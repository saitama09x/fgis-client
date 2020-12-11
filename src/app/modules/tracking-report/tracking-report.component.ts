import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, Renderer2  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { TrackingService } from '../../services/tracking.service';
import { BaseChartDirective } from 'ng2-charts';
import * as _moment from 'moment';
import 'moment-duration-format';
import Swal from 'sweetalert2'
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

const moment =  _moment;

@Component({
  selector: 'app-tracking-report',
  templateUrl: './tracking-report.component.html',
  styleUrls: ['./tracking-report.component.scss']
})
export class TrackingReportComponent implements OnInit, AfterViewInit  {

  clientID;
  cameras = [];

  deviceUuid;
  startDate;
  endDate;
  faceDataTotalCount = 0;
  faceDataTotal = 0;
  pageIndex = 0;
  pageSize = 0;
  pageOptions = [10, 20, 30, 50];

  tooltip_mask = []
  tooltip_glass = []
  tooltip_beard = []

  initStartDate = moment().subtract(1, 'months');
  initEndDate = moment();

  dateRangeForm = new FormGroup({
    startDateForm: new FormControl(this.initStartDate),
    endDateForm: new FormControl(this.initEndDate)
  });

  uniqueFacesStats;
  uniqueFacesCount;
  visitorsCount;
  uniqueFacesByCameraStats;
  uniqueFacesByCameraCount;
  visitorsStayStats;
  viewersViewStats;
  totalDuration;
  averageTotalDuration;
  totalViewDuration;
  averageViewDuration;
  totalCount = 0;
  viewCount = 0;
  viewPercent = 0;
  faceDatas = [];
  totalStats;
  viewStats;
  passersByStats;
  maleStats;
  femaleStats;
  malePercent = 0;
  femalePercent = 0;
  maleCount = 0;
  femaleCount = 0;
  withMaskCount = 0;
  noMaskCount = 0;
  withMaskPercent = 0;
  noMaskPercent = 0;
  happyStats;
  calmStats;
  otherExpStats;
  happyCount = 0;
  calmCount = 0;
  otherExpCount = 0;
  happyPercent = 0;
  calmPercent = 0;
  otherExpPercent = 0;
  oneToNinePercent = 0;
  tenToNineTeenPercent = 0;
  twentyToTwentyNinePercent = 0;
  thirtyToThirtyNinePercent = 0;
  fortyToFortyNinePercent = 0;
  fiftyToFiftyNinePercent = 0;
  sixtyAndAbovePercent = 0;
  
  // Traffic Line Chart
  trafficLineChartData: Array<any> = [{ data: [1], label: 'Total' },{ data: [1], label: 'View' }];  
  trafficLineChartLabels: Array<any> = [1];
  trafficLineChartOptions: any = {};
  trafficLineChartColors: Array<any> = [  
    {
      fill: true,
      backgroundColor: '#fff',
      borderColor: "transparent",
      pointRadius: 2,
      borderWidth: 3
    },
    {
      fill: true,
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      borderColor: "transparent",
      pointRadius: 2,
      borderWidth: 1
    },
  ];

  // Visitors Line Chart
  visitorsLineChartData: Array<any> = [{ data: [1], label: 'Traffic' },{ data: [1], label: 'Unique Faces' }];  
  visitorsLineChartLabels: Array<any> = [1];
  visitorsLineChartOptions: any = {};
  visitorsLineChartColors: Array<any> = [  
    {
      fill: false,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderColor: "rgba(255, 255, 255, 0.25)",
      pointRadius: 2,
      borderWidth: 2
    },
    {
      fill: false,
      backgroundColor: "#fff",
      borderColor: "#fff",
      pointRadius: 2,
      borderWidth: 2
    },
  ];

  // Visitors By Camera Line Chart
  visitorsByCameraLineChartData: Array<any> = [{ data: [1], label: 'Unique Faces' }];  
  visitorsByCameraLineChartLabels: Array<any> = [1];
  visitorsByCameraLineChartOptions: any = {};
  visitorsByCameraLineChartColors: Array<any> = [];

  // Stay & View Duration Line Chart
  stayViewDurationLineChartData: Array<any> = [{ data: [1], label: 'Stay Duration' },{ data: [1], label: 'View Duration' }];  
  stayViewDurationLineChartLabels: Array<any> = [1];
  stayViewDurationLineChartOptions: any = {};
  stayViewDurationLineChartColors: Array<any> = [  
    {
      fill: false,
      backgroundColor: '#f50014',
      borderColor: "#f50014",
      pointRadius: 2,
      borderWidth: 2
    },
    {
      fill: false,
      backgroundColor: "#f5f500",
      borderColor: "#f5f500",
      pointRadius: 2,
      borderWidth: 2
    },
  ];

  // Gender Line Chart
  genderLineChartData: Array<any> = [{ data: [1], label: 'Male' },{ data: [1], label: 'Female' }];  
  genderLineChartLabels: Array<any> = [1];
  genderLineChartOptions: any = {};
  genderLineChartColors: Array<any> = [  
    {
      fill: false,
      borderColor: "#0000FF",
      pointRadius: 2,
      borderWidth: 2
    },
    {
      fill: false,
      borderColor: "#FF00FF",
      pointRadius: 2,
      borderWidth: 2
    },
  ];

  // Expression Line Chart
  expressionLineChartData: Array<any> = [{ data: [1], label: 'Happy' },{ data: [1], label: 'Calm' },{ data: [1], label: 'Undetected' }];  
  expressionLineChartLabels: Array<any> = [1];
  expressionLineChartOptions: any = {};
  expressionLineChartColors: Array<any> = [  
    {
      fill: false,
      borderColor: "#0fe244",
      pointRadius: 2,
      borderWidth: 2
    },
    {
      fill: false,
      borderColor: "#12c7f5",
      pointRadius: 2,
      borderWidth: 2
    },
    {
      fill: false,
      borderColor: "#f70046",
      pointRadius: 2,
      borderWidth: 2
    }
  ];
  
  // Gender Chart
  genderChartLabels: string[] = ["Male", "Female"];
  genderChartData: number[] = [0, 0];
  genderChartColors: any[] = [{ backgroundColor: ["#0000FF", "#FF00FF"], borderWidth: [0, 0] }];
  genderChartOptions: any = {
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

  // Mask Chart
  maskChartLabels: string[] = ["With Mask", "No Mask"];
  maskChartData: number[] = [0, 0];
  maskChartColors: any[] = [{ backgroundColor: ["#33cc33", "#ffff00"], borderWidth: [0, 0] }];
  maskChartOptions: any = {
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

  // Gender Chart
  expressionChartLabels: string[] = ["Happy", "Calm", "Undetected"];
  expressionChartData: number[] = [0, 0, 0];
  expressionChartColors: any[] = [{ backgroundColor: ["#0fe244", "#12c7f5", "#f70046"], borderWidth: [0, 0, 0] }];
  expressionChartOptions: any = {
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

  // Age Chart
  ageChartOptions: any = {
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
      scaleLabel: {
        display: true,
        labelString: 'Age Group',
        fontColor: '#ddd'
      }      
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
        scaleLabel: {
          display: true,
          labelString: 'Count',
          fontColor: '#ddd'
        }
        }]
    }
  };
  ageChartLabels: string[] = ['1 to 9', '10 to 19', '20 to 29', '30 to 39', '40 to 49', '50 to 59', '60 and above'];
  
  ageChartData: any[] = [
    { barPercentage: .5, data: [0, 0, 0, 0, 0, 0, 0,], label: 'Male' },
    { barPercentage: .5, data: [0, 0, 0, 0, 0, 0, 0], label: 'Female' }
  ];
  
  ageChartColors: Array<any> = [    
    {
      backgroundColor: "#0000FF",
    },
    {
      backgroundColor: "#FF00FF",
    }
  ];

  // Age Range Pie Chart
  ageRangePieChartLabels: string[] = ["1 to 9", "10 to 19", "20 to 29", "30 to 39", "40 to 49", "50 to 59", "60 and above"];
  ageRangePieChartData: number[] = [0, 0];
  ageRangePieChartColors: any[] = [{ backgroundColor: ["#A93226", "#F4D03F", "#884EA0", "#AED6F1", "#2471A3", "#D35400", "#17A589"], borderWidth: [0, 0] }];
  ageRangePieChartOptions: any = {
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

  switchBtn = [];

  exportForm = new FormGroup({
    'name': new FormControl('', [Validators.required])
  });
  
  @ViewChild('viewmodal') private viewmodal : SwalComponent;
  faceDataModal : any = {}
  _faceDataModal : any = [];
  isOpenModal = null
  _userdata = null
  constructor(
    public auth: AuthenticationService,
    private trackingService: TrackingService, 
    private modalService: NgbModal,
    private elem: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private _document: HTMLDocument,
    public readonly swalTargets: SwalPortalTargets
  ) {
    this.clientID = this.auth.getUserDetails().client.clientID;
   }


  ngAfterViewInit() : void{
   
  }


  ngOnInit(): void {
    this.deviceUuid = null;
    this.startDate = this.initStartDate.format('YYYY-MM-DD');
    this.endDate = this.initEndDate.format('YYYY-MM-DD');

    this.trackingService.getClientTrackingCameras(this.clientID).subscribe(
      (data) => {
        this.cameras = data;
        
        this.getClientTrackingReport();
        this.getClientTrackingFaceList();
      },
      err => {
        console.error(err);
      }
    );
  }

  openModal(snapshot : any){
    this._userdata = null;
    this.faceDataModal = snapshot;
    this.viewmodal.fire()
  }

  onChangeSimilar(snapshot : any){
    console.log(snapshot)
    this._userdata = null;
    this.faceDataModal = snapshot;
    this._faceDataModal = []
  }

  onSimilarFace(snapshot : any){
    this._userdata = snapshot;
    this.trackingService.getAllSimilarFace(snapshot.track_userid).then((res) => {
        this._faceDataModal = res
    })
  }

  closeModal(){
     Swal.close();
  }

  cameraChange(event) {
    if (event.value != 0) {
      this.deviceUuid = event.value;
    } else {
      this.deviceUuid = null;
    }

    this.getClientTrackingReport();
    this.getClientTrackingFaceList();
  }

  startDateChange(event){    
    this.startDate = null;
    this.endDate = null;

    if (event.value) {
      this.startDate = this.formatDateStr(event.value);     
      this.getClientTrackingReport();
      this.getClientTrackingFaceList();
    }
  }

  endDateChange(event){
    this.endDate = null;

    if (event.value) {
      this.endDate = this.formatDateStr(event.value);
      this.getClientTrackingReport();
      this.getClientTrackingFaceList();
    }
  }

  formatDateStr(value) {
    const date = new Date(value);
    const month = date.getMonth() + 1;
    const monthStr = month < 10 ? '0'+month : month.toString(); 
    const dateStr = date.getFullYear()+"-"+monthStr+"-"+date.getDate();
    return dateStr;      
  }

  onNextChange(){
    
    if(this.faceDatas.length < 10){
      return false;
    }

    this.pageSize += 10;
    this.pageIndex = this.pageSize + 1;

    this.getClientTrackingFaceList();
  }

  onPrevChange(){
    if(this.pageSize < 10){
        return false;
    }

    this.pageSize -= 10;
    this.pageIndex = this.pageSize;

    this.getClientTrackingFaceList();
  }

  onTooltipEnter(e : any){
    var tar = e.target
    var tooltip = tar.childNodes[1]
    tooltip.classList.add('active')
    /*if(type == "mask"){
        this.tooltip_mask[index] = true
    }
    else if(type == 'glass'){
       this.tooltip_glass[index] = true 
    }
    else if(type == 'beard'){
       this.tooltip_beard[index] = true 
    }*/
  }


  onTooltipLeave(e : any){
    var tar = e.target
    var tooltip = tar.childNodes[1]
    tooltip.classList.remove('active')
    /*if(type == "mask"){
        this.tooltip_mask[index] = false
    }
    else if(type == 'glass'){
       this.tooltip_glass[index] = false 
    }
    else if(type == 'beard'){
       this.tooltip_beard[index] = false 
    }*/
  }

  onClickActive(e : any, index : any, type : string){
    
      var _btn = this.switchBtn[index].group[0];
      if(_btn.is_enable && _btn.type == type){
          this.switchBtn[index].group[0].is_enable = false;
      }else if(!_btn.is_enable && _btn.type == type){
        this.switchBtn[index].group[0].is_enable = true;
      }

      _btn = this.switchBtn[index].group[1];
      if(_btn.is_enable && _btn.type == type){
          this.switchBtn[index].group[1].is_enable = false;
      }else if(!_btn.is_enable && _btn.type == type){
        this.switchBtn[index].group[1].is_enable = true;
      }
  }

  getClientTrackingReport() {
    if (this.startDate != null && this.endDate != null) {      
      this.trackingService.getClientTrackingReport(this.clientID, this.startDate+' 00:00:00', this.endDate+' 23:59:59', this.deviceUuid).subscribe(
        (data) => {      
          this.uniqueFacesByCameraStats = data['uniqueFacesByCameraStats'];
          this.uniqueFacesStats = data['uniqueFacesStats'];
          this.totalStats = data['totalStats'];
          this.viewStats = data['viewStats'];
          this.visitorsStayStats = data['visitorsStayStats'];
          this.viewersViewStats = data['viewersViewStats'];
          this.maleStats = data['maleStats'];
          this.femaleStats = data['femaleStats'];
          this.happyStats = data['happyStats'];
          this.calmStats = data['calmStats'];
          this.otherExpStats = data['otherExpStats'];
          this.averageTotalDuration = Number(data['totalAverageStay'][0].average);
          this.averageViewDuration = Number(data['totalAverageView'][0].average);

          this.setTrafficChartData();
          this.setVisitorsChartByCameraData();
          this.setVisitorsChartData();
          this.setStayViewDurationChartData();
          this.setAgeChartData(data["ageRange"]);
          this.setMaskChartData(data['maskData']);
          this.setGenderChartData();
          this.setExpressionChartData();          
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  getClientTrackingFaceList() {
    if (this.startDate != null && this.endDate != null) {
      this.trackingService.getClientTrackingFaceList(this.clientID, this.startDate+' 00:00:00', this.endDate+' 23:59:59', 10, this.pageIndex, this.deviceUuid).subscribe(
        (data) => {
          this.faceDatas = data['faceDatas'];
          this.faceDataTotalCount = data['faceDataTotalCount'];
          this.faceDataTotal = data['faceDataTotal'];
          this.faceDatas.forEach( (data, index) => {
            var stayDiff = Number(data.leave) - Number(data.enter);
            data.stayDuration = moment.utc(stayDiff).format("ss.S") + ' seconds';

          });

          this.tooltip_mask = new Array(this.faceDataTotal).fill(false)
          this.tooltip_glass = new Array(this.faceDataTotal).fill(false)
          this.tooltip_beard = new Array(this.faceDataTotal).fill(false)
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  setVisitorsChartByCameraData() {
    this.uniqueFacesByCameraCount = 0;
    this.visitorsByCameraLineChartColors = [];
    this.visitorsByCameraLineChartLabels = [];
    this.visitorsByCameraLineChartData = [];

    if (this.uniqueFacesByCameraStats) {
      var labelString;

      if (this.startDate == this.endDate) {
        labelString = 'Hours';

        var uniqueFacesStats = [];

        this.uniqueFacesByCameraStats.forEach(statsItem => {
          uniqueFacesStats.push(statsItem.uniqueFacesStats);
        });

        const { minHour, maxHour } = this.getFixedMinMaxHours();

        for (var i = minHour; i <= maxHour; i++) {
          const label = this.formatXAccesslabel(i, true);
          this.visitorsByCameraLineChartLabels.push(label);          
        }

        this.uniqueFacesByCameraStats.forEach(statsItem => {
          var uniqueFacesCountData = [];
          var uniqueFacesStats = statsItem.uniqueFacesStats;

          for (var i = minHour; i <= maxHour; i++) {           
            var uniqueFacesCount = this.getCountByHour(i, uniqueFacesStats);
            uniqueFacesCountData.push(uniqueFacesCount);

            this.uniqueFacesByCameraCount += uniqueFacesCount;
          }

          this.setVisitorsChartByCameraDataItem(statsItem, uniqueFacesCountData);
        });
      } else {
        labelString = 'Dates';

        var start = new Date(this.startDate);
        var now = new Date(this.endDate);

        for (start; start <= now; start.setDate(start.getDate() + 1)) {
          var date = new Date(start);
          var d = date.getDate();

          this.visitorsByCameraLineChartLabels.push(d);
        }

        this.uniqueFacesByCameraStats.forEach(statsItem => {
          var start = new Date(this.startDate);
          var now = new Date(this.endDate);
          var uniqueFacesCountData = [];
          var uniqueFacesStats = statsItem.uniqueFacesStats;

          for (start; start <= now; start.setDate(start.getDate() + 1)) {
            var date = new Date(start);
            var d = date.getDate();

            var uniqueFacesCount = this.getCountByDate(date, uniqueFacesStats);
            uniqueFacesCountData.push(uniqueFacesCount);

            this.uniqueFacesByCameraCount += uniqueFacesCount;
          }

          this.setVisitorsChartByCameraDataItem(statsItem, uniqueFacesCountData);
        });
      }

      this.setVisitorsByCameraLineChartOptions(labelString);
    }
  }

  setVisitorsChartByCameraDataItem(statsItem, uniqueFacesCountData) {
    var cameraName = this.getCameraName(statsItem.deviceUuid);
    var cameraColor = this.generateRandomColor();

    while (this.isColorLineChartAdded(this.visitorsByCameraLineChartColors, cameraColor)) {
      cameraColor = this.generateRandomColor();
    }

    this.visitorsByCameraLineChartColors.push({
      fill: false,
      backgroundColor: cameraColor,
      borderColor: cameraColor,
      pointRadius: 2,
      borderWidth: 2
    });
    
    this.visitorsByCameraLineChartData.push({ data: uniqueFacesCountData, label: cameraName });
  }

  setVisitorsByCameraLineChartOptions(xAccessLabel) {
    this.visitorsByCameraLineChartOptions = {
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
        }
      },
      tooltips: {
        displayColors:false
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
          scaleLabel: {
            display: true,
            labelString: xAccessLabel,
            fontColor: '#ddd'
          }
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
          scaleLabel: {
            display: true,
            labelString: 'Count',
            fontColor: '#ddd'
          }
          }]
      },
    };
  }

  setVisitorsChartData() {
    this.visitorsCount = 0;
    this.uniqueFacesCount = 0;
    
    this.visitorsLineChartLabels = [];
    this.visitorsLineChartData = [];

    var visitorsCountData = [];
    var uniqueFacesCountData = [];
    var labelString;

    if (this.startDate == this.endDate) {
      labelString = 'Hours';

      const { minHour, maxHour } = this.getFixedMinMaxHours();

      for (var i = minHour; i <= maxHour; i++) {
        this.setVisitorsChartDataItem(i, i, visitorsCountData, uniqueFacesCountData, true);
      }
    } else {
      labelString = 'Dates';

      var start = new Date(this.startDate);
      var now = new Date(this.endDate);  

      for (start; start <= now; start.setDate(start.getDate() + 1)) {
        var date = new Date(start);
        var d = date.getDate();
        this.setVisitorsChartDataItem(d, date, visitorsCountData, uniqueFacesCountData);
      }
    }

    this.visitorsLineChartData.push({ data: visitorsCountData, label: 'Traffic' });
    this.visitorsLineChartData.push({ data: uniqueFacesCountData, label: 'Unique Faces' });

    this.setVisitorsLineChartOptions(labelString);
  }

  setVisitorsChartDataItem(label, field, visitorsCountData, uniqueFacesCountData, isHour = false) {
    label = this.formatXAccesslabel(label, isHour);
    this.visitorsLineChartLabels.push(label);

    var visitorsCount = isHour ? this.getCountByHour(field, this.totalStats) : this.getCountByDate(field, this.totalStats);
    visitorsCountData.push(visitorsCount);
    this.visitorsCount += visitorsCount; 

    var uniqueFacesCount = isHour ? this.getCountByHour(field, this.uniqueFacesStats) : this.getCountByDate(field, this.uniqueFacesStats);
    uniqueFacesCountData.push(uniqueFacesCount);
    this.uniqueFacesCount += uniqueFacesCount;
  }

  setVisitorsLineChartOptions(xAccessLabel) {
    this.visitorsLineChartOptions = {
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
        }
      },
      tooltips: {
        displayColors:false
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
          scaleLabel: {
            display: true,
            labelString: xAccessLabel,
            fontColor: '#ddd'
          }
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
          scaleLabel: {
            display: true,
            labelString: 'Count',
            fontColor: '#ddd'
          }
          }]
      },
    };
  }

  setStayViewDurationChartData() {   
    this.totalDuration = 0;
    this.totalViewDuration = 0;
    
    this.stayViewDurationLineChartLabels = [];
    this.stayViewDurationLineChartData = [];

    var stayDurationData = [];
    var viewDurationData = [];
    var labelString;

    if (this.startDate == this.endDate) {
      labelString = 'Hours';

      const { minHour, maxHour } = this.getFixedMinMaxHours();

      for (var i = minHour; i <= maxHour; i++) {
        this.setStayViewDurationChartDataItem(i, i, stayDurationData, viewDurationData, true);
      }
    } else {
      labelString = 'Dates';

      var start = new Date(this.startDate);
      var now = new Date(this.endDate);

      for (start; start <= now; start.setDate(start.getDate() + 1)) {
        var date = new Date(start);
        var d = date.getDate();
        this.setStayViewDurationChartDataItem(d, date, stayDurationData, viewDurationData);
      }
    }

    this.totalDuration = this.formatDuration(this.totalDuration);
    this.totalViewDuration = this.formatDuration(this.totalViewDuration);
    this.averageTotalDuration = this.formatDuration(this.averageTotalDuration);
    this.averageViewDuration = this.formatDuration(this.averageViewDuration);

    this.stayViewDurationLineChartData.push({ data: stayDurationData, label: 'Total' });
    this.stayViewDurationLineChartData.push({ data: viewDurationData, label: 'View' });

    this.setStayViewDurationLineChartOptions(labelString);
  }

  formatDuration(duration) {
    if (duration > 0) {
      if (duration < 45) {
        return moment.duration(duration, 'seconds').format('s [seconds]');
      } else if (duration > 44 && duration < 90) {
        return moment.duration(duration, 'seconds').format('m [minute]');
      } else if (duration > 2640 && duration < 5400) {
        return moment.duration(duration, 'seconds').format('h [hour]');
      } else {
        return moment.duration(duration, 'seconds').humanize();
      }
    } else {
      return 0;
    }
  }

  setStayViewDurationChartDataItem(label, field, stayDurationData, viewDurationData, isHour = false) {
    label = this.formatXAccesslabel(label, isHour);
    this.stayViewDurationLineChartLabels.push(label);

    var stayDuration = isHour ? this.getCountByHour(field, this.visitorsStayStats) : this.getCountByDate(field, this.visitorsStayStats);
    stayDurationData.push(stayDuration);
    this.totalDuration += stayDuration;

    var viewDuration = isHour ? this.getCountByHour(field, this.viewersViewStats) : this.getCountByDate(field, this.viewersViewStats);
    viewDurationData.push(viewDuration);
    this.totalViewDuration += viewDuration;
  }

  setStayViewDurationLineChartOptions(xAccessLabel) {
    this.stayViewDurationLineChartOptions = {
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
        }
      },
      tooltips: {
        displayColors:false
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
          scaleLabel: {
            display: true,
            labelString: xAccessLabel,
            fontColor: '#ddd'
          }
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
          scaleLabel: {
            display: true,
            labelString: 'Seconds',
            fontColor: '#ddd'
          }
          }]
      },
    };
  }

  setAgeChartData(ageRange) {
    this.oneToNinePercent = 0;
    this.tenToNineTeenPercent = 0;
    this.twentyToTwentyNinePercent = 0;
    this.thirtyToThirtyNinePercent = 0;
    this.fortyToFortyNinePercent = 0;
    this.fiftyToFiftyNinePercent = 0;
    this.sixtyAndAbovePercent = 0;

    this.ageChartData[0].data = [ageRange['1-9-Male'], ageRange['10-19-Male'], ageRange['20-29-Male'], ageRange['30-39-Male'], ageRange['40-49-Male'], ageRange['50-59-Male'], ageRange['60-Above-Male']];
    this.ageChartData[1].data = [ageRange['1-9-Female'], ageRange['10-19-Female'], ageRange['20-29-Female'], ageRange['30-39-Female'], ageRange['40-49-Female'], ageRange['50-59-Female'], ageRange['60-Above-Female']];

    var oneToNineCount = Number(ageRange['1-9-Male'] + ageRange['1-9-Female']);
    var tenToNineTeenCount = Number(ageRange['10-19-Male'] + ageRange['10-19-Female']);
    var twentyToTwentyNineCount = Number(ageRange['20-29-Male'] + ageRange['20-29-Female']);
    var thirtyToThirtyNineCount = Number(ageRange['30-39-Male'] + ageRange['30-39-Female']);
    var fortyToFortyNineCount = Number(ageRange['40-49-Male'] + ageRange['40-49-Female']);
    var fiftyToFiftyNineCount = Number(ageRange['50-59-Male'] + ageRange['50-59-Female']);
    var sixtyAndAboveCount = Number(ageRange['60-Above-Male'] + ageRange['60-Above-Female']);

    this.ageRangePieChartData = [oneToNineCount, tenToNineTeenCount, twentyToTwentyNineCount, thirtyToThirtyNineCount, fortyToFortyNineCount, fiftyToFiftyNineCount, sixtyAndAboveCount];
    
    var totalAgeCount = 0;

    this.ageRangePieChartData.forEach(count => {
      totalAgeCount += count;
    });

    if (totalAgeCount > 0) {
      this.oneToNinePercent = this.getPercent(oneToNineCount, totalAgeCount);      
      this.tenToNineTeenPercent = this.getPercent(tenToNineTeenCount, totalAgeCount);
      this.twentyToTwentyNinePercent = this.getPercent(twentyToTwentyNineCount, totalAgeCount);
      this.thirtyToThirtyNinePercent = this.getPercent(thirtyToThirtyNineCount, totalAgeCount);
      this.fortyToFortyNinePercent = this.getPercent(fortyToFortyNineCount, totalAgeCount);
      this.fiftyToFiftyNinePercent = this.getPercent(fiftyToFiftyNineCount, totalAgeCount);
      this.sixtyAndAbovePercent = this.getPercent(sixtyAndAboveCount, totalAgeCount);
    }
  }

  setMaskChartData(maskData) {
    this.withMaskPercent = 0;
    this.noMaskPercent = 0;

    this.withMaskCount = maskData['withMask'];
    this.noMaskCount = maskData['noMask'];
    this.maskChartData = [this.withMaskCount, this.noMaskCount];
    var maskTotal = this.withMaskCount + this.noMaskCount;

    if (maskTotal > 0) {
      this.withMaskPercent = Math.round(this.withMaskCount / maskTotal * 100);
      this.noMaskPercent = Math.round(this.noMaskCount / maskTotal * 100);
    }
  }

  setTrafficChartData() {
    this.totalCount = 0;
    this.viewCount = 0;
    this.viewPercent = 0;
    
    this.trafficLineChartLabels = [];
    this.trafficLineChartData = [];

    var viewCountData = [];
    var totalCountData = [];
    var labelString;

    if (this.startDate == this.endDate) {   
      labelString = 'Hours';

      const { minHour, maxHour } = this.getFixedMinMaxHours();

      for (var i = minHour; i <= maxHour; i++) {
        this.setTrafficChartDataItem(i, i, viewCountData, totalCountData, true); 
      }
    } else {
      labelString = 'Dates';

      var start = new Date(this.startDate);
      var now = new Date(this.endDate);

      for (start; start <= now; start.setDate(start.getDate() + 1)) {
        var date = new Date(start);
        var d = date.getDate();
        this.setTrafficChartDataItem(d, date, viewCountData, totalCountData);
      }
    }

    this.trafficLineChartData.push({ data: viewCountData, label: 'View' });
    this.trafficLineChartData.push({ data: totalCountData, label: 'Total' });
    
    this.setTrafficLineChartOptions(labelString);

    if (this.totalCount > 0)
      this.viewPercent = this.getPercent(this.viewCount, this.totalCount);
  }

  setTrafficChartDataItem(label, field, viewCountData, totalCountData, isHour = false) {
    label = this.formatXAccesslabel(label, isHour);
    this.trafficLineChartLabels.push(label);

    var viewCount = isHour ? this.getCountByHour(field, this.viewStats) : this.getCountByDate(field, this.viewStats);
    viewCountData.push(viewCount);
    this.viewCount += viewCount;

    var totalCount = isHour ? this.getCountByHour(field, this.totalStats) : this.getCountByDate(field, this.totalStats);
    totalCountData.push(totalCount);
    this.totalCount += totalCount; 
  }

  setTrafficLineChartOptions(xAccessLabel) {
    this.trafficLineChartOptions = {
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
        }
      },
      tooltips: {
        displayColors:false
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
          scaleLabel: {
            display: true,
            labelString: xAccessLabel,
            fontColor: '#ddd'
          }
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
          scaleLabel: {
            display: true,
            labelString: 'Count',
            fontColor: '#ddd'
          }
          }]
      },
    }
  }

  setGenderChartData() {
    this.malePercent = 0;
    this.femalePercent = 0;    
    this.maleCount = 0;
    this.femaleCount = 0;

    this.genderLineChartLabels = [];
    this.genderLineChartData = [];

    var maleData = [];
    var femaleData = [];
    var labelString;

    if (this.startDate == this.endDate) {
      labelString = "Hours";

      const { minHour, maxHour } = this.getFixedMinMaxHours();

      for (var i = minHour; i <= maxHour; i++) {
        this.setGenderChartDataItem(i, i, maleData, femaleData, true);
      }
    } else {
      labelString = "Dates";

      var start = new Date(this.startDate);
      var now = new Date(this.endDate);

      for (start; start <= now; start.setDate(start.getDate() + 1)) {
        var date = new Date(start);
        var d = date.getDate();
        this.setGenderChartDataItem(d, date, maleData, femaleData);        
      }
    }

    this.genderLineChartData.push({ data: maleData, label: 'Male' });
    this.genderLineChartData.push({ data: femaleData, label: 'Female' });

    this.setGenderLineChartOptions(labelString);

    this.genderChartData = [this.maleCount, this.femaleCount];
    var genderTotal = this.maleCount + this.femaleCount;

    if (genderTotal > 0) {
      this.malePercent = this.getPercent(this.maleCount, genderTotal);
      this.femalePercent = this.getPercent(this.femaleCount, genderTotal);
    }
  }

  setGenderChartDataItem(label, field, maleData, femaleData, isHour = false) {
    label = this.formatXAccesslabel(label, isHour);
    this.genderLineChartLabels.push(label);

    var maleCount = isHour ? this.getCountByHour(field, this.maleStats) : this.getCountByDate(field, this.maleStats);
    maleData.push(maleCount);
    this.maleCount += maleCount;

    var femaleCount = isHour ? this.getCountByHour(field, this.femaleStats) : this.getCountByDate(field, this.femaleStats);
    femaleData.push(femaleCount);
    this.femaleCount += femaleCount; 
  }

  setGenderLineChartOptions(xAccessLabel) {
    this.genderLineChartOptions = {
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
        }
      },
      tooltips: {
        displayColors:false
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
          scaleLabel: {
            display: true,
            labelString: xAccessLabel,
            fontColor: '#ddd'
          }
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
          scaleLabel: {
            display: true,
            labelString: 'Count',
            fontColor: '#ddd'
          }
          }]
      },
    };
  }

  setExpressionChartData() {
    this.happyPercent = 0;
    this.calmPercent = 0;
    this.otherExpPercent = 0;
    this.happyCount = 0;
    this.calmCount = 0;
    this.otherExpCount = 0;

    this.expressionLineChartLabels = [];
    this.expressionLineChartData = [];

    var happyData = [];
    var calmData = [];
    var otherExpData = [];
    var labelString;

    if (this.startDate == this.endDate) {
      labelString = 'Hours';

      const { minHour, maxHour } = this.getFixedMinMaxHours();

      for (var i = minHour; i <= maxHour; i++) {
        this.setExpressionChartDataItem(i, i, happyData, calmData, otherExpData, true);
      }
    } else {
      labelString = 'Dates';

      var start = new Date(this.startDate);
      var now = new Date(this.endDate);

      for (start; start <= now; start.setDate(start.getDate() + 1)) {
        var date = new Date(start);
        var d = date.getDate();
        this.setExpressionChartDataItem(d, date, happyData, calmData, otherExpData);
      }
    }

    this.expressionLineChartData.push({ data: happyData, label: 'Happy' });
    this.expressionLineChartData.push({ data: calmData, label: 'Calm' });
    this.expressionLineChartData.push({ data: otherExpData, label: 'Undetected' });

    this.setExpressionLineChartOptions(labelString);

    var totalExpressions = this.happyCount + this.calmCount + this.otherExpCount;

    if (totalExpressions > 0) {
      this.happyPercent = this.getPercent(this.happyCount, totalExpressions);
      this.calmPercent = this.getPercent(this.calmCount, totalExpressions);
      this.otherExpPercent = this.getPercent(this.otherExpCount, totalExpressions);
    }

    this.expressionChartData = [this.happyCount, this.calmCount, this.otherExpCount];
  }

  setExpressionChartDataItem(label, field, happyData, calmData, otherExpData, isHour = false) {
    label = this.formatXAccesslabel(label, isHour);
    this.expressionLineChartLabels.push(label);

    var happyCount = isHour ? this.getCountByHour(field, this.happyStats) : this.getCountByDate(field, this.happyStats);
    happyData.push(happyCount);
    this.happyCount += happyCount;

    var calmCount = isHour ? this.getCountByHour(field, this.calmStats) : this.getCountByDate(field, this.calmStats);
    calmData.push(calmCount);
    this.calmCount += calmCount;
    
    var otherExpCount = isHour ? this.getCountByHour(field, this.otherExpStats) : this.getCountByDate(field, this.otherExpStats);
    otherExpData.push(otherExpCount);
    this.otherExpCount += otherExpCount;
  }

  setExpressionLineChartOptions(xAccessLabel) {
    this.expressionLineChartOptions = {
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
        }
      },
      tooltips: {
        displayColors:false
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
          scaleLabel: {
            display: true,
            labelString: xAccessLabel,
            fontColor: '#ddd'
          }
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
          scaleLabel: {
            display: true,
            labelString: 'Count',
            fontColor: '#ddd'
          }
          }]
      },
    };
  }

  getCountByDate(date, statsData) {
    for (var i = 0; i < statsData.length; i++) {
      var statsDate = new Date(statsData[i].field);

      if (date.getDate() == statsDate.getDate() && date.getMonth() == statsDate.getMonth()) {
        return Number(statsData[i].count);
      }
    }

    return 0;
  }

  getCountByHour(hour, statsData) {    
    for (var i = 0; i < statsData.length; i++) {
      var statsHour = Number(statsData[i].field);
      statsHour = this.localizeHour(this.startDate, statsHour);

      if (statsHour == hour) {        
        return Number(statsData[i].count);
      }
    }

    return 0;
  }

  getPercent(base, total) {
    return Math.round(base / total * 100);
  }

  getFixedMinMaxHours() {
    const minHour = 1;
    const maxHour = 24;

    return { minHour, maxHour };
  }

  getMinMaxHours(dataArr) {
    var hours = [];

    dataArr.forEach(element => {
      element.forEach(item => {
        hours.push(Number(item.field));
      });
    });

    hours = hours.sort();

    var minHour = hours[0];
    var maxHour = hours[hours.length - 1];
    
    minHour = Number(this.localizeHour(this.startDate, minHour));
    maxHour = Number(this.localizeHour(this.startDate, maxHour));

    return { minHour, maxHour };
  }

  localizeHour(dateStr, hour) {
    const dateArr = dateStr.split('-');
    const month = this.fillZeroPad(dateArr[1]);
    const day = this.fillZeroPad(dateArr[2]);
    dateStr = dateArr[0]+'-'+month+'-'+day;

    const hourStr = this.fillZeroPad(hour);   
    dateStr = dateStr+'T'+hourStr+':00:00.000Z';    

    const date = moment.utc(dateStr).format();
    const localHour = Number(moment.utc(date).local().format('H'));
    return localHour;
  }

  fillZeroPad(val) {
    var valNum = Number(val);
    return valNum < 10 ? '0'+valNum : valNum;    
  }

  formatXAccesslabel(label, isHour) {
    if (isHour) {
      const hour = label < 10 ? '0'+label : label;
      label = moment(hour+':00:00', 'HH:mm:ss').format('ha')
    }

    return label;
  }

  getCameraName(deviceUuid) {
    for (var i=0; i < this.cameras.length; i++) {
      if (this.cameras[i].deviceUuid == deviceUuid)
        return this.cameras[i].deviceName;
    }

    return null;
  }

  generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  isColorLineChartAdded(lineChartColors, color) {
    for (var i=0; i < lineChartColors.length; i++) {
      if (lineChartColors[i].borderColor == color)
        return true;
    }

    return false;
  }

  getExportFormErrorMessage(input) {
    var control = this.exportForm.controls[input];

    switch (input) {
      case 'name':
        if (control.hasError('required'))
          return 'You must enter the project name';
    }

    return "";
  }

  onExport(content) {
    this.clearExportForm();
    this.modalService.open(content, {ariaLabelledBy: 'export-modal'});
  }

  onExportStart(modal) {
    this.exportForm.disable();

    let projectName = this.exportForm.controls['name'].value;    
    let deviceUUID = this.deviceUuid != null ? this.deviceUuid : 0;

    window.open('/tracking/downloadData/'+this.clientID+'?deviceUUID='+deviceUUID+'&projectName='+projectName+'&startDate='+this.startDate+' 00:00:00&endDate='+this.endDate+' 23:59:59', '_blank');
    modal.dismiss();
  }

  clearExportForm() {
    this.exportForm.enable();
    this.exportForm.reset();
  }
}
