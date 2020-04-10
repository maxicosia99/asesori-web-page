import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

/** Interface representing a slider model */
interface SliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss']
})
export class ServiceRequestComponent implements OnInit {

  constructor() { }

  /**
   * Slider for amount request value to credit
   * @type {SliderModel}
  */
  amountRequest: SliderModel = {
    value: 0,
    options: {
      floor: 0,
      disabled: false,
      ceil: 99999,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '$' + value;
      }
    }
  };

  /**
   * Slider for entry amount value to credit
   * @type {SliderModel}
  */
  entryAmount: SliderModel = {
    value: 0,
    options: {
      floor: 0,
      ceil: 99999,
      disabled: false,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '$' + value;
      }
    }
  };

  /**
   * Slider for term value to credit
   * @type {SliderModel}
  */
  term: SliderModel = {
    value: 0,
    options: {
      floor: 0,
      ceil: 360,
      disabled: false,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '' + value;
      }
    }
  };

  /**
   * Slider for monthly income value to credit
   * @type {SliderModel}
  */
  monthlyIncome: SliderModel = {
    value: 0,
    options: {
      floor: 0,
      ceil: 4999,
      disabled: false,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '$' + value;
      }
    }
  };

  ngOnInit() {
  }

}
