import { HttpClientService } from './../../services/client/http-client.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { AuthenticationService } from './../../services/auth/authentication.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuth } from './../../models/userAuth';
import { Subscription } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService,
    private authService: AuthenticationService,
    public  bsModalRef: BsModalRef
  ) {}


  @Input() information: any;


  /*########### Form ###########*/
  loginForm = this.formBuilder.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  /*########### Form ###########*/
  // registerForm = this.formBuilder.group({
  //   username: ['', [Validators.required, Validators.maxLength(15)]],
  //   email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   confirmPassword: ['', [Validators.required]]
  // }, {
  //   validator: MustMatch('password', 'confirmPassword')
  // });

  ngOnInit() {

  }

  //Alert Component
  alerts: any[] = [{}];
 
  add(msg: string): void {
    this.alerts.push({
      type: 'danger', msg, timeout: 5000
    });
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  // Getter for easy access to form fields
  get form() {
    return this.loginForm.controls;
  }

  // funcion que llama el submit del login
  onSubmit() {
    let user: UserAuth = {
      usernameOrEmail: this.form.usernameOrEmail.value,
      password: this.form.password.value
    }

    this.subscription = this.httpService.login(user).subscribe((response) => {
      if (response.status == 200){
        this.bsModalRef.hide();
        this.loginForm.reset();
        this.authService.setSession(response.data);
      } else
        this.add(response.error);
    }, (error) => {
      console.log(error);
      this.authService.redirectInternalServerError();
      this.add('Servidor no disponible '+error);  
    });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
  
  isHidden = true;

}
