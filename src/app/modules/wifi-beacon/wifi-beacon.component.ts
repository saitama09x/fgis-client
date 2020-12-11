import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { WifiBeaconService } from '../../services/wifi-beacon.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { WifiBeacon } from '../../models/WifiBeacon';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-wifi-beacon',
  templateUrl: './wifi-beacon.component.html',
  styleUrls: ['./wifi-beacon.component.scss']
})
export class WifiBeaconComponent implements OnInit {
  wifiBeaconForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'location': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required]),
    'deviceID': new FormControl('', [Validators.required])
  });

  modalTitle = "";
  isSavingData = false;
  wifiBeacons:WifiBeacon[];
  wifiBeacon:WifiBeacon;

  constructor(
    public auth: AuthenticationService,
    private wifiBeaconService: WifiBeaconService, 
    private modalService: NgbModal, 
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getWifiBeacons();
  }

  getErrorMessage(input) {
    var control = this.wifiBeaconForm.controls[input];

    switch (input) {
      case 'name':
        if (control.hasError('required'))
          return 'You must enter the wifi beacon name';
      case 'location':
        if (control.hasError('required'))
          return 'You must enter the wifi beacon location';
      case 'description':
        if (control.hasError('required'))
          return 'You must enter the wifi beacon description';
      case 'deviceID':
        if (control.hasError('required'))
          return 'You must enter the wifi beacon device ID';
    }

    return "";
  }

  getWifiBeacons() :void {
    this.wifiBeaconService.getWifiBeacons().subscribe(
      (data) => {
        this.wifiBeacons = data;
      },
      err => {
        console.error(err);
      }
    )
  }

  onCreate(content) {
    this.clearForm();

    this.wifiBeacon = new WifiBeacon();    
    this.modalTitle = "New Wifi Beacon";
    this.modalService.open(content, {ariaLabelledBy: 'modal-beacon'});
  }

  onEdit(content, wifiBeacon) {
    this.clearForm();

    this.wifiBeaconForm.controls['name'].setValue(wifiBeacon.name);
    this.wifiBeaconForm.controls['location'].setValue(wifiBeacon.location);
    this.wifiBeaconForm.controls['description'].setValue(wifiBeacon.description);
    this.wifiBeaconForm.controls['deviceID'].setValue(wifiBeacon.deviceID);

    this.wifiBeacon = new WifiBeacon();
    this.wifiBeacon.wifiBeaconID = wifiBeacon.wifiBeaconID;

    this.modalTitle = "Edit Wifi Beacon";
    this.modalService.open(content, {ariaLabelledBy: 'modal-beacon'});
  }

  onSave(modal) {
    this.isSavingData = true;
    this.wifiBeaconForm.disable();

    this.wifiBeacon.name = this.wifiBeaconForm.controls['name'].value;
    this.wifiBeacon.location = this.wifiBeaconForm.controls['location'].value;
    this.wifiBeacon.description = this.wifiBeaconForm.controls['description'].value;
    this.wifiBeacon.deviceID = this.wifiBeaconForm.controls['deviceID'].value;

    if (this.wifiBeacon.wifiBeaconID == 0) {
      this.wifiBeaconService.add(this.wifiBeacon).subscribe(
        (data) => {
          if (!data.error) {
            this.wifiBeacons.push(data);
            modal.dismiss();
          } else {
            this.isSavingData = false;
            this.wifiBeaconForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    } else {
      this.wifiBeaconService.update(this.wifiBeacon).subscribe(
        (data) => {
          if (!data.error) {
            var index = this.getIndex(this.wifiBeacon.wifiBeaconID);

            if (index > -1)
              this.wifiBeacons[index] = data;

            modal.dismiss();
          } else {
            this.isSavingData = false;
            this.wifiBeaconForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    }
  }

  onDelete(wifiBeacon) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete "'+ wifiBeacon.name +'"?', "Yes", "No", "sm")
    .then((confirmed) => {
        if (confirmed) {
          this.wifiBeaconService.delete(wifiBeacon.wifiBeaconID).subscribe(
            (data) => {
              var index = this.getIndex(wifiBeacon.wifiBeaconID);
      
              if (index > -1)
                this.wifiBeacons.splice(index, 1);
            },
            err => {
              console.error(err);
            }
          )    
        }
      }
    )
  }

  getIndex(wifiBeaconID) {
    for (var i = 0; i < this.wifiBeacons.length; i++) {
      var wifiBeacon = this.wifiBeacons[i];

      if (wifiBeacon.wifiBeaconID == wifiBeaconID)
        return i;
    }

    return -1;
  }

  clearForm() {
    this.isSavingData = false;

    this.wifiBeaconForm.enable();
    this.wifiBeaconForm.reset();
  }
}
