import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Options } from 'ng5-slider';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { BsModalService, BsModalRef, TabsetComponent } from 'ngx-bootstrap';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { validarCedula } from 'src/app/services/client/validar-cedula';
import { Creditos } from 'src/app/models/creditos';

interface SimpleSliderModel {
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
    private modalService: BsModalService,
    private httpService: HttpClientService,
    private formbuilder: FormBuilder, ) { }

  amountRequest: SimpleSliderModel = {
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

  entryAmount: SimpleSliderModel = {
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

  term: SimpleSliderModel = {
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

  max: number = 4;
  rate: number = 4;
  isReadonly: boolean = true;

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

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

  /* MODAL */

  message: string;
  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-dialog-centered');
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

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


  /* Credit calculation form */
  estimateform = this.formbuilder.group({
    amountRequest: ['', [Validators.required, Validators.minLength(1)]],
    entryAmount: [''],
    monthlyincome: ['', [Validators.required, Validators.minLength(1)]],
    term: ['', [Validators.required, Validators.minLength(1)]]
  });

  /* Data submission form */
  contactform = this.formbuilder.group({
    can_access_credit_userSelected: new FormArray([]),
    cannot_access_credit_userSelected: new FormArray([]),
    // names: ['', Validators.required],
    // last_names: ['', Validators.required],
    // email: ['', [Validators.required, Validators.email]],
    // phone: ['', Validators.required],
    // address: ['', Validators.required],
    // city: ['', Validators.required],
    // cedula: ['', [Validators.required, validarCedula]],
    // card_payment: [''],
    // rent_payment: ['', [Validators.minLength(1)]],
    // loans_payment: [''],
    // services_payment: ['', [Validators.required, Validators.minLength(1)]],
    // typeHousing: ['', [Validators.required, validatePropertyType]],
    // mortgage_payment: [''],
    // total_properties: ['', [Validators.required, Validators.minLength(1)]],
  });

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

  /* Validate credit calculation form */
  estimateformSubmitted: boolean;
  isFieldValidEstimateform(field: string) {
    return (
      this.estimateform.get(field).errors && this.estimateform.get(field).touched ||
      this.estimateform.get(field).untouched &&
      this.estimateformSubmitted && this.estimateform.get(field).errors
    );
  }

  /* Variables to store the results of credits selected by the user */
  get can_access_credit_userSelected(): FormArray {
    return this.contactform.get('can_access_credit_userSelected') as FormArray;
  }

  get cannot_access_credit_userSelected(): FormArray {
    return this.contactform.get('cannot_access_credit_userSelected') as FormArray;
  }
  /* End - Variables to store the results of credits selected by the user */


  /* Add checkbox of credit options */
  private addCheckboxesCan_access_credit() {
    this.can_access_credit.forEach((o, i) => {
      const control = new FormControl(false);
      (this.contactform.controls.can_access_credit_userSelected as FormArray).push(control);
    });
  }

  private addCheckboxesCannot_access_credit() {
    this.cannot_access_credit.forEach((o, i) => {
      const control = new FormControl(false);
      (this.contactform.controls.cannot_access_credit_userSelected as FormArray).push(control);
    });
  }
  /* End - Add checkbox of credit options */

  public cantSelectedCreditOptions: number = 0;
  can_access_credit_userSelectedLenght(): number {
    return this.contactform.value.can_access_credit_userSelected
      .map((v, i) => v ? this.can_access_credit[i].id : null)
      .filter(v => v !== null).length;
  }

  cannot_access_credit_userSelectedLenght(): number {
    return this.contactform.value.cannot_access_credit_userSelected
      .map((v, i) => v ? this.cannot_access_credit[i].id : null)
      .filter(v => v !== null).length;
  }

  cantSelectedUser() {
    this.cantSelectedCreditOptions = this.can_access_credit_userSelectedLenght() + this.cannot_access_credit_userSelectedLenght();
  }


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

          //console.log(res.data);

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

          /** ANTES DE AGREGAR EL HTML */

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

  onSubmitContactForm() {
    const selectedCreditsIds1 = this.contactform.value.can_access_credit_userSelected
      .map((v, i) => v ? this.can_access_credit[i].id : null)
      .filter(v => v !== null);

    const selectedCreditsIds2 = this.contactform.value.cannot_access_credit_userSelected
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

    console.log(creditos);
  }

  recalculate(element: HTMLElement){
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
