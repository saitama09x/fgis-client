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
export class BodyGestureService {

  constructor(private http: HttpClient, private router: Router) { }

  get(): Observable<any[]> {
    return this.http.get<any[]>('/bodyGestures/get');
  }

  add(bodyGesture): Observable<any> {    
    return this.http.post<any>('/bodyGestures/add', bodyGesture);
  }

  update(bodyGesture): Observable<any> {    
    return this.http.put<any>('/bodyGestures/update', bodyGesture);
  }

  delete(bodyGestureID): Observable<any> { 
    return this.http.delete<any>('/bodyGestures/delete/'+ bodyGestureID);
  }

  checkIfNameExists(name: string): Observable<any> {
    return this.http.get<any[]>('/bodyGestures/nameExists/'+ name);
  }

  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfNameExists(control.value).pipe(
        map(res => {
          return res ? { nameExists: true } : null;
        })
      );
    };
  }

  checkIfCodeExists(code: string): Observable<any> {
    return this.http.get<any[]>('/bodyGestures/codeExists/'+ code);
  }

  codeValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfCodeExists(control.value).pipe(
        map(res => {
          return res ? { codeExists: true } : null;
        })
      );
    };
  }
}
