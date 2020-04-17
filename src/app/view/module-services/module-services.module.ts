import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleServicesRoutingModule } from './module-services-routing.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';                  // Ngx-Bootstrap button module
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';     // Forms
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Ng5SliderModule } from 'ng5-slider';                           // Slider module
import { NgSelectModule } from '@ng-select/ng-select';                  // select
import { AlertModule } from 'ngx-bootstrap/alert';
import { CreditServicesComponent } from './credit-services/credit-services.component';
import { InsuranceServicesComponent } from './insurance-services/insurance-services.component';
import { CreditRequestComponent } from './credit-request/credit-request.component';
import { InsuranceRequestComponent } from './insurance-request/insurance-request.component';

@NgModule({
  declarations: [CreditServicesComponent, InsuranceServicesComponent, CreditRequestComponent, InsuranceRequestComponent],
  imports: [
    CommonModule,
    ModuleServicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    CarouselModule,
    Ng5SliderModule,
    AlertModule.forRoot(),
    NgSelectModule,
  ]
})
export class ModuleServicesModule { }
