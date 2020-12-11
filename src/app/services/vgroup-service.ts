import { Injectable, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class VGroupService {

	 constructor(private http: HttpClient, private router: Router) { }

	addNewGroup(obj : any) : Promise<any>{
		return new Promise((resolve, reject) => {
			this.http.post<any>('/visitorGroup/add-visitor-group/', obj).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})
		})
	}

	getGroups(clientID : any, fetchRow : any) : void{

		this.http.get<any>('/visitorGroup/lists-visitor-groups/' + clientID).subscribe((res) => {
			if(res){
				fetchRow(res)
			}
		})

	}


	AddNewUser(obj : any) : Promise<any>{

		return new Promise((resolve, reject) => {
			this.http.post<any>('/visitorGroup/add-visitor-user/', obj).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})
		})

	}

	getGroupUsers(groupid : any) : Promise<any>{
		return new Promise((resolve, reject) => {
			this.http.get<any>('/visitorGroup/get-visitor-user/' + groupid).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})
		})
	}

	deleteGroup(obj : any) : Promise<any>{
		return new Promise((resolve, reject) => {
			this.http.post<any>('/visitorGroup/delete-visitor-group/', obj).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})
		})
	}

	searchGroups(search : string) : Promise<any>{

		return new Promise((resolve, reject) => {
			this.http.post<any>('/visitorGroup/search-visitor-groups/', 
					{search : search}).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})
		})

	}

	editGroup(id : number) : Promise<any>{

		return new Promise((resolve, reject) => {
			this.http.get<any>('/visitorGroup/edit-visitor-group/' + id).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})
		})

	}

	updateGroup(obj : any) : Promise<any>{

		return new Promise((resolve, reject) => {
			this.http.post<any>('/visitorGroup/update-visitor-group/', obj).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})
		})


	}


	deleteUser(obj : any) : Promise<any>{
		return new Promise((resolve, reject) => {
			this.http.post<any>('/visitorGroup/delete-visitor-user/', obj).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})
		})
	}

	searchUser(groupid : any, search : string) : Promise<any>{

		return new Promise((resolve, reject) => {
			this.http.post<any>('/visitorGroup/search-visitor-user/', 
					{groupid : groupid, search : search}).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})
		})

	}

	updateUser(obj : any) : Promise<any>{

		return new Promise((resolve, reject) => {
			this.http.post<any>('/visitorGroup/update-visitor-user/', obj).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})
		})

	}


	doLoginNebula(obj) : Promise<any>{

		return new Promise((resolve, reject) => {
			this.http.post<any>('/visitorGroup/doLoginNebula', obj).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})
		})

	}


	checkImageQuality(form : any) : Promise<any>{

		return new Promise((resolve, reject) => {

			this.http.post<any>('/visitorGroup/checkImageQuality', form).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})

		})

	}

	submitUserNebula(form : any){
		return new Promise((resolve, reject) => {

			this.http.post<any>('/visitorGroup/submitUserNebula', form).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})

		})
	}


	selectNebulaFunc(){
		return new Promise((resolve, reject) => {

			this.http.get<any>('/visitorGroup/get-lists-config').subscribe((res) => {
				if(res){
					resolve(res)
				}
			})

		})
	}

	get_nebula_portraits(obj){
		return new Promise((resolve, reject) => {

			this.http.post<any>('/visitorGroup/nebula-portrait-db', obj).subscribe((res) => {
				if(res){
					resolve(res)
				}
			})

		})

	}

}

