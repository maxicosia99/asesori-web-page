import { Component } from '@angular/core';
import {
	FILTER_DATA_ITEMS,
	ORDER_DATA_ITEMS,
	RANKING_DATA_ITEMS,
} from '@data/constants/mock';
import { Ranking, SelectOption } from '@data/interfaces';

@Component({
	selector: 'app-ranking-section',
	templateUrl: './ranking-section.component.html',
	styleUrls: ['./ranking-section.component.scss'],
})
export class RankingSectionComponent {
	// data constants
	public ranking: Ranking[] = RANKING_DATA_ITEMS;
	public filters: SelectOption[] = FILTER_DATA_ITEMS;
	public orderWays: SelectOption[] = ORDER_DATA_ITEMS;

	// trackBy functions
	trackByRanking = (_: number, item: Ranking): number => item.id;
}
