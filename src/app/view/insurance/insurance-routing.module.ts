import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultInsuranceComponent } from './result-insurance/result-insurance.component';
import { IdentificationFormComponent } from './identification-form/identification-form.component';
import { PersonalDataComponent } from './identification-form/personal-data/personal-data.component';
import { LocationDataComponent } from './identification-form/location-data/location-data.component';
import { ContactDataComponent } from './identification-form/contact-data/contact-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleDataComponent } from './vehicle-form/vehicle-data/vehicle-data.component';
import { InsuranceFormComponent } from './insurance-form/insurance-form.component';
import { InsuranceSummaryComponent } from './insurance-form/insurance-summary/insurance-summary.component';
import { FinalizeRequestComponent } from './finalize-request/finalize-request.component';


const routes: Routes = [
  { path: 'results', component: ResultInsuranceComponent, data: { title: 'Insurance Results' } },

  { path: 'results/identification', component: IdentificationFormComponent, data: { title: 'Identificación' },
    children: [
      { path: 'personal', component: PersonalDataComponent, data: { title: 'Datos personales' } },
      { path: 'location', component: LocationDataComponent, data: { title: 'Datos de ubicación' } },
      { path: 'contact', component: ContactDataComponent, data: { title: 'Datos de contacto' } },
      { path: '', redirectTo: 'personal', pathMatch: 'full' },
    ]
  },
  { path: 'results/vehicle', component: VehicleFormComponent, data: { title: 'Vehicular' },
    children: [
      { path: 'data', component: VehicleDataComponent, data: { title: 'Datos del vehículo' } },
      { path: '', redirectTo: 'data', pathMatch: 'full' },
    ]
  },
  { path: 'results/my-insurance', component: InsuranceFormComponent, data: { title: 'Mi seguro' },
    children: [
      { path: 'summary', component: InsuranceSummaryComponent, data: { title: 'Resumen de seguro' } },
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
export class InsuranceRoutingModule { }
