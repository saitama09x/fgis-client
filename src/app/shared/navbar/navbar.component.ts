import { Component , OnInit, Input } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
    public user;

    @Input()
    public profile_pic;

    @Input()
    public profile_name;

    constructor(
        public sidebarservice: SidebarService,
        public auth: AuthenticationService
    ) {
        this.user = this.auth.getUserDetails();
     }
        
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
        
        if ($("#wrapper").hasClass("nav-collapsed")) {
            // unpin sidebar when hovered
            $("#wrapper").removeClass("nav-collapsed");
            $("#sidebar-wrapper").unbind( "hover");
        } else {
            $("#wrapper").addClass("nav-collapsed");
            $("#sidebar-wrapper").hover(
                function () {
                    $("#wrapper").addClass("sidebar-hovered");
                },
                function () {
                    $("#wrapper").removeClass("sidebar-hovered");
                }
            )
      
        }
    }
    
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    
    ngOnInit() {

        /* Search Bar */
        $(document).ready(function () {
            $(".search-btn-mobile").on("click", function () {
                $(".search-bar").addClass("full-search-bar");
            });
            $(".search-arrow-back").on("click", function () {
                $(".search-bar").removeClass("full-search-bar");
            });
        });

    }
}
