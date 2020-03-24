import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditFormComponent } from './credit-form/credit-form.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';


const routes: Routes = [
  { path: 'credit', component: CreditFormComponent},
  { path: 'insurance', component: InsuranceFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
