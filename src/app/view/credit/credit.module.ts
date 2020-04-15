import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { CreditRoutingModule } from './credit-routing.module';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';     // Forms
import { ButtonsModule } from 'ngx-bootstrap/buttons';                  // Ngx-Bootstrap button module
import { NgxCurrencyModule } from "ngx-currency";                       // currency input $
import { NgSelectModule } from '@ng-select/ng-select';                  // select
import { ModalModule } from 'ngx-bootstrap';                            // Ngx-Bootstrap Modal module
import localeFr from '@angular/common/locales/fr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ResultCreditComponent } from './result-credit/result-credit.component';
import { IdentificationFormComponent } from './identification-form/identification-form.component';                    // Carousel module
import { PersonalDataComponent } from './identification-form/personal-data/personal-data.component';
import { LocationDataComponent } from './identification-form/location-data/location-data.component';
import { ContactDataComponent } from './identification-form/contact-data/contact-data.component';
import { EconomicFormComponent } from './economic-form/economic-form.component';
import { EconomicDataComponent } from './economic-form/economic-data/economic-data.component';
import { FinancialDataComponent } from './economic-form/financial-data/financial-data.component';
import { LaborDataComponent } from './economic-form/labor-data/labor-data.component';
import { CreditFormComponent } from './credit-form/credit-form.component';
import { CreditSummaryComponent } from './credit-form/credit-summary/credit-summary.component';
import { FinalizeRequestComponent } from './finalize-request/finalize-request.component';

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
    ResultCreditComponent,
    PersonalDataComponent,
    IdentificationFormComponent,
    LocationDataComponent,
    ContactDataComponent,
    EconomicFormComponent,
    EconomicDataComponent,
    FinancialDataComponent,
    LaborDataComponent,
    CreditFormComponent,
    CreditSummaryComponent,
    FinalizeRequestComponent
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
    CarouselModule,
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ]
})
export class CreditModule { }

registerLocaleData(localeFr, 'fr');   //register for the type of currency (dollars)
