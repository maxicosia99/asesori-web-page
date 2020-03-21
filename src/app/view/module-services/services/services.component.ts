import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';                                      //options carousel images
import { HttpClientService } from 'src/app/services/client/http-client.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  /**
    * Represents the component of the services module
    * @constructor
    * @param {HttpClientService} httpService - Service for connection to the server
    * @param {FormBuilder} formbuilder - Service for the use of forms
  */
  constructor(
    private formbuilder: FormBuilder,
    private httpService: HttpClientService,
  ) { }

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
   * Credit type tag section
   * @type {boolean}
  */
  public credit_tag_section: boolean = true;

  /**
   * Credit types information section
   * @type {boolean}
  */
  public credit_information_section: boolean = true;

  /**
   * Insurance type tag section
   * @type {boolean}
  */
  public insurance_tag_section: boolean = false;

  /**
   * Insurance types information section
   * @type {boolean}
  */
  public insurance_information_section: boolean = false;

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
   * On Init
   * @return {void} Nothing
  */
  ngOnInit() {

    this.httpService.getInformationCreditByid(this.creditform.get('credit_type_userSelected').value.split("_")[1]).subscribe(res => {

      console.log(`Destinación: ${this.creditform.get('credit_type_userSelected').value.split("_")[0]}`);

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
    credit_type_userSelected: 'estudios_10',
    insurance_type_userSelected: 'vehicular_0'
  });

  /**
   * Filter credit
   * @return {void} Nothing
  */
  creditos() {
    this.credit_tag_section = true;
    this.credit_information_section = true;
    this.insurance_tag_section = false;
    this.insurance_information_section = false;
  }

  /**
   * Filter insurance
   * @return {void} Nothing
  */
  seguros() {
    this.credit_tag_section = false;
    this.credit_information_section = false;
    this.insurance_tag_section = true;
    this.insurance_information_section = true;
  }

  /**
   * Get credit information
   * @param {Event} event.target.value - Identifier of credit type (id_credit)
   * @return {void} Nothing
  */
  onSelectCreditType($event) {

    this.httpService.getInformationCreditByid($event.target.value.split("_")[1]).subscribe(res => {

      console.log(`Destinación: ${$event.target.value.split("_")[0]}`);

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
   * Get insurance information
   * @param {Event} event.target.value - Identifier of insurance type (id_insurance)
   * @return {void} Nothing
  */
  onSelectInsuranceType($event) {
    console.log(`Destinación: ${$event.target.value.split("_")[0]}`);
    console.log(`ID: ${$event.target.value.split("_")[1]}`);
  }

}
