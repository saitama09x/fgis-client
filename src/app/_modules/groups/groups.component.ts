import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { GroupService } from '../../services/group.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '../../models/Group';
import { User } from '../../models/User';
import { Store } from '@ngrx/store';
import { initVisitor } from '../../states/actions/group.actions';
import { GroupState } from '../../states/interfaces/interfaces.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groupForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'desc': new FormControl('', [Validators.required])
  });

  originURL = "";
  clientID = 0;
  modalTitle = "";
  isSavingData = false;
  groups:Group[];
  group:Group;
  users:User[];
  loadingIndicator : boolean = false;

  dt_columns = [
  { prop : 'name', name : "Name"},
  { prop : 'description', name : "Description"},
  { prop : 'users', name : "Users"},
  { prop : 'link', name : "Registration Link"},
  { prop : 'code', name : "QR Code"},
  { prop : 'action', name : "Action"},
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
    public auth: AuthenticationService,
    private groupService: GroupService, 
    private modalService: NgbModal, 
    private confirmationDialogService: ConfirmationDialogService,
    public dialog: MatDialog,
    private store: Store<{ visitor : GroupState }>,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.originURL = window.location.origin + '/#/';
    this.clientID = this.auth.getUserDetails().client.clientID;
    this.getGroups();
  }

  getErrorMessage(input) {
    var control = this.groupForm.controls[input];

    switch (input) {
      case 'name':
        if (control.hasError('required'))
          return 'You must enter the group name';
      case 'desc':
        if (control.hasError('required'))
          return 'You must enter the group description';      
    }

    return "";
  }

  getGroups() {
    this.groupService.getGroups(this.clientID).subscribe(
      (data) => {
        this.groups = data;
        var obj_arr = [];
        data.map((item) => {
            obj_arr.push({
                name : item.name,
                description : item.desc,
                users : item.totalUsers,
                link : this.originURL +'register/'+ item.groupID,
                code : this.originURL +'register/'+ item.groupID,
                action : item,
            });
        });

        if(obj_arr.length){
            this.dt_initSelect = obj_arr;
        }

        this.dt_rows = obj_arr;
        this.dt_totalrows = obj_arr.length;
        this.dt_paginate = new Array(Math.ceil(obj_arr.length / this.dt_limit)).fill("").map((item, index) => {
            return index + 1;
        });

        this.dt_page = this.dt_limit
      },
      err => {
        console.error(err);
      }
    )
  }

  onCreate(content) {
    this.clearForm();

    this.group = new Group();    
    this.group.clientID = this.clientID;

    this.modalTitle = "New Group";
    this.modalService.open(content, {ariaLabelledBy: 'modal-group'});
  }

  onEdit(content, group) {
    this.clearForm();

    this.groupForm.controls['name'].setValue(group.name);
    this.groupForm.controls['desc'].setValue(group.desc);

    this.group = new Group();
    this.group.groupID = group.groupID;

    this.modalTitle = "Edit Group";
    this.modalService.open(content, {ariaLabelledBy: 'modal-group'});
  }

  onSave(modal) {
    this.isSavingData = true;
    this.groupForm.disable();

    this.group.name = this.groupForm.controls['name'].value;
    this.group.desc = this.groupForm.controls['desc'].value;

    if (this.group.groupID == 0) {
      this.groupService.add(this.group).subscribe(
        (data) => {
          if (!data.error) {
            // this.groups.push(data);
            this.getGroups();
            modal.dismiss();
          } else {
            this.isSavingData = false;
            this.groupForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    } else {
      this.groupService.update(this.group).subscribe(
        (data) => {
          if (!data.error) {
            var index = this.getIndex(this.group.groupID);

            if (index > -1)
              this.groups[index] = data;

            modal.dismiss();
          } else {
            this.isSavingData = false;
            this.groupForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    }
  }

  onDelete(group) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete "'+ group.name +'"?', "Yes", "No", "sm")
    .then((confirmed) => {
        if (confirmed) {
          this.groupService.delete(group.groupID).subscribe(
            (data) => {
              if (data.error == -1) {
                this.dialog.open(DeleteGroupErrorDialog);
              } else {
              /*var index = this.getIndex(group.groupID);
      
              if (index > -1)
                this.groups.splice(index, 1);
              }*/
                this.getGroups();
              }
            },
            err => {
              console.error(err);
            }
          )    
        }
      }
    )
  }

  onShowUsers(content, group) {
    this.groupService.getUsers(group.groupID).subscribe(
      (data) => {
        this.users = data;
        this.modalService.open(content, {ariaLabelledBy: 'modal-users'});
      },
      err => {
        console.error(err);
      }
    )
  }

  onShowVisitors(group : any){

      this.store.dispatch(initVisitor({
          groupId : group.groupID,
          clientId : group.clientID,
          name : group.name,
          description : group.desc
      }));

      this.router.navigate(['/registration/visitors']);
  }


  onDeleteUser(user) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete "'+ user.first_name +" "+ user.last_name +'"?', "Yes", "No", "sm")
    .then((confirmed) => {
        if (confirmed) {
          this.groupService.deleteUser(user.userID).subscribe(
            (data) => {
              var index = this.getUserIndex(user.userID);
      
              if (index > -1)
                this.users.splice(index, 1);
            },
            err => {
              console.error(err);
            }
          )    
        }
      }
    )
  }

  onDownloadImage(event){
    var target = event.target;
    var anchor = target.parentElement.parentElement.parentElement;
    anchor.target = '_blank';
    anchor.href = target.getAttribute('src');
    anchor.download = "QR Code";
  }

  getIndex(groupID) {
    for (var i = 0; i < this.groups.length; i++) {
      var group = this.groups[i];

      if (group.groupID == groupID)
        return i;
    }

    return -1;
  }

  getUserIndex(userID) {
    for (var i = 0; i < this.users.length; i++) {
      var user = this.users[i];

      if (user.userID == userID)
        return i;
    }

    return -1;
  }

  clearForm() {
    this.isSavingData = false;

    this.groupForm.enable();
    this.groupForm.reset();
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
      this.groupService.pagingServer(this.clientID, limit, offset, this.dt_search).subscribe((res) => {
          this.dt_selected = [];
          var obj_arr = [];
          res.map((item) => {
              obj_arr.push({
                  name : item.name,
                  description : item.desc,
                  users : item.totalUsers,
                  link : this.originURL +'register/'+ item.groupID,
                  code : this.originURL +'register/'+ item.groupID,
                  action : item,
              });
          })
          this.dt_initSelect = obj_arr
          this.dt_rows = obj_arr;
          this.dt_offsetpage = offset;

          if(offset != 0){
              if(obj_arr.length < limit){
                var min = limit - obj_arr.length;
                this.dt_page = ((offset + 1) * limit) - min
            }
            else if(obj_arr.length == limit){
                this.dt_page = ((offset + 1) * limit)
            }
          }
          else{
            this.dt_page = obj_arr.length;
          }

      });
  }

  dt_onSelect({ selected }){
      this.dt_selected = selected
      this.dt_initSelect = []
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
      this.dt_search = value;
      this.loadingIndicator = true;
      this.groupService.searchGroups(value, this.clientID).subscribe((res) => {

        var obj_arr = [];
        res.map((item) => {
            obj_arr.push({
                name : item.name,
                description : item.desc,
                users : item.totalUsers,
                link : this.originURL +'register/'+ item.groupID,
                code : this.originURL +'register/'+ item.groupID,
                action : item,
            });
        });

        this.dt_selected = [];
        this.dt_initSelect = obj_arr
        this.dt_rows = obj_arr;
        this.dt_totalrows = obj_arr.length;
        this.loadingIndicator = false;
        this.dt_offsetpage = 0;
        this.dt_paginate = new Array(Math.ceil(obj_arr.length / this.dt_limit)).fill("").map((item, index) => {
            return index + 1;
        });

      })
  }

}

@Component({
  selector: 'dialog-elements-dialog',
  templateUrl: 'dialog.html'
})
export class DeleteGroupErrorDialog {}