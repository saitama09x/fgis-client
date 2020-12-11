import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class WifiBeaconService {

  constructor(private http: HttpClient, private router: Router) { }

  getWifiBeacons() : Observable<any[]> {
    return this.http.get<any[]>('/wifibeacon/getWifiBeacons');
  }

  get(wifiBeaconID): Observable<any> {    
    return this.http.get<any>('/wifibeacon/get/'+ wifiBeaconID);
  }

  add(wifiBeacon): Observable<any> {    
    return this.http.post<any>('/wifibeacon/add', wifiBeacon);
  }

  update(wifiBeacon): Observable<any> {    
    return this.http.put<any>('/wifibeacon/update', wifiBeacon);
  }

  delete(wifiBeaconID): Observable<any> { 
    return this.http.delete<any>('/wifibeacon/delete/'+ wifiBeaconID);
  }

  getLogs(clientID, start = null, end = null) : Observable<any[]> {
    var url = '/wifibeacon/getLogs/'+ clientID;

    if (start && end)
      url += '?start='+ start +'&end='+ end;
    
    return this.http.get<any[]>(url);
  }
}
