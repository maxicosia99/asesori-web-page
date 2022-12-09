import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './page/home.component';
import { components } from './components';
@NgModule({
	declarations: [HomeComponent, ...components],
	imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
