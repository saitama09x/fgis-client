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
export class FacialExpressionService {

  constructor(private http: HttpClient, private router: Router) { }

  get(): Observable<any[]> {
    return this.http.get<any[]>('/facialExpressions/get');
  }

  add(facialExpression): Observable<any> {    
    return this.http.post<any>('/facialExpressions/add', facialExpression);
  }

  update(facialExpression): Observable<any> {    
    return this.http.put<any>('/facialExpressions/update', facialExpression);
  }

  delete(facialExpID): Observable<any> { 
    return this.http.delete<any>('/facialExpressions/delete/'+ facialExpID);
  }

  checkIfNameExists(name: string): Observable<any> {
    return this.http.get<any[]>('/facialExpressions/nameExists/'+ name);
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
    return this.http.get<any[]>('/facialExpressions/codeExists/'+ code);
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
