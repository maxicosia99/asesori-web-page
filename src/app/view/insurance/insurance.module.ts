import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { ResultInsuranceComponent } from './result-insurance/result-insurance.component';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';     // Forms
import { ButtonsModule } from 'ngx-bootstrap/buttons';                  // Ngx-Bootstrap button module
import { NgxCurrencyModule } from "ngx-currency";                       // currency input $
import { NgSelectModule } from '@ng-select/ng-select';                  // select
import { ModalModule } from 'ngx-bootstrap';                            // Ngx-Bootstrap Modal module
import localeEs from '@angular/common/locales/es-EC';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { IdentificationFormComponent } from './identification-form/identification-form.component';
import { PersonalDataComponent } from './identification-form/personal-data/personal-data.component';
import { LocationDataComponent } from './identification-form/location-data/location-data.component';
import { ContactDataComponent } from './identification-form/contact-data/contact-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleDataComponent } from './vehicle-form/vehicle-data/vehicle-data.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { InsuranceSummaryComponent } from './insurance-form/insurance-summary/insurance-summary.component';
import { FinalizeRequestComponent } from './finalize-request/finalize-request.component';
import { NumericDirective } from 'src/app/services/client/numeric.directive';

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
    ResultInsuranceComponent,
    IdentificationFormComponent,
    PersonalDataComponent,
    LocationDataComponent,
    ContactDataComponent,
    VehicleFormComponent,
    VehicleDataComponent,
    InsuranceFormComponent,
    InsuranceSummaryComponent,
    FinalizeRequestComponent,
    NumericDirective
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    NgxCurrencyModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgSelectModule,
    ModalModule.forRoot(),
    CarouselModule,
    ProgressbarModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-EC' } ],
})
export class InsuranceModule { }

registerLocaleData(localeEs, 'es-EC');   //register for the type of currency (dollars)
