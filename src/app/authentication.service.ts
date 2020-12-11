import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { User } from './models/User';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { initLogos, UploadPhoto, UploadLogo, InitAccount } from './states/actions/users.actions';
import { UploadState } from './states/interfaces/interfaces.types';

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
}

@Injectable()
export class AuthenticationService {
  private token: string

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private store: Store<{ upload : UploadState }>
   ) {}

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): User {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public getUserEmail() : void {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      var data = JSON.parse(payload);
      this.http.get(`/users/user-details/`+ data.email).subscribe((res) => {
          if(res){
              this.store.dispatch(initLogos(res))
              this.store.dispatch(InitAccount(res))
          }
      })
    }
  }
  
  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public register(user: User, groupID): Observable<any> {
    return this.http.post(`/users/register/`+ groupID, user)
  }

  public uploadPhoto(userID, uploadedFiles): Observable<any> {
    let formData = new FormData();

    for (var i = 0; i < uploadedFiles.length; i++) {
        formData.append("uploads[]", uploadedFiles[i], uploadedFiles[i].name);
    }

    return this.http.post<any>('/users/uploadUserPhoto/'+ userID, formData);
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(`/users/login`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/login')
  }

  checkIfEmailExists(email: string): Observable<any> {
    return this.http.get<any[]>('/users/emailExists/'+ email);
  }

  __checkIfEmailExists(email: string) : Promise<any> {

    return new Promise((resolve, reject) => {

      this.http.get<any[]>('/users/emailExists/'+ email).subscribe((res) => {
            resolve(res)
      });

    })
   
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfEmailExists(control.value).pipe(
        map(res => {
          return res ? { emailExists: true } : null;
        })
      );
    };
  }

  checkIfPhoneExists(phone: string): Observable<any> {
    return this.http.get<any[]>('/users/phoneExists/'+ phone);
  }

  //This is alternative ways to check email exists for submitting the form
  //Wrapping with promises is more cleaner codes
  __checkIfPhoneExists(phone: string): Promise<any>  {
    return new Promise((resolve, reject) => {

      this.http.get<any[]>('/users/phoneExists/'+ phone).subscribe((res) => {
           resolve(res)
      });

    })
  }


  phoneValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfPhoneExists(control.value).pipe(
        map(res => {
          return res ? { phoneExists: true } : null;
        })
      );
    };
  }
}
