import { NgModule } from '@angular/core';
import { AuthGuard } from './services/guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from './view/not-found/404.component';
import { P500Component } from './view/server-error/500.component';
import { LoginComponent } from './view/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: '404', component: P404Component, data: { title: 'Page 404' } },
  { path: '500', component: P500Component, data: { title: 'Page 500' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' } },
  { path: 'homepage', loadChildren: () => import('./view/component-home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'services', loadChildren: () => import('./view/module-services/module-services.module').then(m => m.ModuleServicesModule) },
  { path: 'forms', loadChildren: () => import('./view/forms/forms.module').then(m => m.FormModule) },
  //canActivate: [AuthGuard]
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
