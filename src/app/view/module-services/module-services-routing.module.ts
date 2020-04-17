import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditServicesComponent } from './credit-services/credit-services.component';
import { InsuranceServicesComponent } from './insurance-services/insurance-services.component';
import { CreditRequestComponent } from './credit-request/credit-request.component';
import { InsuranceRequestComponent } from './insurance-request/insurance-request.component';


const routes: Routes = [
  { path: 'credit', component: CreditServicesComponent, data: { title: 'Página de servicios de créditos' }},
  { path: 'insurance', component: InsuranceServicesComponent, data: { title: 'Página de servicios de seguros' }},
  { path: 'request-credit', component: CreditRequestComponent, data: { title: 'Solicitd de crédito' }},
  { path: 'request-insurance', component: InsuranceRequestComponent, data: { title: 'Solicitd de seguro' }},
  { path: '', redirectTo: 'credit', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleServicesRoutingModule { }
