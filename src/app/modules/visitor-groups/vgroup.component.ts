import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from '../../authentication.service';
import { VGroupService } from '../../services/vgroup-service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'visitor-group',
  templateUrl: './visitor-group.component.html',
  styles: []
})
export class VGroupComponent implements OnInit {

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
	  { prop : 'gname', name : "Title"},
	  { prop : 'gdesc', name : "Description"},
	  { prop : 'users', name : 'Total Users'}
  ];

  client : any = null;
  clientID : number = 0;
  sessionid : string = ""

 constructor(
 	public vserv : VGroupService,
 	public dialog: MatDialog,
 	private router: Router,
   public auth: AuthenticationService,
 	){


 }


 ngOnInit(): void {
 	this.client = this.auth.getUserDetails().client;
  this.clientID = this.client.clientID

	this.vserv.getGroups(this.clientID, (res) => {
		if(!res){
			return false
		}

		this.dt_rows = res
		this.dt_totalrows = res.length
	})

  this.vserv.doLoginNebula({ "msg_id" : '257', "user_name" : 'PhTeamDev', 'user_pwd' : 'GJiKJC26Xj^'}).then((res) => {
    if(typeof res.data != undefined){
        this.sessionid = res.data
    }
  })
 }

 addNewGroup(){
 	let dialogRef = this.dialog.open(AddGroupComponent, {
        width : '50%',
        role : 'alertdialog',
        data : { type : 'add', groupid : 0, clientID : this.clientID, sessionid : this.sessionid }
    });
  
  dialogRef.afterClosed().subscribe(result => {
       var $this = this
       if(result != 1){
         return false
       }

       Swal.fire({
        title: 'New group added successfully',
        icon: 'success',
        willClose : function(){
           $this.vserv.getGroups($this.clientID, (res) => {
              if(!res){
                return false
              }

              $this.dt_rows = res
              $this.dt_totalrows = res.length
            })
          }
      });
       
  		
  })

 }

  onSelect(id : number) {
    // var row = selected[0]
    this.router.navigate(['/visitor-groups/' + id + '/users']);
  }

  searchGroups( e : any ){
    var val = e.target.value;
    this.vserv.searchGroups(val).then((res) => {
        this.dt_rows = res
        this.dt_totalrows = res.length
    })
  }

  onEditModal(id : number){

      let dialogRef = this.dialog.open(AddGroupComponent, {
          width : '50%',
          role : 'alertdialog',
          data : { type : 'edit', groupid : id }
      });

      dialogRef.afterClosed().subscribe(result => {
          var $this = this
          if(result == 1){
            Swal.fire({
              title: 'Succesfully Updated Group',
              icon: 'success',
              willClose : function(){
                 $this.vserv.getGroups($this.clientID, (res) => {
                    if(!res){
                      return false
                    }

                    $this.dt_rows = res
                    $this.dt_totalrows = res.length
                  })
                }
            });
          }
      })

  }

  onDelete(val : any){
    var obj = {
        groupid : val,
        sessionid : this.sessionid
    }
    
    this.vserv.deleteGroup(obj).then((res) => {
        if(res){
            var $this = this
             Swal.fire({
              title: 'Succesfully Deleted',
              icon: 'success',
              willClose : function(){
                 $this.vserv.getGroups($this.clientID, (res) => {
                    if(!res){
                      return false
                    }

                    $this.dt_rows = res
                    $this.dt_totalrows = res.length
                  })
                }
            });
        }
    })
  }

}

@Component({
selector: 'add-group',
templateUrl: './modals/add-group.html',
styles: ['.mat-form-field-appearance-legacy .mat-form-field-label { color: rgb(0 0 0); }', '.mat-input-element {background: #00000052;}'],
providers: []
})
export class AddGroupComponent implements OnInit {
  gname_require : boolean = false;
  modal_type : string = "add";

	public form = new FormGroup({
		'gname' : new FormControl('', [Validators.required]),
		'gdesc' : new FormControl(),
	})

	constructor(
 	public vserv : VGroupService,
 	private dialogRef: MatDialogRef<VGroupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
 	){

 	}

