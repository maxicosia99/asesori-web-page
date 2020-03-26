import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultCreditComponent } from './result-credit/result-credit.component';


const routes: Routes = [
  { path: 'results', component: ResultCreditComponent, data: { title: 'Credit Results' } },
  { path: '', redirectTo: 'results', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditRoutingModule { }
