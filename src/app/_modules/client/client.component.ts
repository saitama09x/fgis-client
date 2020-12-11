import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { ClientService } from '../../services/client.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Client } from '../../models/Client';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { WifiBeacon } from 'src/app/models/WifiBeacon';
import { Tracking } from 'src/app/models/Tracking';
import { LiveTracking } from 'src/app/models/LiveTracking';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  
  clientForm = new FormGroup({
    'company_name': new FormControl('', [Validators.required]),
    'first_name': new FormControl('', [Validators.required]),
    'last_name': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'phone': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")]),
    'password': new FormControl('', [Validators.required])
  });

  client:Client;
  clients:Client[];
  wifiBeacons:WifiBeacon[];
  trackings:Tracking[];
  isSavingData = false;
  modalTitle;
  company_logo;
  company_logo_file: File | null;
  settingsLoadCount = 0;

  constructor(
    public auth: AuthenticationService, 
    private clientService: ClientService, 
    private modalService: NgbModal, 
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getErrorMessage(input) {
    var control = this.clientForm.controls[input];

    switch (input) {
      case "company_name":
        if (control.hasError('required'))
          return 'You must enter the client company name';
      case "email":        
        if (control.hasError('required')) {
          return 'You must enter the client admin email';
        } else if (control.hasError('emailExists')) {
          return 'Email already used'
        }
        return control.hasError('email') ? 'Not a valid email' : '';
      case "first_name":
        if (control.hasError('required'))
          return 'You must enter the client admin first name';
      case "last_name":
        if (control.hasError('required'))
          return 'You must enter the client admin last name';
      case "phone":
        if (control.hasError('required')) {
          return 'You must enter the client admin phone number';
        } else if (control.hasError('phoneExists')) {
          return 'Phone number already used';
        }
      case "password":
        if (control.hasError('required'))
          return 'You must enter the client admin password';
    }
    
    return "";
  }

  getClients() :void {      
    this.clientService.getClients().subscribe(
      (data) => {
        this.clients = data["clients"];
      },
      err => {
        console.error(err);
      }
    )
  }

  onCreateClient(content): void {
    this.clearForm();

    this.client = new Client();
    this.company_logo = "./assets/logo_default.png";    
    this.modalTitle = "New Client Account";
    this.modalService.open(content, {ariaLabelledBy: 'modal-client'});
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

  async onSaveClient(modal) {    
    this.isSavingData = true;
    // this.clientForm.disable();

    this.client.company_name = this.clientForm.controls['company_name'].value;
    this.client.admin.email = this.clientForm.controls['email'].value;
    this.client.admin.first_name = this.clientForm.controls['first_name'].value;
    this.client.admin.last_name = this.clientForm.controls['last_name'].value;
    this.client.admin.phone = this.clientForm.controls['phone'].value;
    this.client.admin.password = this.clientForm.controls['password'].value;

    let check_email = await this.auth.__checkIfEmailExists(this.client.admin.email);
    let has_error = false;

    if(check_email == true){
       this.clientForm.controls['email'].setErrors({'emailExists': true});
       has_error = true;
    }

   let check_phone = await this.auth.__checkIfPhoneExists(this.client.admin.phone);

   if(check_phone == true){
       this.clientForm.controls['phone'].setErrors({'phoneExists': true});
       has_error = true
   }

   if(has_error){
       this.isSavingData = false;
       
       return;
   }


    
    if (this.client.clientID == 0) {
      this.clientService.addClient(this.client).subscribe(
        (data) => {
          if (!data.error) {
            var client = data.client;
            client.admin = data.admin;

            if (this.company_logo_file != null) {
              this.clientService.uploadCompanyLogo(client.clientID, [this.company_logo_file]).subscribe(
                (filename) => {
                  client.company_logo = filename;
                  this.clients.push(client);
                  modal.dismiss();
                },
                err => {
                  console.error(err);
                })        

            } else {
              this.clients.push(client);
              modal.dismiss();
            }            
          } else {            
            this.isSavingData = false;
            // this.clientForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    } else {
      this.clientService.updateClient(this.client).subscribe(
        (data) => {
          if (!data.error) {

            if (this.company_logo_file != null) {
              this.clientService.uploadCompanyLogo(this.client.clientID, [this.company_logo_file]).subscribe(
                (filename) => {

                  this.client.company_logo = filename;                  
                  var index = this.getClientIndex(this.client.clientID);

                  if (index > -1)
                    this.clients[index] = this.client;
      
                  modal.dismiss();      
                },
                err => {
                  console.error(err);
                }) 
            } else {
              var index = this.getClientIndex(this.client.clientID);

              if (index > -1)
                this.clients[index] = this.client;
  
              modal.dismiss();  
            }
          } else {
            this.isSavingData = false;
            this.clientForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    }    
  }

  onEditClient(content, client): void {
    this.clearForm();

    this.client = new Client();
    this.client.clientID = client.clientID;
    this.client.company_name = client.company_name;
    this.client.company_logo = client.company_logo;
    this.client.admin.userID = client.admin.userID;
    this.client.admin.first_name = client.first_name;
    this.client.admin.last_name = client.last_name;
    this.client.admin.email = client.email;
    this.client.admin.phone = client.phone;
    this.client.admin.password = client.password;

    this.clientForm.controls['company_name'].setValue(client.company_name);
    this.clientForm.controls['email'].setValue(client.admin.email);
    this.clientForm.controls['first_name'].setValue(client.admin.first_name);
    this.clientForm.controls['last_name'].setValue(client.admin.last_name);
    this.clientForm.controls['phone'].setValue(client.admin.phone);
    this.clientForm.controls['password'].setValue(client.admin.password);

    this.clientForm.controls['email'].disable();
    this.clientForm.controls['password'].disable();

    if (client.company_logo) {
      this.company_logo = "users/logo/"+ client.company_logo;
    } else {
      this.company_logo = "./assets/logo_default.png";
    }

    this.modalTitle = "Edit Client Account";
    this.modalService.open(content, {ariaLabelledBy: 'modal-client'});
  }

  onDeleteClient(client): void {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to '+ client.company_name +'?', "Yes", "No", "sm")
    .then((confirmed) => {
        if (confirmed) {
          this.clientService.deleteClient(client.clientID).subscribe(
            (data) => {
              var index = this.getClientIndex(client.clientID);
      
              if (index > -1)
                this.clients.splice(index, 1);
            },
            err => {
              console.error(err);
            }
          )    
        }
      }
    )
  }

  getClientIndex(userID) {
    for (var i = 0; i < this.clients.length; i++) {
      var client = this.clients[i];

      if (client.clientID == userID)
        return i;
    }

    return -1;
  }

  clearForm() {
    this.isSavingData = false;

    this.company_logo = "";
    this.company_logo_file = null;

    this.clientForm.enable();
    this.clientForm.reset();
  }

  onSettings(content, client) {
    this.client = client;
    this.settingsLoadCount = 0;
    this.getClientBeacons(content);  
    this.getClientTrackings(content);
  }

  getClientBeacons(content) {
    this.clientService.getClientBeacons(this.client.clientID).subscribe(
      (data) => {
        this.wifiBeacons = data;

        this.wifiBeacons.forEach(element => {
          element["selected"] = element['clientID'] ? true : false;          
        });

        this.checkSettingsLoadCount(content);
      },
      err => {
        console.error(err);
      }
    );
  }

  getClientTrackings(content) {
    this.clientService.getClientTrackings(this.client.clientID).subscribe(
      (data) => {
        this.trackings = data;

        this.trackings.forEach(element => {
          let clientID = element['clientID'];
          let live_tracking = element['live_tracking'];
          var liveEnabled = false;
          
          element["selected"] = clientID ? true : false;

          if (clientID > 0 && Number(live_tracking) == 1) {
            liveEnabled = true;
          }
        });

        this.checkSettingsLoadCount(content);
      },
      err => {
        console.error(err);
      }
    );
  }

  checkSettingsLoadCount(content) {
    this.settingsLoadCount++;

    if (this.settingsLoadCount == 2) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-settings'});
    }
  }

  onSaveSettings(modal) {
    var beaconIDs = [];
    var trackingIDs = [];
    var liveTrackingIDs = [];

    this.wifiBeacons.forEach(element => {
      if (element['selected'] == true)
        beaconIDs.push(element.wifiBeaconID);
    });

    this.trackings.forEach(element => {
      if (element['selected'] == true)
        trackingIDs.push(element.trackingID);
    });

    this.trackings.forEach(element => {
      if (element['live_tracking'] == true)
        liveTrackingIDs.push(element.trackingID);
    });

    this.client['beaconIDs'] = beaconIDs;
    this.client['trackingIDs'] = trackingIDs;
    this.client['liveTrackingIDs'] = liveTrackingIDs;

    this.clientService.updateClientSettings(this.client).subscribe(
      (data) => {
        modal.dismiss();      
      },
      err => {
        console.log(err);
      })
  }
}
