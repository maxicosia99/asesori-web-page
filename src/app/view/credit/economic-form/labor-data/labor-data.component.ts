import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-labor-data',
  templateUrl: './labor-data.component.html',
  styleUrls: ['./labor-data.component.scss']
})
export class LaborDataComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
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
  * Service form (credit, insurance, credit cards, investment policy)
 */
  laborform = this.formbuilder.group({
    type: new FormControl(null, Validators.required),
    companyName: [''],
    positionCompany: [''],
    monthlySalary: [''],
    otherMonthlyValue: [''],
    valueDetail: [''],
    province: [null],
    city: [null],
    address: [''],
    phone: [''],
    ruc: [''],
    sector: [''],
    averageSales: ['']
  });

  isCollapsed = true;

  /**
   * Variables to activate credit or insurance values and select
   * @type {boolean}
  */
  public dependenciaSection: boolean = false;
  public independenciaSection: boolean = false;
  public mixtaSection: boolean = false;

  /**
   * Method to enable or disable service tag options
   * @param {Event} event - Identifier of the value service tag
   * @return {void} Nothing
  */
  onSelectType($event) {

    if ($event.target.value === 'dependiente') {
      this.dependenciaSection = true;
      this.independenciaSection = false;
      this.mixtaSection = false;
    }
    if ($event.target.value === 'independiente') {
      this.dependenciaSection = false;
      this.independenciaSection = true;
      this.mixtaSection = false;
    }
    if ($event.target.value === 'mixta') {
      this.dependenciaSection = false;
      this.independenciaSection = false;
      this.mixtaSection = true;
    }
  }

  public personal_data: any;
  public location_data: any;
  public contact_data: any;
  public economic_data: any;
  public labor_data: any;
  public financial_data: any;

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
          this.laborform.controls['province'].setValue({ id: resp.data.id, name: resp.data.name });
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
    }, error => {
      console.log('error');
      console.log(error);
    });
    /*  End - Search by location. */

    /** Verificar contenido del local storage*/
    this.personal_data = JSON.parse(localStorage.getItem('personal_data'));
    this.location_data = JSON.parse(localStorage.getItem('location_data'));
    this.contact_data = JSON.parse(localStorage.getItem('contact_data'));
    this.economic_data = JSON.parse(localStorage.getItem('economic_data'));
    this.labor_data = JSON.parse(localStorage.getItem('labor_data'));
    this.financial_data = JSON.parse(localStorage.getItem('financial_data'));

    if(this.labor_data){

      if(this.labor_data.type === 'dependiente'){
        this.dependenciaSection = true;
      }
  
      if(this.labor_data.type === 'independiente'){
        this.independenciaSection = true;
      }
  
      if(this.labor_data.type === 'mixta'){
        this.mixtaSection = true;
      }

      this.laborform.controls['type'].setValue(this.labor_data.type);
      this.laborform.controls['companyName'].setValue(this.labor_data.companyName);
      this.laborform.controls['positionCompany'].setValue(this.labor_data.positionCompany);
      this.laborform.controls['monthlySalary'].setValue(this.labor_data.monthlySalary);
      this.laborform.controls['otherMonthlyValue'].setValue(this.labor_data.otherMonthlyValue);
      this.laborform.controls['valueDetail'].setValue(this.labor_data.valueDetail);
      
      if(this.labor_data.province){
        this.laborform.controls['province'].setValue({id: this.labor_data.province.id, name: this.labor_data.province.name});
      }

      if(this.labor_data.city){
        this.laborform.controls['city'].setValue({id: this.labor_data.city.id, name: this.labor_data.city.name});
      }
      
      this.laborform.controls['address'].setValue(this.labor_data.address);
      this.laborform.controls['phone'].setValue(this.labor_data.phone);
      this.laborform.controls['ruc'].setValue(this.labor_data.ruc);
      this.laborform.controls['sector'].setValue(this.labor_data.sector);
      this.laborform.controls['averageSales'].setValue(this.labor_data.averageSales);
    }
  }

  /**
   * Recover the cities of a province
   * @param {Event} event.id - Province identifier
   * @return {void} Nothing
  */
  changeProvince(event) {
    this.httpService.getCities(event.id).subscribe(res => {
      this.laborform.controls['city'].setValue(null);
      this.cities = []
      this.cities = res.data;
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /**
   * Variable to verify if the address form is correct
   * @type {boolean}
  */
  laborFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidlaborform(field: string) {
    return (
      this.laborform.get(field).errors && this.laborform.get(field).touched ||
      this.laborform.get(field).untouched &&
      this.laborFormSubmitted && this.laborform.get(field).errors
    );
  }

  /**
   * Validate contact form
   * @return {void} Nothing
  */
  onSubmitLaborForm() {

    //this.laborFormSubmitted = true;
    //if (this.laborform.valid) {

      let labor_data: any = {
        type: this.laborform.value.type,
        companyName: this.laborform.value.companyName,
        positionCompany: this.laborform.value.positionCompany,
        monthlySalary: this.laborform.value.monthlySalary,
        otherMonthlyValue: this.laborform.value.otherMonthlyValue,
        valueDetail: this.laborform.value.valueDetail,
        province: this.laborform.value.province,
        city: this.laborform.value.city,
        address: this.laborform.value.address,
        phone: this.laborform.value.phone,
        ruc: this.laborform.value.ruc,
        sector: this.laborform.value.sector,
        averageSales: this.laborform.value.averageSales
      }

      /** Store location_data in localStorage*/
      localStorage.setItem('labor_data', JSON.stringify(labor_data));
      this.router.navigate(['credit/results/economic/financial']);
    //}
  }

}
