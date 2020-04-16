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

  laborform = this.formbuilder.group({
    type: new FormControl(null, Validators.required),
  });

  dependienteform = this.formbuilder.group({
    companyName: ['', [Validators.required]],
    positionCompany: ['', [Validators.required]],
    monthlySalary: ['', [Validators.required]],
    otherMonthlyValue: [''],
    valueDetail: [''],
    province: [null, [Validators.required]],
    city: [null, [Validators.required]],
    address: [''],
    phone: [''],
  });

  independienteform = this.formbuilder.group({
    ruc: ['', [Validators.required]],
    sector: ['', [Validators.required]],
    averageSales: ['', [Validators.required]]
  });

  mixtaform = this.formbuilder.group({
    companyName: ['', [Validators.required]],
    positionCompany: ['', [Validators.required]],
    monthlySalary: ['', [Validators.required]],
    otherMonthlyValue: [''],
    valueDetail: [''],
    province: [null, [Validators.required]],
    city: [null, [Validators.required]],
    address: [''],
    phone: [''],
    ruc: ['', [Validators.required]],
    sector: ['', [Validators.required]],
    averageSales: ['', [Validators.required]]
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
          this.dependienteform.controls['province'].setValue({ id: resp.data.id, name: resp.data.name });
          this.mixtaform.controls['province'].setValue({ id: resp.data.id, name: resp.data.name });
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

    if (this.labor_data) {

      if (this.labor_data.type === 'dependiente') {
        this.dependenciaSection = true;

        this.laborform.controls['type'].setValue(this.labor_data.type);
        this.dependienteform.controls['companyName'].setValue(this.labor_data.companyName);
        this.dependienteform.controls['positionCompany'].setValue(this.labor_data.positionCompany);
        this.dependienteform.controls['monthlySalary'].setValue(this.labor_data.monthlySalary);
        this.dependienteform.controls['otherMonthlyValue'].setValue(this.labor_data.otherMonthlyValue);
        this.dependienteform.controls['valueDetail'].setValue(this.labor_data.valueDetail);

        if (this.labor_data.province) {
          this.dependienteform.controls['province'].setValue({ id: this.labor_data.province.id, name: this.labor_data.province.name });
        }

        if (this.labor_data.city) {
          this.dependienteform.controls['city'].setValue({ id: this.labor_data.city.id, name: this.labor_data.city.name });
        }

        this.dependienteform.controls['address'].setValue(this.labor_data.address);
        this.dependienteform.controls['phone'].setValue(this.labor_data.phone);

      }

      if (this.labor_data.type === 'independiente') {
        this.independenciaSection = true;
        this.laborform.controls['type'].setValue(this.labor_data.type);
        this.independienteform.controls['ruc'].setValue(this.labor_data.ruc);
        this.independienteform.controls['sector'].setValue(this.labor_data.sector);
        this.independienteform.controls['averageSales'].setValue(this.labor_data.averageSales);
      }

      if (this.labor_data.type === 'mixta') {
        this.mixtaSection = true;
        this.laborform.controls['type'].setValue(this.labor_data.type);
        this.mixtaform.controls['companyName'].setValue(this.labor_data.companyName);
        this.mixtaform.controls['positionCompany'].setValue(this.labor_data.positionCompany);
        this.mixtaform.controls['monthlySalary'].setValue(this.labor_data.monthlySalary);
        this.mixtaform.controls['otherMonthlyValue'].setValue(this.labor_data.otherMonthlyValue);
        this.mixtaform.controls['valueDetail'].setValue(this.labor_data.valueDetail);

        if (this.labor_data.province) {
          this.mixtaform.controls['province'].setValue({ id: this.labor_data.province.id, name: this.labor_data.province.name });
        }

        if (this.labor_data.city) {
          this.mixtaform.controls['city'].setValue({ id: this.labor_data.city.id, name: this.labor_data.city.name });
        }

        this.mixtaform.controls['address'].setValue(this.labor_data.address);
        this.mixtaform.controls['phone'].setValue(this.labor_data.phone);
        this.mixtaform.controls['ruc'].setValue(this.labor_data.ruc);
        this.mixtaform.controls['sector'].setValue(this.labor_data.sector);
        this.mixtaform.controls['averageSales'].setValue(this.labor_data.averageSales);
      }
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
   * Variable to verify if the dependiente form is correct
   * @type {boolean}
  */
  dependienteFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidDependienteform(field: string) {
    return (
      this.dependienteform.get(field).errors && this.dependienteform.get(field).touched ||
      this.dependienteform.get(field).untouched &&
      this.dependienteFormSubmitted && this.dependienteform.get(field).errors
    );
  }

  /**
   * Variable to verify if the dependiente form is correct
   * @type {boolean}
  */
  independienteFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidIndependienteform(field: string) {
    return (
      this.independienteform.get(field).errors && this.independienteform.get(field).touched ||
      this.independienteform.get(field).untouched &&
      this.independienteFormSubmitted && this.independienteform.get(field).errors
    );
  }

  /**
   * Variable to verify if the dependiente form is correct
   * @type {boolean}
  */
  mixtaFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidMixtaform(field: string) {
    return (
      this.mixtaform.get(field).errors && this.mixtaform.get(field).touched ||
      this.mixtaform.get(field).untouched &&
      this.mixtaFormSubmitted && this.mixtaform.get(field).errors
    );
  }

  onSubmitDependienteForm() {

    this.dependienteFormSubmitted = true;
    if (this.dependienteform.valid) {

      let labor_data: any = {
        type: this.laborform.value.type,
        companyName: this.dependienteform.value.companyName,
        positionCompany: this.dependienteform.value.positionCompany,
        monthlySalary: this.dependienteform.value.monthlySalary,
        otherMonthlyValue: this.dependienteform.value.otherMonthlyValue,
        valueDetail: this.dependienteform.value.valueDetail,
        province: this.dependienteform.value.province,
        city: this.dependienteform.value.city,
        address: this.dependienteform.value.address,
        phone: this.dependienteform.value.phone
      }

      /** Store location_data in localStorage*/
      localStorage.setItem('labor_data', JSON.stringify(labor_data));
      this.router.navigate(['credit/results/economic/financial']);
    }
  }

  onSubmitIndependienteForm() {

    this.independienteFormSubmitted = true;
    if (this.independienteform.valid) {

      let labor_data: any = {
        type: this.laborform.value.type,
        ruc: this.independienteform.value.ruc,
        sector: this.independienteform.value.sector,
        averageSales: this.independienteform.value.averageSales
      }

      /** Store location_data in localStorage*/
      localStorage.setItem('labor_data', JSON.stringify(labor_data));
      this.router.navigate(['credit/results/economic/financial']);
    }
  }

  onSubmitMixtaForm() {

    this.mixtaFormSubmitted = true;
    if (this.mixtaform.valid) {

      let labor_data: any = {
        type: this.laborform.value.type,
        companyName: this.mixtaform.value.companyName,
        positionCompany: this.mixtaform.value.positionCompany,
        monthlySalary: this.mixtaform.value.monthlySalary,
        otherMonthlyValue: this.mixtaform.value.otherMonthlyValue,
        valueDetail: this.mixtaform.value.valueDetail,
        province: this.mixtaform.value.province,
        city: this.mixtaform.value.city,
        address: this.mixtaform.value.address,
        phone: this.mixtaform.value.phone,
        ruc: this.mixtaform.value.ruc,
        sector: this.mixtaform.value.sector,
        averageSales: this.mixtaform.value.averageSales
      }

      /** Store location_data in localStorage*/
      localStorage.setItem('labor_data', JSON.stringify(labor_data));
      this.router.navigate(['credit/results/economic/financial']);
    }
  }

}
