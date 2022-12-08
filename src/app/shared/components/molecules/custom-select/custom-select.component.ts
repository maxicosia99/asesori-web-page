/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';
import { createSlug } from '@shared/utils';

@Component({
	selector: 'app-custom-select',
	templateUrl: './custom-select.component.html',
	styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent {
	// input
	@Input() label = '';
	@Input() options: any[] = [];

	get key(): string {
		return createSlug(this.label);
	}

	trackByOptions = (_: number, item: any): any => item.id;
}
