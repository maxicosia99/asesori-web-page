/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	forwardRef,
	Input,
	ViewChild,
} from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
	Validator,
} from '@angular/forms';
import { createSlug } from '@shared/utils';

type InputType = 'text' | 'number' | 'email';

const TYPE_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(
		(): typeof CustomInputComponent => CustomInputComponent
	),
	multi: true,
};

const TYPE_CONTROL_VALIDATOR = {
	provide: NG_VALIDATORS,
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
	providers: [TYPE_CONTROL_ACCESSOR, TYPE_CONTROL_VALIDATOR],
})
export class CustomInputComponent implements ControlValueAccessor, Validator {
	// input
	@Input() label = '';
	@Input() placeholder = '';
	@Input() type: InputType = 'text';
	@Input() value = '';
	// @ViewChild('input') input: ElementRef<HTMLInputElement> = {} as ElementRef;

	public isValid = false;
	public isDisabled = false;

	get key(): string {
		return createSlug(this.label);
	}

	// methods
	public onChange = (_: any): void => {};
	public onTouch = (): void => {};
	public onValidationChange = (): void => {};

	onInput(e: Event): void {
		const { value } = e.target as HTMLInputElement;
		this.value = value;
		this.onTouch();
		this.onChange(this.value);
		this.onValidationChange();
	}

	writeValue(value: string): void {
		if (value) {
			this.value = value || '';
		} else {
			this.value = '';
		}
	}

	registerOnChange(fn: () => void): void {
		this.onChange = fn;
	}
	registerOnTouched(fn: () => void): void {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	registerOnValidatorChange?(fn: () => void): void {
		this.onValidationChange = fn;
	}

	validate(control: AbstractControl<any, any>): ValidationErrors | null {
		// console.log(control.errors);
		return control.errors;
	}
}
