import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { Error4Component } from './error4/error4.component';
import { Error3Component } from './error3/error3.component';
import { Error500Component } from './error500/error500.component';

@NgModule({
  declarations: [ComingSoonComponent, Error4Component, Error3Component, Error500Component],
  imports: [
    CommonModule,
    ContentPagesRoutingModule
  ]
})
export class ContentPagesModule { }
