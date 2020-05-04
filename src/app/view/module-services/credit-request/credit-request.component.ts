import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/user-info';

/** Interface representing a slider model */
interface SliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.scss']
})
export class CreditRequestComponent implements OnInit {

  constructor(
    private httpService: HttpClientService,
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  /**
  * Variable for the type of credit
  * @type {number}
  */
  public id_credit: number = 0;

  /**
   * Variable for the destination credit
   * @type {string}
  */
  public destinedTo: string;

  /**
  * Store credit name
  * @type {string}
 */
  public credit_name: string;

  /**
   * Slider for amount request value to credit
   * @type {SliderModel}
  */
  amountRequest: SliderModel = {
    value: 0,
    options: {
      floor: 0,
      disabled: false,
      ceil: 99999,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '$' + value;
      }
    }
  };

  /**
   * Slider for entry amount value to credit
   * @type {SliderModel}
  */
  entryAmount: SliderModel = {
    value: 0,
    options: {
      floor: 0,
      ceil: 99999,
      disabled: false,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '$' + value;
      }
    }
  };

  /**
   * Slider for term value to credit
   * @type {SliderModel}
  */
  term: SliderModel = {
    value: 0,
    options: {
      floor: 0,
      ceil: 360,
      disabled: false,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '' + value;
      }
    }
  };

  /**
   * Slider for monthly income value to credit
   * @type {SliderModel}
  */
  monthlyIncome: SliderModel = {
    value: 0,
    options: {
      floor: 0,
      ceil: 4999,
      disabled: false,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '$' + value;
      }
    }
  };

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
   * Variables to retrieve user information
   * @type {boolean}
  */
  public hasEmail: boolean = false;

  /**
   * Email form (credit, insurance, credit cards, investment policy)
  */
  emailform = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    province: [null, [Validators.required]],
    city: [null, [Validators.required]]
  });

  /**
   * Variable to verify if the address form is correct
   * @type {boolean}
  */
  emailFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidemailForm(field: string) {
    return (
      this.emailform.get(field).errors && this.emailform.get(field).touched ||
      this.emailform.get(field).untouched &&
      this.emailFormSubmitted && this.emailform.get(field).errors
    );
  }

  /**
   * Getter for easy access to email form fields
   * @return {FormControl} Acces to email form
  */
  get emailForm() {
    return this.emailform.controls;
  }

  /**
   * Variable to activate the email section
   * @type {boolean}
  */
  public emailSection: boolean = false;

  /**
   * Variable to desactvate the calulator section
   * @type {boolean}
  */
  public calculatorSection: boolean = true;

  /**
    * Variable to store all provinces from Ecuador
    * @type {any}
   */
  public provinces: any;

  /**
   * Variable to store all cities from a province
   * @type {any}
  */
  public cities: any;

  /**
   * Location variables
   * @type {string}
  */
  public region_code: string;

  /**
   * Variable that stores the types of credits
   * @type {any[]}
  */
  public credits_select: any = [
    { id: 9, name: 'Viaje', description: 'Para el viaje de tu sueños' },
    { id: 11, name: 'Inmobiliario', description: 'Para tu casa' },
    { id: 9, name: 'Vehicular', description: 'Para el auto nuevo que quieres' },
    { id: 9, name: 'Deudas', description: 'Para consolidar las deudas' },
    { id: 9, name: 'Arreglos del hogar', description: 'Para hacer arreglos en tu casa o local comercial' },
    { id: 10, name: 'Curso o postgrado', description: 'Créditos de estudio' },
    { id: 9, name: 'Préstamo rápido', description: 'Cualquier necesitad' },
    { id: 9, name: 'Urgencias', description: 'Crédito por emergencias' },
  ];

  ngOnInit() {

    window.scrollTo(0, 0);

    this.id_credit = JSON.parse(localStorage.getItem('credit_information')).id_credit;
    this.destinedTo = JSON.parse(localStorage.getItem('credit_information')).destinedTo;

    this.httpService.getInformationCreditByid(this.id_credit).subscribe(res => {
      this.credit_name = res.data.credit_name;
    }, error => {
      console.log('error');
      console.log(error);
    });

    /*  Get all provinces. */
    this.httpService.getProvinces().subscribe(res => {
      this.provinces = res.data;
    }, error => {
      console.log('error');
      console.log(error);
    });

    /*  Start - Search by location. */
    this.httpService.getCurrentLocation().subscribe(res => {
      this.httpService.verifyProvinceExistence(res.region_code).subscribe(resp => {

        /* In case the location is detected */
        if (resp.status === 200) {
          this.region_code = res.region_code;

          let currentprovince = this.provinces.find(x => x.apicode === this.region_code);

          this.emailform.controls['province'].setValue({ id: currentprovince.id, name: currentprovince.name });
          /* the cities of the detected province are loaded */

          this.httpService.getCities(currentprovince.id).subscribe(res => {
            this.cities = []
            this.cities = res.data;
            //console.log(this.cities);
          }, error => {
            console.log('error');
            console.log(error);
          });
        }

        /* In case the location is not detected */
        if (resp.status === 500) {
          console.log(resp.message); // enviar como un mensaje de error
        }

      }, error => {
        console.log('error');
        console.log(error);
      });
    }, error => {
      console.log('error');
      console.log(error);
    });
    /*  End - Search by location. */

    /* Handling of personal data when logging in */
    this.recuperateLoginData();
    this.authenticationService.subsVar = this.authenticationService.getUserData.subscribe(() => {
      this.recuperateLoginData();
    });
    this.authenticationService.subsClearVar = this.authenticationService.clearUserData.subscribe(() => {
      this.emailform.controls['email'].setValue("");
      this.user_id = null;
      this.hasEmail = false;
    });
  }

  /**
   * Recover the cities of a province
   * @param {Event} event.id - Province identifier
   * @return {void} Nothing
  */
  changeProvince(event) {
    this.httpService.getCities(event.id).subscribe(res => {
      this.emailform.controls['city'].setValue(null);
      this.cities = []
      this.cities = res.data;
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /**
   * Calculate credit options
   * @param {HTMLElement} element - HTML identifier
   * @return {void} Nothing
  */
  onSubmitServiceform(element: HTMLElement) {
    element.scrollIntoView();
    this.emailSection = true;
    this.calculatorSection = false;
  }

  /**
   * Go forms page
   * @return {void} Nothing
  */
  onSubmitEmailSection() {

    let email_data: any = {
      email: this.emailform.value.email
    }
    /** Store contact_data in localStorage*/
    sessionStorage.setItem('email_data', JSON.stringify(email_data));

    this.router.navigate(['credit']);

    let credit_information: any = {
      loan_amount: this.amountRequest.value,
      montly_income: this.monthlyIncome.value,
      initial_amount: this.entryAmount.value,
      credit_term: this.term.value,
      city_id: this.emailform.value.city.id,
      credit_id: this.id_credit,
      destinedTo: this.destinedTo
    }
    /** Store credit information in localStorage*/
    localStorage.setItem('credit_information', JSON.stringify(credit_information));
  }

  /**
   * Method to verify if credits have been selected
   * @param {Event} event - Identifier of credit type (id_credit)
   * @return {void} Nothing
  */
  onSelectCreditOption($event) {

    this.id_credit = $event.id;
    this.destinedTo = $event.description;

    this.httpService.getInformationCreditByid(this.id_credit).subscribe(res => {
      this.credit_name = res.data.credit_name;
    }, error => {
      console.log('error');
      console.log(error);
    });

    this.amountRequest.options = Object.assign({}, this.amountRequest.options, { disabled: false });
    this.entryAmount.options = Object.assign({}, this.entryAmount.options, { disabled: false });
    this.monthlyIncome.options = Object.assign({}, this.monthlyIncome.options, { disabled: false });
    this.term.options = Object.assign({}, this.term.options, { disabled: false });

    this.amountRequest.value = 0;
    this.entryAmount.value = 0;
    this.monthlyIncome.value = 0;
    this.term.value = 0;

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
            this.emailform.controls['email'].setValue(user.email);
            this.hasEmail = true;
          }
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

}
