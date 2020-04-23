import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

export function validateEntryMoney(control: AbstractControl) {
  if (control.value === 0) {
    return { valid: true };
  }
  return null;
}

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
  public percentage: number = 0;

  /**
   * Variables for the selection of type housing
   * @type {any[]}
  */
  public typeHousing = [
    { type: "Propia" },
    { type: "Arrendada" }
  ]

  /**
   * Define economic form
  */
  economicForm = this.formbuilder.group({
    card_payment: [''],
    loans_payment: [''],
    mortgage_payment: [''],
    rent_payment: [''],
    services_payment: ['', [Validators.required, validateEntryMoney]],
    total_properties: ['', [Validators.required, validateEntryMoney]],
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

      let services_payment: number = 0;

      if (!this.economicForm.get('services_payment')) {
        services_payment = this.economicForm.value.services_payment2;
      }
      if (!this.economicForm.get('services_payment2')) {
        services_payment = this.economicForm.value.services_payment;
      }

      let economic_data: any = {
        payments_cards: this.economicForm.value.card_payment,
        rental: this.economicForm.value.rent_payment,
        payment_loans: this.economicForm.value.loans_payment,
        payment_services: services_payment,
        housing_type: this.economicForm.value.typeHousing.type,
        mortgage_payment: this.economicForm.value.mortgage_payment,
        total_possessions: this.economicForm.value.total_properties
      }

      /** Store economic_data in localStorage*/
      localStorage.setItem('economic_data', JSON.stringify(economic_data));
      localStorage.setItem('percentage', this.percentage.toString());
      this.router.navigate(['credit/results/my-credit']);
    }
  }

  public personal_data: any;
  public location_data: any;
  public contact_data: any;
  public economic_data: any;
  public labor_data: any;
  public financial_data: any;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.percentage = +localStorage.getItem('percentage');

    /** Verificar contenido del local storage*/
    this.personal_data = JSON.parse(localStorage.getItem('personal_data'));
    this.location_data = JSON.parse(localStorage.getItem('location_data'));
    this.contact_data = JSON.parse(localStorage.getItem('contact_data'));
    this.economic_data = JSON.parse(localStorage.getItem('economic_data'));
    this.labor_data = JSON.parse(localStorage.getItem('labor_data'));
    this.financial_data = JSON.parse(localStorage.getItem('financial_data'));

    if (this.economic_data) {
      this.economicForm.controls['card_payment'].setValue(this.economic_data.payments_cards);
      this.economicForm.controls['loans_payment'].setValue(this.economic_data.payment_loans);
      this.economicForm.controls['mortgage_payment'].setValue(this.economic_data.mortgage_payment);
      this.economicForm.controls['rent_payment'].setValue(this.economic_data.rental);
      this.economicForm.controls['total_properties'].setValue(this.economic_data.total_possessions);

      this.percentageTotal_properties = true;

      if (this.economic_data.housing_type) {
        this.economicForm.controls['typeHousing'].setValue({ type: this.economic_data.housing_type });

        if (this.economic_data.housing_type === 'Arrendada') {
          const validators = [Validators.required, validateEntryMoney];
          this.economicForm.addControl('services_payment2', new FormControl('', validators));
          this.economicForm.controls['services_payment2'].setValue(this.economic_data.payment_services);
          this.percentageServices_payment = true;
          this.economicForm.removeControl('services_payment');
          this.withRent = true;
        }
        if (this.economic_data.housing_type === 'Propia') {
          this.economicForm.controls['services_payment'].setValue(this.economic_data.payment_services);
          this.percentageServices_payment = true;
        }

        this.percentageTypeHousing = true;

      }
    }
  }

  public withRent: boolean = false;

  changeTypeHousing(event) {

    this.updatePercentageTypeHousing();

    if (event.type === 'Propia') {
      this.withRent = false;

      this.percentageServices_payment2 = false;

      if (!this.economicForm.get('services_payment')) {
        const validators = [Validators.required, validateEntryMoney];
        this.economicForm.addControl('services_payment', new FormControl('', validators));
        this.economicForm.controls['services_payment'].setValue(this.economicForm.value.services_payment2);
        this.economicForm.removeControl('services_payment2');
      }

    }
    if (event.type === 'Arrendada') {
      this.withRent = true;

      this.percentageServices_payment2 = true;

      if (this.economicForm.get('services_payment')) {
        const validators = [Validators.required, validateEntryMoney];
        this.economicForm.addControl('services_payment2', new FormControl('', validators));
        this.economicForm.controls['services_payment2'].setValue(this.economicForm.value.services_payment);
        this.economicForm.removeControl('services_payment');
      }

    }
  }

  /**---------------------------------------------------------------------------------------------------------------- */

  public percentageServices_payment: boolean = false;
  public percentageTotal_properties: boolean = false;
  public percentageServices_payment2: boolean = false;
  public percentageTypeHousing: boolean = false;

  public increase: number = 4;

  updatePercentageServices_payment() {
    if (this.economicForm.value.services_payment > 0 && !this.percentageServices_payment) {
      this.percentageServices_payment = true;
      this.percentage += this.increase;
    } else if (this.economicForm.value.services_payment == 0 && this.percentageServices_payment) {
      this.percentageServices_payment = false;
      this.percentage -= this.increase;
    }
  }

  updatePercentageTotal_properties() {
    if (this.economicForm.value.total_properties > 0 && !this.percentageTotal_properties) {
      this.percentageTotal_properties = true;
      this.percentage += this.increase;
    } else if (this.economicForm.value.total_properties == 0 && this.percentageTotal_properties) {
      this.percentageTotal_properties = false;
      this.percentage -= this.increase;
    }
  }

  updatePercentageServices_payment2() {
    if (this.economicForm.value.services_payment2 > 0 && !this.percentageServices_payment2) {
      this.percentageServices_payment2 = true;
      this.percentage += this.increase;
    } else if (this.economicForm.value.services_payment2 == 0 && this.percentageServices_payment2) {
      this.percentageServices_payment2 = false;
      this.percentage -= this.increase;
    }
  }

  updatePercentageTypeHousing() {
    if (!this.percentageTypeHousing) {
      this.percentageTypeHousing = true;
      this.percentage += this.increase;
    }
  }

}
