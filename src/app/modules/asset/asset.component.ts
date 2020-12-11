import { Component, OnInit, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication.service';
import { AssetService } from '../../services/asset.service';
import { CampaignService } from '../../services/campaign.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { Asset } from '../../models/Asset';
import { ActivatedRoute, Router } from "@angular/router";
import { BodyGesture } from '../../models/BodyGesture';
import { FacialExpression } from '../../models/FacialExpression';

declare function getTreeClass():any;

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  WALLPAPER = "wallpaper";
  VIDEO = "video";
  VIDEO_PATH = "assets/video/";
  WALLPAPER_PATH = "assets/wallpaper/";
  
  @ViewChild('videoFile') videoFile;
  @ViewChild('assetTemplate') assetTemplate;
  @ViewChild('previewTemplate') previewTemplate;
  @ViewChild('wallpaperBrowseTemplate') wallpaperBrowseTemplate;
  @ViewChild('wallpaperViewTemplate') wallpaperViewTemplate;
  @ViewChild('videoBrowseTemplate') videoBrowseTemplate;
  @ViewChild('videoViewTemplate') videoViewTemplate;

  clientID = 0;
  logo = "";
  wallpaper = "";
  video = "";
  wallpaperPreviewHidden = false;
  wallpaperPreview = "";
  videoPreview = "";
  actionsPreview:any[];
  campaignID = 0;
  asset:Asset;
  assets:Asset[];
  assetContainer = "";
  wallpaperContainer = "";
  wallpaperHidden = true;
  videoContainer = "";
  bodyGestures:BodyGesture[];
  filteredBodyGestures:BodyGesture[];
  facialExpressions:FacialExpression[];
  filteredFacialExpressions:FacialExpression[];
  selectedActionPreview = 1;
  treePlugin;
  isPreviewMode = false;
  previewOkHidden = false;
  assetSideOpened = false;
  isSavingData = false;
  saveCount = 0;
  isTriggerOptionHidden = false;

  options: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthenticationService, 
    public assetService: AssetService,
    public campaignService: CampaignService, 
    private modalService: NgbModal, 
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router    
  ) {
    this.options = { concurrency: 1, maxUploads: 15, maxFileSize: 40000000 };
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
   }

  ngOnInit(): void {
    this.clientID = this.auth.getUserDetails().client.clientID;
    this.campaignID = Number(this.route.snapshot.paramMap.get("campaignID"));

    var companyLogo = this.auth.getUserDetails().client.company_logo;

    if (companyLogo) {
      this.logo = "users/logo/"+ companyLogo;
    } else {
      this.logo = "./assets/logo_default.png";
    }
    
    this.getAssets();
    this.getBodyGestures();
    this.getFacialExpressions();
  }

  onAssetClick(seq) {
    var item = this.getAssetItem(seq);
    this.asset = item;

    var oppositeAsset = this.getOppositeAsset(seq);

    if (oppositeAsset) {
      this.filteredBodyGestures = [];
      this.filteredFacialExpressions = [];

      this.bodyGestures.forEach(element => {
        if (element.name != oppositeAsset.body_gestures)
          this.filteredBodyGestures.push(element);
      });

      this.facialExpressions.forEach(element => {
        if (element.name != oppositeAsset.facial_gestures)
          this.filteredFacialExpressions.push(element);
      });
    } else {
      this.filteredBodyGestures = this.bodyGestures;
      this.filteredFacialExpressions = this.facialExpressions;
    }

    if (seq == 1) {
      this.wallpaperHidden = true;
      this.wallpaperContainer = this.wallpaperBrowseTemplate;
      this.isTriggerOptionHidden = true;

      if (item.wallpaper_file) {
        this.wallpaperContainer = this.wallpaperViewTemplate;
        this.loadFile(item.wallpaper_file);
      } else {
        if (item.wallpaper) {
          this.wallpaperContainer = this.wallpaperViewTemplate;
          this.wallpaper = this.WALLPAPER_PATH+item.wallpaper;
        }
      }
    } else {
      this.wallpaperHidden = true;
      this.wallpaper = null;
      this.wallpaperContainer = ""
      this.isTriggerOptionHidden = false;
    }

    if (item.video_file) {
      this.loadFile(item.video_file);
    } else {
      if (item.video) {
        this.video = this.VIDEO_PATH+item.video;
        this.videoContainer = this.videoViewTemplate;
      } else {
        this.video = "";
        this.videoContainer = this.videoBrowseTemplate;
      }
    }

    this.assetContainer = this.assetTemplate;
    this.assetSideOpened = true;

    if (this.videoFile)
      this.videoFile.nativeElement.value = "";      
  }

  getAssets() {
    this.assetService.getAssets(this.campaignID).subscribe(
      (data) => {
        this.assets = [];

        for (var i = 0; i < 15; i++) {
          var seq = i + 1;
          var asset = this.getAssetData(seq, data);

          if (!asset)
            asset = new Asset(seq);

          this.assets.push(asset);
        }

        this.updateAssetsData();
      },
      err => {
        console.error(err);
      }
    )
  }

  getAssetData(seq, assetsData): Asset {
    for (var i = 0; i < assetsData.length; i++) {
      var asset = assetsData[i];

      if (Number(asset.seq) == seq)
        return asset;
    }

    return null;
  }

  getAssetItem(seq): Asset {
    for (var i = 0; i < this.assets.length; i++) {
      var asset = this.assets[i];

      if (Number(asset.seq) == seq)
        return asset;
    }

    return null;
  }

  getAssetItemIndex(seq): number {
    for (var i = 0; i < this.assets.length; i++) {
      var asset = this.assets[i];

      if (Number(asset.seq) == seq)
        return i;
    }

    return null;
  }

  getAssetItemById(assetID): Asset {
    for (var i = 0; i < this.assets.length; i++) {
      var asset = this.assets[i];

      if (Number(asset.assetID) == assetID)
        return asset;
    }

    return null;
  }

  getAsset(assetID) {
    this.assetService.getAsset(this.campaignID, assetID);
  }

  getAssetBySeq(seq) {
    this.assetService.getAssetBySeq(this.campaignID, seq).subscribe(
      (data) => {
        if (!data.error) {
          this.asset = data;
        } else {
          this.asset = new Asset(seq);
        }

        this.assetContainer = this.assetTemplate;        
      },
      err => {
        this.asset = new Asset(seq);
        this.assetContainer = this.assetTemplate;        
      }
    );
  }

  onSaveAssets() { 
    this.saveCount = 0;
    this.isSavingData = true;

    for (var i = 0; i < this.assets.length; i++) {
      var assetData = this.assets[i];

      if (assetData.assetID == 0) {
        this.assetService.add(this.campaignID, assetData).subscribe(
          (data) => {
            this.onSaveAssetResult(data);
          },
          err => {
            console.error(err);
          }
        )
      } else {
        this.assetService.update(this.campaignID, assetData).subscribe(
          (data) => {
            this.onSaveAssetResult(data);
          },
          err => {
            console.error(err);
          }
        )
      }
    }
  }

  onSaveAssetResult(data) {
    this.saveCount++;

    if (!data.error) {
      var index = this.getAssetItemIndex(data.seq);
      data.video_file = this.assets[index].video_file;              
      this.assets[index] = data;
    }

    this.checkSavingDataCount();
  }

  checkSavingDataCount() {
    if (this.saveCount == this.assets.length) {
      var isUpload = false;

      this.assets.forEach(asset => {
        var index = this.getAssetItemIndex(asset.seq);

        if (this.assets[index].video_file) {
          this.assets[index].video_file.form.append("assetID", asset.assetID.toString());
          isUpload = true;
        }
      });

      if (isUpload) {
        const event: UploadInput = {
          type: 'uploadAll',
          url: 'assets/'+ this.campaignID +'/upload/',
          method: 'POST'
        };
      
        this.uploadInput.emit(event);
      } else {
        this.isSavingData = false;
        this.updateAssetsData();
      }
    }
  }

  onDeleteAsset() {
    var clearedAsset = new Asset(this.asset.seq, this.asset.assetID);
    var index = this.getAssetItemIndex(clearedAsset.seq);
    this.asset = clearedAsset;
    this.assets[index] = clearedAsset;

    this.wallpaperContainer = this.wallpaperBrowseTemplate;
    this.videoContainer = this.videoBrowseTemplate;
  }

  onBrowse(buttonFile) {
    buttonFile.click();
  }

  clearWallpaper() {    
    var index = this.getAssetItemIndex(this.asset.seq);
    this.assets[index].wallpaper_file = null;
    this.assets[index].wallpaper = "";

    this.asset.wallpaper_file = null;
    this.asset.wallpaper = "";
    this.wallpaperContainer = this.wallpaperBrowseTemplate;
  }

  clearVideo() {
    var index = this.getAssetItemIndex(this.asset.seq);
    this.assets[index].video_file = null;
    this.assets[index].video = "";

    this.asset.video_file = null;
    this.asset.video = "";
    this.videoContainer = this.videoBrowseTemplate;
  }

  onFileDropped(event) {
    if (event && !this.isSavingData) {
      this.loadFile(event[0]);      
    }
  }

  onFileChange(e) {
    if (e.target.files) {
      this.loadFile(e.target.files[0]);      
    }
  }

  loadFile(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event:any) => {        
      if (file.type.indexOf("image") > -1) {          
        this.asset.wallpaper_file = file;
        this.wallpaper = event.target.result;
        this.wallpaperContainer = this.wallpaperViewTemplate;
      } else if (file.type.indexOf("video") > -1) {
        this.video = event.target.result;
        this.videoContainer = this.videoViewTemplate;
      }
    }
  }

  onPublish() {
    this.isSavingData = true;

    this.campaignService.publish(this.clientID, this.campaignID).subscribe(
      (data) => {
        this.isSavingData = false;
        this.router.navigateByUrl('/campaigns')       
      },
      err => {
        this.isSavingData = false;
        console.error(err);
      }      
    )
  }

  onPreview() {
    this.assetContainer = this.previewTemplate;
    this.assetSideOpened = true;

    var asset = this.assets[0];  
    this.previewAsset(asset);
    this.showAllAssetNodes();
  }

  onEdit() {
    this.assetContainer = "";
    this.assetSideOpened = false;

    this.showAllAssetNodes();
  }

  getBodyGestures() {
    this.assetService.getBodyGestures().subscribe(
      (data) => {
        this.bodyGestures = data;
      },
      err => {
        console.error(err);
      }
    )
  }

  getFacialExpressions() {
    this.assetService.getFacialExpressions().subscribe(
      (data) => {
        this.facialExpressions = data;
      },
      err => {
        console.error(err);
      }
    )
  }

  updateAssetsData() {
    var asset1 = this.getAssetItem(1);
    var asset2 = this.getAssetItem(2);
    var asset3 = this.getAssetItem(3);
    var asset4 = this.getAssetItem(4);
    var asset5 = this.getAssetItem(5);
    var asset6 = this.getAssetItem(6);
    var asset7 = this.getAssetItem(7);
    var asset8 = this.getAssetItem(8);
    var asset9 = this.getAssetItem(9);
    var asset10 = this.getAssetItem(10);
    var asset11 = this.getAssetItem(11);
    var asset12 = this.getAssetItem(12);
    var asset13 = this.getAssetItem(13);
    var asset14 = this.getAssetItem(14);
    var asset15 = this.getAssetItem(15);

    var data = {
      "id": asset1.assetID,
      "seq": 1,
      "name": asset1.title,
      "type": "Root",
      "description": asset1.desc,
      "children": [
        {
            "id": asset2.assetID,
            "seq": 2,
            "name": asset2.title,
            "type": "Level1",
            "description": asset2.desc,
            "children": [
                {
                    "id": asset4.assetID,
                    "seq": 4,
                    "name": asset4.title,
                    "type": "Level2",
                    "description": asset4.desc,
                    "children": [
                        {
                          "id": asset8.assetID,
                          "seq": 8,
                          "name": asset8.title,
                          "type": "Level3",
                          "description": asset8.desc,
                          "children": []
                        },
                        {
                          "id": asset9.assetID,
                          "seq": 9,
                          "name": asset9.title,
                          "type": "Level3",
                          "description": asset9.desc,
                          "children": []
                        }
                    ]
                },
                {
                    "id": asset5.assetID,
                    "seq": 5,
                    "name": asset5.title,
                    "type": "Level2",
                    "description": asset5.desc,
                    "children": [
                        {
                            "id": asset10.assetID,
                            "seq": 10,
                            "name": asset10.title,
                            "type": "Level3",
                            "description": asset10.desc,
                            "children": []
                        },
                        {
                            "id": asset11.assetID,
                            "seq": 11,
                            "name": asset11.title,
                            "type": "Level3",
                            "description": asset11.desc,
                            "children": []
                        }
                    ]
                }                   
            ]
        },
        {
            "id": asset3.assetID,
            "seq": 3,
            "name": asset3.title,
            "type": "Level1",
            "description": asset3.desc,
            "children": [
                {
                    "id": asset6.assetID,
                    "seq": 6,
                    "name": asset6.title,
                    "type": "Level2",
                    "description": asset6.desc,
                    "children": [
                        {
                            "id": asset12.assetID,
                            "seq": 12,
                            "name": asset12.title,
                            "type": "Level3",
                            "description": asset12.desc,
                            "children": []
                        },
                        {
                            "id": asset13.assetID,
                            "seq": 13,
                            "name": asset13.title,
                            "type": "Level3",
                            "description": asset13.desc,
                            "children": []
                        }
                    ]
                },
                {
                    "id": asset7.assetID,
                    "seq": 7,
                    "name": asset7.title,
                    "type": "Level2",
                    "description": asset7.desc,
                    "children": [
                        {
                            "id": asset14.assetID,
                            "seq": 14,
                            "name": asset14.title,
                            "type": "Level3",
                            "description": asset14.desc,
                            "children": []
                        },
                        {
                            "id": asset15.assetID,
                            "seq": 15,
                            "name": asset15.title,
                            "type": "Level3",
                            "description": asset15.desc,
                            "children": []
                        }
                    ]
                }
            ]
        }
      ]
    };

    const treeClass = getTreeClass();

    this.treePlugin = new treeClass()
        .setAllowFocus(false)
        .setData(data)
        .setElement(document.getElementById("assets-tree"))
        .setIdAccessor(function(data) {
            return data.id;
        })
        .setChildrenAccessor(function(data) {
            return data.children;
        })
        .setBodyDisplayTextAccessor(function(data) {
            return data.description;
        })
        .setTitleDisplayTextAccessor(function(data) {
            return data.name;
        })
        .on("nodeClick", function(event) {
          var previewToggle = document.getElementById("previewToggle");
          var isPreviewMode = previewToggle.getAttribute("ng-reflect-model");

          if (isPreviewMode == "true") {
            event.preventDefault();
          } else {
            var btnAsset = document.getElementById("btnAsset"+event.data.seq);
            btnAsset.click();
          }
        })
        .initialize();

      this.expandTree(this.treePlugin);

      var assetsTreeContainer = document.getElementById("assetsTreeContainer");
      assetsTreeContainer.style.height = document.body.clientHeight - 300 + 'px';
  }

  expandTree(tr) {
    var nodes = this.treePlugin.getNodes();

    nodes.forEach(function(node, index, arr) {
      tr.expand(node);
    });

    this.treePlugin.update(this.treePlugin.getRoot());
  }

  showAllAssetNodes() {
    this.expandTree(this.treePlugin);
  }

  onAssetPreviewChange(event) {
    var asset = this.assets[event.target.selectedIndex];  
    this.previewAsset(asset);
  }

  previewAsset(asset) {
    if (asset.seq == 1) {
      // this.wallpaperPreviewHidden = false;

      // if (asset.wallpaper) {
      //   this.wallpaperPreview = this.WALLPAPER_PATH + asset.wallpaper;
      // } else {
      //   this.wallpaperPreview = ""; 
      // }
    } else {
      this.wallpaperPreviewHidden = true;
      this.wallpaperPreview = "";
    }
    
    if (asset.video) {
      this.videoPreview = this.VIDEO_PATH + asset.video;
    } else {
      this.videoPreview = "";
    }

    this.actionsPreview = [];
    var childAssets = this.getTwoChildAssets(asset.seq);
    
    childAssets.forEach(childAsset => {
      var actions = "";
      
      if (childAsset.body_gestures)
        actions += childAsset.body_gestures;

      if (childAsset.facial_gestures) {
        if (actions != "")
          actions += ", ";

          actions += childAsset.facial_gestures;
      }

      actions += " - " + childAsset.title;
      this.actionsPreview.push({ "seq": childAsset.seq, "desc": actions });        
    });

    if (this.actionsPreview.length > 0) {
      this.previewOkHidden = false;
    } else {
      this.previewOkHidden = true;
    }

    var nodeMatchingText = this.treePlugin.getNodes().find(function(node){
      return node.data.name == asset.title;
    });

    this.treePlugin.focusToNode(nodeMatchingText);
  }

  getTwoChildAssets(seq) {
    var childAssets:Asset[] = [];

    switch (seq) {
      case 1:
        childAssets.push(this.getAssetItem(2));
        childAssets.push(this.getAssetItem(3));
        break;
      case 2:
        childAssets.push(this.getAssetItem(4));
        childAssets.push(this.getAssetItem(5));
        break;
      case 3:
        childAssets.push(this.getAssetItem(6));
        childAssets.push(this.getAssetItem(7));
        break;
      case 4:
        childAssets.push(this.getAssetItem(8));
        childAssets.push(this.getAssetItem(9));
        break;
      case 5:
        childAssets.push(this.getAssetItem(10));
        childAssets.push(this.getAssetItem(11));
        break;
      case 6:
        childAssets.push(this.getAssetItem(12));
        childAssets.push(this.getAssetItem(13));
        break;
      case 7:
        childAssets.push(this.getAssetItem(14));
        childAssets.push(this.getAssetItem(15));
        break;
    }

    return childAssets;
  }

  getOppositeAsset(seq) {
    switch (seq) {
      case 2:
        return this.getAssetItem(3);
      case 3:
        return this.getAssetItem(2);
      case 4:
        return this.getAssetItem(5);        
      case 5:
        return this.getAssetItem(4);        
      case 6:
        return this.getAssetItem(7);
      case 7:
        return this.getAssetItem(6);
      case 8:
        return this.getAssetItem(9);
      case 9:
        return this.getAssetItem(8);        
      case 10:
        return this.getAssetItem(11);        
      case 11:
        return this.getAssetItem(10);
      case 12:
        return this.getAssetItem(13);
      case 13:
        return this.getAssetItem(12);        
      case 14:
        return this.getAssetItem(15);        
      case 15:
        return this.getAssetItem(14);
    }

    return null;
  }

  onActionOptionChange(event) {
    this.selectedActionPreview = event.target.value;
  }
  
  onPreviewOk() {  
    if (this.selectedActionPreview > -1) {
      var asset = this.getAssetItem(this.selectedActionPreview);
      this.previewAsset(asset);      

      var assetSel = document.getElementById("asset-sel");
      assetSel["selectedIndex"] = this.selectedActionPreview - 1;
    }
  }

  onPreviewModeChange() {
    if (this.isPreviewMode) {
      this.onPreview();
    } else {
      this.onEdit();
    }
  }

  onSidebarClose() {
    this.isPreviewMode = false;
    this.onEdit();
  }

  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          console.log(output)

          var index = this.getAssetItemIndex(this.asset.seq);

          output.file.form.append("seq", this.asset.seq.toString());
          this.assets[index].video_file = output.file;

          this.loadFile(output.file.nativeFile);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          // const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
          // this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        //this.files = this.files.filter((file: UploadFile) => file !== output.file);
        break;
      case 'dragOver':
        break;
      case 'dragOut':
      case 'drop':
        break;
      case 'done':
        this.isSavingData = false;

        this.assets.forEach(asset => {
          asset.video_file = null;
          asset.video = output.file.response.filename;
        });
        
        break;
    }
  }
  
  // cancelUpload(id: string): void {
  //   this.uploadInput.emit({ type: 'cancel', id: id });
  // }
 
  // removeFile(id: string): void {
  //   this.uploadInput.emit({ type: 'remove', id: id });
  // }
 
  // removeAllFiles(): void {
  //   this.uploadInput.emit({ type: 'removeAll' });
  // }
}