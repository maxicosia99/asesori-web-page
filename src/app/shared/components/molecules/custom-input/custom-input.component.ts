/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { createSlug } from '@shared/utils';

type InputType = 'text' | 'number' | 'email';

const TYPE_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(
		(): typeof CustomInputComponent => CustomInputComponent
	),
	multi: true,
};

@Component({
	selector: 'app-custom-input',
	templateUrl: './custom-input.component.html',
	styleUrls: ['./custom-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TYPE_CONTROL_ACCESSOR],
})
export class CustomInputComponent implements ControlValueAccessor {
	// input
	@Input() label = '';
	@Input() placeholder = '';
	@Input() type: InputType = 'text';
	@Input() value = '';

	public isValid = false;
	public isDisabled = false;

	get key(): string {
		return createSlug(this.label);
	}

	// methods
	public onChange = (_: any) => {};
	public onTouch = () => {};

	onInput(e: Event) {
		const { value } = e.target as HTMLInputElement;
		this.value = value;
		this.onTouch();
		this.onChange(this.value);
	}

	writeValue(obj: string): void {
		if (obj) {
			this.value = obj || '';
		} else {
			this.value = '';
		}
	}
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}
}
