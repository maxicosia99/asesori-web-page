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
  public percentage: number = 0;

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
  public vehicle_data: any;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.percentage = +localStorage.getItem('percentage');
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

    this.router.navigate(['insurance/finalize']);
    localStorage.setItem('percentage', '0');

    // let insuranceInformation: InsuranceInformation = {} as InsuranceInformation;

    // insuranceInformation.car_id = this.insurance_information.carId;
    // insuranceInformation.car_year = this.insurance_information.car_year;
    // insuranceInformation.applicant_mail = this.contact_data.email;
    // insuranceInformation.request_city_id = this.insurance_information.request_city_id;

    // insuranceInformation.applicant_dni = this.personal_data.cedula;
    // insuranceInformation.applicant_civil_status = this.personal_data.maritalStatus;
    // insuranceInformation.applicant_name = this.personal_data.name;
    // insuranceInformation.applicant_lastname = this.personal_data.last_name;
    // insuranceInformation.applicant_birthdate = this.personal_data.birthday;

    // insuranceInformation.home_city_id = this.location_data.city.id;
    // insuranceInformation.applicant_home_address = this.location_data.address;
    // insuranceInformation.applicant_home_address_reference = this.location_data.reference;
    // insuranceInformation.applicant_home_address_sector = this.location_data.sector;

    // insuranceInformation.applicant_phone1 = this.contact_data.phone;
    // insuranceInformation.applicant_phone2 = this.contact_data.phone2;

    // insuranceInformation.car_color = this.vehicle_data.vehicleColor.color_name;
    // insuranceInformation.car_license = this.vehicle_data.vehiclePlate;
    // insuranceInformation.car_details = this.vehicle_data.vehicleDetails;

    // let selected_options: Insurance[] = this.insurance_options.insurance_selected;

    // insuranceInformation.selected_options = selected_options;

    // this.httpService.createInsuranceInformation(insuranceInformation).subscribe(res => {
    //   if (res.status == 200) {
        
    //     localStorage.clear();
    //     this.router.navigate(['insurance/finalize']);
        
    //     // this.httpService.getSendMailInsurance().subscribe(res => {
    //     //   console.log(res);
    //     // }, error => {
    //     //   console.log('error al enviar correo');
    //     //   console.log(error);
    //     // });

    //     //this.messageErrorInsurance = null;

    //   } else {
    //     console.log('Ah ocurrido un error! ' + res.errors);
    //     //this.messageErrorInsurance = res.message;
    //   }
    // }, errors => {
    //   console.log('error al crear información');
    //   console.log(errors);
    // });
  }
}
