import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private http: HttpClient, private router: Router) { }

  getCameras() : Observable<any[]> {
    return this.http.get<any[]>('/cameras/getCameras');
  }

  get(cameraID): Observable<any> {    
    return this.http.get<any>('/cameras/get/'+ cameraID);
  }

  add(camera): Observable<any> {    
    return this.http.post<any>('/cameras/add', camera);
  }

  update(camera): Observable<any> {    
    return this.http.put<any>('/cameras/update', camera);
  }

  delete(cameraID): Observable<any> { 
    return this.http.delete<any>('/cameras/delete/'+ cameraID);
  }
}
