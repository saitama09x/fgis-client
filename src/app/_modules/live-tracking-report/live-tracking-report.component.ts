import { Component, OnInit, OnChanges, ViewChild, TemplateRef, SimpleChanges, DoCheck } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { TrackingService } from '../../services/tracking.service';
import { LiveTrackingService, ChartOptions, 
	ChartTotal, barlineOpt, polarOpt, barOpt, barHorizontalOpt, pieChartOpt } from '../../services/live-tracking.service';
import { LiveTracking } from '../../models/LiveTracking';
import * as _moment from 'moment';
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
  ApexLegend
} from "ng-apexcharts";
// import { default as _rollupMoment} from 'moment';

const moment = _moment;

@Component({
  selector: 'app-live-tracking-report',
  templateUrl: './live-tracking-report.component.html',
  styleUrls: ['./live-tracking-report.component.scss']
})
export class LiveTrackingReportComponent implements OnInit, OnChanges, DoCheck {

  clientID;
  cameras = [];
  is_loaded = false;

  deviceUuid;
  startDate;
  endDate;
  audienceCount = 0;
  smileTotalScore = 0;
  charmScore = 0;
  snapshot;
  interval;

  //Glasses Group
  noGlasses = 0;
  hasGlasses = 0;
  sunGlasses = 0;
  unknownGlasses = 0;
  glassesTotal = 0;

  countGlass = 0;
  countSunGlass = 0;
  datePicker = null;
  trackRes = null;

  _TotalAudience = 0;
  _TotalMask = 0;
  _TotalBeard = 0;
  _TotalSmile = 0;
  tracking_func = null;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartBeard: Partial<ChartOptions>;
  public chartSmile: Partial<ChartOptions>;
  
  @ViewChild("chart_total") chart_total: ChartComponent;
  public charttotal: Partial<ChartTotal>;

  public barline: Partial<barlineOpt>;
  public polarChart: Partial<polarOpt>;
  public barChart: Partial<barOpt>;

  @ViewChild("chart_upperType") chart_upperType: ChartComponent;
  public upperType: Partial<barHorizontalOpt>;

  @ViewChild("chart_upperCloth") chart_upperCloth: ChartComponent;
  public upperCloth: Partial<barHorizontalOpt>;

  @ViewChild("chart_lowerCloth") chart_lowerCloth: ChartComponent;
  public lowerCloth: Partial<barHorizontalOpt>;

  @ViewChild("chart_upperMode") chart_upperMode: ChartComponent;
  public upperMode: Partial<barHorizontalOpt>;

  @ViewChild("chart_lowerMode") chart_lowerMode: ChartComponent;
  public lowerMode: Partial<barHorizontalOpt>;

  public upperColor : Partial<pieChartOpt>;
  public lowerColor : Partial<pieChartOpt>;
  public glassChart: Partial<ChartOptions>;

  constructor(
    public auth: AuthenticationService,
    private trackingService: TrackingService, 
    private livetrack : LiveTrackingService,
  ) {

    this.deviceUuid = null;
    this.clientID = this.auth.getUserDetails().client.clientID;

    this.startDate = moment().format('YYYY-MM-DD');
    this.endDate = moment().format('YYYY-MM-DD');

    this.chartOptions = this.livetrack.getMaskSettings();
    this.chartBeard = this.livetrack.getBeardSettings();
    this.chartSmile = this.livetrack.getSmileSettings();
    this.charttotal = this.livetrack.getGenderSettings();
    this.barline = this.livetrack.getGenderAudienceChart();
    this.upperType = this.livetrack.upperTypeGroup();
    this.upperCloth = this.livetrack.upperClothGroup();
    this.lowerCloth = this.livetrack.lowerClothGroup();
    this.glassChart = this.livetrack.getGlassSettingChart();
    this.polarChart = this.livetrack.getAgeChart();
    this.barChart = this.livetrack.getExpressionChart();
    this.upperMode = this.livetrack.upperModeGroup();
    this.lowerMode = this.livetrack.lowerModeGroup();
    this.upperColor = this.livetrack.getUpperColor();
    this.lowerColor = this.livetrack.getLowerColor();
    this.tracking_func = this.livetrack.getLiveTrackingUpdates();
  }

