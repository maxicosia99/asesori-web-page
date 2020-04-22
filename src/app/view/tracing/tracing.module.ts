import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { TracingRoutingModule } from './tracing-routing.module';
import { UserTrackingComponent } from './user-tracking/user-tracking.component';
import localeFr from '@angular/common/locales/fr';
import { DetailRequestComponent } from './detail-request/detail-request.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  declarations: [
    UserTrackingComponent,
    DetailRequestComponent
  ],
  imports: [
    CommonModule,
    TracingRoutingModule,
    CollapseModule.forRoot(),
  ]
})
export class TracingModule { }

registerLocaleData(localeFr, 'fr');   //register for the type of currency (dollars)
