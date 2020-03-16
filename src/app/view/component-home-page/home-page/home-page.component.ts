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
import { element } from 'protractor';
import { UserInfo } from '../../../models/user-info';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { InsuranceInformation } from 'src/app/models/insurance-information';
import { Insurance } from '../../../models/insurance';
/* End - icons in this page */


// slider model
interface SliderModel {
  value: number;
  options: Options;
}

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

export class HomePageComponent implements OnInit {

  constructor(
    private modalService: BsModalService,                 //modal service
    private httpService: HttpClientService,               //client api service
    private formbuilder: FormBuilder,                     //form service
    private authenticationService: AuthenticationService  //authentication service
  ) { }


  /* Slider for entry amount and time */
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
  /* End - Slider for entry amount and time*/


  /* Rating */
  max: number = 4;
  rate: number = 4;
  isReadonly: boolean = true;
  /* End - Rating */


  /* Carousel options */
  customOptions: OwlOptions = {
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

  /* Modal methods */
  message: string;
  modalRef: BsModalRef;

  openModal_termsConditions(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-dialog-centered');
    this.modalRef.content.closeBtnName = 'Close';
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
  /* End - Modal methods */



  /**------------------------------------------------------------------------------------------------------------------------------------ */


  /* Location variables */
  public region_code: string;
  /* Validation variables */
  public correctly: boolean = false;
  public correctly2: boolean = true;
  /* Variable for the type of entity: bank, cooperative or both. */
  public entityType: number = 0;
  /* Variable for the type of credit */
  public id_credit: number = 0;
  /* Variable for the type of insurance */
  public id_insurance;
  /* Variables to store credit results */
  public creditOptions: any;
  public can_access_credit: any;
  public cannot_access_credit: any;
  public credit_unavailable: any;
  /* variables for the selection of marital status */
  public maritalStatus: any = [
    { id: 1, status: 'CASADO' },
    { id: 2, status: 'SOLTERO' },
    { id: 3, status: 'DIVORCIADO' },
    { id: 4, status: 'VIUDO' },
    { id: 4, status: 'UNION LIBRE' },
  ];
  /* variables for the selection of gender */
  public gender: any = [
    { id: 1, gender: 'HOMBRE' },
    { id: 2, gender: 'MUJER' }
  ]
  /* variables for the selection of type housing */
  public typeHousing = [
    { id: 1, type: "Propia" },
    { id: 2, type: "Arrendada" }
  ]
  /* variable to store all provinces and from Ecuador */
  public provinces: any;
  public cities: any;
  /* Variable to store the names of the selected financial entities. */
  public creditos_entities: string = ``;
  /* Variable to store the names of the selected insurance entities. */
  public insurance_entities: string = ``;
  /* Variable that stores the types of credits. */
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
  /* Variable that stores the types of credits. */
  public insurance_select: any = [
    { id: 1, name: 'Vehicular', description: 'Seguros para tu vehículo' },
  ];
  /* Variables to enable or disable service tag options. */
  public active_credits_select: boolean = false;
  public active_insurance_select: boolean = false;
  public active_cards_select: boolean = false;
  public active_pilicy_select: boolean = false;
  /* Variables to activate credit or insurance values and select */
  public creditSection: boolean = false;
  public insuranceSection: boolean = false;
  /* Variables to activate credit or insurance forms */
  public creditSectionForm: boolean = false;
  public insuranceSectionForm: boolean = false;

  /* Credit calculation form */
  estimateform = this.formbuilder.group({
    amountRequest: [''],
    entryAmount: [''],
    monthlyincome: [''],
    term: [''],
    credit_type_userSelected: new FormControl()
  });

  /* Method to enable or disable service tag options. */
  onSelectServiceTag($event) {

    this.amountRequest.options = Object.assign({}, this.amountRequest.options, { disabled: true });
    this.entryAmount.options = Object.assign({}, this.entryAmount.options, { disabled: true });
    this.monthlyIncome.options = Object.assign({}, this.monthlyIncome.options, { disabled: true });
    this.term.options = Object.assign({}, this.term.options, { disabled: true });

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
      this.active_cards_select = false;
      this.active_pilicy_select = false;
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
      this.active_cards_select = false;
      this.active_pilicy_select = false;
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
      this.active_cards_select = true;
      this.active_pilicy_select = false;
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
      this.active_cards_select = false;
      this.active_pilicy_select = true;
      /* Para activar seccion de valores de entrada*/
      this.creditSection = false;
      this.insuranceSection = false;
      /* Para activar o desactivar secciones de formularios */
      this.insuranceSectionForm = false;
      this.creditSectionForm = false;
    }
  }

  onSelectCreditOption($event) {
    this.id_credit = $event.id;

    this.amountRequest.options = Object.assign({}, this.amountRequest.options, { disabled: false });
    this.entryAmount.options = Object.assign({}, this.entryAmount.options, { disabled: false });
    this.monthlyIncome.options = Object.assign({}, this.monthlyIncome.options, { disabled: false });
    this.term.options = Object.assign({}, this.term.options, { disabled: false });

    this.amountRequest.value = 0;
    this.entryAmount.value = 0;
    this.monthlyIncome.value = 0;
    this.term.value = 0;
  }

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
    this.insuranceSectionForm = true;

  }

