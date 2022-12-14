import { NgModule } from '@angular/core';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ResultsComponent } from './pages/results/results.component';
import { DefaultComponent } from './pages/default/default.component';

@NgModule({
	declarations: [ResultsComponent, DefaultComponent],
	imports: [SharedModule, InsuranceRoutingModule],
})
export class InsuranceModule {}
