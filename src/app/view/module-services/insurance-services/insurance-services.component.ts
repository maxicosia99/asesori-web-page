import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-insurance-services',
  templateUrl: './insurance-services.component.html',
  styleUrls: ['./insurance-services.component.scss']
})
export class InsuranceServicesComponent implements OnInit {

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

  }

  /**
   * Define insruance form
  */
  insuranceform = this.formbuilder.group({
    service: '1',
    insurance_type_userSelected: 'Vehicular_0'
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
