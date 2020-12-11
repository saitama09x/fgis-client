import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { FacialExpressionService } from '../../services/facial-expression.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { FacialExpression } from '../../models/FacialExpression';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-facial-expression',
  templateUrl: './facial-expression.component.html',
  styleUrls: ['./facial-expression.component.scss']
})
export class FacialExpressionComponent implements OnInit {
  facialForm = new FormGroup({
    'name': new FormControl('', [Validators.required], this.facialExpressionService.nameValidator()),
    'code': new FormControl('', [Validators.required], this.facialExpressionService.codeValidator())
  });

  modalTitle = "";
  isSavingData = false;
  facialExpressions:FacialExpression[];
  facialExpression:FacialExpression;

  constructor(
    public auth: AuthenticationService,
    private facialExpressionService: FacialExpressionService, 
    private modalService: NgbModal, 
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.get();
  }

  getErrorMessage(input) {
    var control = this.facialForm.controls[input];

    switch (input) {
      case "name":
        if (control.hasError('required')) {
          return 'You must enter the facial expression name';
        } else if (control.hasError('nameExists')) {
          return 'Facial expression name already used'
        }
      case "code":
        if (control.hasError('required')) {
          return 'You must enter the facial expression code';
        } else if (control.hasError('codeExists')) {
          return 'Facial expression code already used'
        }
    }

    return "";
  }

  get() :void {
    this.facialExpressionService.get().subscribe(
      (data) => {
        this.facialExpressions = data;
      },
      err => {
        console.error(err);
      }
    )
  }

  onCreate(content) {
    this.clearForm();    

    this.facialExpression = new FacialExpression();    
    this.modalTitle = "New Facial Expression";
    this.modalService.open(content, {ariaLabelledBy: 'modal-campaign'});
  }

  onEdit(content, facialExpression) {
    this.clearForm();

    this.facialForm.controls['name'].setValue(facialExpression.name);
    this.facialForm.controls['code'].setValue(facialExpression.code);

    this.facialExpression = new FacialExpression();
    this.facialExpression.facialExpID = facialExpression.facialExpID;

    this.modalTitle = "Edit Facial Expression";
    this.modalService.open(content, {ariaLabelledBy: 'modal-patron'});
  }

  onSave(modal) {
    this.isSavingData = true;
    this.facialForm.disable();

    this.facialExpression.name = this.facialForm.controls['name'].value;
    this.facialExpression.code = this.facialForm.controls['code'].value;

    if (this.facialExpression.facialExpID == 0) {
      this.facialExpressionService.add(this.facialExpression).subscribe(
        (data) => {
          if (!data.error) {
            this.facialExpressions.push(data);
            modal.dismiss();
          } else {
            this.isSavingData = false;
            this.facialForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    } else {
      this.facialExpressionService.update(this.facialExpression).subscribe(
        (data) => {
          if (!data.error) {
            var index = this.getIndex(this.facialExpression.facialExpID);

            if (index > -1)
              this.facialExpressions[index] = data;

            modal.dismiss();
          } else {
            this.isSavingData = false;
            this.facialForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    }
  }

  onDelete(facialExp) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete "'+ facialExp.name +'"?', "Yes", "No", "sm")
    .then((confirmed) => {
        if (confirmed) {
          this.facialExpressionService.delete(facialExp.facialExpID).subscribe(
            (data) => {
              var index = this.getIndex(facialExp.facialExpID);
      
              if (index > -1)
                this.facialExpressions.splice(index, 1);
            },
            err => {
              console.error(err);
            }
          )    
        }
      }
    )
  }

  getIndex(facialExpID) {
    for (var i = 0; i < this.facialExpressions.length; i++) {
      var facialExp = this.facialExpressions[i];

      if (facialExp.facialExpID == facialExpID)
        return i;
    }

    return -1;
  }

  clearForm() {
    this.isSavingData = false;

    this.facialForm.enable();
    this.facialForm.reset();
  }
}
