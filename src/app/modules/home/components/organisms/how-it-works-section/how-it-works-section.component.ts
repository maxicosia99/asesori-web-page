import { Component } from '@angular/core';
import { STEPS_DATA_ITEMS } from '@data/constants/mock';

@Component({
	selector: 'app-how-it-works-section',
	templateUrl: './how-it-works-section.component.html',
	styleUrls: ['./how-it-works-section.component.scss'],
})
export class HowItWorksSectionComponent {
	// data constants
	public steps: string[] = STEPS_DATA_ITEMS;

	// trackBy functions
	trackBySteps = (_: number, item: string): string => item;
}