 	ngOnInit(): void {
      this.modal_type = this.data.type
      if(this.modal_type == "edit"){
          this.vserv.editGroup(this.data.groupid).then((res) => {
              const { gname, gdesc } = this.form.controls
              gname.setValue(res.gname)
              gdesc.setValue(res.gdesc)
          })
      }

 	}

 	SubmitGroup(){
    const { gname, gdesc } = this.form.controls
    
    if(gname.invalid){
      this.gname_require = true
      return false;
    }

    this.gname_require = false

    var obj = {
        clientID : this.data.clientID,
        gname : (gname.value != null) ? gname.value : '',
        gdesc : (gdesc.value != null) ? gdesc.value : '',
        sessionid : this.data.sessionid
    }
    if(this.modal_type == 'add'){
      this.vserv.addNewGroup(obj).then((res) => {
       if(res){
           this.dialogRef.close(1)
       }
     })  
    }else{
      
      Object.assign(obj, { groupid : this.data.groupid });

      this.vserv.updateGroup(obj).then((res) => {
          if(res){
             this.dialogRef.close(1)
          }
      })

    }
 		
 	}

}

@Component({
selector: 'visitor-users',
templateUrl: './visitor-users.component.html',
styles: ['.mat-form-field-appearance-legacy .mat-form-field-label { color: rgb(0 0 0); }', 
'.mat-input-element {background: #00000052;}',
'.dt-avatar { width: 50px;border-radius: 30px; overflow: hidden; height: 50px;}',
'.mat-input-element {background: #00000052;}',
'.avatar-wrapper{ display: flex; justify-content: center;}',
'.avatar-img { width: 130px;border-radius: 70px;overflow: hidden; height: 130px;}',
'.avatar-img img {width:100%;}',
'.mat-icon { color: white;}'],
providers: []
})
export class VisitorUsersComponent implements OnInit {

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
  { prop : 'photo', name : "Photo"},
  { prop : 'fullname', name : "Fullname"},
  { prop : 'emailadd', name : 'Email'}
];

public form = new FormGroup({
  'fname' : new FormControl(),
  'lname' : new FormControl(),
  'gender' : new FormControl(),
  'age' : new FormControl(),
  'emailadd' : new FormControl(),
  'phone' : new FormControl(),
})

is_edit : boolean = false
has_selected : boolean = false

public photoUrl : string | File = "/assets/photo_default.png";
public photoObj : File = null;
clientID = 0;
client = {}

constructor(private route: ActivatedRoute, 
  public dialog: MatDialog,
  public vserv : VGroupService,
  public auth: AuthenticationService) {}

public groupId : number;
public userId : number
public sessionid : string = "";
public nebula_photo : string = "";
public has_lower_quality : boolean = false;
public quality = 0;
public loading = false
public loading_submit : boolean = false
ngOnInit(): void {

this.route.params.subscribe(params => {
   	this.groupId = params['id']; 
});

this.vserv.getGroupUsers(this.groupId).then((res) => {
    this.dt_rows = res;
    this.dt_totalrows = res.length
})

this.vserv.doLoginNebula({ "msg_id" : '257', "user_name" : 'PhTeamDev', 'user_pwd' : 'GJiKJC26Xj^'}).then((res) => {
  if(typeof res.data != undefined){
      this.sessionid = res.data
  }
})

var user = this.auth.getUserDetails().client;
this.clientID = user.clientID


const { fname, lname, gender, age, emailadd, phone } = this.form.controls;

fname.disable()
lname.disable()
gender.disable()
age.disable()
emailadd.disable()
phone.disable()

}

onSelect({ selected }) {
  var row = selected[0]
  const { fname, lname, gender, age, emailadd, phone } = this.form.controls;
  fname.disable()
  lname.disable()
  gender.disable()
  age.disable()
  emailadd.disable()
  phone.disable()

  fname.setValue(row.fname)
  lname.setValue(row.lname)
  gender.setValue(row.gender)
  age.setValue(row.age)
  emailadd.setValue(row.emailadd)
  phone.setValue(row.phone)
  this.nebula_photo = row.nebula_photo
  this.userId = row.Id
  this.photoUrl = (row.photo == null ) ? '/assets/photo_default.png' : '/users/photo/' + row.photo
  this.is_edit = false
  this.has_selected = true
}


