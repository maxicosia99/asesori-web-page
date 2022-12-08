import { Component, Input } from '@angular/core';
import { Ranking } from '@data/interfaces';

@Component({
  selector: 'app-ranking-row',
  templateUrl: './ranking-row.component.html',
  styleUrls: ['./ranking-row.component.scss'],
})
export class RankingRowComponent {
  @Input() row: Ranking = {
    approvalTime: 0,
    entity: '',
    image: '',
    interestRate: 0,
    procedures: '',
    rating: 0,
  };
}
