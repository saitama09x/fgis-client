import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { AuthGuardService } from 'src/app/auth-guard.service';
// import { AuthGuardPatronService } from 'src/app/auth-guard-patron.service';
// import { AuthGuardAdminService } from 'src/app/auth-guard-admin.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Login'
        }
      },      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