deleteUser(){
  this.loading_submit = true
  var obj = {
    userid : this.userId,
    groupid : this.groupId,
    sessionid : this.sessionid,
    nebula_photo : this.nebula_photo
  }

  this.vserv.deleteUser(obj).then((res) => {
    this.loading_submit = false
    if(res){
        var $this = this
         Swal.fire({
          title: 'Succesfully Deleted',
          icon: 'success',
          willClose : function(){
             $this.vserv.getGroupUsers($this.groupId).then((res) => {
                  $this.dt_rows = res;
                  $this.dt_totalrows = res.length
              })
            }
        });
    }
  })
}

addNewUser(){
   let groupId = this.groupId
   let dialogRef = this.dialog.open(AddUserModal, {
        width : '50%',
        role : 'alertdialog',
        data : { groupId : groupId, sessionid : this.sessionid, clientID : this.clientID }
    });

   dialogRef.afterClosed().subscribe(result => {
     
     if(result != 1){
         return false
     }

     var $this = this
     Swal.fire({
        title: 'New user added successfully',
        icon: 'success',
        willClose : function(){
            $this.vserv.getGroupUsers($this.groupId).then((res) => {
                $this.dt_rows = res;
                $this.dt_totalrows = res.length
            })
          }
      });
  })
}

dismissAlert(){
  this.has_lower_quality = false
}

browseImage(profileImg){
   profileImg.click();
 }

onProfileChange(e) {
  if (e.target.files) {
    this.quality = 0
    this.has_lower_quality = false
    this.loading = true
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event:any) => {
      this.photoUrl = event.target.result;
      this.photoObj = file
      var formData = new FormData();
      formData.append('msg_id', '769');
      formData.append('img', file)
      formData.append('sessionid', this.sessionid);
      this.vserv.checkImageQuality(formData).then((res) => {
            this.loading = false
            var _res = JSON.parse(res)
            if(_res.code == -1101){
                this.has_lower_quality = true
                return
            }

            if(typeof _res.data != undefined){
                var data = _res.data[0]
                this.quality = Math.ceil(data.quality)
                if(data.quality < 80){
                    this.has_lower_quality = true
                }
            }
            
      })
    }
  }
}

onEdit(){

  const { fname, lname, gender, age, emailadd, phone } = this.form.controls;

  fname.enable()
  lname.enable()
  gender.enable()
  age.enable()
  emailadd.enable()
  phone.enable()

  this.is_edit = true

}

onSearch(e){
  var text = e.target.value;
  if(text != ""){
    this.vserv.searchUser(this.groupId, text).then((res) => {
         this.dt_rows = res;
         this.dt_totalrows = res.length
    })  
  }else{
      this.vserv.getGroupUsers(this.groupId).then((res) => {
        this.dt_rows = res;
        this.dt_totalrows = res.length
    })
  }
}

onUpdate(){

  const { fname, lname, gender, age, emailadd, phone } = this.form.controls;
  this.loading_submit = true
  var obj = {
     id :  this.userId,
     photo : this.photoObj,
     groupid : this.groupId,
     sessionid : this.sessionid,
     fname : (fname.value!=null) ? fname.value : '' ,
     lname : (lname.value!=null) ? lname.value : '' ,
     gender : (gender.value!=null) ? gender.value : '' ,
     age : (age.value!=null) ? age.value : '' ,
     emailadd : (emailadd.value!=null) ? emailadd.value : '' ,
     phone : (phone.value!=null) ? phone.value : '' ,
     nebula_photo : this.nebula_photo
  }

   let formData = new FormData();
   for(var i in obj){
     var _data = obj[i];
     formData.append(i, _data)
   }

   this.vserv.updateUser(formData).then((res) => {
        this.loading_submit = false
        if(res){
          var $this = this
          Swal.fire({
              title: 'User Updated Succesfully',
              icon: 'success',
              willClose : function(){
                  $this.vserv.getGroupUsers($this.groupId).then((res) => {
                      $this.dt_rows = res;
                      $this.dt_totalrows = res.length
                  })
                }
            });
        }
   })

}

}


