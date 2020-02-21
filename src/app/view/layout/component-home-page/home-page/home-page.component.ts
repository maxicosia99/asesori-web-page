import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

interface SimpleSliderModel {
  minValue: number;
  options: Options;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  monto: SimpleSliderModel = {
    minValue: 0,
    options: {
      floor: 0,
      ceil: 99999,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '$' + value;
      }
    }
  };

  entrada: SimpleSliderModel = {
    minValue: 0,
    options: {
      floor: 0,
      ceil: 99999,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '$' + value;
      }
    }
  };

  tiempo: SimpleSliderModel = {
    minValue: 0,
    options: {
      floor: 0,
      ceil: 360,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '' + value;
      }
    }
  };

  max: number = 4;
  rate: number = 4;
  isReadonly: boolean = true;

  itemsPerSlide = 4;
  singleSlideOffset = true;
  noWrap = false;

  slidesChangeMessage = '';

  slides = [
    { image: 'assets/img/financial-entities/banco-austro-188x100.png' },
    { image: 'assets/img/financial-entities/banco-biess-188x100.png' },
    { image: 'assets/img/financial-entities/banco-bolivariano-188x100.png' },
    { image: 'assets/img/financial-entities/banco-dinnersClub-188x100.png' },
    { image: 'assets/img/financial-entities/banco-guayaquil-188x100.png' },
    { image: 'assets/img/financial-entities/banco-pacifico-188x100.png' },
    { image: 'assets/img/financial-entities/banco-pichincha-188x100.png' },
    { image: 'assets/img/financial-entities/banco-produbanco-188x100.png' },
    { image: 'assets/img/financial-entities/banco-rumiñahui-188x100.png' },
    { image: 'assets/img/financial-entities/cooperativa-crea-188x100.png' },
    { image: 'assets/img/financial-entities/cooperativa-jardinAzuayo-188x100.png' },
    { image: 'assets/img/financial-entities/cooperativa-jep-188x100.png' },

  ];

  onSlideRangeChange(indexes: number[]): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }

}
