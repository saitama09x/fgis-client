import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { ClientService } from '../../services/client.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  clientForm = new FormGroup({
    'company_name': new FormControl('', [Validators.required]),
    'first_name': new FormControl('', [Validators.required]),
    'last_name': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email], this.auth.emailValidator()),
    'password': new FormControl('', [Validators.required])
  });

  client;
  isSavingData = false;
  company_logo;
  company_logo_file: File | null;

  constructor(
    public auth: AuthenticationService,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.client = this.auth.getUserDetails().client;
    this.client.admin = this.auth.getUserDetails();

    this.clientForm.controls['company_name'].setValue(this.client.company_name);
    this.clientForm.controls['email'].setValue(this.client.admin.email);
    this.clientForm.controls['first_name'].setValue(this.client.admin.first_name);
    this.clientForm.controls['last_name'].setValue(this.client.admin.last_name);
    this.clientForm.controls['password'].setValue(this.client.admin.password);

    this.clientForm.controls['email'].disable();
    this.clientForm.controls['password'].disable();

    if (this.client.company_logo) {
      this.company_logo = "users/logo/"+this.client.company_logo;
    } else {
      this.company_logo = "./assets/logo_default.png";
    }
  }

  getErrorMessage(input) {
    var control = this.clientForm.controls[input];

    switch (input) {
      case "company_name":
        if (control.hasError('required'))
          return 'You must enter your company name';
      case "email":        
        if (control.hasError('required')) {
          return 'You must enter your admin email';
        } else if (control.hasError('emailExists')) {
          return 'Email already used'
        }
        return control.hasError('email') ? 'Not a valid email' : '';
      case "first_name":
        if (control.hasError('required'))
          return 'You must enter your admin first name';
      case "last_name":
        if (control.hasError('required'))
          return 'You must enter your admin last name';
      case "password":
        if (control.hasError('required'))
          return 'You must enter your admin password';
    }
    
    return "";
  }

  onCompanyLogoChange(e) {
    if (e.target.files) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any) => {
        this.company_logo_file = file;
        this.company_logo = event.target.result;
      }
    }
  }

  browseLogo(companyLogoFile) {
    companyLogoFile.click();
  }

  onSaveClient() {       
    this.isSavingData = true;
    this.clientForm.disable();

    this.client.company_name = this.clientForm.controls['company_name'].value;
    this.client.admin.email = this.clientForm.controls['email'].value;
    this.client.admin.first_name = this.clientForm.controls['first_name'].value;
    this.client.admin.last_name = this.clientForm.controls['last_name'].value;
    this.client.admin.password = this.clientForm.controls['password'].value;

    this.clientService.updateClient(this.client).subscribe(
      (data) => {
        if (!data.error) {
          if (this.company_logo_file != null) {
            this.clientService.uploadCompanyLogo(this.client.clientID, [this.company_logo_file]).subscribe(
              (filename) => {
                this.company_logo = "users/logo/"+filename; 
                this.company_logo_file = null;

                this.setDefaultForm();
              },
              err => {
                this.setDefaultForm();
                console.error(err);
              })              
          } else {
            this.setDefaultForm();
          }
        } else {
          this.setDefaultForm();
        }
      },
      err => {
        console.error(err);
      }
    )
  }

  clearForm() {
    this.isSavingData = false;

    this.company_logo = "";
    this.company_logo_file = null;

    this.clientForm.enable();
  }

  setDefaultForm() {
    this.isSavingData = false;
    
    this.clientForm.enable();
    this.clientForm.controls['email'].disable();
    this.clientForm.controls['password'].disable();
  }
}
