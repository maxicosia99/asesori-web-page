import { DefaultLayoutComponent } from './default-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: { title: 'Home' },
    children: [
      { path: '', redirectTo: 'asesori', pathMatch: 'prefix' },
      { path: 'asesori', loadChildren: () => import('./component-home-page/home-page.module').then(m => m.HomePageModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
