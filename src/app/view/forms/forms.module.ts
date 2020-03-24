import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { CreditFormComponent } from './credit-form/credit-form.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';     // Forms
import { ButtonsModule } from 'ngx-bootstrap/buttons';                  // Ngx-Bootstrap button module
import { NgxCurrencyModule } from "ngx-currency";                       // currency input $
import { NgSelectModule } from '@ng-select/ng-select';                  // select
import { ModalModule } from 'ngx-bootstrap';                            // Ngx-Bootstrap Modal module
import { ArchwizardModule } from 'angular-archwizard';                  // Wizar forms
import localeFr from '@angular/common/locales/fr';
import { CreditResultsComponent } from './credit-form/credit-results/credit-results.component';                      // Module for currency type (dollars)

export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  allowZero: true,
  decimal: ".",
  precision: 0,
  prefix: "$ ",
  suffix: "",
  thousands: " ",
  nullable: false
};

@NgModule({
  declarations: [CreditFormComponent, InsuranceFormComponent, CreditResultsComponent],
  imports: [
    CommonModule,
    FormsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    NgxCurrencyModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgSelectModule,
    ModalModule.forRoot(),
    ArchwizardModule,
  ]
})
export class FormModule { }

registerLocaleData(localeFr, 'fr');   //register for the type of currency (dollars)
