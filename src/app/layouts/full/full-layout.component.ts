import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../shared/sidebar/sidebar.service'
import { AuthenticationService } from '../../authentication.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UploadState, AccountState } from '../../states/interfaces/interfaces.types';

@Component({
    selector: 'app-full-layout',
    templateUrl: './full-layout.component.html',
    styleUrls: ['./full-layout.component.scss']
})

export class FullLayoutComponent implements OnInit {
    
    public upload$ : Observable<UploadState>
    public account$ : Observable<AccountState>

    constructor(public sidebarservice: SidebarService,
                private router: Router,
                private auth:AuthenticationService,
                private store: Store<{ upload : UploadState, account : AccountState }>) { }
        
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
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
        
        this.auth.getUserEmail();
        this.upload$ = this.store.select('upload');
        this.account$ = this.store.select('account');

    }

}