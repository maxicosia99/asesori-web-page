import { Component, OnInit, TemplateRef } from '@angular/core';
import { Options } from 'ng5-slider';                                                 //options user slider
import { OwlOptions } from 'ngx-owl-carousel-o';                                      //options carousel images
import { BsModalService, BsModalRef } from 'ngx-bootstrap';                           //modal service
import { FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';     //forms
import { validateCedula } from 'src/app/services/client/validar-cedula';              //service to validate cedula
import { Creditos } from 'src/app/models/creditos';                                   //part of model to credit request  
import { CreditInformation } from 'src/app/models/credit-information';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { CarInsuranceRequest } from '../../../models/car-insurance-request';
import { UserInfo } from '../../../models/user-info';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { InsuranceInformation } from 'src/app/models/insurance-information';
import { Insurance } from '../../../models/insurance';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/client/comunication.service';


/** Interface representing a slider model */
interface SliderModel {
  value: number;
  options: Options;
}

/**
 * Validate the selection of a select
 * @param {AbstractControl} control - Object to validate with id
 * @return {boolean} - If it is true, the object has an error, if it is null, the object is correct
 */
export function validateSelect(control: AbstractControl) {
  if (control.value.id === -1) {
    return { valid: true };
  }
  return null;
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
    * @param {BsModalService} modalService - Modal administration service
    * @param {HttpClientService} httpService - Service for connection to the server
    * @param {FormBuilder} formbuilder - Service for the use of forms
    * @param {AuthenticationService} authenticationService - Authentication service for user data
    * @param {Router} router - Routing service
    * @param {DataService} dataService - Service to pass information between components
  */
  constructor(
    private modalService: BsModalService,
    private httpService: HttpClientService,
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private dataService: DataService
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
   * Modal methods
   * @type {BsModalRef}
  */
  public modalRef: BsModalRef;

  /**
   * Location variables
   * @type {string}
  */
  public region_code: string;

  /**
   * Variable for the selection of marital status
   * @type {any[]}
  */
  public maritalStatus: any = [
    { id: 1, status: 'CASADO' },
    { id: 2, status: 'SOLTERO' },
    { id: 3, status: 'DIVORCIADO' },
    { id: 4, status: 'VIUDO' },
    { id: 4, status: 'UNION LIBRE' },
  ];

  /**
   * Variables for the selection of gender
   * @type {any[]}
  */
  public gender: any = [
    { id: 1, gender: 'HOMBRE' },
    { id: 2, gender: 'MUJER' }
  ]

  /**
   * Variables for the selection of type housing
   * @type {any[]}
  */
  public typeHousing = [
    { id: 1, type: "Propia" },
    { id: 2, type: "Arrendada" }
  ]

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

  /**
   * Variables to activate credit or insurance forms
   * @type {boolean}
  */
  public creditSectionForm: boolean = false;
  public insuranceSectionForm: boolean = false;

  /**
   * Variables to enable sections of forms
   * @type {boolean}
  */
  section1: boolean = true;   //Identification forms section: personal data, address, contact
  section2: boolean = false;  //Section for forms: vehicle information - financial information
  section3: boolean = false;  //Credit and insurance results section
  section4: boolean = false;  //Summary section
  section5: boolean = false;  //Final application section

  /**
   * Variable to activate the email section
   * @type {boolean}
  */
  public emailSection: boolean = false;

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
        return '' + value;
      }
    }
  };

  /**
   * Variable for the type of entity: bank, cooperative or both
   * @type {number}
  */
  public entityType: number = 0;

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
   * Variable to store the names of the selected financial entities
   * @type {string}
  */
  public credits_entities: string = ``;

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
   * Variable to store the names of the selected insurance entities
   * @type {string}
  */
  public insurance_entities: string = ``;

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
   * Variable that stores the vehicle color
   * @type {any[]}
  */
  public vehicleColors: any = [
    { id: 1, color_name: 'AMARILLO' },
    { id: 2, color_name: 'AZUL' },
    { id: 3, color_name: 'BEIGE' },
    { id: 4, color_name: 'BLANCO' },
    { id: 5, color_name: 'BRONCE' },
    { id: 6, color_name: 'CAFE' },
    { id: 7, color_name: 'CELESTE' },
    { id: 8, color_name: 'COBRE' },
    { id: 9, color_name: 'CREMA' },
    { id: 10, color_name: 'DORADO' },
    { id: 11, color_name: 'FUCSIA' },
    { id: 12, color_name: 'GRIS' },
    { id: 13, color_name: 'ABANO' },
    { id: 14, color_name: 'LILA' },
    { id: 15, color_name: 'MARFIL' },
    { id: 16, color_name: 'MORADO' },
    { id: 17, color_name: 'MOSTAZA' },
    { id: 18, color_name: 'NARANJA' },
    { id: 18, color_name: 'NEGRO' },
    { id: 19, color_name: 'OTROS' },
    { id: 20, color_name: 'PERLA' },
    { id: 21, color_name: 'PLATA' },
    { id: 22, color_name: 'PLATEADO' },
    { id: 23, color_name: 'PLOMO' },
    { id: 24, color_name: 'ROJO' },
    { id: 25, color_name: 'ROSADO' },
    { id: 26, color_name: 'TOMATE' },
    { id: 27, color_name: 'TURQUEZA' },
    { id: 28, color_name: 'VERDE' },
    { id: 29, color_name: 'VINO' },
  ]

  /**
   * Variable to store insurance results
   * @type {any}
  */
  public can_access_vehicleInsurance: any;

  /**
   * Variables necessary to store the results
   * @type {number}
  */
  public cant_insurances: number = 0;
  public cont_insurances: number = 0;

  /**
   * Subscriptions necessary to store the results
   * @type {any}
  */
  public subsc1: any;
  public subsc2: any = [];

  /**
   * Variable to store the amount of results chosen by the user
   * @type {number}
  */
  public cantInsurnaceUserSelected: number = 0;

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
  public hasCedula: boolean = false;
  public hasEmail: boolean = false;
  public hasPhone1: boolean = false;
  public hasAddress: boolean = false;
  public hasNames: boolean = false;
  public hasLastNames: boolean = false;









  /**----------------------------------------METHODS AND FUNCTIONS FOR CREDITS AND INSURANCE-------------------------------------------- */

  /**
   * Email form (credit, insurance, credit cards, investment policy)
  */
  emailform = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

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
  onSubmitEmailSection(){
    
    if (this.serviceform.get('service_type_userSelected').value === 'creditos'){
      this.router.navigate(['/forms/credit']);

      let credit: any = {
        amountRequest:this.amountRequest.value,
        monthlyIncome:this.monthlyIncome.value,
        entryAmount: this.entryAmount.value,
        term: this.term.value,
        region_code: this.region_code,
        entityType: this.entityType,
        id_credit: this.id_credit 
      }

      this.dataService.changeInfomation(credit)
    }

    if (this.serviceform.get('service_type_userSelected').value === 'seguros'){
      this.router.navigate(['/forms/insurance']);

      let insurance: any = {
        vehicleBrand:'marca',
        vehicleModel:'modelo',
        vehicleYear: 'year',
        vehicleDescription: 'vehicleDescription',
        id_insurance: this.id_insurance 
      }

      this.dataService.changeInfomation(insurance)
    }
  }














  /**
   * Allows to open and close the modal terms and conditions
   * @param {TemplateRef<any>} template - Identifier of the modal HTML tag
  */
  openModal_termsConditions(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-dialog-centered');
  }

  /**
   * Shows modal confirmation message
   * @return {void} Nothing
  */
  confirm(element: HTMLElement): void {
    this.modalRef.hide();
    this.onSubmitRequestSummaryCredit(element);
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

    /* Volver a la sección inicial del formulario */
    this.section1 = true;
    this.section2 = false;
    this.section3 = false;
    this.section4 = false;
    this.section5 = false;

    if ($event.target.value === 'creditos') {
      /* Para activar los selects*/
      this.active_credits_select = true;
      this.active_insurance_select = false;
      this.active_creditCard_select = false;
      this.active_investmentPolicy_select = false;
      /* Para activar seccion de valores de entrada*/
      this.creditSection = true;
      this.insuranceSection = false;
      /* Para activar o desactivar secciones de formularios */
      this.insuranceSectionForm = false;
      this.creditSectionForm = false;
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
      /* Para activar o desactivar secciones de formularios */
      this.insuranceSectionForm = false;
      this.creditSectionForm = false;
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
      /* Para activar o desactivar secciones de formularios */
      this.insuranceSectionForm = false;
      this.creditSectionForm = false;
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
      /* Para activar o desactivar secciones de formularios */
      this.insuranceSectionForm = false;
      this.creditSectionForm = false;
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

    this.amountRequest.options = Object.assign({}, this.amountRequest.options, { disabled: false });
    this.entryAmount.options = Object.assign({}, this.entryAmount.options, { disabled: false });
    this.monthlyIncome.options = Object.assign({}, this.monthlyIncome.options, { disabled: false });
    this.term.options = Object.assign({}, this.term.options, { disabled: false });

    this.amountRequest.value = 0;
    this.entryAmount.value = 0;
    this.monthlyIncome.value = 0;
    this.term.value = 0;

    this.creditSectionForm = false;
    this.insuranceSectionForm = false;

  }

  /**
   * Service form (credit, insurance, credit cards, investment policy)
  */
  serviceform = this.formbuilder.group({
    service_type_userSelected: new FormControl()
  });

  /**
   * Define personal data form
  */
  personalDataForm = this.formbuilder.group({
    names: ['', Validators.required],
    last_names: ['', Validators.required],
    dni: ['', [Validators.required, validateCedula]],
    maritalStatus: [''],
    gender: [''],
    age: ['', [Validators.required]]
  });

  /**
   * Variable to verify if the personal data form is correct
   * @type {boolean}
  */
  personalDataFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidPersonalData(field: string) {
    return (
      this.personalDataForm.get(field).errors && this.personalDataForm.get(field).touched ||
      this.personalDataForm.get(field).untouched &&
      this.personalDataFormSubmitted && this.personalDataForm.get(field).errors
    );
  }

  /**
   * Validate personal data form
   * @return {void} Nothing
  */
  onSubmitPersonalDataForm() {
    this.personalDataFormSubmitted = true;
    //if (this.personalDataForm.valid) {}
  }

  /**
   * Define address form
  */
  addressForm = this.formbuilder.group({
    province: ['', [Validators.required, validateSelect]],
    address: ['', Validators.required],
    city: ['', [Validators.required, validateSelect]]
  });

  /**
   * Variable to verify if the address form is correct
   * @type {boolean}
  */
  addressFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidaddressForm(field: string) {
    return (
      this.addressForm.get(field).errors && this.addressForm.get(field).touched ||
      this.addressForm.get(field).untouched &&
      this.addressFormSubmitted && this.addressForm.get(field).errors
    );
  }

  /**
   * Validate address form
   * @return {void} Nothing
  */
  onSubmitaddressForm() {
    this.addressFormSubmitted = true;
    //if (this.addressForm.valid) {}
  }

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
  onSubmitContactForm(element: HTMLElement) {
    this.contactFormSubmitted = true;
    if (this.contactForm.valid) {
      element.scrollIntoView();
      console.log('Finalizó identificación');
      this.section1 = false;
      this.section2 = true;
      this.section3 = false;
      this.section4 = false;
      this.section5 = false;
    }
  }

  /**
   * On Init
   * @return {void} Nothing
  */

  ngOnInit() {

    this.personalDataForm.controls['maritalStatus'].setValue({ id: -1, status: 'ESTADO CIVIL' });
    this.personalDataForm.controls['gender'].setValue({ id: -1, gender: 'GÉNERO' });

    /*  Get all provinces. */
    this.httpService.getProvinces().subscribe(res => {
      this.provinces = res.data;
      this.addressForm.controls['province'].setValue({ id: -1, name: 'PROVINCIA*' });
      this.addressForm.controls['city'].setValue({ id: -1, name: 'CIUDAD*' });
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
          this.addressForm.controls['province'].setValue({ id: resp.data.id, name: resp.data.name });
          /* the cities of the detected province are loaded */
          this.httpService.getCities(resp.data.id).subscribe(res => {
            this.cities = []
            this.cities = res.data;
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

      this.personalDataForm.controls['dni'].setValue("");
      this.personalDataForm.controls['names'].setValue("");
      this.personalDataForm.controls['last_names'].setValue("");
      this.contactForm.controls['email'].setValue("");
      this.contactForm.controls['phone'].setValue("");
      this.addressForm.controls['address'].setValue("");
      this.user_id = null;
      this.hasCedula = false;
      this.hasEmail = false;
      this.hasPhone1 = false;
      this.hasAddress = false;
      this.hasNames = false;
      this.hasLastNames = false;
    });

    /** TODO DE CREDITOS */
    this.economicForm.controls['typeHousing'].setValue({ id: -1, type: 'TIPO DE VIVIENDA*' });

    /* TODO DE SEGUROS */
    this.vehicleform.controls['vehicleBrand'].setValue({ id: -1, brand_name: 'MARCA*' });
    this.vehicleform.controls['vehicleModel'].setValue({ id: -1, model_name: 'MODELO*' });
    this.vehicleform.controls['vehicleYear'].setValue({ id: -1, year: 'AÑO*' });
    this.vehicleform.controls['vehicleDescription'].setValue({ id: -1, description: 'DESCRIPCIÓN*' });
    this.vehicleform.controls['vehicleColor'].setValue({ id: -1, color_name: 'COLOR*' });

    /*  Get all car brands. */
    this.httpService.getAllCarBrands().subscribe(res => {
      this.vehicleBrand = res.data;
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /**
   * Recover the cities of a province
   * @param {Event} event.id - Province identifier
   * @return {void} Nothing
  */
  changeProvince(event) {
    this.httpService.getCities(event.id).subscribe(res => {
      this.addressForm.controls['city'].setValue({ id: -1, name: 'CIUDAD*' });
      this.cities = []
      this.cities = res.data;
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
   * Move between sections of the page
   * @param {HTMLElement} element - HTML identifier
   * @return {void} Nothing
  */
  scrollToTop(element: HTMLElement) {
    element.scrollIntoView();
  }

  /**
   * Move between sections of forms
   * @param {HTMLElement} el - HTML identifier
   * @return {void} Nothing
  */
  section2_1(el: HTMLElement) {
    el.scrollIntoView();
    this.section1 = true;
    this.section2 = false;
    this.section3 = false;
    this.section4 = false;
    this.section5 = false;
  }

  /**
   * Move between sections of forms
   * @param {HTMLElement} el - HTML identifier
   * @return {void} Nothing
  */
  section3_2(el: HTMLElement) {
    el.scrollIntoView();
    this.section1 = false;
    this.section2 = true;
    this.section3 = false;
    this.section4 = false;
    this.section5 = false;

    if (this.can_access_vehicleInsurance) {
      this.can_access_vehicleInsurance_userSelected.clear()
    }

  }

  /**
   * Move between sections of forms
   * @param {HTMLElement} el - HTML identifier
   * @return {void} Nothing
  */
  section1_3(el: HTMLElement) {
    el.scrollIntoView();
    this.section1 = false;
    this.section2 = false;
    this.section3 = true;
    this.section4 = false;
    this.section5 = false;
  }

  /**
   * Move between sections of forms
   * @param {HTMLElement} el - HTML identifier
   * @return {void} Nothing
  */
  section4_3(el: HTMLElement) {
    el.scrollIntoView();
    this.section1 = false;
    this.section2 = false;
    this.section3 = true;
    this.section4 = false;
    this.section5 = false;
  }

  /**
   * Move between sections of forms
   * @param {HTMLElement} el - HTML identifier
   * @return {void} Nothing
  */
  section5_(el: HTMLElement) {
    el.scrollIntoView();
    this.section1 = false;
    this.section2 = false;
    this.section3 = false;
    this.section4 = false;
    this.section5 = true;
  }










  /**-----------------------------------------------METHODS AND FUNCTIONS FOR CREDITS--------------------------------------------------- */

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
    typeHousing: ['', [Validators.required, validateSelect]]
  });

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
  onSubmiteconomicForm(element: HTMLElement) {
    this.economicFormSubmitted = true;
    if (this.economicForm.valid) {
      element.scrollIntoView();
      console.log('Finalizó situacion economica');
      this.section1 = false;
      this.section2 = false;
      this.section3 = true;
      this.section4 = false;
      this.section5 = false;
    }
  }

  /**
   * Validate economic form and generates a summary
   * @return {void} Nothing
  */
  onSubmitCreditform(el: HTMLElement) {
    //if (this.cantSelectedCreditOptions > 0) {

      this.credits_entities = ``;

      el.scrollIntoView();
      this.section1 = false;
      this.section2 = false;
      this.section3 = false;
      this.section4 = true;
      this.section5 = false;

      // const selectedCreditsIds1 = this.creditform.value.can_access_credit_userSelected
      //   .map((v, i) => v ? this.can_access_credit[i].id : null)
      //   .filter(v => v !== null);

      // const selectedCreditsIds2 = this.creditform.value.cannot_access_credit_userSelected
      //   .map((v, i) => v ? this.cannot_access_credit[i].id : null)
      //   .filter(v => v !== null);

      // for (let entry of selectedCreditsIds1) {
      //   let aux = this.can_access_credit.find(x => x.id == entry);
      //   this.credits_entities += aux.name_financial_entity + ', ';
      // }

      // for (let entry of selectedCreditsIds2) {
      //   let aux = this.cannot_access_credit.find(x => x.id == entry);
      //   this.credits_entities += aux.name_financial_entity + ', ';
      // }

    // } else {
    //   alert(`seleccione al menos una opción de crédito`);
    // }
  }

  /**
   * Calculate credit options
   * @param {HTMLElement} element - HTML identifier
   * @return {void} Nothing
  */
  onSubmitServiceform(element: HTMLElement) {

    element.scrollIntoView({ behavior: 'smooth' });
    this.emailSection = true;
  }

  /**
   * Retrieve all the information for the credit application
   * @param {HTMLElement} el - HTML identifier
   * @return {void} Nothing
  */
  onSubmitRequestSummaryCredit(el: HTMLElement) {

    el.scrollIntoView();
    this.section1 = false;
    this.section2 = false;
    this.section3 = false;
    this.section4 = false;
    this.section5 = true;

    let creditInformation: CreditInformation = {} as CreditInformation;

    creditInformation.user_id = this.user_id;
    creditInformation.name = this.personalDataForm.value.names;
    creditInformation.last_name = this.personalDataForm.value.last_names;
    creditInformation.cedula = this.personalDataForm.value.dni;

    creditInformation.city = this.addressForm.value.city.name;
    creditInformation.region_name = this.addressForm.value.province.name;
    creditInformation.country_name = 'ECUADOR';
    creditInformation.address = this.addressForm.value.address;

    creditInformation.email = this.contactForm.value.email;
    creditInformation.phone = this.contactForm.value.phone;

    creditInformation.payments_cards = this.economicForm.value.card_payment;
    creditInformation.rental = this.economicForm.value.rent_payment;
    creditInformation.payment_loans = this.economicForm.value.loans_payment;
    creditInformation.payment_services = this.economicForm.value.services_payment;
    creditInformation.housing_type = this.economicForm.value.typeHousing.type;
    creditInformation.mortgage_payment = this.economicForm.value.mortgage_payment;
    creditInformation.total_possessions = this.economicForm.value.total_properties;

    creditInformation.term = this.term.value;
    creditInformation.id_credit = this.id_credit;

    creditInformation.amount_required = this.amountRequest.value;
    creditInformation.monthly_income = this.monthlyIncome.value;
    creditInformation.initial_amount = this.entryAmount.value;
    creditInformation.destination = this.destinedTo;

    // const selectedCreditsIds1 = this.creditform.value.can_access_credit_userSelected
    //   .map((v, i) => v ? this.can_access_credit[i].id : null)
    //   .filter(v => v !== null);

    // const selectedCreditsIds2 = this.creditform.value.cannot_access_credit_userSelected
    //   .map((v, i) => v ? this.cannot_access_credit[i].id : null)
    //   .filter(v => v !== null);

    // let creditos: Creditos[] = [];

    // for (let entry of selectedCreditsIds1) {
    //   let aux = this.can_access_credit.find(x => x.id == entry);
    //   let credito: Creditos = {} as Creditos;
    //   credito.id_financialentity = aux.id_financial_entity;
    //   credito.monthly_fee = aux.monthly_payment;
    //   creditos.push(credito);
    // }

    // for (let entry of selectedCreditsIds2) {
    //   let aux = this.cannot_access_credit.find(x => x.id == entry);
    //   let credito: Creditos = {} as Creditos;
    //   credito.id_financialentity = aux.id_financial_entity;
    //   credito.monthly_fee = aux.monthly_payment;
    //   creditos.push(credito);
    // }

    //creditInformation.creditos = creditos;

    this.httpService.createCreditInformation(creditInformation).subscribe(res => {

      console.log(creditInformation)

      if (res.status == 200) {
        let application_id = res.data;
        this.httpService.sendCreditInformation(application_id).subscribe((res) => {
          console.log(res);
        }, (error) => {
          console.log('error al enviar información de solicitud con id ' + application_id + " a la nueva bd");
          console.log(error);
        });

        this.messageErrorCredit = null;

      } else {
        console.log('Ah ocurrido un error! ' + res.message);
        this.messageErrorCredit = res.message; //enviar correctamente el mensaje
      }
    }, error => {
      console.log('error al crear información');
      console.log(error);
    });
  }









  /**----------------------------------------------METHODS AND FUNCTIONS FOR INSURANCE-------------------------------------------------- */

  /**
   * Define vehicle form
  */
  vehicleform = this.formbuilder.group({
    vehicleBrand: ['', [Validators.required, validateSelect]],
    vehicleModel: ['', [Validators.required, validateSelect]],
    vehicleYear: ['', [Validators.required, validateSelect]],
    vehicleDescription: ['', [Validators.required, validateSelect]],
    vehicleColor: ['', [Validators.required, validateSelect]],
    vehiclePlate: [''],
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
      this.vehicleform.controls['vehicleModel'].setValue({ id: -1, model_name: 'MODELO*' });
      this.vehicleform.controls['vehicleYear'].setValue({ id: -1, year: 'AÑO*' });
      this.vehicleform.controls['vehicleDescription'].setValue({ id: -1, description: 'DESCRIPCIÓN*' });
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
      this.vehicleform.controls['vehicleModel'].setValue({ id: -1, model_name: 'MODELO*' });
      this.vehicleform.controls['vehicleDescription'].setValue({ id: -1, description: 'DESCRIPCIÓN*' });
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
      this.vehicleform.controls['vehicleDescription'].setValue({ id: -1, description: 'DESCRIPCIÓN*' });
      this.vehicleDescription = [];
      this.vehicleDescription = res.data;
      //console.log(this.vehicleYear);
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /**
   * Get variable to store the results of insurance selected by the user
   * @return {FormArray} Values where the user can obtain the insurance
  */
  get can_access_vehicleInsurance_userSelected(): FormArray {
    return this.insuranceform.get('can_access_vehicleInsurance_userSelected') as FormArray;
  }

  /**
   * Count insurance selected options
   * @return {void} Nothing
  */
  public cantInsuranceSelectedUser() {
    this.cantInsurnaceUserSelected = this.insuranceform.value.can_access_vehicleInsurance_userSelected
      .map((v, i) => v ? this.can_access_vehicleInsurance[i].id : null)
      .filter(v => v !== null).length;
  }

  /**
   * Define insurance form
  */
  insuranceform = this.formbuilder.group({
    can_access_vehicleInsurance_userSelected: new FormArray([]),
  });

  /**
   * Validate insurance form and generates a summary
   * @return {void} Nothing
  */
  onSubmitInsuranceform(el: HTMLElement) {

    if (this.cantInsurnaceUserSelected > 0) {

      this.insurance_entities = ``;

      el.scrollIntoView();
      this.section1 = false;
      this.section2 = false;
      this.section3 = false;
      this.section4 = true;
      this.section5 = false;

      const selectedInsurancesIds = this.insuranceform.value.can_access_vehicleInsurance_userSelected
        .map((v, i) => v ? this.can_access_vehicleInsurance[i].idaseguradora : null)
        .filter(v => v !== null);


      for (let entry of selectedInsurancesIds) {
        let aux = this.can_access_vehicleInsurance.find(x => x.idaseguradora == entry);
        this.insurance_entities += aux.name + ' - ' + aux.nombre_corto + ', ';
      }

    } else {
      alert(`seleccione al menos una opción de seguro`);
    }
  }

  /**
   * Calculate vehicle insurance options
   * @param {HTMLElement} element - HTML identifier
   * @return {void} Nothing
  */
  onSubmitVehicleform(element: HTMLElement) {

    this.can_access_vehicleInsurance = [];
    this.cont_insurances = 0;
    this.cant_insurances = 0;

    this.vehicleformSubmitted = true;
    if (this.vehicleform.valid) {

      console.log('Finalizó información vehicular');
      this.section1 = false;
      this.section2 = false;
      this.section3 = true;
      this.section4 = false;
      this.section5 = false;

      let request: CarInsuranceRequest = {} as CarInsuranceRequest;
      request.insured_dni = this.personalDataForm.value.dni;
      request.insured_age = this.personalDataForm.value.age;
      request.insured_name = this.personalDataForm.value.names;
      request.insured_lastname = this.personalDataForm.value.last_names;
      request.insured_gender = this.personalDataForm.value.gender.gender;
      request.insured_marital_status = this.personalDataForm.value.maritalStatus.status;
      request.region_code = this.addressForm.value.province.id;
      request.city = this.addressForm.value.city.name;
      request.car_year = this.vehicleform.value.vehicleModel.year;
      request.car_brand = this.vehicleform.value.vehicleBrand.brand_name;
      request.car_model = this.vehicleform.value.vehicleModel.model_name;
      request.car_description = this.vehicleform.value.vehicleDescription.description;
      request.carprice_id = this.vehicleform.value.vehicleDescription.price_id;
      request.car_color = this.vehicleform.value.vehicleColor.color_name;
      request.car_license_plate = this.vehicleform.value.vehiclePlate;

      if (this.subsc1) {
        this.subsc1.unsubscribe();
      }
      if (this.subsc2 && this.subsc2.length) {
        for (let entry of this.subsc2)
          entry.unsubscribe();
      }
      this.subsc1 = this.httpService.getAllInsuranceCompanies().subscribe(res => {
        if (res.status == 200) {
          let insurances = res.data;
          //console.log(insurances);
          this.cant_insurances = insurances.length;
          for (let entry of insurances) {
            request.insurancecompany_id = entry.id;
            this.subsc2.push(
              this.httpService.getInsuranceInformation(request).subscribe(resp => {
                this.cont_insurances = this.cont_insurances + 1;
                //console.log(resp);
                if (res.status == 200) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  if (resp.data && resp.data.aseguradoras.length > 0) {
                    if (this.can_access_vehicleInsurance) {
                      this.can_access_vehicleInsurance_userSelected.clear()
                    }
                    //console.log(resp.data.aseguradoras[0]);
                    this.can_access_vehicleInsurance.push(resp.data.aseguradoras[0]);
                    this.can_access_vehicleInsurance.forEach((o, i) => {
                      const control = new FormControl(false);
                      (this.insuranceform.controls.can_access_vehicleInsurance_userSelected as FormArray).push(control);
                    });
                  }
                } else {
                  console.log(res);
                  console.log('Ah ocurrido un error!' + res.message);
                }
              }, error => {
                console.log('error');
                console.log(error);
              })
            );
          }

        } else {
          console.log(res);
          console.log('Ah ocurrido un error!' + res.message);
        }
      }, error => {
        console.log('error');
        console.log(error);
      });
    }
  }

  /**
   * Retrieve all the information for the insurance application
   * @param {HTMLElement} el - HTML identifier
   * @return {void} Nothing
  */
  onSubmitRequestSummaryInsurance(el: HTMLElement) {

    el.scrollIntoView();
    this.section1 = false;
    this.section2 = false;
    this.section3 = false;
    this.section4 = false;
    this.section5 = true;

    let insuranceInformation: InsuranceInformation = {} as InsuranceInformation;

    insuranceInformation.user_id = this.user_id;
    insuranceInformation.name = this.personalDataForm.value.names;
    insuranceInformation.last_name = this.personalDataForm.value.last_names;
    insuranceInformation.cedula = this.personalDataForm.value.dni;

    insuranceInformation.city = this.addressForm.value.city.id;
    insuranceInformation.address = this.addressForm.value.address;

    insuranceInformation.email = this.contactForm.value.email;
    insuranceInformation.phone = this.contactForm.value.phone;

    insuranceInformation.carprice_id = this.vehicleform.value.vehicleDescription.price_id;

    const selectedVehicleInsurance = this.insuranceform.value.can_access_vehicleInsurance_userSelected
      .map((v, i) => v ? this.can_access_vehicleInsurance[i].id : null)
      .filter(v => v !== null);

    let options: Insurance[] = [];

    for (let entry of selectedVehicleInsurance) {
      let aux = this.can_access_vehicleInsurance.find(x => x.id == entry);
      let insurance: Insurance = {} as Insurance;
      insurance.id_insurancecompany = aux.id_insurance_entity;
      insurance.anual_fee = aux.total_premium;
      options.push(insurance);
    }

    insuranceInformation.options = options;

    this.httpService.createInsuranceInformation(insuranceInformation).subscribe(res => {
      console.log(insuranceInformation)
      console.log(res);

      if (res.status == 200) {

        this.httpService.getSendMailInsurance().subscribe(res => {
          console.log(res);
        }, error => {
          console.log('error al enviar correo');
          console.log(error);
        });

        this.messageErrorInsurance = null;

      } else {
        console.log('Ah ocurrido un error! ' + res.message);
        this.messageErrorInsurance = res.message;
      }
    }, error => {
      console.log('error al crear información');
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
          if (user.cedula) {
            this.personalDataForm.controls['dni'].setValue(user.cedula);
            this.hasCedula = true;
          }
          if (user.name) {
            this.personalDataForm.controls['names'].setValue(user.name);
            this.hasNames = true;
          }
          if (user.last_name) {
            this.personalDataForm.controls['last_names'].setValue(user.last_name);
            this.hasLastNames = true;
          }
          if (user.email) {
            this.contactForm.controls['email'].setValue(user.email);
            this.hasEmail = true;
          }
          if (user.phone1) {
            this.contactForm.controls['phone'].setValue(user.phone1);
            this.hasPhone1 = true;
          }
          if (user.address) {
            this.addressForm.controls['address'].setValue(user.address);
            this.hasAddress = true;
          }
        }
      }, (error) => {
        console.log(error);
      });
    }
  }
}