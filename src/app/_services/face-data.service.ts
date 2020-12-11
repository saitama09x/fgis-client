import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class FaceDataService {

  constructor(private http: HttpClient, private router: Router) { }

  getFaceDatas(): Observable<any> {    
    return this.http.get<any>('/faceDatas/getFaceDatas');
  }
}
