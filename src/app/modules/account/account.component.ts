import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { ClientService } from '../../services/client.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Client } from '../../models/Client';
import { FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { UploadPhoto, UploadLogo, CompanyName, ProfileName} from '../../states/actions/users.actions';
import { UploadState, AccountState } from '../../states/interfaces/interfaces.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

   public clientForm = new FormGroup({
    'company_name': new FormControl('', [Validators.required]),
    'first_name': new FormControl('', [Validators.required]),
    'last_name': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'phone': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")]),
    'password': new FormControl('', [Validators.required])
  });

  public company_logo;
  public company_logo_file: File | null;
  public profile_pic;
  public profile_pic_img : File | null;
  public client = null;
  public upload$ : Observable<UploadState>
  
	constructor(
    public auth: AuthenticationService, 
    private clientService: ClientService, 
    private store: Store<{ upload : UploadState }>
    ){	
		  
    }

	ngOnInit(): void {
      
      this.client = this.auth.getUserDetails().client;
      let user = this.auth.getUserDetails();
      
      //This will fetch logo and photo from store
      this.upload$ = this.store.select('upload');
      var $this = this
      this.upload$.subscribe((res) => {
          $this.company_logo = (res.company_logo == '' ) ? "./assets/logo_default.png" : "users/logo/" + res.company_logo;  
          $this.profile_pic = (res.profile_pic == '' ) ? "./assets/logo_default.png" : "users/photo/" + res.profile_pic;
      });

      
      // this.company_logo = (this.client.company_logo == '' ) ? "./assets/logo_default.png" : "users/logo/" + this.client.company_logo;  
      // this.profile_pic = (user.photo == '' ) ? "./assets/logo_default.png" : "users/photo/" + user.photo;

      var controls = this.clientForm.controls;

      controls.company_name.setValue(this.client.company_name)
      controls.first_name.setValue(user.first_name)
      controls.last_name.setValue(user.last_name)
      controls.email.setValue(user.email)
      controls.phone.setValue(user.phone)
	}

  browseLogo(companyLogoFile) {
    companyLogoFile.click();
  }

  onCompanyLogoChange(e) {
    if (e.target.files) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event:any) => {
        this.company_logo_file = file;
        this.company_logo = event.target.result;
      }
    }
  }

  onProfilepicChange(e){
      if (e.target.files) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event:any) => {
          this.profile_pic_img = file;
          this.profile_pic = event.target.result;
        }
      }
  }

  onUpdateCompany(form : FormGroup, admin_id : number){

      let controls = form.controls;
      var comname = controls.company_name.value;

      var post_data = {
          company_name : comname,
          adminID : admin_id
      }
      
      var $store = this.store;

      this.clientService.update_company(post_data).subscribe(
        (data) => {
            
            $store.dispatch(CompanyName({
              company_name : comname
            }));

            if(this.company_logo_file != null){
              this.clientService.uploadCompanyLogo(this.client.clientID, [this.company_logo_file])
              .subscribe((data) => {

                    $store.dispatch(UploadLogo({
                        company_logo : data
                    }));

                    Swal.fire({
                      title : 'Succesfully Updated',
                      icon: 'success',
                    });
              })  
            }else{
              Swal.fire({
                title: 'Succesfully Updated',
                icon: 'success',
              });
            }
            
      });
  }

  onUpdateAccount(form : FormGroup, admin_id : number){

      let controls = form.controls;
      var fname = controls.first_name.value;
      var lname = controls.last_name.value;
      var email = controls.email.value;
      var phone = controls.phone.value;

      var post_data = {
          fname : fname,
          lname : lname,
          email : email,
          phone : phone,
          adminID : admin_id
      }
      
      var $store = this.store;

      this.clientService.update_account(post_data).subscribe(
        (data) => {
            
            $store.dispatch(ProfileName({
              fname : fname,
              lname : lname
            }));

            if(this.profile_pic_img != null){
                 this.clientService.uploadProfilepic(this.client.adminID, [this.profile_pic_img])
                  .subscribe((data) => {
                      
                      $store.dispatch(UploadPhoto({
                          photo : data
                      }));

                      Swal.fire({
                        title : 'Succesfully Updated',
                        icon: 'success',
                      });
                  })
            }
            else{
                 Swal.fire({
                    title : 'Succesfully Updated',
                    icon: 'success',
                  });
            }
      });
  }

  onUpdatePassword(form : FormGroup, admin_id : number){

      let controls = form.controls;
      var password = controls.password.value;

      var post_data = {
          password : password,
          adminID : admin_id
      }

      this.clientService.update_password(post_data).subscribe(
        (data) => {
             Swal.fire({
                title: 'Succesfully Updated',
                icon: 'success',
              });
      });
  }

}