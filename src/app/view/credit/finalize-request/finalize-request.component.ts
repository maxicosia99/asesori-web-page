import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserAuth } from 'src/app/models/userAuth';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';
import { RouterExtService } from 'src/app/services/client/routing.service';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

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
    email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  /**
   * Getter for easy access to register form fields
   * @return {FormControl} Acces to register form
  */
  get formRegister() {
    return this.registerForm.controls;
  }

  public request_data: any;

  ngOnInit() {
    window.scrollTo(0, 0);

    this.request_data = JSON.parse(sessionStorage.getItem('request_data'));

    // if (this.loginVerified()) {
    //   this.httpService.linkUserOnRequest(this.request_data.id).subscribe(res => {
    //     console.log(res);
    //   }, error => {
    //     console.log('error al crear información');
    //     console.log(error);
    //   });
    // }

    this.registerForm.controls['email'].setValue(JSON.parse(sessionStorage.getItem('email_data')).email);
  }

  unir() {
    if (this.loginVerified()) {
      // this.httpService.linkUserOnRequest(this.request_data.id).subscribe(res => {
      //   console.log(res);
      // }, error => {
      //   console.log('error al crear información');
      //   console.log(error);
      // });
    }
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

    let userRegister: UserAuth = {
      username: this.formRegister.email.value,
      password: this.formRegister.password.value
    }

    this.subscription = this.httpService.register(userRegister).subscribe((response) => {
      if (response.status == 200) {

        this.subscription = this.httpService.login(userRegister).subscribe((response) => {

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

            this.registerForm.reset();
            this.authService.setSession(response.data);
          } else {
            this.add(response.errors);
            console.log(response.errors);
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
      console.log(accessToken);
      return true;
    }
    return false;
  }

  public show: boolean = false;

  password() {
    this.show = !this.show;
  }

}
