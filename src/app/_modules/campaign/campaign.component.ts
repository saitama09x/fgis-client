import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { CampaignService } from '../../services/campaign.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Campaign } from '../../models/Campaign';
import { Camera } from '../../models/Camera';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  campaignForm = new FormGroup({
    'title': new FormControl('', [Validators.required]),
    'desc': new FormControl('', [Validators.required]),
    'cameraID': new FormControl('', [Validators.required], this.campaignService.cameraValidator())
  });

  clientID = 0
  logo = "";
  campaign:Campaign;
  campaigns:Campaign[];
  cameras:Camera[];
  modalTitle = "";
  isSavingData = false;

  constructor(
    public auth: AuthenticationService, 
    private campaignService: CampaignService, 
    private modalService: NgbModal, 
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.clientID = this.auth.getUserDetails().client.clientID;
    var companyLogo = this.auth.getUserDetails().client.company_logo;

    if (companyLogo) {
      this.logo = "users/logo/"+ companyLogo;
    } else {
      this.logo = "./assets/logo_default.png";
    }

    this.getCampaigns()
  }

  getErrorMessage(input) {
    var control = this.campaignForm.controls[input];

    switch (input) {
      case 'title':
        if (control.hasError('required'))
          return 'You must enter the campaign name';
      case 'desc':
        if (control.hasError('required'))
          return 'You must enter the campaign description';
      case 'cameraID':
        if (control.hasError('required')) {
          return 'You must select a campaign camera';
        } else if (control.hasError('cameraUsed')) {
          return 'Camera already used';
        }
    }

    return "";
  }

  getCampaigns() :void {      
    this.campaignService.getCampaigns(this.clientID).subscribe(
      (data) => {
        this.campaigns = data["campaigns"];
        this.cameras = data["cameras"];
      },
      err => {
        console.error(err);
      }
    )
  }

  onCreateCampaign(content): void {
    this.clearForm();

    this.campaign = new Campaign();    
    this.modalTitle = "New Campaign";
    this.modalService.open(content, {ariaLabelledBy: 'modal-campaign'});
  }

  onSaveCampaign(modal) {
    this.isSavingData = true;
    this.campaignForm.disable();

    this.campaign.title = this.campaignForm.controls['title'].value;
    this.campaign.desc = this.campaignForm.controls['desc'].value;
    this.campaign.cameraID = this.campaignForm.controls['cameraID'].value;

    if (this.campaign.campaignID == 0) {
      this.campaignService.add(this.clientID, this.campaign).subscribe(
        (data) => {
          if (!data.error) {
            this.campaigns.push(data);
            modal.dismiss();
          } else {            
            this.isSavingData = false;
            this.campaignForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    } else {
      this.campaignService.update(this.clientID, this.campaign).subscribe(
        (data) => {
          if (!data.error) {
            var index = this.getCampaignIndex(this.campaign.campaignID);

            if (index > -1)
              this.campaigns[index] = data;

            modal.dismiss();
          } else {
            this.isSavingData = false;
            this.campaignForm.enable();
          }
        },
        err => {
          console.error(err);
        }
      )
    }    
  }

  onEditCampaign(content, campaign): void {
    this.clearForm();

    this.campaignForm.controls['title'].setValue(campaign.title);
    this.campaignForm.controls['desc'].setValue(campaign.desc);
    this.campaignForm.controls['cameraID'].setValue(campaign.cameraID);

    this.campaign = new Campaign();
    this.campaign.campaignID = campaign.campaignID;

    this.modalTitle = "Edit Campaign";
    this.modalService.open(content, {ariaLabelledBy: 'modal-patron'});
  }

  onDeleteCampaign(campaign): void {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete "'+ campaign.title +'"?', "Yes", "No", "sm")
    .then((confirmed) => {
        if (confirmed) {
          this.campaignService.delete(this.clientID, campaign.campaignID).subscribe(
            (data) => {
              var index = this.getCampaignIndex(campaign.campaignID);
      
              if (index > -1)
                this.campaigns.splice(index, 1);
            },
            err => {
              console.error(err);
            }
          )    
        }
      }
    )
  }

  getCampaignIndex(campaignID) {
    for (var i = 0; i < this.campaigns.length; i++) {
      var campaign = this.campaigns[i];

      if (campaign.campaignID == campaignID)
        return i;
    }

    return -1;
  }

  onSettings() {
    document.getElementById("settings-link").click();    
  }

  clearForm() {
    this.isSavingData = false;

    this.campaignForm.enable();
    this.campaignForm.reset();
  }
}