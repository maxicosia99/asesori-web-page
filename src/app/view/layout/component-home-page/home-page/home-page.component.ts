import { Component, OnInit, TemplateRef } from '@angular/core';
import { Options } from 'ng5-slider';                                                 //options user slider
import { OwlOptions } from 'ngx-owl-carousel-o';                                      //options carousel images
import { BsModalService, BsModalRef } from 'ngx-bootstrap';                           //modal service
import { HttpClientService } from 'src/app/services/client/http-client.service';      //call client api
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';     //forms
import { validateCedula } from 'src/app/services/client/validar-cedula';              //service to validate cedula
import { Creditos } from 'src/app/models/creditos';                                   //part of model to credit request  
import { LoginComponent } from 'src/app/view/login/login.component';                  //call login
import { AuthenticationService } from 'src/app/services/auth/authentication.service'; //authentication service
import { Subscription } from 'rxjs';                                                  //suscription to login

/* icons in this page */
import { 
  faStopwatch, faMoneyBillAlt, faClipboard, faUserAlt, faEnvelope, faRedoAlt,faHome,
  faPhone, faBuilding, faUserTie } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook, faTwitter, faWhatsapp, faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { CreditInformation } from 'src/app/models/credit-information';
/* End - icons in this page */


// slider model
interface SliderModel {
  value: number;
  options: Options;
}


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,   //authentication service
    private modalService: BsModalService,         //modal service
    private httpService: HttpClientService,       //client api service
    private formbuilder: FormBuilder              //form service
  ) { }


  /* ICONS */
  faStopwatch = faStopwatch;
  faMoneyBillAlt = faMoneyBillAlt;
  faClipboard = faClipboard;
  faUserAlt = faUserAlt;
  faEnvelope = faEnvelope;
  faRedoAlt = faRedoAlt;
  faHome = faHome;
  faPhone = faPhone;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;
  faBuilding = faBuilding;
  faUserTie = faUserTie;
  /* END - ICONS */



  /* Slider for entry amount and time */
  amountRequest: SliderModel = {
    value: 0,
    options: {
      floor: 0,
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


  /* Navbar options */
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  /* End - Navbar options */


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
  
  openModal() {
    // const initialState = {
    //   information : {
    //     username: 'bryan',
    //     password: 'bryan123'
    //   },
    // };
    //this.modalRef = this.modalService.show(LoginComponent, { initialState });
    this.modalRef = this.modalService.show(LoginComponent);
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
  public region_name: string;
  public country_name: string;
  /* Validation variables */
  public correctly: boolean = false;
  public correctly2: boolean = true;
  /* Variable for the type of entity: bank, cooperative or both. */
  public entityType: number = 0;
  /* Variable for the type of credit */
  public id_credit: number = 11; // test - inmobiliario
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
  /* variables for the selection of type housing */
  public typeHousing = [
    {id: 1, type: "Propia"},
    {id: 2, type: "Arrendada"}
  ]


  /* Credit calculation form */
  estimateform = this.formbuilder.group({
    amountRequest: ['', [Validators.required, Validators.minLength(1)]],
    entryAmount: [''],
    monthlyincome: ['', [Validators.required, Validators.minLength(1)]],
    term: ['', [Validators.required, Validators.minLength(1)]]
  });

  /* ----------------------------------- Constact Form ------------------------------- */
  
  personalDataForm = this.formbuilder.group({
    names: ['', Validators.required],
    last_names: ['', Validators.required],
    dni: ['', [Validators.required, validateCedula]],
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
    address: ['', Validators.required],
    city: ['', Validators.required],
  });

  addressFormSubmitted: boolean;
  isFieldValidaddressForm(field: string) {
    return (
      this.addressForm.get(field).errors && this.addressForm.get(field).touched ||
      this.addressForm.get(field).untouched &&
      this.addressFormSubmitted && this.addressForm.get(field).errors
    );
  }

  onSubmitaddressForm () {
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
    typeHousing: ['', [Validators.required]]
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
    }
  }

  /* ------------------------------------------------------------------------------------------ */

  creditform = this.formbuilder.group({
    can_access_credit_userSelected: new FormArray([]),
    cannot_access_credit_userSelected: new FormArray([]),
  });

  onSubmitCreditform() {
    if (this.cantSelectedCreditOptions > 0) {
      console.log(`formulario de creditos correcto`);
    }else{
      console.log(`seleccione al menos una`);
    }
  }

  /* ----------------------------------- End  - Constact Form --------------------------------- */











  

  ngOnInit() {

    /*  Start - Search by location. */
    this.httpService.getCurrentCity().subscribe(res => {
      this.country_name = res.country_name;
      let aux = res.region.split(" ");
      aux.splice(0, 2);
      this.region_name = aux.join(" ").toLowerCase();
      //this.contactform.controls['city'].setValue(res.city.toUpperCase() + ', ' + this.region_name.toUpperCase());
    }, error => {
      console.log('error');
      console.log(error);
    });
    /*  End - Search by location. */
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

    // let amountRequest: number = this.amountRequest.value;
    // let monthlyincome: number = 0;
    // let entryAmount: number = this.entryAmount.value;
    // let term: number = this.term.value;

    let amountRequest: number = 50000;
    let monthlyincome: number = 250;
    let entryAmount: number = 1000;
    let term: number = 144;

    if (entryAmount !== null || entryAmount !== 0) {
      if (entryAmount < (amountRequest * 0.9)) {
        this.correctly = true;
      } else {
        this.correctly = false;
      }
    }

    // console.log(amountRequest);
    // console.log(monthlyincome);
    // console.log(entryAmount);
    // console.log(term);
    // console.log(this.correctly);

    if (this.correctly) {
      this.correctly2 = true;
      this.httpService.getAllCreditOptions(this.region_name, this.entityType, this.id_credit, amountRequest, monthlyincome, term, entryAmount).subscribe(res => {
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

          element.scrollIntoView({ behavior: 'smooth' });

        } else {
          console.log('Ah ocurrido un error!' + res.status);
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

  onSubmitContactForm_general() {
    
    let creditInformation: CreditInformation = {} as CreditInformation;

    //creditInformation.user_id = this.user_id;
    creditInformation.name = this.creditform.value.names;
    creditInformation.last_name = this.creditform.value.last_names;
    creditInformation.email = this.creditform.value.email;
    creditInformation.phone = this.creditform.value.phone;
    creditInformation.address = this.creditform.value.address;
    creditInformation.cedula = this.creditform.value.cedula;
    creditInformation.amount_required = this.estimateform.value.propertyamount;
    creditInformation.monthly_income = this.estimateform.value.monthlyincome;
    creditInformation.initial_amount = this.estimateform.value.entryAmount;
    //creditInformation.term = this.term.value;
    creditInformation.term = 144;
    //creditInformation.id_credit = +(this._route.snapshot.paramMap.get('id'));
    creditInformation.id_credit = this.id_credit;
    // creditInformation.city = this.contactform.value.city;
    // creditInformation.region_name = this.region_name;
    creditInformation.city = `Cuenca`;
    creditInformation.region_name = this.region_name;
    creditInformation.country_name = this.country_name;
    creditInformation.destination = `La casa de tus sueños`;
    creditInformation.payments_cards = this.creditform.value.card_payment;
    creditInformation.rental = this.creditform.value.rent_payment;
    creditInformation.payment_loans = this.creditform.value.loans_payment;
    creditInformation.payment_services = this.creditform.value.services_payment;
    creditInformation.housing_type = this.creditform.value.typeHousing.type;
    creditInformation.mortgage_payment = this.creditform.value.mortgage_payment;
    creditInformation.total_possessions = this.creditform.value.total_properties;
    
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

    if (this.creditform.valid && this.cantSelectedCreditOptions > 0) {
      console.log(creditInformation);
    }else{
      console.log(`formulario incorrecto`);
    }
  }
  /* End - Forms Submitted */


  section1: boolean = true;
  section2: boolean = false;
  section3: boolean = false;

  /* Archwizard Form */

  section2_1(el: HTMLElement) {
    el.scrollIntoView();
    this.section1 = true;
    this.section2 = false;
    this.section3 = false;
  }

  section3_2(el: HTMLElement) {
    el.scrollIntoView();
    this.section1 = false;
    this.section2 = true;
    this.section3 = false;
  }

  section1_3(el: HTMLElement) {
    el.scrollIntoView();
    this.section1 = false;
    this.section2 = false;
    this.section3 = true;
  }

  /* Archwizard Form */




  /* ON LOGGED OUT */

  private subscription: Subscription;
  private intervalSub: Subscription;
  public user: any;

  onLoggedout() {
    this.authService.logOut();
    this.closeSubscriptions();
    console.log('Ha finalizado sesión!')
  }

  closeSubscriptions() {
    if(this.subscription)
      this.subscription.unsubscribe();
    if(this.intervalSub)
      this.intervalSub.unsubscribe();
  }

  loginVerified(): Boolean {
    let accessToken = localStorage.getItem('currentUser');
    if (accessToken) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      return true;
    }
    return false;
  }

  /* END - ON LOGGED OUT */

}

