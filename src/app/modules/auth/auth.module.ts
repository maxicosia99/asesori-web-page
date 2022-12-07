import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SigninComponent } from './pages/signin/signin.component';

@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
