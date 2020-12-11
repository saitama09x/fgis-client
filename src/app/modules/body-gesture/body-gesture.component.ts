import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { BodyGestureService } from '../../services/body-gesture.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { BodyGesture } from '../../models/BodyGesture';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-body-gesture',
  templateUrl: './body-gesture.component.html',
  styleUrls: ['./body-gesture.component.scss']
})
export class BodyGestureComponent implements OnInit {
  bodyForm = new FormGroup({
    'name': new FormControl('', [Validators.required], this.bodyGestureService.nameValidator()),
    'code': new FormControl('', [Validators.required], this.bodyGestureService.codeValidator())
  });

  modalTitle = "";
  isSavingData = false;
  bodyGestures:BodyGesture[];
  bodyGesture:BodyGesture;

  constructor(
    public auth: AuthenticationService,
    private bodyGestureService: BodyGestureService, 
    private modalService: NgbModal, 
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.get();
  }

  getErrorMessage(input) {
    var control = this.bodyForm.controls[input];

    switch (input) {
      case "name":
        if (control.hasError('required')) {
          return 'You must enter the body gesture name';
        } else if (control.hasError('nameExists')) {
          return 'Body gesture name already used'
        }
      case "code":
        if (control.hasError('required')) {
          return 'You must enter the body gesture code';
        } else if (control.hasError('codeExists')) {
          return 'Body gesture code already used'
        }
    }

    return "";
  }

  get() :void {      
    this.bodyGestureService.get().subscribe(
      (data) => {
        this.bodyGestures = data;
      },
      err => {
        console.error(err);
      }
    )
  }

  onCreate(content) {    
    this.clearForm();

    this.bodyGesture = new BodyGesture();    
    this.modalTitle = "New Body Gesture";
    this.modalService.open(content, {ariaLabelledBy: 'modal-campaign'});
  }

  onEdit(content, bodyGesture) {
    this.clearForm();

    this.bodyForm.controls['name'].setValue(bodyGesture.name);
    this.bodyForm.controls['code'].setValue(bodyGesture.code);

    this.bodyGesture = new BodyGesture();
    this.bodyGesture.bodyGestureID = bodyGesture.bodyGestureID;

    this.modalTitle = "Edit Body Gesture";
    this.modalService.open(content, {ariaLabelledBy: 'modal-patron'});
  }

  onSave(modal) {
    this.isSavingData = true;
    this.bodyForm.disable();

    this.bodyGesture.name = this.bodyForm.controls['name'].value;
    this.bodyGesture.code = this.bodyForm.controls['code'].value;

    if (this.bodyGesture.bodyGestureID == 0) {
      this.bodyGestureService.add(this.bodyGesture).subscribe(
        (data) => {
          if (!data.error) {
            this.bodyGestures.push(data);
            modal.dismiss();
          } else {
            this.isSavingData = false;
            this.bodyForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    } else {
      this.bodyGestureService.update(this.bodyGesture).subscribe(
        (data) => {
          if (!data.error) {
            var index = this.getIndex(this.bodyGesture.bodyGestureID);

            if (index > -1)
              this.bodyGestures[index] = data;

            modal.dismiss();
          } else {
            this.isSavingData = false;
            this.bodyForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    }
  }

  onDelete(bodyGesture) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete "'+ bodyGesture.name +'"?', "Yes", "No", "sm")
    .then((confirmed) => {
        if (confirmed) {
          this.bodyGestureService.delete(bodyGesture.bodyGestureID).subscribe(
            (data) => {
              var index = this.getIndex(bodyGesture.bodyGestureID);
      
              if (index > -1)
                this.bodyGestures.splice(index, 1);
            },
            err => {
              console.error(err);
            }
          )    
        }
      }
    )
  }

  getIndex(bodyGestureID) {
    for (var i = 0; i < this.bodyGestures.length; i++) {
      var bodyGesture = this.bodyGestures[i];

      if (bodyGesture.bodyGestureID == bodyGestureID)
        return i;
    }

    return -1;
  }

  clearForm() {
    this.isSavingData = false;

    this.bodyForm.enable();
    this.bodyForm.reset();
  }
}
