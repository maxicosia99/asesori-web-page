import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { ServiceRequestComponent } from './service-request/service-request.component';


const routes: Routes = [
  { path: '', component: ServicesComponent, data: { title: 'Página de servicios' }},
  { path: 'request', component: ServiceRequestComponent, data: { title: 'Solicitd' }},
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleServicesRoutingModule { }
