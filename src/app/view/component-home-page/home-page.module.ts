import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';     // Forms
import { HomePageComponent } from './home-page/home-page.component';    // Home page module
import { HomePageRoutingModule } from './home-page-routing.module';     // Home page routing module
import { ButtonsModule } from 'ngx-bootstrap/buttons';                  // Ngx-Bootstrap button module
import { Ng5SliderModule } from 'ng5-slider';                           // Slider module
import { RatingModule } from 'ngx-bootstrap/rating';                    // Ngx-Bootstrap rating module
import localeEs from '@angular/common/locales/es-EC';
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
    
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-EC' } ],
})
export class HomePageModule {}

registerLocaleData(localeEs, 'es-EC');