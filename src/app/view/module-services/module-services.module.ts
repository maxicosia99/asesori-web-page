import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleServicesRoutingModule } from './module-services-routing.module';
import { ServicesComponent } from './services/services.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';                  // Ngx-Bootstrap button module
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';     // Forms
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ServiceRequestComponent } from './service-request/service-request.component';                    // Carousel module
import { Ng5SliderModule } from 'ng5-slider';                           // Slider module
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [ServicesComponent, ServiceRequestComponent],
  imports: [
    CommonModule,
    ModuleServicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    CarouselModule,
    Ng5SliderModule,
    AlertModule.forRoot()
  ]
})
export class ModuleServicesModule { }