  ngOnInit(): void {  
    this.trackingService.getClientLiveTrackingCameras(this.clientID).subscribe(
      (data) => {

        this.cameras = data;

        if(data.length){
            this.deviceUuid = this.cameras[0].deviceUuid;
        }

        this.datePicker = moment().format("YYYY-MM-DD") + " 00:00:00";
        this._getClientLiveTrackingReport(); 
        
        this.tracking_func(this.deviceUuid, (res) => {
            this._getClientLiveUpdate(res)
        })

        this.is_loaded = true;
        
      },
      err => {
        console.error(err);
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void{

  }

  ngDoCheck() {
      if(this.is_loaded){

        this._getClientLiveTrackingReport(); 

        this.tracking_func(this.deviceUuid, (res) => {
            this._getClientLiveUpdate(res)
        })
        
        if(this.interval != null){
            clearInterval(this.interval)
        }

        this.interval = setInterval(() => {
            this.tracking_func(this.deviceUuid, (res) => {
                this._getClientLiveTrackingReport(); 
                this._getClientLiveUpdate(res)
            })
        }, 10000);
       
        this.is_loaded = false;  
     }
  }

  ngOnDestroy() {
      this.is_loaded = false;
      if(this.interval != null){
        clearInterval(this.interval)
      }
  }

  cameraChange(event) {
    if (event.value != 0) {
      this.deviceUuid = event.value;
    } else {
      this.deviceUuid = null;
    }

   this._getClientLiveTrackingReport();
   this.is_loaded = true;

  }

  dateChange(date : any){
      this.datePicker = moment(date.value).format('YYYY-MM-DD') + " 00:00:00";
      this._getClientLiveTrackingReport();
  }

  _getClientLiveUpdate(res){
    if(res == false){
        return;
    }

    this.trackRes = res;
    this.snapshot = res.preview;

    var masks = res.percentMask;
    var beard = res.percentBeard;
    var male = res.percentMale;
    var female = res.percentFemale;
    var upperGroup = res.upperGroup;
    var glassGroup = res.glassGroup;
    var ageGroup = res.ageGroup;
    var upperCloth = res.upperCloth;
    var lowerCloth = res.lowerCloth;
    var upperMode = res.upperMode;
    var lowerMode = res.lowerMode;
    var upperColor = res.upperColor;
    var lowerColor = res.lowerColor;
    var totalAud = res.TotalAudience;

    // this.chartOptions.series = [Math.ceil(masks)]

    window.ApexCharts.exec("mask", "updateSeries", [Math.ceil(masks)]);

    // this.chartBeard.series = [Math.ceil(beard)]

    window.ApexCharts.exec("beard", "updateSeries", [Math.ceil(beard)]);

    // this.chartSmile.series = [Math.ceil(res.TotalSmile)]

    window.ApexCharts.exec("smile", "updateSeries", [Math.ceil(res.TotalSmile)]);

    // this.charttotal.series = [Math.ceil(male), Math.ceil(female)]

    window.ApexCharts.exec("gender", "updateSeries", [Math.ceil(male), Math.ceil(female)]);
    window.ApexCharts.exec("gender", "updateOptions", {
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
                      return totalAud
                    }
                  },
                }
            }
        }
    })

    var seriesAge = [];
    var seriesUpperColor = [];
    var seriesLowerColor = [];

    for(var i in ageGroup){
        seriesAge.push(Math.ceil(ageGroup[i]))
    }

    for(var i in upperColor){
        seriesUpperColor.push(upperColor[i])
    }

    for(var i in lowerColor){
        seriesLowerColor.push(lowerColor[i])
    }

    // this.polarChart.series = seriesAge;

    window.ApexCharts.exec("ages", "updateSeries", seriesAge)

    window.ApexCharts.exec("upperType", "updateSeries", [
      {
        data: [
          upperGroup.longcoat,
          upperGroup.jacket,
          upperGroup.shirt,
          upperGroup.tshirt,
          upperGroup.sports,
          upperGroup.downcoat,
          upperGroup.dress,
          upperGroup.business
          ]
      }
    ]);

    window.ApexCharts.exec("upperCloth", "updateSeries", [
      {
        data: [
          upperCloth.short,
          upperCloth.long
          ]
      }
    ]);


    window.ApexCharts.exec("lowerCloth", "updateSeries", [
      {
        data: [
          lowerCloth.trouser,
          lowerCloth.short,
          lowerCloth.skirt
          ]
      }
    ]);


   window.ApexCharts.exec("upperMode", "updateSeries", [
      {
        data: [
            upperMode.pure,
            upperMode.stripe,
            upperMode.design,
            upperMode.joint,
            upperMode.lattice,
          ]
      }
    ]);

    window.ApexCharts.exec("lowerMode", "updateSeries", [
      {
        data: [
            lowerMode.pure,
            lowerMode.stripe,
            lowerMode.design,
            lowerMode.joint,
            lowerMode.lattice,
          ]
      }
    ]);

    // this.upperColor.series = seriesUpperColor;

    window.ApexCharts.exec("upperColor", "updateSeries", seriesUpperColor);

    // this.lowerColor.series = seriesLowerColor;

    window.ApexCharts.exec("lowerColor", "updateSeries", seriesLowerColor);

    // this.glassChart.series = [Math.ceil(glassGroup.avgGlass)]
    
    window.ApexCharts.exec("glass", "updateSeries", [Math.ceil(glassGroup.avgGlass)]);

    this.countGlass = glassGroup.TotalGlass
    this.countSunGlass = glassGroup.TotalSunGlass

  }

  _getClientLiveTrackingReport(){
      this.livetrack.getTrackingReport(this.deviceUuid, this.datePicker).then((res) => {

        var dateGroup = res.dateGroup;

        var seriesAud = [];
        var seriesMale = [];
        var seriesFemale = [];
        var seriesLabel = [];
        var seriesHappy = [];
        var seriesCalm = [];
        var seriesOther = [];
        
        for(var i in dateGroup){
          seriesAud.push(dateGroup[i].audience)
          seriesMale.push(dateGroup[i].male)
          seriesFemale.push(dateGroup[i].female)
          seriesHappy.push(dateGroup[i].happy)
          seriesCalm.push(dateGroup[i].calm)
          seriesOther.push(dateGroup[i].other)

          if(dateGroup[i].xaxis < 12){
            seriesLabel.push(dateGroup[i].xaxis + "AM")
          }
          else if(dateGroup[i].xaxis == 12){
            seriesLabel.push(dateGroup[i].xaxis + "AM")
          }
          else if(dateGroup[i].xaxis > 12 && dateGroup[i].xaxis < 24){
            seriesLabel.push(dateGroup[i].xaxis - 12 + "PM")
          }
          else if(dateGroup[i].xaxis == 24){
            seriesLabel.push(dateGroup[i].xaxis - 12 + "MN")
          }
        }

        this.barline.series[0].data = seriesAud;
        this.barline.series[1].data = seriesMale;
        this.barline.series[2].data = seriesFemale;
        this.barline.labels = seriesLabel;
        this.barChart.series[0].data = seriesCalm
        this.barChart.series[1].data = seriesHappy
        this.barChart.series[2].data = seriesOther
        this.barChart.labels = seriesLabel;
      })
  }

  getClientLiveTrackingReport() {
    this.trackingService.getClientLiveTrackingReport(this.clientID, this.startDate+' 00:00:00', this.endDate+' 23:59:59', this.deviceUuid).subscribe(
      (data) => {        
        this.snapshot = data['snapshot'];
        var liveTracking = data['liveTracking'];

        this.audienceCount = 0;
        this.smileTotalScore = 0;
        this.charmScore = 0;
        
        this.noGlasses = 0;
        this.hasGlasses = 0;
        this.sunGlasses = 0;
        this.unknownGlasses = 0;        
        this.glassesTotal = 0;

        if (liveTracking) {
          this.audienceCount = liveTracking['audienceCount'];
          this.smileTotalScore = liveTracking['smileTotalScore'];
          this.charmScore = liveTracking['charmScore'];

          var glassesGroupArr = liveTracking['glassesGroup'].split(',');

          if (glassesGroupArr) {            
            this.noGlasses = glassesGroupArr[0];
            this.hasGlasses = glassesGroupArr[1];
            this.sunGlasses = glassesGroupArr[2];
            this.unknownGlasses = glassesGroupArr[3];  

            glassesGroupArr.forEach(element => {
              this.glassesTotal += Number(element);
            });
          }
        }
      },
      err => {
        console.error(err);
      }
    )
  }

  getPercent(base, total) {
    return base / total * 100;
  }
}
