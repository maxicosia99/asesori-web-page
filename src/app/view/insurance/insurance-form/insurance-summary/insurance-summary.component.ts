import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { InsuranceInformation } from 'src/app/models/insurance-information';
import { Insurance } from 'src/app/models/insurance';

@Component({
  selector: 'app-insurance-summary',
  templateUrl: './insurance-summary.component.html',
  styleUrls: ['./insurance-summary.component.scss']
})
export class InsuranceSummaryComponent implements OnInit {

  constructor(
    private router: Router,
    private httpService: HttpClientService,
  ) { }

  /**
   * Variables for the progress bar
   * @type {any[]}
  */
  public percentage: number = 95;

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

  public insurance_information: any;
  public insurance_options: any;
  public personal_data: any;
  public location_data: any;
  public contact_data: any;
  public vehicle_data:any;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.insurance_information = JSON.parse(localStorage.getItem('insurance_information'));
    this.insurance_options = JSON.parse(localStorage.getItem('insurance_options'));
    this.personal_data = JSON.parse(localStorage.getItem('personal_data'));
    this.location_data = JSON.parse(localStorage.getItem('location_data'));
    this.contact_data = JSON.parse(localStorage.getItem('contact_data'));
    this.vehicle_data = JSON.parse(localStorage.getItem('vehicle_data'));
  }

  /**
   * Retrieve all the information for the insurance application
   * @param {HTMLElement} el - HTML identifier
   * @return {void} Nothing
  */
  onSubmitSummary() {

    let insuranceInformation: InsuranceInformation = {} as InsuranceInformation;

    insuranceInformation.user_id = 1; //error

    insuranceInformation.name = this.personal_data.name;
    insuranceInformation.last_name = this.personal_data.last_name;
    insuranceInformation.cedula = this.personal_data.cedula;

    insuranceInformation.city = this.location_data.city.name;
    insuranceInformation.address = this.location_data.address;

    insuranceInformation.email = this.contact_data.email;
    insuranceInformation.phone = this.contact_data.phone;

    insuranceInformation.carprice_id = this.insurance_information.carprice_id;

    let options: Insurance[] = this.insurance_options.insurance_selected;

    insuranceInformation.options = options;

    //console.log(insuranceInformation);

    this.httpService.createInsuranceInformation(insuranceInformation).subscribe(res => {
      //console.log(res);
      if (res.status == 200) {
        localStorage.clear();
        this.router.navigate(['insurance/finalize']);
        //console.log(res);
        this.httpService.getSendMailInsurance().subscribe(res => {
          console.log(res);
        }, error => {
          console.log('error al enviar correo');
          console.log(error);
        });

        //this.messageErrorInsurance = null;

      } else {
        console.log('Ah ocurrido un error! ' + res.message);
        //this.messageErrorInsurance = res.message;
      }
    }, error => {
      console.log('error al crear información');
      console.log(error);
    });
  }

}
