import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormBuilder } from '@angular/forms';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { Router } from '@angular/router';
import { ICreditTerms } from 'src/app/data/interfaces/icredit.metadata';
import { CREDIT_TERMS_DATA_ITEMS } from 'src/app/data/constants/credit-terms.const';

@Component({
  selector: 'app-credit-services',
  templateUrl: './credit-services.component.html',
  styleUrls: ['./credit-services.component.scss']
})
export class CreditServicesComponent implements OnInit {

  /**
    * Represents the component of the services module
    * @constructor
    * @param {HttpClientService} httpService - Service for connection to the server
    * @param {FormBuilder} formbuilder - Service for the use of forms
  */
  constructor(
    private formbuilder: FormBuilder,
    private httpService: HttpClientService,
    private router: Router,
  ) { }

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
   * Store credit beneficiaries
   * @type {string[]}
  */
  public beneficiaries: string[];

  /**
   * Store credit destination
   * @type {string[]}
  */
  public destination: string[];

  /**
   * Store credit terms
   * @type {string[]}
  */
  public terms: string[];

  /**
   * Store credit url photo
   * @type {string}
  */
  public url_photo: string;

  /**
   * Carousel options
   * @type {OwlOptions}
  */
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
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    }
  }


  /**
   * Para pruebas sin servidor
   */
  public data: ICreditTerms[] = CREDIT_TERMS_DATA_ITEMS;
  public currentCredit: ICreditTerms;



  /**
   * On Init
   * @return {void} Nothing
  */
  ngOnInit() {

    this.currentCredit = this.data.find((b) => b.id === +this.creditform.get('credit_type_userSelected').value.split("_")[1]);
    this.id_credit = +this.creditform.get('credit_type_userSelected').value.split("_")[1];
    this.destinedTo = this.creditform.get('credit_type_userSelected').value.split("_")[0];
    this.credit_name = this.currentCredit.credit_name;
    this.beneficiaries = this.currentCredit.beneficiaries;
    this.destination = this.currentCredit.destination;
    this.terms = this.currentCredit.terms;
    this.url_photo = this.currentCredit.url_photo;





    // this.httpService.getInformationCreditByid(this.creditform.get('credit_type_userSelected').value.split("_")[1]).subscribe(res => {

    //   this.id_credit = +this.creditform.get('credit_type_userSelected').value.split("_")[1];
    //   this.destinedTo = this.creditform.get('credit_type_userSelected').value.split("_")[0];
    //   this.credit_name = res.data.credit_name;
    //   this.beneficiaries = res.data.beneficiaries;
    //   this.destination = res.data.destination;
    //   this.terms = res.data.terms;
    //   this.url_photo = res.data.url_photo;

    // }, error => {
    //   console.log('error');
    //   console.log(error);
    // });

  }

  /**
   * Define credit form
  */
  creditform = this.formbuilder.group({
    service: '0',
    credit_type_userSelected: 'Créditos de estudio_10',
  });

  /**
   * Filter credit
   * @return {void} Nothing
  */
  creditos() {
    this.router.navigate(['services/credit']);
  }

  /**
   * Filter insurance
   * @return {void} Nothing
  */
   seguros() {
    this.router.navigate(['services/insurance']);
  }

  goToRequest() {

    let credit_information: any = {
      id_credit: this.id_credit,
      destinedTo: this.destinedTo
    }
    /** Store credit information in localStorage*/
    localStorage.setItem('credit_information', JSON.stringify(credit_information));
    this.router.navigate(['services/request-credit']);
  }

  /**
   * Get credit information
   * @param {Event} event.target.value - Identifier of credit type (id_credit)
   * @return {void} Nothing
  */
  onSelectCreditType($event) {

    this.currentCredit = this.data.find((b) => b.id === +$event.target.value.split("_")[1]);
    this.id_credit = +this.creditform.get('credit_type_userSelected').value.split("_")[1];
    this.destinedTo = this.creditform.get('credit_type_userSelected').value.split("_")[0];
    this.credit_name = this.currentCredit.credit_name;
    this.beneficiaries = this.currentCredit.beneficiaries;
    this.destination = this.currentCredit.destination;
    this.terms = this.currentCredit.terms;
    this.url_photo = this.currentCredit.url_photo;
    
    
    
    // this.httpService.getInformationCreditByid($event.target.value.split("_")[1]).subscribe(res => {

    //   this.id_credit = +this.creditform.get('credit_type_userSelected').value.split("_")[1];
    //   this.destinedTo = this.creditform.get('credit_type_userSelected').value.split("_")[0];
    //   this.credit_name = res.data.credit_name;
    //   this.beneficiaries = res.data.beneficiaries;
    //   this.destination = res.data.destination;
    //   this.terms = res.data.terms;
    //   this.url_photo = res.data.url_photo;

    // }, error => {
    //   console.log('error');
    //   console.log(error);
    // });
  }

  /**
   * Get credit information
   * @param {Event} event.target.value - Identifier of credit type (id_credit)
   * @return {void} Nothing
  */
  onSelectCreditTypeSelect(event) {

    this.id_credit = event.id;
    this.destinedTo = event.description;

    this.httpService.getInformationCreditByid(event.id).subscribe(res => {

      this.credit_name = res.data.credit_name;
      this.beneficiaries = res.data.beneficiaries;
      this.destination = res.data.destination;
      this.terms = res.data.terms;
      this.url_photo = res.data.url_photo;

    }, error => {
      console.log('error');
      console.log(error);
    });
  }
}
