import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient, private router: Router) { }

  getAssets(campaignID) : Observable<any[]> {
    return this.http.get<any[]>('/assets/getAssets/'+ campaignID);
  }

  getAsset(campaignID, assetID): Observable<any> {    
    return this.http.get<any>('/assets/getAsset/'+ campaignID +'/'+ assetID);
  }

  getAssetBySeq(campaignID, seq): Observable<any> {    
    return this.http.get<any>('/assets/'+ campaignID +'/seq/'+ seq);
  }

  add(campaignID, asset): Observable<any> {    
    return this.http.post<any>('/assets/'+ campaignID +'/add', asset);
  }

  update(campaignID, asset): Observable<any> {    
    return this.http.put<any>('/assets/'+ campaignID +'/update', asset);
  }

  delete(campaignID, assetID): Observable<any> { 
    return this.http.delete<any>('/assets/'+ campaignID +'/delete/'+ assetID);
  }

  upload(campaignID, assetID, uploadedFiles, target): Observable<any> { 
    let formData = new FormData();

    for (var i = 0; i < uploadedFiles.length; i++) {
        formData.append("uploads[]", uploadedFiles[i], uploadedFiles[i].name);
    }

    return this.http.post<any>('/assets/'+ campaignID +'/upload/'+ assetID +'/'+ target, formData);
  }

  getBodyGestures() : Observable<any[]> {
    return this.http.get<any[]>('/assets/bodyGestures/');
  }

  getFacialExpressions() : Observable<any[]> {
    return this.http.get<any[]>('/assets/facialExpressions/');
  }
}
