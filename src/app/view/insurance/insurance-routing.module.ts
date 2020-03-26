import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultInsuranceComponent } from './result-insurance/result-insurance.component';


const routes: Routes = [
  { path: 'results', component: ResultInsuranceComponent, data: { title: 'Insurance Results' } },
  { path: '', redirectTo: 'results', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
