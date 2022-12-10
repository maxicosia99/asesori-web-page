/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormControl,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
	Validator,
} from '@angular/forms';
import { createSlug } from '@shared/utils';

type InputType = 'text' | 'number' | 'email';

const TYPE_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef((): typeof CustomInputComponent => CustomInputComponent),
	multi: true,
};

const TYPE_CONTROL_VALIDATOR = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef((): typeof CustomInputComponent => CustomInputComponent),
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
	public formControl = new FormControl();
	public errors?: ValidationErrors = [];

	get key(): string {
		return createSlug(this.label);
	}

	// methods
	private _onChanged = (_: string): void => {};
	private _onTouch = (_: string): void => {};
	private _onValidationChange = (): void => {};

	onInput(e: Event): void {
		const { value } = e.target as HTMLInputElement;
		this.value = value;
		this._onTouch(this.value);
		this._onChanged(this.value);
		this._onValidationChange();
	}

	writeValue(value: string): void {
		if (value) {
			this.value = value || '';
		} else {
			this.value = '';
		}
	}

	registerOnChange(fn: (_: string) => void): void {
		this._onChanged = fn;
	}

	registerOnTouched(fn: (_: string) => void): void {
		this._onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	registerOnValidatorChange?(fn: () => void): void {
		this._onValidationChange = fn;
	}

	// validate(control: AbstractControl<any, any>): ValidationErrors | null {
	// 	// 1 way
	// 	// if (control.hasError('email')) {
	// 	// 	this.formControl.setValidators(Validators.email);
	// 	// 	this.formControl.updateValueAndValidity();
	// 	// }
	// 	// return this.formControl.valid ? null : this.formControl.errors;
	// 	// 2 way
	// 	// return control.errors === null ? null : control.errors;
	// 	return this.formControl.valid ? null : this.formControl.errors;
	// }

	validate(control: AbstractControl<any, any>): ValidationErrors | null {
		this.formControl.setErrors(control.errors);
		// this.formControl.updateValueAndValidity();
		return null;
	}
}
