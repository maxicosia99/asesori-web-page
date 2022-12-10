import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EMPTY_STRING, INTERNAL_PATHS } from '@data/constants/routes';

import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { AuthModule } from '@modules/auth/auth.module';
import { HomeModule } from '@modules/home/home.module';

const routes: Routes = [
	{
		path: EMPTY_STRING,
		component: SkeletonComponent,
		children: [
			{
				path: INTERNAL_PATHS.ASESORI_DEFAULT,
				loadChildren: () => import('@modules/home/home.module').then((m): typeof HomeModule => m.HomeModule),
			},
			{
				path: INTERNAL_PATHS.AUTH_DEFAULT,
				loadChildren: () => import('@modules/auth/auth.module').then((m): typeof AuthModule => m.AuthModule),
			},
			{ path: '**', redirectTo: EMPTY_STRING, pathMatch: 'full' },
		],
	},
	{ path: '**', redirectTo: EMPTY_STRING, pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
