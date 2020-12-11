import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { TrackingService, ChartOptions } from '../../services/tracking.service';
import { DeviceService } from '../../services/device.service';
import { Tracking } from '../../models/Tracking';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
import * as moment from 'moment';
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


@Component({
  selector: 'app-tracking-camera-config',
  templateUrl: './tracking-camera-config.component.html',
  styleUrls: ['./tracking-camera-config.component.scss']
})
export class TrackingCameraConfigComponent implements OnInit {

  trackings:Tracking[];

  constructor(
    public auth: AuthenticationService,
    private trackingService: TrackingService,
    public dialog: MatDialog,
    public dialogStat : MatDialog
  ) { }

  ngOnInit(): void {
    this.getClientTrackingCameras();
  }

  getClientTrackingCameras() :void {
    this.trackingService.getClientTrackingCameras(this.auth.getUserDetails().client.clientID).subscribe(
      (data) => {
        this.trackings = data;
      },
      err => {
        console.error(err);
      }
    )
  }

  editDialog(tracking_id : number){

      let dialogRef = this.dialog.open(EditTrackingComponent, {
            width : '70%',
            role : 'alertdialog',
            data : { tracking_id : tracking_id }
        });
      
      dialogRef.afterClosed().subscribe(result => {

      })

  }

  statDialog(tracking_id : number){

    let dialogRef = this.dialogStat.open(EditCameraStat, {
            width : '70%',
            role : 'alertdialog',
            data : { tracking_id : tracking_id }
      })

     dialogRef.afterClosed().subscribe(result => {

    })

  }


}

@Component({
selector: 'edit-tracking',
templateUrl: './dialogs/edit-tracking.component.html',
styles: ['.mat-form-field-appearance-legacy .mat-form-field-label { color: rgb(0 0 0); }'],
providers: []
})
export class EditTrackingComponent implements  OnInit  {

  deviceCode : string = "";

  public form = new FormGroup({
    'live_tracking': new FormControl(),
    'deviceUuid': new FormControl(),
    'location': new FormControl(),
    'branchName': new FormControl(),
    'vendee': new FormControl(),
    'deviceDescription': new FormControl(),
    'deviceName' : new FormControl(),
    'watchConfig_negative_yaw' : new FormControl(),
    'watchConfig_positive_yaw' : new FormControl(),
    'watchConfig_negative_pitch' : new FormControl(),
    'watchConfig_positive_pitch' : new FormControl(),
    'switch_body_track' : new FormControl(),
    'switch_face_watch' : new FormControl(),
    'switch_body_attribute' : new FormControl(),
    'switch_face_attribute' : new FormControl(),
    'switch_body_image_crop' : new FormControl(),
    'switch_face_image_crop' : new FormControl(),
    'switch_face_recognition' : new FormControl(),
    'body_track_trail' : new FormControl(),
    'face_track_trail' : new FormControl(),
    'uploading_period' : new FormControl(),
    'min_body_quality' : new FormControl(),
    'min_face_quality' : new FormControl(),
    'timed_face_attribute' : new FormControl(),
    'face_attribute_period' : new FormControl(),
    'face_merge_time_range' : new FormControl(),
    'incremental_body_quality' : new FormControl(),
    'incremental_face_quality' : new FormControl(),
    'face_similarity_threshold' : new FormControl(),
    'snap_body' : new FormControl(),
    'snap_face' : new FormControl(),
    'snap_uploading_period' : new FormControl(),
    'body_snap_times' : new FormControl(),
    'face_snap_times' : new FormControl(),
    'feature_uploading' : new FormControl(),
    'cameraWidth' : new FormControl(),
    'cameraHeight' : new FormControl()
  });

  constructor(
    private dialogRef: MatDialogRef<TrackingCameraConfigComponent>,
    private trackingService: TrackingService, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }

