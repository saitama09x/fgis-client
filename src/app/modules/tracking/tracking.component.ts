import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { TrackingService } from '../../services/tracking.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Tracking } from '../../models/Tracking';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  
  modalTitle = "";
  isSavingData = false;
  trackings:Tracking[];
  tracking:Tracking;

  constructor(
    public auth: AuthenticationService,
    private trackingService: TrackingService, 
    private modalService: NgbModal, 
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.getTrackings();
  }

  getTrackings() :void {
    this.trackingService.getTrackings().subscribe(
      (data) => {
        this.trackings = data;
      },
      err => {
        console.error(err);
      }
    )
  }

  onDelete(tracking) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete "'+ tracking.deviceName +'"?', "Yes", "No", "sm")
    .then((confirmed) => {
        if (confirmed) {
          this.trackingService.delete(tracking.trackingID).subscribe(
            (data) => {
              var index = this.getIndex(tracking.trackingID);
      
              if (index > -1)
                this.trackings.splice(index, 1);
            },
            err => {
              console.error(err);
            }
          )    
        }
      }
    )
  }

  getIndex(trackingID) {
    for (var i = 0; i < this.trackings.length; i++) {
      var tracking = this.trackings[i];

      if (tracking.trackingID == trackingID)
        return i;
    }

    return -1;
  }

}
