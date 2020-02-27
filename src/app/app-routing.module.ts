import { NgModule } from '@angular/core';
import { AuthGuard } from './services/guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from './view/not-found/404.component';
import { P500Component } from './view/server-error/500.component';
import { DefaultLayoutComponent } from './view/layout/default-layout.component';
import { HomePageComponent } from './view/layout/component-home-page/home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'asesori', pathMatch: 'full' },
  { path: '404', component: P404Component, data: { title: 'Page 404' } },
  { path: '500', component: P500Component, data: { title: 'Page 500' } },
  //{ path: 'homepage', component: HomePageComponent, data: { title: 'Home Page' } },
  { path: '', component: DefaultLayoutComponent, data: { title: 'Inicio' }, children: [
      { path: 'asesori', loadChildren: () => import('./view/layout/component-home-page/home-page.module').then(m => m.HomePageModule) },
    ], 
    //canActivate: [AuthGuard]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
