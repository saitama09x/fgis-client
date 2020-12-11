import { Component, OnInit, Input } from '@angular/core';
import { ADMIN_ROUTES } from './sidebar-routes-admin.config';
import { ACCOUNT, CLIENT_ROUTES, REGISTRATION, WIFI_BEACON_REPORT, TRACKING, CAMPAIGN, FR_INTERACTIVE_VIDEO, SMILETOVOTE } from './sidebar-routes-client.config';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { SidebarService } from "../sidebar/sidebar.service";
import { AuthenticationService } from '../../authentication.service';

import * as $ from 'jquery';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    
    public menuItems: any[];
    public user;
    
    @Input()
    company_logo : string;

    @Input()
    company_name : string;

    constructor( 
        public sidebarservice: SidebarService,
        private router: Router, 
        private auth:AuthenticationService) {

        this.user = this.auth.getUserDetails();

        router.events.subscribe( (event: Event) => {

            if (event instanceof NavigationStart) {
                // Show loading indicator
            }

            if (event instanceof NavigationEnd && $(window).width() < 1025 && ( document.readyState == 'complete' || false ) ) {

                this.toggleSidebar();
                // Hide loading indicator
               
            }

            if (event instanceof NavigationError) {
                // Hide loading indicator

                // Present error to user
                console.log(event.error);
            }
        });

    }

        
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());

    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }
    

    ngOnInit() {
        switch (this.user.roleID)
        { 
            case 1:
                this.menuItems = ADMIN_ROUTES.filter(menuItem => menuItem);
                break;
            case 2:
                if (this.user.client.user_reg == 1 && CLIENT_ROUTES.indexOf(REGISTRATION) == -1)
                    CLIENT_ROUTES.push(REGISTRATION);

                if (this.user.client.wifi_beacon == 1 && CLIENT_ROUTES.indexOf(WIFI_BEACON_REPORT) == -1)
                    CLIENT_ROUTES.push(WIFI_BEACON_REPORT);

                if (this.user.client.tracking == 1 && CLIENT_ROUTES.indexOf(TRACKING) == -1)
                    CLIENT_ROUTES.push(TRACKING);
                        if(CLIENT_ROUTES.indexOf(ACCOUNT) == -1)
                            CLIENT_ROUTES.push(ACCOUNT);

                if (this.user.client.fr_inter_video == 1 || this.user.client.smileToVote == 1) {
                    if (CLIENT_ROUTES.indexOf(CAMPAIGN) == -1)
                        CLIENT_ROUTES.push(CAMPAIGN);

                    if (this.user.client.fr_inter_video == 1 && CAMPAIGN.submenu.indexOf(FR_INTERACTIVE_VIDEO) == -1)
                        CAMPAIGN.submenu.push(FR_INTERACTIVE_VIDEO);

                    if (this.user.client.smileToVote == 1 && CAMPAIGN.submenu.indexOf(SMILETOVOTE) == -1)
                        CAMPAIGN.submenu.push(SMILETOVOTE);
                }

                

                this.menuItems = CLIENT_ROUTES.filter(menuItem => menuItem);
                break;
        }

        $.getScript('./assets/js/app-sidebar.js');
    }

}
