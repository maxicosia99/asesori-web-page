import { Component, Input } from '@angular/core';

@Component({
  selector: 'calculator-input',
  templateUrl: './calculator-input.component.html',
  styleUrls: ['./calculator-input.component.scss'],
})
export class CalculatorInputComponent {
  @Input() label: string = '';
  @Input() helpText: string = '';
  @Input() required: boolean = false;
  @Input() isMoney: boolean = true;
}
