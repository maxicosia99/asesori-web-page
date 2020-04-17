import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserRegister } from 'src/app/models/user-register';
import { Subscription } from 'rxjs';
import { UserAuth } from 'src/app/models/userAuth';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';
import { RouterExtService } from 'src/app/services/client/routing.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

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
  selector: 'app-finalize-request',
  templateUrl: './finalize-request.component.html',
  styleUrls: ['./finalize-request.component.scss']
})
export class FinalizeRequestComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClientService,
    private authService: AuthenticationService,
    public router: Router,
    private routerExtService: RouterExtService
  ) { }

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

  /**
   * Getter for easy access to register form fields
   * @return {FormControl} Acces to register form
  */
  get formRegister() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.registerForm.controls['email'].setValue(JSON.parse(localStorage.getItem('email_data')).email);
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
            //this.router.navigate([this.routerExtService.getPreviousUrl()]);
            this.router.navigate(['/tracking']);
            /* ------------------------------ */
            this.httpService.getDataUserlogin().subscribe(() => {
              this.authService.functionGetUserData();
            }, (error) => {
              console.log(error);
            });
            /* ------------------------------ */

            //this.bsModalRef.hide();
            this.registerForm.reset();
            this.authService.setSession(response.data);
          } else {
            this.add(response.error);
            console.log(response.error);
          }
        }, (error) => {
          console.log(error);
          this.authService.redirectInternalServerError();
          this.add('Servidor no disponible ' + error);
          console.log('Servidor no disponible ' + error);
        });

      } else {
        this.add(response.error);
        console.log(response.error);
      }
    }, (error) => {
      console.log(error);
      this.authService.redirectInternalServerError();
      this.add('Servidor no disponible' + error);
      console.log('Servidor no disponible ' + error);
    });
  }

  /**
   * Check if the user is logged in
   * @return {boolean} True if you are logged in, false if not
  */
  loginVerified(): boolean {
    let accessToken = localStorage.getItem('currentUser');
    if (accessToken) {
      //this.user = JSON.parse(localStorage.getItem('currentUser'));
      return true;
    }
    //this.user_id = null;
    return false;
  }

  public show: boolean = false;

  password() {
    this.show = !this.show;
  }

}
