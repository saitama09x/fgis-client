import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private router: Router) { }

  getGroups(clientID) : Observable<any[]> {
    return this.http.get<any[]>('/groups/getGroups/'+ clientID);
  }

  get(groupID): Observable<any> {    
    return this.http.get<any>('/groups/get/'+ groupID);
  }

  add(group): Observable<any> {    
    return this.http.post<any>('/groups/add', group);
  }

  checkVisitorEmail(email : string) : Promise<any>{

    return new Promise((resolve, reject) => {

        this.http.post<any>('/groups/check-email', { email : email}).subscribe((res) => {
            resolve(res);
        })

    })

  }

  checkVisitorPhone(phone : string) : Promise<any>{

    return new Promise((resolve, reject) => {

        this.http.post<any>('/groups/check-phone', { phone : phone}).subscribe((res) => {
            resolve(res);
        })

    })

  }

  addVisitors(formdata : any, groupid : any) : Promise<any>{

    return new Promise((resolve, reject) => {

        this.http.post<any>('/groups/add/visitor/' + groupid, formdata).subscribe((res) => {
            resolve(res);
        })

    })

  }

  getAllVisitors( groupid : number) : Promise<any>{

    return new Promise((resolve, reject) => {
        this.http.get<any>('/groups/group-visitors/' + groupid).subscribe((res) => {
            
            if(res){
                var obj_arr = []
                for(var i in res){
                    var img = "/assets/photo_default.png";
                    if(res[i].photo != null){
                      img = "/users/photo/" + res[i].photo
                    }
                    var obj = res[i];
                    Object.assign(obj, { photo : img });
                    obj_arr.push(obj)
                }
            }

            resolve(obj_arr);
        })
    })

  }

  searchGroups( search : string, clientId : number ) : Observable<any>{

    return this.http.post<any>('/groups/search-group', { search : search, clientId : clientId });

  }

  searchVisitors( search : string, groupId : number ) : Observable<any>{

    return this.http.post<any>('/groups/search-visitors', { search : search, groupId : groupId });

  }

  pagingServer( clientId : number, limit : number, offset : number, search : string ) : Observable<any>{
      if(search == ""){
         return this.http.post<any>('/groups/paging-group/', {clientId : clientId, limit : limit, offset : offset});  
      }
      else{
         return this.http.post<any>('/groups/paging-group/search', {clientId : clientId, limit : limit, offset : offset, search : search});   
      }
  
  }

  pagingServerVisitor( groupid : number, limit : number, offset : number, search : string ) : Observable<any>{
      if(search == ""){
         return this.http.post<any>('/groups/paging-visitor/', {groupid : groupid, limit : limit, offset : offset});  
      }
      else{
         return this.http.post<any>('/groups/paging-visitor/search', {groupid : groupid, limit : limit, offset : offset, search : search});   
      }
  
  }

  update(group): Observable<any> {    
    return this.http.put<any>('/groups/update', group);
  }

  delete(groupID): Observable<any> { 
    return this.http.delete<any>('/groups/delete/'+ groupID);
  }

  getUsers(groupID) : Observable<any[]> {
    return this.http.get<any[]>('/groups/getUsers/'+ groupID);
  }

  deleteUser(userID): Observable<any> { 
    return this.http.delete<any>('/groups/deleteUser/'+ userID);
  }
}
