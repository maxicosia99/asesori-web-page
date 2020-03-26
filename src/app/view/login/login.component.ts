import { HttpClientService } from './../../services/client/http-client.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { AuthenticationService } from './../../services/auth/authentication.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserAuth } from './../../models/userAuth';
import { Subscription } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/user-register';
import { RouterExtService } from 'src/app/services/client/routing.service';

/**
 * Validate if the password and confirmation are the same
 * @param {string} controlName - Password
 * @param {string} matchingControlName - COnfirm password
 * @return {boolean} - If it is true, the object has an error, if it is null, the object is correct
 */
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  /**
    * Represents the component of the homepage module
    * @constructor
    * @param {BsModalService} modalService - Modal administration service
    * @param {HttpClientService} httpService - Service for connection to the server
    * @param {FormBuilder} formbuilder - Service for the use of forms
    * @param {AuthenticationService} authService - Authentication service for user data
    * @param {Router} router - Routing service
  */
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService,
    private authService: AuthenticationService,
    public router: Router,
    private routerExtService: RouterExtService
  ) { }

  /**
   * To activate the login section
   * @type {boolean}
  */
  public sectionLogin: boolean = true;

  /**
   * To activate the register section
   * @type {boolean}
  */
  public sectionRegister: boolean = false;

  /**
   * Variable to sign out
   * @type {Subscription}
  */
  private subscription: Subscription;

  /**
   * Alert Component
   * @type {any[]}
  */
  alerts: any[] = [{}];

  /**
   * Define login form
  */
  loginForm = this.formBuilder.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  /**
   * Define register form
  */
  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  /**
   * Show an alert with a message
   * @param {string} msg - Error or warning message
   * @return {void} - Nothing
  */
  add(msg: string): void {
    this.alerts.push({
      type: 'danger', msg, timeout: 5000
    });
  }

  /**
   * Closed an alert
   * @param {AlertComponent} dismissedAlert
   * @return {void} - Nothing
  */
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  /**
   * Getter for easy access to login form fields
   * @return {FormControl} Acces to login form
  */
  get form() {
    return this.loginForm.controls;
  }

  /**
   * Getter for easy access to register form fields
   * @return {FormControl} Acces to register form
  */
  get formRegister() {
    return this.registerForm.controls;
  }

  /**
   * Submit login
   * @return {void} Nothing
  */
  onSubmit() {

    let user: UserAuth = {
      usernameOrEmail: this.form.usernameOrEmail.value,
      password: this.form.password.value
    }

    this.subscription = this.httpService.login(user).subscribe((response) => {
      if (response.status == 200) {
        this.authService.setSession(response.data);
        this.router.navigate([this.routerExtService.getPreviousUrl()]);
        /* ------------------------------ */
        this.httpService.getDataUserlogin().subscribe(() => {
          this.authService.functionGetUserData();
        }, (error) => {
          console.log(error);
        });
        /* ------------------------------ */

        //this.bsModalRef.hide();
        this.loginForm.reset();
        this.authService.setSession(response.data);
      } else
        this.add(response.error);
    }, (error) => {
      console.log(error);
      this.authService.redirectInternalServerError();
      this.add('Servidor no disponible ' + error);
    });
  }

  /**
   * Submit register
   * @return {void} Nothing
  */
  onSubmitRegister() {

    let userRegister: UserRegister = {
      username: this.formRegister.username.value,
      email: this.formRegister.email.value,
      password: this.formRegister.password.value
    }

    this.subscription = this.httpService.register(userRegister).subscribe((response) => {
      if (response.status == 200) {

        let user: UserAuth = {} as UserAuth;
        user.usernameOrEmail = userRegister.email;
        user.password = userRegister.password;

        this.subscription = this.httpService.login(user).subscribe((response) => {

          //console.log(response);

          if (response.status == 200) {
            this.authService.setSession(response.data);
            this.router.navigate([this.routerExtService.getPreviousUrl()]);
            /* ------------------------------ */
            this.httpService.getDataUserlogin().subscribe(() => {
              this.authService.functionGetUserData();
            }, (error) => {
              console.log(error);
            });
            /* ------------------------------ */

            //this.bsModalRef.hide();
            this.loginForm.reset();
            this.authService.setSession(response.data);
          } else
            this.add(response.error);

        }, (error) => {
          console.log(error);
          this.authService.redirectInternalServerError();
          this.add('Servidor no disponible ' + error);
        });

      } else {
        this.add(response.error);
      }
    }, (error) => {
      console.log(error);
      this.authService.redirectInternalServerError();
      this.add('Servidor no disponible' + error);
    });
  }

  /**
   * Closes suscriptions
   * @returns {void} - Nothing
  */
  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  /**
   * Change to register section
   * @returns {void} - Nothing
  */
  changeSectionRegister() {
    this.sectionLogin = false;
    this.sectionRegister = true;
  }

  /**
   * Change to login section
   * @returns {void} - Nothing
  */
  changeSectionLogin() {
    this.sectionLogin = true;
    this.sectionRegister = false;
  }

}
