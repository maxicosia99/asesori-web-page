import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultCreditComponent } from './result-credit/result-credit.component';
import { IdentificationFormComponent } from './identification-form/identification-form.component';
import { PersonalDataComponent } from './identification-form/personal-data/personal-data.component';
import { LocationDataComponent } from './identification-form/location-data/location-data.component';
import { ContactDataComponent } from './identification-form/contact-data/contact-data.component';
import { EconomicFormComponent } from './economic-form/economic-form.component';
import { LaborDataComponent } from './economic-form/labor-data/labor-data.component';
import { FinancialDataComponent } from './economic-form/financial-data/financial-data.component';
import { EconomicDataComponent } from './economic-form/economic-data/economic-data.component';
import { CreditFormComponent } from './credit-form/credit-form.component';
import { CreditSummaryComponent } from './credit-form/credit-summary/credit-summary.component';
import { FinalizeRequestComponent } from './finalize-request/finalize-request.component';


const routes: Routes = [
  { path: 'results', component: ResultCreditComponent, data: { title: 'Credit Results' }},
  { path: 'results/identification', component: IdentificationFormComponent, data: { title: 'Identificación' },
    children: [
      { path: 'personal', component: PersonalDataComponent, data: { title: 'Datos personales' } },
      { path: 'location', component: LocationDataComponent, data: { title: 'Datos de ubicación' } },
      { path: 'contact', component: ContactDataComponent, data: { title: 'Datos de contacto' } },
      { path: '', redirectTo: 'personal', pathMatch: 'full' },
    ]
  },
  { path: 'results/economic', component: EconomicFormComponent, data: { title: 'Económico' },
    children: [
      { path: 'labor', component: LaborDataComponent, data: { title: 'Datos laborales' } },
      { path: 'financial', component: FinancialDataComponent, data: { title: 'Datos financieros' } },
      { path: 'economic', component: EconomicDataComponent, data: { title: 'Datos económicos' } },
      { path: '', redirectTo: 'labor', pathMatch: 'full' },
    ]
  },
  { path: 'results/my-credit', component: CreditFormComponent, data: { title: 'Mi crédito' },
    children: [
      { path: 'summary', component: CreditSummaryComponent, data: { title: 'Resumen de crédito' } },
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
    ]
  },
  { path: 'finalize', component: FinalizeRequestComponent, data: { title: 'Finalizar solicitud' } },
  { path: '', redirectTo: 'results', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditRoutingModule { }
