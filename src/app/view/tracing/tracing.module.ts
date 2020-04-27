import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { TracingRoutingModule } from './tracing-routing.module';
import { UserTrackingComponent } from './user-tracking/user-tracking.component';
import localeEs from '@angular/common/locales/es-EC';
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
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-EC' } ],
})
export class TracingModule { }

registerLocaleData(localeEs, 'es-EC');
