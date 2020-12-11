import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'
import { map } from 'rxjs/operators';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient, private router: Router) { }

  getCampaigns(clientID) : Observable<any[]> {
    return this.http.get<any[]>('/campaigns/'+ clientID);
  }

  add(userID, campaign): Observable<any> {    
    return this.http.post<any>('/campaigns/'+ userID +'/add', campaign);
  }

  update(clientID, campaign): Observable<any> {    
    return this.http.put<any>('/campaigns/'+ clientID +'/update', campaign);
  }

  delete(clientID, campaignID): Observable<any> { 
    return this.http.delete<any>('/campaigns/'+ clientID +'/delete/'+ campaignID);
  }

  publish(clientID, campaignID): Observable<any> { 
    return this.http.put<any>('/campaigns/'+ clientID +'/publish/'+ campaignID, null);
  }

  checkIfCameraUsed(cameraID): Observable<any> {
    return this.http.get<any[]>('/campaigns/cameraUsed/'+ cameraID);
  }

  cameraValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfCameraUsed(control.value).pipe(
        map(res => {
          return res ? { cameraUsed: true } : null;
        })
      );
    };
  }
}
