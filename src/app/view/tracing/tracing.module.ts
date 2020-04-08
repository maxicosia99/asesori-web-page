import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracingRoutingModule } from './tracing-routing.module';
import { UserTrackingComponent } from './user-tracking/user-tracking.component';


@NgModule({
  declarations: [
    UserTrackingComponent
  ],
  imports: [
    CommonModule,
    TracingRoutingModule
  ]
})
export class TracingModule { }
