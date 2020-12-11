import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from '../../authentication.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2'


@Component({
  selector: 'License',
  templateUrl: './license.component.html',
  styles: []
})
export class LicenseComponent implements OnInit {

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

  dt_columns = [
	  { prop : 'id', name : "#"},
	  { prop : 'title', name : "License Title"},
	  { prop : 'expiration', name : 'Start / End Expiration'},
	  { prop : 'action', name : 'Action'},
  ];

	constructor(){

	}

	ngOnInit(): void {


	}

}
