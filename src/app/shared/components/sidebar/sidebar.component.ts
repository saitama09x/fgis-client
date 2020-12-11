import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { NavItem } from 'src/app/shared/interface/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  logo = "";
  currURL = "";
  navItems: NavItem[];

  constructor(
    public auth: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if (this.auth.getUserDetails().client) {
      var companyLogo = this.auth.getUserDetails().client.company_logo;

      if (companyLogo) {
        this.logo = "users/logo/"+ companyLogo;
      } else {
        this.logo = "./assets/logo_default.png";
      }
    }
    
    var urlArr = this.router.url.split("/");
    this.currURL = urlArr[urlArr.length - 1];

    switch (this.auth.getUserDetails()?.roleID) {
      case 1:
        this.navItems = [
          {
            displayName: 'Clients',
            route: 'clients',
          },
          {
            displayName: 'Wifi Beacon',
            route: 'wifiBeacons',
          },
          {
            displayName: 'Tracking',
            children: [
              {
                displayName: 'Cameras',
                route: 'trackingCameras',
              },
              {
                displayName: 'Visitors',
                route: 'visitor-groups',
              }
            ]
          },
          {
            displayName: 'Campaign',
            children: [
              {
                displayName: 'FR Interactive Video',
                children: [
                  {
                    displayName: 'Cameras',
                    route: 'frInteractiveCameras',
                  },
                  {
                    displayName: 'Body Gestures',
                    route: 'bodyGestures',
                  },
                  {
                    displayName: 'Facial Expressions',
                    route: 'facialExpressions',
                  }
                ]
              },
              {
                displayName: 'SmileToVote',
                children: [
                  {
                    displayName: 'Cameras',
                    route: 'smileToVoteCameras',
                  }
                ]
              }
            ]
          }
        ];
        break;

      case 2:
        this.navItems = [
          {
            displayName: 'Registration',
            route: 'registration',
          },
          {
            displayName: 'Wifi Beacon',
            route: 'wifiBeaconReport',
          },
          {
            displayName: 'Tracking',
            children: [
              {
                displayName: 'Cameras',
                route: 'trackingCameraConfig',
              },
              {
                displayName: 'Basic Tracking',
                route: 'trackingReport',
              },
              {
                displayName: 'Live Demographics',
                route: 'liveTrackingReport',
              }
            ]
          },
          {
            displayName : 'Account',
            children: [
              {
                displayName: 'Profile',
                route: 'account',
              },
            ]
          }
        ];
        break;
    }
  }
}
