import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private httpService: HttpClientService,
    private authenticationService: AuthenticationService,
  ) { }

  /**
   * Variables for the progress bar
   * @type {any[]}
  */
  public percentage: number = 95;

  /**
  * Variable to check user login
  * @type {any}
  */
  public user: any;

  /**
   * Variable to store the user id
   * @type {number}
  */
  public user_id: number;

  /**
   * Carousel options
   * @type {OwlOptions}
  */
  public customOptions: OwlOptions = {
    loop: true,
    freeDrag: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 4
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  }

  /**
   * Variables to retrieve user information
   * @type {boolean}
  */
  public hasEmail: boolean = false;
  public hasPhone1: boolean = false;

  /**
   * Define contact form
  */
  contactForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  /**
   * Variable to verify if the contact form is correct
   * @type {boolean}
  */
  contactFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidContactForm(field: string) {
    return (
      this.contactForm.get(field).errors && this.contactForm.get(field).touched ||
      this.contactForm.get(field).untouched &&
      this.contactFormSubmitted && this.contactForm.get(field).errors
    );
  }

  /**
   * Validate contact form
   * @return {void} Nothing
  */
  onSubmitContactForm() {
    this.contactFormSubmitted = true;
    if (this.contactForm.valid) {
      let contact_data: any = {
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone
      }
      /** Store contact_data in localStorage*/
      localStorage.setItem('contact_data', JSON.stringify(contact_data));
      this.router.navigate(['insurance/results/vehicle']);
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.contactForm.controls['email'].setValue(JSON.parse(localStorage.getItem('contact_data')).email);

    /* Handling of personal data when logging in */
    this.recuperateLoginData();
    this.authenticationService.subsVar = this.authenticationService.getUserData.subscribe(() => {
      this.recuperateLoginData();
    });
    this.authenticationService.subsClearVar = this.authenticationService.clearUserData.subscribe(() => {

      this.contactForm.controls['email'].setValue("");
      this.contactForm.controls['phone'].setValue("");
      this.user_id = null;
      this.hasEmail = false;
      this.hasPhone1 = false;
    });
  }

  /**------------------------------------------------METHODS AND FUNCTIONS FOR LOGIN---------------------------------------------------- */

  /**
   * Check if the user is logged in
   * @return {boolean} True if you are logged in, false if not
  */
  loginVerified(): boolean {
    let accessToken = localStorage.getItem('currentUser');
    if (accessToken) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      return true;
    }
    this.user_id = null;
    return false;
  }

  /**
   * Retrieves the information if the user is logged in.
   * @return {void} Nothing
  */
  recuperateLoginData() {
    if (this.loginVerified()) {
      this.httpService.getDataUserlogin().subscribe((user: UserInfo) => {
        this.user_id = this.user.id;
        if (user) {
          if (user.email) {
            this.contactForm.controls['email'].setValue(user.email);
            this.hasEmail = true;
          }
          if (user.phone1) {
            this.contactForm.controls['phone'].setValue(user.phone1);
            this.hasPhone1 = true;
          }
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

}
