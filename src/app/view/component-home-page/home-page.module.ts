import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';     // Forms
import { HomePageComponent } from './home-page/home-page.component';    // Home page module
import { HomePageRoutingModule } from './home-page-routing.module';     // Home page routing module
import { ButtonsModule } from 'ngx-bootstrap/buttons';                  // Ngx-Bootstrap button module
import { Ng5SliderModule } from 'ng5-slider';                           // Slider module
import { RatingModule } from 'ngx-bootstrap/rating';                    // Ngx-Bootstrap rating module
import localeFr from '@angular/common/locales/fr';                      // Module for currency type (dollars)
import { CarouselModule } from 'ngx-owl-carousel-o';                    // Carousel module
import { NgSelectModule } from '@ng-select/ng-select';                  // select
import { AlertModule } from 'ngx-bootstrap/alert';

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
    NgSelectModule,
    AlertModule.forRoot()
  ],
  exports: [
    
  ],
  entryComponents: [
    
  ]
})
export class HomePageModule {}

registerLocaleData(localeFr, 'fr');   //register for the type of currency (dollars)