import {
  Component,
  forwardRef,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(
    (): typeof OptionsGroupComponent => OptionsGroupComponent
  ),
  multi: true,
};

@Component({
  selector: 'app-options-group',
  templateUrl: './options-group.component.html',
  styleUrls: ['./options-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TYPE_CONTROL_ACCESSOR],
})
export class OptionsGroupComponent implements ControlValueAccessor {
  // TODO: improve and handle types
  @Input() items: any[] = [];
  @Input() value: string = '';

  private onTouch = (): void => {};
  private onModelChange = (_: any): void => {};
  trackByItems = (_: number, item: any): any => item.id;

  writeValue(obj: string): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  selectType(value: string): void {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }
}
