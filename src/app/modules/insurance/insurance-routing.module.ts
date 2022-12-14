import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { INTERNAL_PATHS } from '../../data/constants/routes';
import { DefaultComponent } from './pages/default/default.component';
import { ResultsComponent } from './pages/results/results.component';

const routes: Routes = [
	{ path: ``, component: DefaultComponent },
	{ path: INTERNAL_PATHS.ASESORI_INSURANCE_RESULTS, component: ResultsComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class InsuranceRoutingModule {}