  async ngOnInit() {
      let res = await this.trackingService.getClientTrackingSingle( this.data.tracking_id );
      const { live_tracking, deviceUuid, 
         location, branchName, deviceDescription, deviceName,
         watchConfig_negative_yaw, watchConfig_positive_yaw, 
         watchConfig_negative_pitch, watchConfig_positive_pitch,
         switch_body_track, switch_face_watch, switch_body_attribute,
         switch_face_attribute, switch_body_image_crop, switch_face_image_crop,
         switch_face_recognition, body_track_trail, face_track_trail, uploading_period,
         min_body_quality, min_face_quality, timed_face_attribute, face_attribute_period,
         face_merge_time_range, incremental_body_quality, incremental_face_quality, face_similarity_threshold,
         snap_body, snap_face, snap_uploading_period, body_snap_times, face_snap_times,
         feature_uploading, cameraWidth, cameraHeight } = this.form.controls;

      if(res){
          live_tracking.setValue(res.live_tracking);
          deviceUuid.setValue(res.deviceUuid);
          location.setValue(res.location);
          branchName.setValue(res.branchName);
          deviceDescription.setValue(res.deviceDescription);
          deviceName.setValue(res.deviceName);
          this.deviceCode = res.deviceCode;

          // var watchConfig = JSON.parse(res.watchConfig);
          var watchConfig = res.watchConfig;
          watchConfig_negative_yaw.setValue(watchConfig['key_parameter_negative_yaw']);
          watchConfig_positive_yaw.setValue(watchConfig['key_parameter_positive_yaw'])
          watchConfig_negative_pitch.setValue(watchConfig['key_parameter_negative_pitch']);
          watchConfig_positive_pitch.setValue(watchConfig['key_parameter_positive_pitch']);
          
          // var sdkConfig = JSON.parse(res.sdkConfig);
          var sdkConfig = res.sdkConfig;
          switch_body_track.setValue((sdkConfig.function_switch_body_track) ? true : false);
          switch_face_watch.setValue((sdkConfig.function_switch_face_watch) ? true : false);
          switch_body_attribute.setValue((sdkConfig.function_switch_body_attribute) ? true : false);
          switch_face_attribute.setValue((sdkConfig.function_switch_face_attribute) ? true : false);
          switch_body_image_crop.setValue((sdkConfig.function_switch_body_image_crop) ? true : false);
          switch_face_image_crop.setValue((sdkConfig.function_switch_face_image_crop) ? true : false);
          switch_face_recognition.setValue((sdkConfig.function_switch_face_recognition) ? true : false);

          // var uploadStat = JSON.parse(res.uploadStatsConfig);
          var uploadStat = res.uploadStatsConfig;
          body_track_trail.setValue((uploadStat.statistics_body_track_trail) ? true : false);
          face_track_trail.setValue((uploadStat.statistics_face_track_trail) ? true : false);
          uploading_period.setValue(uploadStat.statistics_uploading_period);

          // var detection = JSON.parse(res.detectionConfig);
          var detection = res.detectionConfig;
          min_body_quality.setValue(detection.key_parameter_min_body_quality);
          min_face_quality.setValue(detection.key_parameter_min_face_quality);
          timed_face_attribute.setValue(detection.key_parameter_timed_face_attribute);
          face_attribute_period.setValue(detection.key_parameter_face_attribute_period);
          face_merge_time_range.setValue(detection.key_parameter_face_merge_time_range);
          incremental_body_quality.setValue(detection.key_parameter_incremental_body_quality);
          incremental_face_quality.setValue(detection.key_parameter_incremental_face_quality);
          face_similarity_threshold.setValue(detection.key_parameter_face_similarity_threshold);

          // var snapConfig = JSON.parse(res.snapConfig);
          var snapConfig = res.snapConfig
          snap_body.setValue(snapConfig.snap_body);
          snap_face.setValue(snapConfig.snap_face);
          snap_uploading_period.setValue(snapConfig.snap_uploading_period);
          body_snap_times.setValue(snapConfig.snap_max_body_snap_times);
          face_snap_times.setValue(snapConfig.snap_max_face_snap_times);
          feature_uploading.setValue(snapConfig.snap_face_feature_uploading);

          // var camConfig = JSON.parse(res.cameraConfig);
          var camConfig = res.cameraConfig;
          cameraWidth.setValue(camConfig.cameraWidth);
          cameraHeight.setValue(camConfig.cameraHeight);
      }
  }

