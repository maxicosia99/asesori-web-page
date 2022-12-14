import { Component, Input } from '@angular/core';
import { Credit } from '@data/interfaces';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
	@Input() credit!: Credit;
}
