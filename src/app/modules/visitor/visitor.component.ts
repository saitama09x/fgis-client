import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { GroupService } from '../../services/group.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '../../models/Group';
import { Store } from '@ngrx/store';
import { initVisitor } from '../../states/actions/group.actions';
import { GroupState } from '../../states/interfaces/interfaces.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'visitor-component',
  templateUrl: './visitor.template.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {

  public visitor$ : Observable<GroupState>
  public groupname : string = "";
  public groupdesc : string = "";
  public groupid : number = 0;

  dt_columns = [
    { prop : 'photo', name : "Photo"},
    { prop : 'first_name', name : "First Name"},
    { prop : 'last_name', name : "Last Name"},
    { prop : 'phone', name : "Phone"},
    { prop : 'email', name : "Email"},
    { prop : 'bday', name : "Birthday"},
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

  constructor(
    private store: Store<{ visitor : GroupState }>,
    private groupService: GroupService
    ){

  }

  ngOnInit(): void {
      this.visitor$ = this.store.select('visitor');
      var $this = this;
      this.visitor$.subscribe( async (res) => {
          this.groupname = res.name;
          this.groupdesc = res.description
          this.groupid = res.groupId;
          let _res = await this.groupService.getAllVisitors(res.groupId);
          
          if(_res.length){
            this.dt_initSelect = _res;
          }

          this.dt_rows = _res;
          this.dt_totalrows = _res.length
          this.dt_paginate = new Array(Math.ceil(_res.length / this.dt_limit)).fill("").map((item, index) => {
            return index + 1;
          });

          this.dt_page = this.dt_limit
      })
  }

  dt_movePrev(){
      if(this.dt_offsetpage > 0){
         this.dt_offsetpage = this.dt_offsetpage - 1;
         this.dt_setPage({ limit : this.dt_limit, offset : this.dt_offsetpage })
      }
  }

  dt_moveNext(){
      if((this.dt_offsetpage + 1) < (Math.ceil(this.dt_totalrows / this.dt_limit))){
         this.dt_offsetpage = this.dt_offsetpage + 1;
         this.dt_setPage({ limit : this.dt_limit, offset : this.dt_offsetpage })
      }
  }  

  dt_setPage({limit, offset}){
       this.groupService.pagingServerVisitor(this.groupid, limit, offset, this.dt_search).subscribe((res) => {
          this.dt_selected = [];

          this.dt_initSelect = res
          this.dt_rows = res;
          this.dt_offsetpage = offset;

          if(offset != 0){
              if(res.length < limit){
                var min = limit - res.length;
                this.dt_page = ((offset + 1) * limit) - min
            }
            else if(res.length == limit){
                this.dt_page = ((offset + 1) * limit)
            }
          }
          else{
            this.dt_page = res.length;
          }

      });
  }

  dt_onSelect({ selected }){
      this.dt_selected = selected
      this.dt_initSelect = [];
  }

  dt_onActive(event){

  }

  dt_rowClass(row){
      return {
         'active' : row.active
      }
  }

  onSearch(event){
      var value = event.target.value;
      this.groupService.searchVisitors(value, this.groupid).subscribe((res) => {
          var obj_arr = [];
          for(var i in res){
              var img = "/assets/photo_default.png";
              if(res[i].photo != null){
                img = "/users/photo/" + res[i].photo
              }

              Object.assign(res[i], { photo : img })
              obj_arr.push(res[i]);
          }
          
          if(obj_arr.length){
            this.dt_initSelect = obj_arr;
          }
          this.dt_selected = [];
          this.dt_rows = obj_arr;
          this.dt_totalrows = obj_arr.length
          this.dt_offsetpage = 0;
          this.dt_paginate = new Array(Math.ceil(obj_arr.length / this.dt_limit)).fill("").map((item, index) => {
              return index + 1;
          });
          if(obj_arr.length < this.dt_limit){
              this.dt_page = obj_arr.length
          }
          else if(obj_arr.length >= this.dt_limit){
              this.dt_page = obj_arr.length
          }
      })
  }

}