import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { ClientComponent } from 'src/app/modules/client/client.component';
import { BodyGestureComponent } from 'src/app/modules/body-gesture/body-gesture.component';
import { FacialExpressionComponent } from 'src/app/modules/facial-expression/facial-expression.component';
import { CameraComponent } from 'src/app/modules/camera/camera.component';
import { CampaignComponent } from 'src/app/modules/campaign/campaign.component';
import { SettingComponent } from 'src/app/modules/setting/setting.component';
import { AssetComponent } from 'src/app/modules/asset/asset.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DragAndDropDirective } from 'src/app/drag-and-drop.directive';
import { WifiBeaconComponent } from 'src/app/modules/wifi-beacon/wifi-beacon.component';
import { WifiBeaconReportComponent } from 'src/app/modules/wifi-beacon-report/wifi-beacon-report.component';
import { GroupsComponent } from 'src/app/modules/groups/groups.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { TrackingComponent } from 'src/app/modules/tracking/tracking.component';
import { TrackingReportComponent } from 'src/app/modules/tracking-report/tracking-report.component';
import { SmileToVoteCamerasComponent } from 'src/app/modules/smile-to-vote-cameras/smile-to-vote-cameras.component';
import { SmileToVoteComponent } from 'src/app/modules/smile-to-vote/smile-to-vote.component';
import { TrackingCameraConfigComponent } from 'src/app/modules/tracking-camera-config/tracking-camera-config.component';
import { LiveTrackingReportComponent } from 'src/app/modules/live-tracking-report/live-tracking-report.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    DefaultComponent,
    ClientComponent,
    BodyGestureComponent,
    FacialExpressionComponent,
    CameraComponent,
    WifiBeaconComponent,
    CampaignComponent,
    SettingComponent,
    AssetComponent,
    WifiBeaconReportComponent,
    GroupsComponent,
    RegisterComponent,
    TrackingComponent,
    TrackingReportComponent,
    SmileToVoteCamerasComponent,
    SmileToVoteComponent,
    TrackingCameraConfigComponent,
    LiveTrackingReportComponent,
    DragAndDropDirective    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    NgxUploaderModule,
    HighchartsChartModule
  ]
})
export class DefaultModule { }
