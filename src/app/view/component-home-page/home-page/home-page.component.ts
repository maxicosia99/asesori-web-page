import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';                                                 //options user slider
import { OwlOptions } from 'ngx-owl-carousel-o';                                      //options carousel images
import { FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';     //forms
import { CreditInformation } from 'src/app/models/credit-information';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { UserInfo } from '../../../models/user-info';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { InsuranceInformation } from 'src/app/models/insurance-information';
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
    * @param {HttpClientService} httpService - Service for connection to the server
    * @param {FormBuilder} formbuilder - Service for the use of forms
    * @param {AuthenticationService} authenticationService - Authentication service for user data
    * @param {Router} router - Routing service
    * @param {DataService} dataService - Service to pass information between components
  */
  constructor(
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
  //public modalRef: BsModalRef;

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
      this.router.navigate(['credit']);

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
      this.router.navigate(['insurance']);

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

    /*  Start - Search by location. */
    this.httpService.getCurrentLocation().subscribe(res => {
      this.httpService.verifyProvinceExistence(res.region_code).subscribe(resp => {

        /* In case the location is detected */
        if (resp.status === 200) {
          this.region_code = res.region_code;
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
   * Move between sections of the page
   * @param {HTMLElement} element - HTML identifier
   * @return {void} Nothing
  */
  moveSection(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }




  /**-----------------------------------------------METHODS AND FUNCTIONS FOR CREDITS--------------------------------------------------- */

  /**
   * Validate economic form and generates a summary
   * @return {void} Nothing
  */
  onSubmitCreditform(el: HTMLElement) {
    //if (this.cantSelectedCreditOptions > 0) {

      this.credits_entities = ``;

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

    let creditInformation: CreditInformation = {} as CreditInformation;

    // creditInformation.user_id = this.user_id;
    // creditInformation.name = this.personalDataForm.value.names;
    // creditInformation.last_name = this.personalDataForm.value.last_names;
    // creditInformation.cedula = this.personalDataForm.value.dni;

    // creditInformation.city = this.addressForm.value.city.name;
    // creditInformation.region_name = this.addressForm.value.province.name;
    // creditInformation.country_name = 'ECUADOR';
    // creditInformation.address = this.addressForm.value.address;

    // creditInformation.email = this.contactForm.value.email;
    // creditInformation.phone = this.contactForm.value.phone;

    // creditInformation.payments_cards = this.economicForm.value.card_payment;
    // creditInformation.rental = this.economicForm.value.rent_payment;
    // creditInformation.payment_loans = this.economicForm.value.loans_payment;
    // creditInformation.payment_services = this.economicForm.value.services_payment;
    // creditInformation.housing_type = this.economicForm.value.typeHousing.type;
    // creditInformation.mortgage_payment = this.economicForm.value.mortgage_payment;
    // creditInformation.total_possessions = this.economicForm.value.total_properties;

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
   * Validate insurance form and generates a summary
   * @return {void} Nothing
  */
  onSubmitInsuranceform(el: HTMLElement) {

    //if (this.cantInsurnaceUserSelected > 0) {

      this.insurance_entities = ``;

      el.scrollIntoView();
      
      // const selectedInsurancesIds = this.insuranceform.value.can_access_vehicleInsurance_userSelected
      //   .map((v, i) => v ? this.can_access_vehicleInsurance[i].idaseguradora : null)
      //   .filter(v => v !== null);


      // for (let entry of selectedInsurancesIds) {
      //   let aux = this.can_access_vehicleInsurance.find(x => x.idaseguradora == entry);
      //   this.insurance_entities += aux.name + ' - ' + aux.nombre_corto + ', ';
      // }

    // } else {
    //   alert(`seleccione al menos una opción de seguro`);
    // }
  }

  /**
   * Retrieve all the information for the insurance application
   * @param {HTMLElement} el - HTML identifier
   * @return {void} Nothing
  */
  onSubmitRequestSummaryInsurance(el: HTMLElement) {

    el.scrollIntoView();
    // this.section1 = false;
    // this.section2 = false;
    // this.section3 = false;
    // this.section4 = false;
    // this.section5 = true;

    let insuranceInformation: InsuranceInformation = {} as InsuranceInformation;

    // insuranceInformation.user_id = this.user_id;
    // insuranceInformation.name = this.personalDataForm.value.names;
    // insuranceInformation.last_name = this.personalDataForm.value.last_names;
    // insuranceInformation.cedula = this.personalDataForm.value.dni;

    // insuranceInformation.city = this.addressForm.value.city.id;
    // insuranceInformation.address = this.addressForm.value.address;

    // insuranceInformation.email = this.contactForm.value.email;
    // insuranceInformation.phone = this.contactForm.value.phone;

    insuranceInformation.carprice_id = this.vehicleform.value.vehicleDescription.price_id;

    // const selectedVehicleInsurance = this.insuranceform.value.can_access_vehicleInsurance_userSelected
    //   .map((v, i) => v ? this.can_access_vehicleInsurance[i].id : null)
    //   .filter(v => v !== null);

    // let options: Insurance[] = [];

    // for (let entry of selectedVehicleInsurance) {
    //   let aux = this.can_access_vehicleInsurance.find(x => x.id == entry);
    //   let insurance: Insurance = {} as Insurance;
    //   insurance.id_insurancecompany = aux.id_insurance_entity;
    //   insurance.anual_fee = aux.total_premium;
    //   options.push(insurance);
    // }

    //insuranceInformation.options = options;

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