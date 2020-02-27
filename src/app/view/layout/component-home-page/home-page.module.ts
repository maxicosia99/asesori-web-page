import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { Ng5SliderModule } from 'ng5-slider';
import { RatingModule } from 'ngx-bootstrap/rating';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap';

import localeFr from '@angular/common/locales/fr';

/* CarouselModule  */
import { CarouselModule } from 'ngx-owl-carousel-o';
/* END - CarouselModule */

@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    CarouselModule,
    ButtonsModule.forRoot(),
    RatingModule.forRoot(),
    Ng5SliderModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    
  ],
  entryComponents: [
    
  ]
})
export class HomePageModule { }

registerLocaleData(localeFr, 'fr');