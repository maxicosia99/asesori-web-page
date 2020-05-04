import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { UserInfo } from 'src/app/models/user-info';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';

/** Interface representing a slider model */
interface SliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: 'app-insurance-request',
  templateUrl: './insurance-request.component.html',
  styleUrls: ['./insurance-request.component.scss']
})
export class InsuranceRequestComponent implements OnInit {

  constructor(
    private httpService: HttpClientService,
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

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
  public hasEmail: boolean = false;


  /**
   * Define vehicle form
  */
  vehicleform = this.formbuilder.group({
    vehicleBrand: [null, [Validators.required]],
    vehicleModel: [null, [Validators.required]],
    vehicleYear: [null, [Validators.required]],
    vehicleDescription: [null, [Validators.required]],
  });

  /**
   * Email form (credit, insurance, credit cards, investment policy)
  */
  emailform = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    province: [null, [Validators.required]],
    city: [null, [Validators.required]]
  });

  /**
   * Variable to verify if the address form is correct
   * @type {boolean}
  */
  emailFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidemailForm(field: string) {
    return (
      this.emailform.get(field).errors && this.emailform.get(field).touched ||
      this.emailform.get(field).untouched &&
      this.emailFormSubmitted && this.emailform.get(field).errors
    );
  }

  /**
   * Getter for easy access to email form fields
   * @return {FormControl} Acces to email form
  */
  get emailForm() {
    return this.emailform.controls;
  }

  /**
   * Variable to activate the email section
   * @type {boolean}
  */
  public emailSection: boolean = false;

  /**
   * Variable to desactvate the calulator section
   * @type {boolean}
  */
  public calculatorSection: boolean = true;

  /**
    * Variable to store all provinces from Ecuador
    * @type {any}
   */
  public provinces: any;

  /**
   * Variable to store all cities from a province
   * @type {any}
  */
  public cities: any;

  /**
   * Location variables
   * @type {string}
  */
  public region_code: string;

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

  ngOnInit() {

    window.scrollTo(0, 0);

    /*  Get all provinces. */
    this.httpService.getProvinces().subscribe(res => {
      this.provinces = res.data;
    }, error => {
      console.log('error');
      console.log(error);
    });

    /*  Start - Search by location. */
    this.httpService.getCurrentLocation().subscribe(res => {
      this.httpService.verifyProvinceExistence(res.region_code).subscribe(resp => {

        /* In case the location is detected */
        if (resp.status === 200) {
          this.region_code = res.region_code;

          let currentprovince = this.provinces.find(x => x.apicode === this.region_code);

          this.emailform.controls['province'].setValue({ id: currentprovince.id, name: currentprovince.name });
          /* the cities of the detected province are loaded */

          this.httpService.getCities(currentprovince.id).subscribe(res => {
            this.cities = []
            this.cities = res.data;
            //console.log(this.cities);
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
    /*  Get all car brands. */
    this.httpService.getAllCarBrands().subscribe(res => {
      this.vehicleBrand = res.data;
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /**
   * Go forms page
   * @return {void} Nothing
  */
  onSubmitEmailSection() {

    let email_data: any = {
      email: this.emailform.value.email
    }
    /** Store contact_data in localStorage*/
    sessionStorage.setItem('email_data', JSON.stringify(email_data));

    this.router.navigate(['insurance']);

    let insurance_information: any = {
      carId : this.vehicleform.value.vehicleDescription.carId,
      car_year: this.vehicleform.value.vehicleDescription.year,
      request_city_id: this.emailform.value.city.id
    }
    /** Store credit information in localStorage*/
    localStorage.setItem('insurance_information', JSON.stringify(insurance_information));

  }

  /**
   * Recover the cities of a province
   * @param {Event} event.id - Province identifier
   * @return {void} Nothing
  */
  changeProvince(event) {
    this.httpService.getCities(event.id).subscribe(res => {
      this.emailform.controls['city'].setValue(null);
      this.cities = []
      this.cities = res.data;
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /**
   * Change car brand
   * @param {Event} event.id - Brand identifier
   * @return {void} Nothing
  */
  changeCarBrand(event) {
    let id_brand: number = event.id;
    this.httpService.getYearByBrand(id_brand).subscribe(res => {
      this.vehicleform.controls['vehicleModel'].setValue(null);
      this.vehicleform.controls['vehicleYear'].setValue(null);
      this.vehicleform.controls['vehicleDescription'].setValue(null);
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
    let id_model: number = event.brandId;
    this.httpService.getModelByYear(id_model, year).subscribe(res => {
      this.vehicleform.controls['vehicleModel'].setValue(null);
      this.vehicleform.controls['vehicleDescription'].setValue(null);
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
    let id_model: number = event.modelId;
    let year: number = event.year;
    let id_brand: number = event.brandId;
    this.httpService.getDescriptionByModel(id_model, id_brand, year).subscribe(res => {
      console.log(res.data);
      this.vehicleform.controls['vehicleDescription'].setValue(null);
      this.vehicleDescription = [];
      this.vehicleDescription = res.data;
      //console.log(this.vehicleYear);
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /**
   * Calculate credit options
   * @param {HTMLElement} element - HTML identifier
   * @return {void} Nothing
  */
  onSubmitServiceform(element: HTMLElement) {
    element.scrollIntoView();
    this.emailSection = true;
    this.calculatorSection = false;
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
