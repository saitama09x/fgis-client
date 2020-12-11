import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from '../../authentication.service';
import { GroupService } from '../../services/group.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { User } from '../../models/User';
import { Visitor } from '../../models/Visitor';
import { Group } from 'src/app/models/Group';
import * as moment from 'moment';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { initVisitor } from '../../states/actions/group.actions';
import { GroupState } from '../../states/interfaces/interfaces.types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm = new FormGroup({
    'first_name': new FormControl('', [Validators.required]),
    'last_name': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'bday' : new FormControl('', [Validators.required, Validators.pattern("^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i")]),
    'phone': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")]),
  });

  isSavingData = false;
  groupID;
  group:Group;
  photo_file: File | null;
  photo;

  constructor(
    private auth: AuthenticationService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ visitor : GroupState }>
    ) { }

  ngOnInit(): void {
    this.photo = "./assets/photo_default.png";  
    this.getGroupInfo();
  }
  
  getErrorMessage(input) {
    var control = this.userForm.controls[input];

    switch (input) {
      case "email":        
        if (control.hasError('required')) {
          return 'You must enter your email';
        } else if (control.hasError('emailExists')) {
          return 'Email already used'
        }
        return control.hasError('email') ? 'Not a valid email' : '';
      case "first_name":
        if (control.hasError('required'))
          return 'You must enter your first name';
      case "last_name":
        if (control.hasError('required'))
          return 'You must enter your last name';
      case "phone":
        if (control.hasError('required')) {
          return 'You must your phone number';
        } else if (control.hasError('phoneExists')) {
          return 'Phone number already used';
        }
       case "bday" :
         if(control.hasError('required'))
           return "Please follow this format (MM/DD/YYYY)"
    }
    
    return "";
  }

  getGroupInfo() {
    this.groupID = this.route.snapshot.paramMap.get("groupID");

    this.groupService.get(this.groupID).subscribe(
      (data) => {
        this.group = data;
      },
      err => {
        console.error(err);
      })
  }

  async onRegister() {
    this.isSavingData = true;
    var user = new Visitor();
    user.email = this.userForm.controls['email'].value;
    user.first_name = this.userForm.controls['first_name'].value;
    user.last_name = this.userForm.controls['last_name'].value;
    user.phone = this.userForm.controls['phone'].value;
    user.bday = this.userForm.controls['bday'].value;
    user.photo = this.photo_file;

    let email_exists = await this.groupService.checkVisitorEmail(user.email);
    let phone_exists = await this.groupService.checkVisitorPhone(user.phone);

    if(email_exists){
        this.userForm.controls['email'].setErrors({'emailExists': true});
        this.isSavingData = false;
        return;
    }else if(phone_exists){
        this.userForm.controls['phone'].setErrors({'phoneExists': true});
        this.isSavingData = false;
        return;
    }
    
    var formData = new FormData();    
    for(var i in user){
        
        if( i == "bday"){
            formData.append(i, moment(new Date(user[i]).toLocaleDateString()).format("YYYY-MM-DD"));  
            continue;
        }

        formData.append(i, user[i]);
    }

    let post = await this.groupService.addVisitors(formData, this.group.groupID);
    var $this = this;

    if(post){
        this.isSavingData = false;
        this.userForm.reset();
        Swal.fire({
          title : 'Succesfully Updated',
          icon: 'success',
          willClose : function(){
             $this.router.navigate(['/registration']);
          }
        });
    }

 }

  onPhotoChange(e) {
    if (e.target.files) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event:any) => {
        this.photo_file = file;
        this.photo = event.target.result;
      }
    }
  }

  browsePhoto(photoFile) {
    photoFile.click();
  }
}

