import { Component } from '@angular/core';
import { Credit } from '@data/interfaces';
import { CREDIT_DATA_ITEMS } from '@data/constants/mock';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
	// data constants
	public credits: Credit[] = CREDIT_DATA_ITEMS;

	// trackBy functions
	trackByCredits = (_: number, item: Credit): number => item.id;
}