  /* ----------------------------------- Constact Form ------------------------------- */

  personalDataForm = this.formbuilder.group({
    names: ['', Validators.required],
    last_names: ['', Validators.required],
    dni: ['', [Validators.required, validateCedula]],
    maritalStatus: [''],
    gender: [''],
    age: ['', [Validators.required]]
  });

  personalDataFormSubmitted: boolean;
  isFieldValidPersonalData(field: string) {
    return (
      this.personalDataForm.get(field).errors && this.personalDataForm.get(field).touched ||
      this.personalDataForm.get(field).untouched &&
      this.personalDataFormSubmitted && this.personalDataForm.get(field).errors
    );
  }

  onSubmitPersonalDataForm() {
    this.personalDataFormSubmitted = true;
    // if (this.personalDataForm.valid) {}
  }

  /* -------------------------------------------------------------------------------------------- */

  addressForm = this.formbuilder.group({
    province: ['', [validateSelect]],
    address: ['', Validators.required],
    city: ['', [Validators.required, validateSelect]]
  });

  addressFormSubmitted: boolean;
  isFieldValidaddressForm(field: string) {
    return (
      this.addressForm.get(field).errors && this.addressForm.get(field).touched ||
      this.addressForm.get(field).untouched &&
      this.addressFormSubmitted && this.addressForm.get(field).errors
    );
  }

  onSubmitaddressForm() {
    this.addressFormSubmitted = true;
    // if (this.personalDataForm.valid) {}
  }

  /* -------------------------------------------------------------------------------------------- */

  contactForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  contactFormSubmitted: boolean;
  isFieldValidContactForm(field: string) {
    return (
      this.contactForm.get(field).errors && this.contactForm.get(field).touched ||
      this.contactForm.get(field).untouched &&
      this.contactFormSubmitted && this.contactForm.get(field).errors
    );
  }

  onSubmitContactForm() {
    this.contactFormSubmitted = true;
    if (this.contactForm.valid) {
      console.log('Finalizó identificación');
      this.section1 = false;
      this.section2 = true;
      this.section3 = false;
      this.section4 = false;
      this.section5 = false;
    }
  }

  /* -------------------------------------------------------------------------------------------- */

  economicForm = this.formbuilder.group({
    card_payment: [''],
    loans_payment: [''],
    mortgage_payment: [''],
    rent_payment: [''],
    services_payment: ['', [Validators.required]],
    total_properties: ['', [Validators.required]],
    typeHousing: ['', [Validators.required, validateSelect]]
  });

  economicFormSubmitted: boolean;
  isFieldValidEconomicForm(field: string) {
    return (
      this.economicForm.get(field).errors && this.economicForm.get(field).touched ||
      this.economicForm.get(field).untouched &&
      this.economicFormSubmitted && this.economicForm.get(field).errors
    );
  }

  onSubmiteconomicForm() {
    this.economicFormSubmitted = true;
    if (this.economicForm.valid) {
      console.log('Finalizó situacion economica');
      this.section1 = false;
      this.section2 = false;
      this.section3 = true;
      this.section4 = false;
      this.section5 = false;
    }
  }