@Component({
selector: 'visitor-users-modal',
templateUrl: './modals/add-user.html',
styles: ['.mat-form-field-appearance-legacy .mat-form-field-label { color: rgb(0 0 0); }', 
'.mat-input-element {background: #00000052;}',
'.avatar-wrapper{ display: flex; justify-content: center;}',
'.avatar-img { width: 130px;border-radius: 70px;overflow: hidden; height: 130px;}',
'.avatar-img img {width:100%;}',
'.mat-icon { color: #383838;}',
'.form-control{background-color: rgb(173 173 173);}'],
providers: []
})
export class AddUserModal implements OnInit {
  public photoUrl : string | File = "/assets/photo_default.png";
  public photoObj : File = null;
  public fname_require : boolean = false;
  public quality : number = 0
  public has_lower_quality : boolean = false
  public loading : boolean = false
  public loading_submit : boolean = false
  public config_selects : any = [];

  public form = new FormGroup({
    'fname' : new FormControl('', [Validators.required]),
    'lname' : new FormControl(),
    'gender' : new FormControl(),
    'age' : new FormControl(),
    'emailadd' : new FormControl(),
    'phone' : new FormControl(),
    'nebulaGrp' : new FormControl()
  })

  constructor(
   public vserv : VGroupService,
   public auth: AuthenticationService,
   private dialogRef: MatDialogRef<VisitorUsersComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any
   ){




   }

   ngOnInit(): void {

   }

   browseImage(profileImg){
     profileImg.click();
   }

    onProfileChange(e) {
      if (e.target.files) {
        this.quality = 0
        this.has_lower_quality = false
        this.loading = true
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event:any) => {
          this.photoUrl = event.target.result;
          this.photoObj = file
          var formData = new FormData();
          formData.append('msg_id', '769');
          formData.append('img', file)
          formData.append('sessionid', this.data.sessionid);
          this.vserv.checkImageQuality(formData).then((res) => {
                this.loading = false
                var _res = JSON.parse(res)
                if(_res.code == -1101){
                    this.has_lower_quality = true
                    return
                }

                if(typeof _res.data != undefined){
                    var data = _res.data[0]
                    this.quality = Math.ceil(data.quality)
                    if(data.quality < 80){
                        this.has_lower_quality = true
                    }
                }
                
          })
        }
      }
    }

   dismissAlert(){
       this.has_lower_quality = false
   }

   SubmitUser(){
     const { fname, lname, gender, age, emailadd, phone, nebulaGrp } = this.form.controls;

     if(fname.invalid){
       this.fname_require = true
       return false;
    }

    if(this.quality < 80){
        this.has_lower_quality = true
        return false
    }

    this.loading_submit = true

    const obj = {
         vgroupId : this.data.groupId,
         photo : this.photoObj,
         fname : (fname.value!=null) ? fname.value : '' ,
         lname : (lname.value!=null) ? lname.value : '' ,
         gender : (gender.value!=null) ? gender.value : '' ,
         age : (age.value!=null) ? age.value : '' ,
         emailadd : (emailadd.value!=null) ? emailadd.value : '' ,
         phone : (phone.value!=null) ? phone.value : '' ,
         nebulaGrp : (nebulaGrp.value!=null) ? nebulaGrp.value : '' ,
     }
     
     let formData = new FormData();
     for(var i in obj){
       var _data = obj[i];
       formData.append(i, _data)
     }

     this.vserv.AddNewUser(formData).then((res) => {

         if(res){
           var user_id = res.Id
           var form = new FormData()
           form.append("msg_id", "1029")
           form.append("lib_id", obj.nebulaGrp)
           form.append("img", this.photoObj)
           form.append("person_idcard", user_id)
           form.append('sessionid', this.data.sessionid)
           form.append('clientID', this.data.clientID)
           this.vserv.submitUserNebula(form).then((_res) => {
               console.log(_res)
               this.dialogRef.close(1)  
           })
         }
     })
   }
}