import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calculator-input',
  templateUrl: './calculator-input.component.html',
  styleUrls: ['./calculator-input.component.scss'],
})
export class CalculatorInputComponent {
  @Input() label = '';
  @Input() helpText = '';
  @Input() required = false;
  @Input() isMoney = true;
}