  /* ------------------------------------------------------------------------------------------ */

  creditform = this.formbuilder.group({
    can_access_credit_userSelected: new FormArray([]),
    cannot_access_credit_userSelected: new FormArray([]),
    radio: '0'
  });

  onSubmitCreditform(el: HTMLElement) {
    if (this.cantSelectedCreditOptions > 0) {

      this.creditos_entities = ``;

      el.scrollIntoView();
      this.section1 = false;
      this.section2 = false;
      this.section3 = false;
      this.section4 = true;
      this.section5 = false;

      const selectedCreditsIds1 = this.creditform.value.can_access_credit_userSelected
        .map((v, i) => v ? this.can_access_credit[i].id : null)
        .filter(v => v !== null);

      const selectedCreditsIds2 = this.creditform.value.cannot_access_credit_userSelected
        .map((v, i) => v ? this.cannot_access_credit[i].id : null)
        .filter(v => v !== null);

      for (let entry of selectedCreditsIds1) {
        let aux = this.can_access_credit.find(x => x.id == entry);
        this.creditos_entities += aux.name_financial_entity + ', ';
      }

      for (let entry of selectedCreditsIds2) {
        let aux = this.cannot_access_credit.find(x => x.id == entry);
        this.creditos_entities += aux.name_financial_entity + ', ';
      }

    } else {
      alert(`seleccione al menos una opción de crédito`);
    }
  }

  /* ----------------------------------- End  - Constact Form --------------------------------- */


