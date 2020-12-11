import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { CameraService } from '../../services/camera.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Camera } from '../../models/Camera';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  cameraForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'location': new FormControl('', [Validators.required]),
    'board_no': new FormControl('', [Validators.required]),
    'screen_no': new FormControl('', [Validators.required])
  });

  modalTitle = "";
  isSavingData = false;
  cameras:Camera[];
  camera:Camera;

  constructor(
    public auth: AuthenticationService,
    private cameraService: CameraService, 
    private modalService: NgbModal, 
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.getCameras();
  }

  getErrorMessage(input) {
    var control = this.cameraForm.controls[input];

    switch (input) {
      case 'name':
        if (control.hasError('required'))
          return 'You must enter the camera name';
      case 'location':
        if (control.hasError('required'))
          return 'You must enter the camera location';
      case 'board_no':
        if (control.hasError('required'))
          return 'You must enter the camera board number';
      case 'screen_no':
        if (control.hasError('required'))
          return 'You must enter the camera screen number';
    }

    return "";
  }

  getCameras() :void {
    this.cameraService.getCameras().subscribe(
      (data) => {
        this.cameras = data;
      },
      err => {
        console.error(err);
      }
    )
  }

  onCreate(content) {
    this.clearForm();

    this.camera = new Camera();    
    this.modalTitle = "New Camera";
    this.modalService.open(content, {ariaLabelledBy: 'modal-campaign'});
  }

  onEdit(content, camera) {
    this.clearForm();

    this.cameraForm.controls['name'].setValue(camera.name);
    this.cameraForm.controls['location'].setValue(camera.location);
    this.cameraForm.controls['board_no'].setValue(camera.board_no);
    this.cameraForm.controls['screen_no'].setValue(camera.screen_no);

    this.camera = new Camera();
    this.camera.cameraID = camera.cameraID;

    this.modalTitle = "Edit Camera";
    this.modalService.open(content, {ariaLabelledBy: 'modal-patron'});
  }

  onSave(modal) {
    this.isSavingData = true;
    this.cameraForm.disable();

    this.camera.name = this.cameraForm.controls['name'].value;
    this.camera.location = this.cameraForm.controls['location'].value;
    this.camera.board_no = this.cameraForm.controls['board_no'].value;
    this.camera.screen_no = this.cameraForm.controls['screen_no'].value;

    if (this.camera.cameraID == 0) {
      this.cameraService.add(this.camera).subscribe(
        (data) => {
          if (!data.error) {
            this.cameras.push(data);
            modal.dismiss();
          } else {
            this.isSavingData = false;
            this.cameraForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    } else {
      this.cameraService.update(this.camera).subscribe(
        (data) => {
          if (!data.error) {
            var index = this.getIndex(this.camera.cameraID);

            if (index > -1)
              this.cameras[index] = data;

            modal.dismiss();
          } else {
            this.isSavingData = false;
            this.cameraForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    }
  }

  onDelete(camera) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete "'+ camera.name +'"?', "Yes", "No", "sm")
    .then((confirmed) => {
        if (confirmed) {
          this.cameraService.delete(camera.cameraID).subscribe(
            (data) => {
              var index = this.getIndex(camera.cameraID);
      
              if (index > -1)
                this.cameras.splice(index, 1);
            },
            err => {
              console.error(err);
            }
          )    
        }
      }
    )
  }

  getIndex(cameraID) {
    for (var i = 0; i < this.cameras.length; i++) {
      var camera = this.cameras[i];

      if (camera.cameraID == cameraID)
        return i;
    }

    return -1;
  }

  clearForm() {
    this.isSavingData = false;

    this.cameraForm.enable();
    this.cameraForm.reset();
  }
}
