import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { Ng5SliderModule } from 'ng5-slider';
import { RatingModule } from 'ngx-bootstrap/rating';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    CarouselModule.forRoot(),
    ButtonsModule.forRoot(),
    RatingModule.forRoot(),
    Ng5SliderModule
  ],
  exports: [
    
  ],
  entryComponents: [
    
  ]
})
export class HomePageModule { }