  ngOnInit() {

    this.personalDataForm.controls['maritalStatus'].setValue({ id: -1, status: 'ESTADO CIVIL' });
    this.personalDataForm.controls['gender'].setValue({ id: -1, gender: 'GÉNERO' });

    /* TODO DE CREDITOS */
    this.economicForm.controls['typeHousing'].setValue({ id: -1, type: 'TIPO DE VIVIENDA*' });

    /*  Get all provinces. */
    this.httpService.getProvinces().subscribe(res => {
      this.provinces = res.data;
      this.addressForm.controls['province'].setValue({ id: -1, name: 'PROVINCIA*' });
      this.addressForm.controls['city'].setValue({ id: -1, name: 'CIUDAD*' });
    }, error => {
      console.log('error');
      console.log(error);
    });
    /*  End - Get all provinces */


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
    /*  End - all car brands. */


    /*  Start - Search by location. */
    this.httpService.getCurrentLocation().subscribe(res => {
      this.httpService.verifyProvinceExistence(res.region_code).subscribe(resp => {
        //console.log(resp);

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

      //this.contactform.controls['city'].setValue(res.city.toUpperCase() + ', ' + this.region_name.toUpperCase());
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
    /* End - Handling of personal data when logging in */

  }

  changeProvince(event) {
    let idProvince: number = event.id;
    this.httpService.getCities(idProvince).subscribe(res => {
      this.addressForm.controls['city'].setValue({ id: -1, name: 'CIUDAD*' });
      this.cities = []
      this.cities = res.data;
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /* Variables to store the results of credits selected by the user */
  get can_access_credit_userSelected(): FormArray {
    return this.creditform.get('can_access_credit_userSelected') as FormArray;
  }

  get cannot_access_credit_userSelected(): FormArray {
    return this.creditform.get('cannot_access_credit_userSelected') as FormArray;
  }
  /* End - Variables to store the results of credits selected by the user */



  /* Add checkbox of credit options */
  private addCheckboxesCan_access_credit() {
    this.can_access_credit.forEach((o, i) => {
      const control = new FormControl(false);
      (this.creditform.controls.can_access_credit_userSelected as FormArray).push(control);
    });
  }

  private addCheckboxesCannot_access_credit() {
    this.cannot_access_credit.forEach((o, i) => {
      const control = new FormControl(false);
      (this.creditform.controls.cannot_access_credit_userSelected as FormArray).push(control);
    });
  }
  /* End - Add checkbox of credit options */



  /* Methods to count the selected options */
  public cantSelectedCreditOptions: number = 0;
  can_access_credit_userSelectedLenght(): number {
    return this.creditform.value.can_access_credit_userSelected
      .map((v, i) => v ? this.can_access_credit[i].id : null)
      .filter(v => v !== null).length;
  }

  cannot_access_credit_userSelectedLenght(): number {
    return this.creditform.value.cannot_access_credit_userSelected
      .map((v, i) => v ? this.cannot_access_credit[i].id : null)
      .filter(v => v !== null).length;
  }

  cantSelectedUser() {
    this.cantSelectedCreditOptions = this.can_access_credit_userSelectedLenght() + this.cannot_access_credit_userSelectedLenght();
  }
  /* End - methods to count the selected options */


  /* move between sections of the page */
  moveSection(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop(el: HTMLElement) {
    el.scrollIntoView();
  }
  /* End - move between sections of the page */



  /* Forms Submitted */
  onSubmitEstimateForm(element: HTMLElement) {

    element.scrollIntoView({ behavior: 'smooth' });

    if (this.estimateform.get('credit_type_userSelected').value === 'creditos') {

      this.creditSectionForm = true;
      this.insuranceSectionForm = false;

      let amountRequest: number = this.amountRequest.value;
      let monthlyIncome: number = this.monthlyIncome.value;
      let entryAmount: number = this.entryAmount.value;
      let term: number = this.term.value;

      if (entryAmount !== null || entryAmount !== 0) {
        if (entryAmount < (amountRequest * 0.9)) {
          this.correctly = true;
        } else {
          this.correctly = false;
        }
      }

      /*Cambio temporal por cambio de provincia*/
      //this.region_code = 'A';

      if (this.correctly) {
        this.correctly2 = true;
        this.httpService.getAllCreditOptions(this.region_code, this.entityType, this.id_credit, amountRequest, monthlyIncome, term, entryAmount).subscribe(res => {
          if (res.status == 200) {

            if (this.can_access_credit) {
              this.can_access_credit_userSelected.clear()
            }

            if (this.cannot_access_credit) {
              this.cannot_access_credit_userSelected.clear()
            }

            this.creditOptions = res.data;
            this.can_access_credit = res.data.can_access_credit;
            this.cannot_access_credit = res.data.cannot_access_credit;
            this.credit_unavailable = res.data.credit_unavailable;
            this.addCheckboxesCan_access_credit();
            this.addCheckboxesCannot_access_credit();

          } else {
            console.log('Ah ocurrido un error!' + res.message);
          }
        }, error => {
          console.log('error');
          console.log(error);
        });
      } else {
        this.correctly2 = false;
        if (this.can_access_credit) {
          this.can_access_credit_userSelected.clear();
          this.can_access_credit = 0;
        }
        if (this.cannot_access_credit) {
          this.cannot_access_credit_userSelected.clear()
          this.cannot_access_credit = 0;
        }
        if (this.credit_unavailable) {
          this.credit_unavailable.length = 0;
        }
      }
    }
  }


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

    creditInformation.city = this.addressForm.value.city;
    creditInformation.region_name = 'AZUAY';
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
    creditInformation.destination = `La casa de tus sueños`;

    const selectedCreditsIds1 = this.creditform.value.can_access_credit_userSelected
      .map((v, i) => v ? this.can_access_credit[i].id : null)
      .filter(v => v !== null);

    const selectedCreditsIds2 = this.creditform.value.cannot_access_credit_userSelected
      .map((v, i) => v ? this.cannot_access_credit[i].id : null)
      .filter(v => v !== null);

    let creditos: Creditos[] = [];

    for (let entry of selectedCreditsIds1) {
      let aux = this.can_access_credit.find(x => x.id == entry);
      let credito: Creditos = {} as Creditos;
      credito.id_financialentity = aux.id_financial_entity;
      credito.monthly_fee = aux.monthly_payment;
      creditos.push(credito);
    }

    for (let entry of selectedCreditsIds2) {
      let aux = this.cannot_access_credit.find(x => x.id == entry);
      let credito: Creditos = {} as Creditos;
      credito.id_financialentity = aux.id_financial_entity;
      credito.monthly_fee = aux.monthly_payment;
      creditos.push(credito);
    }

    creditInformation.creditos = creditos;

    console.log(creditInformation);
  }

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

    console.log(insuranceInformation);
  }

  /* End - Forms Submitted */


  section1: boolean = true;   //seccion de formularios de identificación: datos personales, domicilio, contacto
  section2: boolean = false;  //sección para formularios: información de vehículo - información financiera
  section3: boolean = false;  //sección de resultados de créditos y seguros
  section4: boolean = false;  //sección de resumen de creditos y seguros
  section5: boolean = false;  //sección final de solicitud

  /* Archwizard Form */

  section2_1(el: HTMLElement) {
    el.scrollIntoView();
    this.section1 = true;
    this.section2 = false;
    this.section3 = false;
    this.section4 = false;
    this.section5 = false;
  }

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

  section1_3(el: HTMLElement) {
    el.scrollIntoView();
    this.section1 = false;
    this.section2 = false;
    this.section3 = true;
    this.section4 = false;
    this.section5 = false;
  }

  section4_3(el: HTMLElement) {
    el.scrollIntoView();
    this.section1 = false;
    this.section2 = false;
    this.section3 = true;
    this.section4 = false;
    this.section5 = false;
  }
  /* Archwizard Form */














  todos() {
    console.log(`todos`);
  }

  bancos() {
    console.log(`bancos`);
  }

  cooperativas() {
    console.log(`cooperativas`);
  }







  /* Todo relacionado a seguro de vehículos */

  public typeVehicle: any;
  public vehicleBrand: any;
  public vehicleModel: any;
  public vehicleYear: any;
  public vehicleDescription: any;

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

  public can_access_vehicleInsurance: any;
  public cant_insurances: number = 0;
  public cont_insurances: number = 0;
  public subsc1: any;
  public subsc2: any = [];

  public cantInsurnaceUserSelected: number = 0;

  /* Formulario seguro-vehicular*/
  vehicleform = this.formbuilder.group({
    vehicleBrand: ['', [Validators.required, validateSelect]],
    vehicleModel: ['', [Validators.required, validateSelect]],
    vehicleYear: ['', [Validators.required, validateSelect]],
    vehicleDescription: ['', [Validators.required, validateSelect]],
    vehicleColor: ['', [Validators.required, validateSelect]],
    vehiclePlate: [''],
  });

  /* Validar vehicleform */
  vehicleformSubmitted: boolean;
  isFieldValidVehicleform(field: string) {
    return (
      this.vehicleform.get(field).errors && this.vehicleform.get(field).touched ||
      this.vehicleform.get(field).untouched &&
      this.vehicleformSubmitted && this.vehicleform.get(field).errors
    );
  }

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

  insuranceform = this.formbuilder.group({
    can_access_vehicleInsurance_userSelected: new FormArray([]),
  });

  get can_access_vehicleInsurance_userSelected(): FormArray {
    return this.insuranceform.get('can_access_vehicleInsurance_userSelected') as FormArray;
  }

  public cantInsuranceSelectedUser() {
    this.cantInsurnaceUserSelected = this.insuranceform.value.can_access_vehicleInsurance_userSelected
      .map((v, i) => v ? this.can_access_vehicleInsurance[i].id : null)
      .filter(v => v !== null).length;
  }

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

      request.region_code = 'A';
      request.city = 'CUENCA';

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











  /* Todo lo relacionado al inicio de sesión */

  public user: any;
  public user_post: any;
  public user_id: number;

  public hasCedula: Boolean = false;
  public hasEmail: Boolean = false;
  public hasPhone1: Boolean = false;
  public hasAddress: Boolean = false;
  public hasNames: Boolean = false;
  public hasLastNames: Boolean = false;

  loginVerified(): Boolean {
    let accessToken = localStorage.getItem('currentUser');
    if (accessToken) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      return true;
    }
    this.user_id = null;
    return false;
  }

  recuperateLoginData() {
    if (this.loginVerified()) {
      this.httpService.getDataUserlogin().subscribe((user: UserInfo) => {

        this.user_post = user;
        this.user_id = this.user_post.id;

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









