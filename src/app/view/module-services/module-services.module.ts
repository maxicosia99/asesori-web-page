import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleServicesRoutingModule } from './module-services-routing.module';
import { ServicesComponent } from './services/services.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';                  // Ngx-Bootstrap button module
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';     // Forms

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    ModuleServicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule
  ]
})
export class ModuleServicesModule { }
