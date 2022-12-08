import { Component } from '@angular/core';

import { Benefit, Option, Ranking, Service } from '@data/interfaces';
import {
  BENEFITS_DATA_ITEMS,
  CREDITS_DATA_ITEMS,
  INSURANCE_DATA_ITEMS,
  OPTIONS_DATA_ITEMS,
  RANKING_DATA_ITEMS,
  SERVICES_DATA_ITEMS,
  STEPS_DATA_ITEMS,
} from '@data/constants/mock';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public form: FormGroup;
  private _option: string = 'credit'; // you can add a default value: credit | insurance | card | investment

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      type: this._option,
    });
  }

  get option(): string {
    return this.form.value.type;
  }

  public steps: string[] = STEPS_DATA_ITEMS;
  public ranking: Ranking[] = RANKING_DATA_ITEMS;
  public services: Service[] = SERVICES_DATA_ITEMS;
  public benefits: Benefit[] = BENEFITS_DATA_ITEMS;
  public selectors: Option[] = OPTIONS_DATA_ITEMS;
  public credits: any[] = CREDITS_DATA_ITEMS;
  public insurances: any[] = INSURANCE_DATA_ITEMS;
}
