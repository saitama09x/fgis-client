import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuardService } from './auth-guard.service';
import { AuthGuardPatronService } from './auth-guard-patron.service';
import { AuthGuardAdminService } from './auth-guard-admin.service';
import { AuthGuardHomeService } from './auth-guard-home.service';
import { AuthGuardDashboardService } from './auth-guard-dashboard.service';

import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ClientComponent } from './modules/client/client.component';
import { AccountComponent } from './modules/account/account.component';
import { CampaignComponent } from './modules/campaign/campaign.component';
import { AssetComponent } from './modules/asset/asset.component';
import { SettingComponent } from './modules/setting/setting.component';
import { BodyGestureComponent } from './modules/body-gesture/body-gesture.component';
import { FacialExpressionComponent } from './modules/facial-expression/facial-expression.component';
import { CameraComponent } from './modules/camera/camera.component';
import { WifiBeaconComponent } from './modules/wifi-beacon/wifi-beacon.component';
import { WifiBeaconReportComponent } from './modules/wifi-beacon-report/wifi-beacon-report.component';
import { GroupsComponent } from './modules/groups/groups.component';
import { VisitorComponent } from './modules/visitor/visitor.component';
import { RegisterComponent } from './modules/register/register.component';
import { TrackingComponent } from './modules/tracking/tracking.component';
import { TrackingReportComponent } from './modules/tracking-report/tracking-report.component';
import { SmileToVoteCamerasComponent } from './modules/smile-to-vote-cameras/smile-to-vote-cameras.component';
import { SmileToVoteComponent } from './modules/smile-to-vote/smile-to-vote.component';
import { TrackingCameraConfigComponent } from './modules/tracking-camera-config/tracking-camera-config.component';
import { LiveTrackingReportComponent } from './modules/live-tracking-report/live-tracking-report.component';
import { VGroupComponent, VisitorUsersComponent } from 'src/app/modules/visitor-groups/vgroup.component';
import { LicenseComponent } from 'src/app/modules/licenses/license.component';

const routes: Routes = [
  { path: 'login',
      component: LoginComponent,
      canActivate: [AuthGuardService]
  },
  { path: 'dashboard',
      component: FullLayoutComponent,
      children: [{ path: '', component: DashboardComponent, canActivate: [AuthGuardDashboardService]}]
  },
  { path: 'register/:groupID', component: RegisterComponent },
  { path: 'clients', 
    component: FullLayoutComponent,
    children: [{ path: '', component: ClientComponent, canActivate: [AuthGuardAdminService]}]
  },

  { path: 'account', 
    component: FullLayoutComponent,
    children: [{ path: '', component: AccountComponent, canActivate: [AuthGuardDashboardService]}]
  },
  { 
    path: 'facialExpressions',
    component: FullLayoutComponent,     
    children: [{ path: '', component: FacialExpressionComponent, canActivate: [AuthGuardAdminService ]}] 
  },  
  { 
    path: 'licenses',
    component: FullLayoutComponent,     
    children: [{ path: '', component: LicenseComponent, canActivate: [AuthGuardAdminService ]}] 
  },  
  { 
    path: 'bodyGestures',
    component: FullLayoutComponent,
    children: [{ path: '', component: BodyGestureComponent, canActivate: [AuthGuardAdminService ]}] 
  },
  { 
    path: 'frInteractiveCameras',
    component: FullLayoutComponent,
    children: [{ path: '', component: CameraComponent, canActivate: [AuthGuardAdminService ]}] 
  },
  { 
    path: 'wifiBeacons',
    component: FullLayoutComponent,
    children: [{ path: '', component: WifiBeaconComponent, canActivate: [AuthGuardAdminService]}] 
  },
  { 
    path: 'trackingCameras',
    component: FullLayoutComponent,
    children: [{ path: '', component: TrackingComponent, canActivate: [AuthGuardAdminService]}] 
  },
  { 
    path: 'smileToVoteCameras',
    component: FullLayoutComponent,
    children: [{ path: '', component: SmileToVoteCamerasComponent, canActivate: [AuthGuardAdminService]}] 
  },
  { 
    path: 'frInteractiveVideo', 
    component: FullLayoutComponent,
    children: [{ path: '', component: CampaignComponent, canActivate: [AuthGuardPatronService ]}] 
  },
  { 
    path: 'frInteractiveVideo/:campaignID/assets',
    component: FullLayoutComponent,
    children: [{ path: '', component: AssetComponent, canActivate: [AuthGuardPatronService] }] 
  },
  { 
    path: 'smileToVote', 
    component: FullLayoutComponent,
    children: [{ path: '', component: SmileToVoteComponent, canActivate: [AuthGuardPatronService ]}] 
  },
  { 
    path: 'settings',
    component: FullLayoutComponent,
    children: [{ path: '', component: SettingComponent, canActivate: [AuthGuardPatronService] }] 
  },
  { 
    path: 'wifiBeaconReport',
    component: FullLayoutComponent,
    children: [{ path: '', component: WifiBeaconReportComponent, canActivate: [AuthGuardPatronService]}] 
  },
  { 
    path: 'registration',
    component: FullLayoutComponent,
    children: [{ path: '', component: GroupsComponent, canActivate: [AuthGuardPatronService]}] 
  },
   { 
    path: 'registration/visitors',
    component: FullLayoutComponent,
    children: [{ path: '', component: VisitorComponent, canActivate: [AuthGuardPatronService]}] 
  },
  { 
    path: 'trackingReport',
    component: FullLayoutComponent,
    children: [{ path: '', component: TrackingReportComponent, canActivate: [AuthGuardPatronService]}] 
  },
  { 
    path: 'liveTrackingReport',
    component: FullLayoutComponent,
    children: [{ path: '', component: LiveTrackingReportComponent, canActivate: [AuthGuardPatronService]}] 
  },
  { 
    path: 'visitor-groups',
    component: FullLayoutComponent,
    children: [{ path: '', component: VGroupComponent, canActivate: [AuthGuardPatronService]}] 
  },
   { 
    path: 'visitor-groups/:id/users',
    component: FullLayoutComponent,
    children: [{ path: '', component: VisitorUsersComponent, canActivate: [AuthGuardPatronService]}] 
  },
  { 
    path: 'trackingCameraConfig',
    component: FullLayoutComponent,
    children: [{ path: '', component: TrackingCameraConfigComponent, canActivate: [AuthGuardPatronService]}] 
  },
  { 
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuardHomeService]
  }
  // {
  //   path: '',
  //   redirectTo: 'dashboard/ecommerce-v1',
  //   pathMatch: 'full',
  // },
  // { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES },
  // { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  // { path: '**', redirectTo: 'dashboard/ecommerce-v1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
