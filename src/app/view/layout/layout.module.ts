// import { DefaultLayoutComponent } from './default-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';

// const APP_CONTAINERS = [
//   DefaultLayoutComponent
// ];

@NgModule({
  declarations: [
    // DefaultLayoutComponent,
    // ...APP_CONTAINERS,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
