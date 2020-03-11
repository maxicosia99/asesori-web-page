import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
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
import { HeaderComponent } from './view/header/header.component';
import { FooterComponent } from './view/footer/footer.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    AppAuthModule,
  ],
  declarations: [
    AppComponent,
    P404Component,
    P500Component,
    AlertComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
