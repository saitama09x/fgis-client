import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;

  constructor(
    public auth: AuthenticationService, 
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit()	{
  }

  sideBarToggler(event) {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
