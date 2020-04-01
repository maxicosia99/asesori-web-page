import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  ) { }

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
    window.scrollTo(0, 0)
  }

}
