import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

constructor(private http: HttpClient, private router: Router) { }

	getDeviceStatus(deviceId : string) : Promise<any>{
		return new Promise((resolve, reject) => {
			this.http.get("/devices/get-device-status/" + deviceId).subscribe((res) => {
				resolve(res)
			})

		})

	}

	getDeviceLogs(deviceId : string, date : string) : Promise<any>{
		return new Promise((resolve, reject) => {
			this.http.post<any>("/devices/get-device-logs/", { deviceId : deviceId, date : date}).subscribe((res) => {
				resolve(res)
			})

		})

	}

	setCameraEnable(deviceId : string, status : number): Promise<any>{
		return new Promise((resolve, reject) => {
			this.http.post<any>("/devices/device-restart/", { deviceId : deviceId, status : status}).subscribe((res) => {
				resolve(res)
			})

		})
	}

}