import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { BlankComponent } from './blank/blank.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'invoice',
        component: InvoiceComponent,
        data: {
          title: 'Invoice'
        }
      },
      {
        path: 'blank-page',
        component: BlankComponent,
        data: {
          title: 'Blank Page'
        }
      },
      
      {
        path: 'user-profile',
        component: UserProfileComponent,
        data: {
          title: 'User Profile'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullPagesRoutingModule { }
