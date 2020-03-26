import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { CreditRoutingModule } from './credit-routing.module';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';     // Forms
import { ButtonsModule } from 'ngx-bootstrap/buttons';                  // Ngx-Bootstrap button module
import { NgxCurrencyModule } from "ngx-currency";                       // currency input $
import { NgSelectModule } from '@ng-select/ng-select';                  // select
import { ModalModule } from 'ngx-bootstrap';                            // Ngx-Bootstrap Modal module
import localeFr from '@angular/common/locales/fr';
import { ResultCreditComponent } from './result-credit/result-credit.component';

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
  declarations: [
    ResultCreditComponent
  ],
  imports: [
    CommonModule,
    CreditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    NgxCurrencyModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgSelectModule,
    ModalModule.forRoot(),
  ]
})
export class CreditModule { }

registerLocaleData(localeFr, 'fr');   //register for the type of currency (dollars)
