import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';                                                 //options user slider
import { OwlOptions } from 'ngx-owl-carousel-o';                                      //options carousel images
import { FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';     //forms
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { UserInfo } from '../../../models/user-info';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';


/** Interface representing a slider model */
interface SliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

/** Class representing Home Component. */
export class HomePageComponent implements OnInit {

  /**
    * Represents the component of the homepage module
    * @constructor
    * @param {HttpClientService} httpService - Service for connection to the server
    * @param {FormBuilder} formbuilder - Service for the use of forms
    * @param {AuthenticationService} authenticationService - Authentication service for user data
    * @param {Router} router - Routing service
  */
  constructor(
    private httpService: HttpClientService,
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  /**---------------------------------------------VARIABLES FOR CREDITS AND INSURANCE--------------------------------------------------- */

  /**
   * Rating max
   * @type {number}
  */
  public max: number = 4;

  /**
   * Rating rate
   * @type {number}
  */
  public rate: number = 4;

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
   * Location variables
   * @type {string}
  */
  public region_code: string;

  /**
   * Variables to enable or disable service tag options
   * @type {boolean}
  */
  public active_credits_select: boolean = false;
  public active_insurance_select: boolean = false;
  public active_creditCard_select: boolean = false;
  public active_investmentPolicy_select: boolean = false;

  /**
   * Variables to activate credit or insurance values and select
   * @type {boolean}
  */
  public creditSection: boolean = false;
  public insuranceSection: boolean = false;

  public insuranceSectionValues: boolean = false;

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

  /**---------------------------------------------------VARIABLES FOR CREDITS----------------------------------------------------------- */

  /**
   * Slider for amount request value to credit
   * @type {SliderModel}
  */
  amountRequest: SliderModel = {
    value: 0,
    options: {
      floor: 0,
      disabled: true,
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
      disabled: true,
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
      disabled: true,
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
      disabled: true,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '$' + value;
      }
    }
  };

  /**
   * Slider for monthly income value to credit
   * @type {SliderModel}
  */
  vehicle_year: SliderModel = {
    value: 0,
    options: {
      floor: 1950,
      ceil: 2020,
      disabled: false,
      enforceStep: false,
      hideLimitLabels: true,
      translate: (value: number): string => {
        return '' + value;
      }
    }
  };

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

  /**
   * Variable to store message error
   * @type {string}
  */
  public messageErrorCredit: string;

  /**----------------------------------------------------INSURANCE VARIABLES------------------------------------------------------------ */

  /**
   * Variable for the type of insurance
   * @type {number}
  */
  public id_insurance;

  /**
   * Variable that stores the types of insurance
   * @type {any[]}
  */
  public insurance_select: any = [
    { id: 1, name: 'Vehicular', description: 'Para tu auto público o privado' },
  ];

  /**
   * Variable that stores the vehicle information
   * @type {any}
  */
  public typeVehicle: any;
  public vehicleBrand: any;
  public vehicleModel: any;
  public vehicleYear: any;
  public vehicleDescription: any;

  /**
   * Variable to store message error
   * @type {string}
  */
  public messageErrorInsurance: string;

  /**------------------------------------------------------LOGIN VARIABLES-------------------------------------------------------------- */

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









  /**----------------------------------------METHODS AND FUNCTIONS FOR CREDITS AND INSURANCE-------------------------------------------- */

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
   * Go forms page
   * @return {void} Nothing
  */
  onSubmitEmailSection() {

    let email_data: any = {
      email: this.emailform.value.email
    }
    /** Store contact_data in localStorage*/
    sessionStorage.setItem('email_data', JSON.stringify(email_data));

    if (this.serviceform.get('service_type_userSelected').value === 'creditos') {
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

    if (this.serviceform.get('service_type_userSelected').value === 'seguros') {
      this.router.navigate(['insurance']);

      let insurance_information: any = {
        vehicleBrand: this.vehicleform.value.vehicleBrand.brand_name,
        vehicleModel: this.vehicleform.value.vehicleModel.model_name,
        vehicleYear: this.vehicleform.value.vehicleYear.year,
        vehicleDescription: this.vehicleform.value.vehicleDescription.description,
        carprice_id: this.vehicleform.value.vehicleDescription.price_id
      }
      /** Store credit information in localStorage*/
      localStorage.setItem('insurance_information', JSON.stringify(insurance_information));
    }
  }


  /**
   * Method to enable or disable service tag options
   * @param {Event} event - Identifier of the value service tag
   * @return {void} Nothing
  */
  onSelectServiceTag($event) {

    /* Bloquear la seccion de ingresar valores */
    this.amountRequest.options = Object.assign({}, this.amountRequest.options, { disabled: true });
    this.entryAmount.options = Object.assign({}, this.entryAmount.options, { disabled: true });
    this.monthlyIncome.options = Object.assign({}, this.monthlyIncome.options, { disabled: true });
    this.term.options = Object.assign({}, this.term.options, { disabled: true });

    /* Reiniciar los valores a 0 */
    this.amountRequest.value = 0;
    this.entryAmount.value = 0;
    this.monthlyIncome.value = 0;
    this.term.value = 0;

    /** Para desactivar la sección de valores de seguro */
    this.insuranceSectionValues = false;

    if ($event.target.value === 'creditos') {
      /* Para activar los selects*/
      this.active_credits_select = true;
      this.active_insurance_select = false;
      this.active_creditCard_select = false;
      this.active_investmentPolicy_select = false;
      /* Para activar seccion de valores de entrada*/
      this.creditSection = true;
      this.insuranceSection = false;
    }
    if ($event.target.value === 'seguros') {
      /* Para activar los selects*/
      this.active_credits_select = false;
      this.active_insurance_select = true;
      this.active_creditCard_select = false;
      this.active_investmentPolicy_select = false;
      /* Para activar seccion de valores de entrada*/
      this.creditSection = false;
      this.insuranceSection = true;
    }
    if ($event.target.value === 'tarjetas') {
      /* Para activar los selects*/
      this.active_credits_select = false;
      this.active_insurance_select = false;
      this.active_creditCard_select = true;
      this.active_investmentPolicy_select = false;
      /* Para activar seccion de valores de entrada*/
      this.creditSection = false;
      this.insuranceSection = false;
    }
    if ($event.target.value === 'poliza') {
      /* Para activar los selects*/
      this.active_credits_select = false;
      this.active_insurance_select = false;
      this.active_creditCard_select = false;
      this.active_investmentPolicy_select = true;
      /* Para activar seccion de valores de entrada*/
      this.creditSection = false;
      this.insuranceSection = false;
    }
  }

  /**
   * Method to verify if credits have been selected
   * @param {Event} event - Identifier of credit type (id_credit)
   * @return {void} Nothing
  */
  onSelectCreditOption($event) {

    this.id_credit = $event.id;
    this.destinedTo = $event.description;

    this.amountRequest.options = Object.assign({}, this.amountRequest.options, { disabled: false });
    this.entryAmount.options = Object.assign({}, this.entryAmount.options, { disabled: false });
    this.monthlyIncome.options = Object.assign({}, this.monthlyIncome.options, { disabled: false });
    this.term.options = Object.assign({}, this.term.options, { disabled: false });

    this.amountRequest.value = 0;
    this.entryAmount.value = 0;
    this.monthlyIncome.value = 0;
    this.term.value = 0;

  }

  /**
   * Verify if insurance have been selected
   * @param {Event} event - Identifier of credit type (id_credit)
   * @return {void} Nothing
  */
  onSelectInsuranceOption($event) {

    this.id_insurance = $event.id;

    /** Activar sección de valores dependiendo del tipo de seguro */
    this.insuranceSectionValues = true;

    this.amountRequest.options = Object.assign({}, this.amountRequest.options, { disabled: false });
    this.entryAmount.options = Object.assign({}, this.entryAmount.options, { disabled: false });
    this.monthlyIncome.options = Object.assign({}, this.monthlyIncome.options, { disabled: false });
    this.term.options = Object.assign({}, this.term.options, { disabled: false });

    this.amountRequest.value = 0;
    this.entryAmount.value = 0;
    this.monthlyIncome.value = 0;
    this.term.value = 0;
  }

  /**
   * Service form (credit, insurance, credit cards, investment policy)
  */
  serviceform = this.formbuilder.group({
    service_type_userSelected: new FormControl()
  });


  /**
   * On Init
   * @return {void} Nothing
  */

  ngOnInit() {

    window.scrollTo(0, 0);

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
          
          let currentprovince= this.provinces.find(x => x.apicode === this.region_code);

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

    /* TODO DE SEGUROS */
    /*  Get all car brands. */
    this.httpService.getAllCarBrands().subscribe(res => {
      this.vehicleBrand = res.data;
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /**
   * Move between sections of the page
   * @param {HTMLElement} element - HTML identifier
   * @return {void} Nothing
  */
  moveSection(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
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







  /**----------------------------------------------METHODS AND FUNCTIONS FOR INSURANCE-------------------------------------------------- */

  /**
   * Define vehicle form
  */
  vehicleform = this.formbuilder.group({
    vehicleBrand: [null, [Validators.required]],
    vehicleModel: [null, [Validators.required]],
    vehicleYear: [null, [Validators.required]],
    vehicleDescription: [null, [Validators.required]],
  });

  /**
   * Variable to verify if the vehicle form is correct
   * @type {boolean}
  */
  vehicleformSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidVehicleform(field: string) {
    return (
      this.vehicleform.get(field).errors && this.vehicleform.get(field).touched ||
      this.vehicleform.get(field).untouched &&
      this.vehicleformSubmitted && this.vehicleform.get(field).errors
    );
  }

  /**
   * Change car brand
   * @param {Event} event.id - Brand identifier
   * @return {void} Nothing
  */
  changeCarBrand(event) {
    let id_brand: number = event.id;
    this.httpService.getYearByBrand(id_brand).subscribe(res => {
      this.vehicleform.controls['vehicleModel'].setValue(null);
      this.vehicleform.controls['vehicleYear'].setValue(null);
      this.vehicleform.controls['vehicleDescription'].setValue(null);
      this.vehicleModel = [];
      this.vehicleYear = [];
      this.vehicleDescription = [];
      this.vehicleYear = res.data;
      //console.log(this.vehicleYear);
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /**
   * Change car year
   * @param {Event} event.id - year identifier
   * @return {void} Nothing
  */
  changeCarYear(event) {
    let year: number = event.year;
    let id_model: number = event.brand_id;
    this.httpService.getModelByYear(id_model, year).subscribe(res => {
      this.vehicleform.controls['vehicleModel'].setValue(null);
      this.vehicleform.controls['vehicleDescription'].setValue(null);
      this.vehicleModel = [];
      this.vehicleDescription = [];
      this.vehicleModel = res.data;
      //console.log(this.vehicleYear);
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /**
   * Change car model
   * @param {Event} event.id - model identifier
   * @return {void} Nothing
  */
  changeCarModel(event) {
    let id_model: number = event.model_id;
    let year: number = event.year;
    let id_brand: number = event.brand_id;
    this.httpService.getDescriptionByModel(id_model, id_brand, year).subscribe(res => {
      this.vehicleform.controls['vehicleDescription'].setValue(null);
      this.vehicleDescription = [];
      this.vehicleDescription = res.data;
      //console.log(this.vehicleYear);
    }, error => {
      console.log('error');
      console.log(error);
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