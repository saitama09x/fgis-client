import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { ToastrModule } from 'ngx-toastr';
import { UiSwitchModule } from 'ngx-ui-switch';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthGuardPatronService } from './auth-guard-patron.service';
import { AuthGuardAdminService } from './auth-guard-admin.service';
import { AuthGuardHomeService } from './auth-guard-home.service';
import { AuthGuardDashboardService } from './auth-guard-dashboard.service';

import { NgxUploaderModule } from 'ngx-uploader';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ConfirmationDialogComponent } from './modules/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './modules/confirmation-dialog/confirmation-dialog.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

import { ClientComponent } from 'src/app/modules/client/client.component';
import { AccountComponent } from 'src/app/modules/account/account.component';
import { WifiBeaconComponent } from 'src/app/modules/wifi-beacon/wifi-beacon.component';
import { WifiBeaconReportComponent } from 'src/app/modules/wifi-beacon-report/wifi-beacon-report.component';
import { GroupsComponent } from 'src/app/modules/groups/groups.component';
import { VisitorComponent } from 'src/app/modules/visitor/visitor.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { TrackingComponent } from 'src/app/modules/tracking/tracking.component';
import { LicenseComponent } from 'src/app/modules/licenses/license.component';
import { TrackingReportComponent } from 'src/app/modules/tracking-report/tracking-report.component';
import { SmileToVoteCamerasComponent } from 'src/app/modules/smile-to-vote-cameras/smile-to-vote-cameras.component';
import { SmileToVoteComponent } from 'src/app/modules/smile-to-vote/smile-to-vote.component';
import { TrackingCameraConfigComponent, EditTrackingComponent, EditCameraStat } from 'src/app/modules/tracking-camera-config/tracking-camera-config.component';
import { LiveTrackingReportComponent } from 'src/app/modules/live-tracking-report/live-tracking-report.component';
import { CameraComponent } from 'src/app/modules/camera/camera.component';
import { AssetComponent } from 'src/app/modules/asset/asset.component';
import { FacialExpressionComponent } from 'src/app/modules/facial-expression/facial-expression.component';
import { BodyGestureComponent } from 'src/app/modules/body-gesture/body-gesture.component';
import { CampaignComponent } from 'src/app/modules/campaign/campaign.component';
import { SettingComponent } from 'src/app/modules/setting/setting.component';
import { QRCodeModule } from 'angularx-qrcode';
import { StoreModule } from '@ngrx/store';
import { uploadReducer, accountReducer } from './states/reducers/users.reducers';
import { VisitorReducer } from './states/reducers/group.reducers';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { VGroupComponent, AddGroupComponent, VisitorUsersComponent, AddUserModal } from 'src/app/modules/visitor-groups/vgroup.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

import * as $ from 'jquery';
import { DashboardComponent } from './src/app/modules/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ConfirmationDialogComponent,
    ContentLayoutComponent,
    ClientComponent,
    AccountComponent,
    WifiBeaconComponent,
    WifiBeaconReportComponent,
    GroupsComponent,
    VisitorComponent,
    RegisterComponent,
    TrackingComponent,
    VGroupComponent,
    AddGroupComponent,
    VisitorUsersComponent,
    AddUserModal,
    LicenseComponent,
    TrackingReportComponent,
    SmileToVoteCamerasComponent,
    SmileToVoteComponent,
    TrackingCameraConfigComponent,
    EditTrackingComponent,
    EditCameraStat,
    TrackingReportComponent,
    LiveTrackingReportComponent,
    CameraComponent,
    AssetComponent,
    FacialExpressionComponent,
    CampaignComponent,
    SettingComponent,
    BodyGestureComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    StoreModule.forRoot({ upload : uploadReducer, account : accountReducer, visitor : VisitorReducer }),
    ToastrModule.forRoot(),
    UiSwitchModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDKXKdHQdtqgPVl2HI2RnUa_1bjCxRCQo4'}),
    SweetAlert2Module.forRoot(),
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,    
    NgxUploaderModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSidenavModule,
    MatMomentDateModule,
    MatPaginatorModule,
    ChartsModule,
    NgApexchartsModule,
    QRCodeModule
  ],
  providers: [
    AuthenticationService, AuthGuardService, AuthGuardPatronService, AuthGuardAdminService, AuthGuardHomeService, AuthGuardDashboardService, ConfirmationDialogService,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
