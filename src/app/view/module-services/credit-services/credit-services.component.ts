import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormBuilder } from '@angular/forms';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { Router } from '@angular/router';

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
   * On Init
   * @return {void} Nothing
  */
  ngOnInit() {

    this.httpService.getInformationCreditByid(this.creditform.get('credit_type_userSelected').value.split("_")[1]).subscribe(res => {

      this.id_credit = +this.creditform.get('credit_type_userSelected').value.split("_")[1];
      this.destinedTo = this.creditform.get('credit_type_userSelected').value.split("_")[0];
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

    this.httpService.getInformationCreditByid($event.target.value.split("_")[1]).subscribe(res => {

      this.id_credit = +this.creditform.get('credit_type_userSelected').value.split("_")[1];
      this.destinedTo = this.creditform.get('credit_type_userSelected').value.split("_")[0];
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