  async onUpdateTracking(tracking_id : number){

      var formData = new FormData();
      for(var e in this.form.controls){
          
          formData.append(e, this.form.controls[e].value);

      }

      let res = await this.trackingService.updateTracking(tracking_id, formData);

      if(res){
          Swal.fire({
              title : 'Succesfully Updated',
              icon: 'success',
            });
      }
  }

}

@Component({
selector: 'edit-camera-stat',
templateUrl: './dialogs/edit-camera-stat.html',
styles: ['.mat-form-field-appearance-legacy .mat-form-field-label { color: rgb(0 0 0); }'],
providers: []
})
export class EditCameraStat implements  OnInit  {

 @ViewChild("chart") chart: ChartComponent;
 public memoryChart: Partial<ChartOptions>;
 public storageChart: Partial<ChartOptions>;
 public tempChart: Partial<ChartOptions>;

 @ViewChild("toggleButton") checkbox : ElementRef;

 deviceName : string = "";
 deviceId : string = "";

 model = {
   restart_btn : false,
   restart_enable : false
 };

 dt_columns = [
  { prop : 'code', name : "Code Type"},
  { prop : 'value', name : "Values"},
  { prop : 'msgType', name : "Message Type"},
  { prop : 'description', name : "Description"},
  { prop : 'submittedAt', name : "submittedAt"},
  ];
  
  dt_rows = [];
  dt_totalrows = 0;
  dt_offsetpage = 0;
  dt_page = 0
  dt_selected = [];
  dt_initSelect = [];
  dt_limit = 5;
  dt_paginate = [];
  dt_search = "";
  loadingIndicator : boolean = false;
 constructor(
    private dialogRef: MatDialogRef<TrackingCameraConfigComponent>,
    private trackingService: TrackingService,
    private deviceServ : DeviceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
     this.memoryChart = this.trackingService.getMemoryChart("memory");
     this.storageChart = this.trackingService.getStorageChart()
     this.tempChart = this.trackingService.getTempChart()
  }

  async ngOnInit(){
      this.loadingIndicator = true;
      let res = await this.trackingService.getClientTrackingSingle(this.data.tracking_id );
      if(res){
          this.loadingIndicator = false;
          this.deviceId = res.deviceUuid

          let _res = await this.deviceServ.getDeviceStatus(res.deviceUuid)
          this.memoryChart.series = [Math.ceil(100-((_res.memory.free / _res.memory.total) * 100))]
          this.storageChart.series = [Math.ceil(100-((_res.storage.free / _res.storage.total) * 100))]
          this.tempChart.series = [Math.ceil((_res.cpu_temp.temp/70)*100)]
          this.deviceName = res.deviceName

          if(_res.restart == 1){
              this.checkbox.nativeElement.disabled = true;
              this.checkbox.nativeElement.innerHTML = "Device restarted"
          }

          var date = moment().format('YYYY-MM');
          let __res = await this.deviceServ.getDeviceLogs(res.deviceUuid, date)
          if(__res){
            this.dt_rows = __res
            this.dt_totalrows = __res.length
          }
      }
  }

  async onRestart(){


    let res = await this.deviceServ.setCameraEnable(this.deviceId, 1)
    if(res){
      this.checkbox.nativeElement.disabled = true;
      this.checkbox.nativeElement.innerHTML = "Restarting Device..."
      /*Swal.fire({
        title : 'Device is restarted',
        icon: 'success',
      });*/
    }
      
  }

  /*async onRestart({checked}){
      if(checked==true){
          let res = await this.deviceServ.setCameraEnable(this.deviceId, 1)
          if(res){
            this.model.restart_enable = true;
            Swal.fire({
              title : 'Device is restarted',
              icon: 'success',
            });
          }
      }
  }*/

}
