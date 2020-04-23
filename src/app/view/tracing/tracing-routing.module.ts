import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTrackingComponent } from './user-tracking/user-tracking.component';
import { DetailRequestComponent } from './detail-request/detail-request.component';
import { AuthGuard } from 'src/app/services/guards/auth.guard';


const routes: Routes = [
  { path: 'home', component: UserTrackingComponent, data: { title: 'Solicitides de créditos' }, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: DetailRequestComponent , data: { title: 'Detalle de la solicitid' }, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracingRoutingModule { }
