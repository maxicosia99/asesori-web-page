import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CREDITS_DATA_ITEMS, INSURANCE_DATA_ITEMS, OPTIONS_DATA_ITEMS } from '@data/constants/mock';
import { Item, Option } from '@data/interfaces';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	// forms
	public optionsForm: FormGroup;
	public calculatorForm: FormGroup;
	public emailForm: FormGroup;

	// * Other way to implement a form (out the constructor)
	// public calculatorForm: FormGroup = new FormGroup({
	// 	amount: new FormControl(0, [Validators.required]),
	//  ...
	// });

	// variables
	private _option = 'credit'; // you can add a default value: credit | insurance | card | investment

	constructor(formBuilder: FormBuilder) {
		// init forms
		this.optionsForm = formBuilder.group({
			type: [this._option],
		});
		this.calculatorForm = formBuilder.group({
			amount: [0, [Validators.required]],
			entry: [0, [Validators.required]],
			income: [0, [Validators.required]],
			time: [0, [Validators.required]],
		});
		this.emailForm = formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

	// get methods
	get option(): string {
		return this.optionsForm.value.type;
	}

	get calculatorFormValues(): string {
		return this.calculatorForm.value;
	}

	get email(): FormControl {
		return this.emailForm.get('email') as FormControl;
	}

	get validateEntry(): boolean {
		const { amount, entry } = this.calculatorForm.value;
		return entry > amount * 0.9 ? true : false;
	}

	get calculatorFormValid(): boolean {
		const { amount, income, time } = this.calculatorForm.value;
		const condition = amount == 0 || this.validateEntry || income == 0 || time == 0;
		return condition ? true : false;
	}

	// data constants
	public selectors: Option[] = OPTIONS_DATA_ITEMS;
	public credits: Item[] = CREDITS_DATA_ITEMS;
	public insurances: Item[] = INSURANCE_DATA_ITEMS;

	// trackBy functions
	// syntax: trackBy<name> = (index: number, item: <type>): <type> => item.<type>;
	trackByItems = (_: number, item: Item): number => item.id;

	// methods

	calculateCredit(): void {
		this.calculatorForm.markAllAsTouched();
		// TODO: activate email section
		if (this.calculatorForm.valid) {
			console.log('do something');
		} else {
			this.calculatorForm.markAllAsTouched();
		}
		// const { amount, income, time, entry } = this.calculatorForm.value;
		// console.log(this.calculatorForm.value);
	}
}
