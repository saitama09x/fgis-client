import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private router: Router) { }

  getClients() : Observable<any[]> {
    return this.http.get<any[]>(`/users/clients`);
  }

  addClient(client): Observable<any> {    
    return this.http.post<any>('/users/addClient', client);
  }

  getClientBeacons(clientID) : Observable<any[]> {
    return this.http.get<any[]>(`/users/getClientBeacons?clientID=`+ clientID);
  }

  getClientTrackings(clientID) : Observable<any[]> {
    return this.http.get<any[]>(`/users/getClientTrackings?clientID=`+ clientID);
  }

  add(patron): Observable<any> {    
    return this.http.post<any>('/users/add', patron);
  }

  update(patron): Observable<any> {    
    return this.http.put<any>('/users/update', patron);
  }

  update_company(patron): Observable<any> {    
    return this.http.post<any>('/users/update-company', patron);
  }

  update_account(patron): Observable<any> {    
    return this.http.post<any>('/users/update-account', patron);
  }


  update_password(patron): Observable<any> {    
    return this.http.post<any>('/users/update-password', patron);
  }


  updateClient(client): Observable<any> {    
    return this.http.put<any>('/users/updateClient', client);
  }

  updateClientSettings(client): Observable<any> {    
    return this.http.put<any>('/users/updateClientSettings', client);
  }

  delete(userID): Observable<any> { 
    return this.http.delete<any>('/users/delete/'+ userID);
  }

  deleteClient(clientID): Observable<any> { 
    return this.http.delete<any>('/users/deleteClient/'+ clientID);
  }

  upload(userID, uploadedFiles): Observable<any> {
    let formData = new FormData();

    for (var i = 0; i < uploadedFiles.length; i++) {
        formData.append("uploads[]", uploadedFiles[i], uploadedFiles[i].name);
    }

    return this.http.post<any>('/users/upload/'+ userID, formData);
  }

  uploadCompanyLogo(clientID, uploadedFiles): Observable<any> {
    let formData = new FormData();

    for (var i = 0; i < uploadedFiles.length; i++) {
        formData.append("uploads[]", uploadedFiles[i], uploadedFiles[i].name);
    }

    return this.http.post<any>('/users/uploadCompanyLogo/'+ clientID, formData);
  }

  uploadProfilepic(clientID, uploadedFiles): Observable<any> {
    let formData = new FormData();

    for (var i = 0; i < uploadedFiles.length; i++) {
        formData.append("uploads[]", uploadedFiles[i], uploadedFiles[i].name);
    }

    return this.http.post<any>('/users/uploadUserPhoto/'+ clientID, formData);
  }

}
