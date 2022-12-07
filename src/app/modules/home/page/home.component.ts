import { Component } from '@angular/core';

import { Benefit, Ranking, Service } from '@data/interfaces';
import {
  BENEFITS_DATA_ITEMS,
  RANKING_DATA_ITEMS,
  SERVICES_DATA_ITEMS,
  STEPS_DATA_ITEMS,
} from '@data/constants/mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public steps: string[] = STEPS_DATA_ITEMS;
  public ranking: Ranking[] = RANKING_DATA_ITEMS;
  public services: Service[] = SERVICES_DATA_ITEMS;
  public benefits: Benefit[] = BENEFITS_DATA_ITEMS;
}
