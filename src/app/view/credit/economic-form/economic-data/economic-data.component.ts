import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-economic-data',
  templateUrl: './economic-data.component.html',
  styleUrls: ['./economic-data.component.scss']
})
export class EconomicDataComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private httpService: HttpClientService,
  ) { }

  /**
   * Variables for the progress bar
   * @type {any[]}
  */
  public percentage: number = 95;

  /**
   * Variables for the selection of type housing
   * @type {any[]}
  */
  public typeHousing = [
    { id: 1, type: "Propia" },
    { id: 2, type: "Arrendada" }
  ]

  /**
   * Define economic form
  */
  economicForm = this.formbuilder.group({
    card_payment: [''],
    loans_payment: [''],
    mortgage_payment: [''],
    rent_payment: [''],
    services_payment: ['', [Validators.required]],
    total_properties: ['', [Validators.required]],
    typeHousing: [null, [Validators.required]]
  });

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
   * Variable to verify if the economic form is correct
   * @type {boolean}
  */
  economicFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidEconomicForm(field: string) {
    return (
      this.economicForm.get(field).errors && this.economicForm.get(field).touched ||
      this.economicForm.get(field).untouched &&
      this.economicFormSubmitted && this.economicForm.get(field).errors
    );
  }

  /**
   * Validate economic form
   * @return {void} Nothing
  */
  onSubmiteconomicForm() {
    this.economicFormSubmitted = true;
    if (this.economicForm.valid) {

      let economic_data: any = {
        payments_cards: this.economicForm.value.card_payment,
        rental: this.economicForm.value.rent_payment,
        payment_loans: this.economicForm.value.loans_payment,
        payment_services: this.economicForm.value.services_payment,
        housing_type: this.economicForm.value.typeHousing.type,
        mortgage_payment: this.economicForm.value.mortgage_payment,
        total_possessions: this.economicForm.value.total_properties
      }

      /** Store economic_data in localStorage*/
      localStorage.setItem('economic_data', JSON.stringify(economic_data));
      this.router.navigate(['credit/results/my-credit']);
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

}
