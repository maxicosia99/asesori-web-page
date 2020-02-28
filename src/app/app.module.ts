import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './view/layout/default-layout.component';
import { P404Component } from './view/not-found/404.component';
import { P500Component } from './view/server-error/500.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertComponent } from './services/alerts/alert.component'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppAuthModule } from './services/interceptors/app-auth.module';

import { LoginComponent } from './view/login/login.component';

import { TabsModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

@NgModule({
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    AppAuthModule,
    ShowHidePasswordModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    AlertComponent,
    LoginComponent
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
