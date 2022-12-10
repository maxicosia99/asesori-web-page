/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TYPE_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef((): typeof CalculatorInputComponent => CalculatorInputComponent),
	multi: true,
};

@Component({
	selector: 'app-calculator-input',
	templateUrl: './calculator-input.component.html',
	styleUrls: ['./calculator-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TYPE_CONTROL_ACCESSOR],
})
export class CalculatorInputComponent implements ControlValueAccessor {
	// input
	@Input() label = '';
	@Input() helpText = '';
	@Input() required = false;
	@Input() isMoney = true;
	@Input() key = '';

	public value = 0;
	public isDisabled = false;

	// methods
	public onChange = (_: any): void => {};
	public onTouch = (): void => {};

	onInput(e: Event): void {
		const { value } = e.target as HTMLInputElement;
		this.value = +value;
		this.onTouch();
		this.onChange(this.value);
	}

	writeValue(obj: number): void {
		if (obj) {
			this.value = obj || 0;
		} else {
			this.value = 0;
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
