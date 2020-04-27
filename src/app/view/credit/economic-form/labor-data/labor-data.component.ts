import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { validateRuc } from 'src/app/services/client/validar-ruc';

export function validateEntryMoney(control: AbstractControl) {
  if (control.value === 0) {
    return { valid: true };
  }
  return null;
}

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
    monthlySalary: ['', [Validators.required, validateEntryMoney]],
    otherMonthlyValue: [''],
    valueDetail: [''],
    province: [null, [Validators.required]],
    city: [null, [Validators.required]],
    address: [''],
    phone: [''],
  });

  independienteform = this.formbuilder.group({
    ruc: ['', [Validators.required, validateRuc]],
    sector: ['', [Validators.required]],
    averageSales: ['', [Validators.required, validateEntryMoney]]
  });

  mixtaform = this.formbuilder.group({
    companyName: ['', [Validators.required]],
    positionCompany: ['', [Validators.required]],
    monthlySalary: ['', [Validators.required, validateEntryMoney]],
    otherMonthlyValue: [''],
    valueDetail: [''],
    province: [null, [Validators.required]],
    city: [null, [Validators.required]],
    address: [''],
    phone: [''],
    ruc: ['', [Validators.required, validateRuc]],
    sector: ['', [Validators.required]],
    averageSales: ['', [Validators.required, validateEntryMoney]]
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
      this.percentage = +localStorage.getItem('percentage');
      this.percentage += this.totalPercentageD;

      if (this.labor_data) {

        if (this.labor_data.type === 'dependiente') {
          this.percentage = +localStorage.getItem('percentage');
        }
        if (this.labor_data.type === 'independiente') {
          this.percentage -= 33;
        }
        if (this.labor_data.type === 'mixta') {
          this.percentage -= 32;
        }
      }
    }
    if ($event.target.value === 'independiente') {
      this.dependenciaSection = false;
      this.independenciaSection = true;
      this.mixtaSection = false;
      this.percentage = +localStorage.getItem('percentage');
      this.percentage += this.totalPercentageI;

      if (this.labor_data) {

        if (this.labor_data.type === 'dependiente') {
          this.percentage -= 30;
        }
        if (this.labor_data.type === 'independiente') {
          this.percentage = +localStorage.getItem('percentage');
        }
        if (this.labor_data.type === 'mixta') {
          this.percentage -= 32;
        }
      }
    }
    if ($event.target.value === 'mixta') {
      this.dependenciaSection = false;
      this.independenciaSection = false;
      this.mixtaSection = true;
      this.percentage = +localStorage.getItem('percentage');
      this.percentage += this.totalPercentageM;

      if (this.labor_data) {

        if (this.labor_data.type === 'dependiente') {
          this.percentage -= 30;
        }
        if (this.labor_data.type === 'independiente') {
          this.percentage -= 33;
        }
        if (this.labor_data.type === 'mixta') {
          this.percentage = +localStorage.getItem('percentage');
        }

      }
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
    this.percentage = +localStorage.getItem('percentage');

    /*  Get all provinces. */
    this.httpService.getProvinces().subscribe(res => {
      this.provinces = res.data;
    }, error => {
      console.log('error');
      console.log(error);
    });

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

        this.percentageDCompanyName = true;
        this.percentageDPositionCompany = true;
        this.percentageDMonthlySalary = true;

        if (this.labor_data.province) {
          this.dependienteform.controls['province'].setValue({ id: this.labor_data.province.id, name: this.labor_data.province.name });
          this.percentageDProvince = true;
        }

        if (this.labor_data.city) {
          this.dependienteform.controls['city'].setValue({ id: this.labor_data.city.id, name: this.labor_data.city.name });
          this.percentageDCity = true;
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
        this.percentageIRuc = true;
        this.percentageISector = true;
        this.percentageIAverageSales = true;
      }

      if (this.labor_data.type === 'mixta') {
        this.mixtaSection = true;
        this.laborform.controls['type'].setValue(this.labor_data.type);
        this.mixtaform.controls['companyName'].setValue(this.labor_data.companyName);
        this.mixtaform.controls['positionCompany'].setValue(this.labor_data.positionCompany);
        this.mixtaform.controls['monthlySalary'].setValue(this.labor_data.monthlySalary);
        this.mixtaform.controls['otherMonthlyValue'].setValue(this.labor_data.otherMonthlyValue);
        this.mixtaform.controls['valueDetail'].setValue(this.labor_data.valueDetail);

        this.percentageMCompanyName = true;
        this.percentageMPositionCompany = true;
        this.percentageMMonthlySalary = true;

        if (this.labor_data.province) {
          this.mixtaform.controls['province'].setValue({ id: this.labor_data.province.id, name: this.labor_data.province.name });
          this.percentageMProvince = true;
        }

        if (this.labor_data.city) {
          this.mixtaform.controls['city'].setValue({ id: this.labor_data.city.id, name: this.labor_data.city.name });
          this.percentageMCity = true;
        }

        this.mixtaform.controls['address'].setValue(this.labor_data.address);
        this.mixtaform.controls['phone'].setValue(this.labor_data.phone);
        this.mixtaform.controls['ruc'].setValue(this.labor_data.ruc);
        this.mixtaform.controls['sector'].setValue(this.labor_data.sector);
        this.mixtaform.controls['averageSales'].setValue(this.labor_data.averageSales);

        this.percentageMRuc = true;
        this.percentageMSector = true;
        this.percentageMAverageSales = true;
      }
    }
  }

  /**
   * Recover the cities of a province
   * @param {Event} event.id - Province identifier
   * @return {void} Nothing
  */
  changeProvince(event) {

    if (this.laborform.get('type').value === 'dependiente') {
      this.updatePercentageDProvince();
    }
    if (this.laborform.get('type').value === 'mixta') {
      this.updatePercentageMProvince();
    }

    this.httpService.getCities(event.id).subscribe(res => {
      this.dependienteform.controls['city'].setValue(null);
      this.mixtaform.controls['city'].setValue(null);
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

  verifyRucInd():  boolean  {
    return this.independienteform.hasError('validateRuc');
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

  verifyRucMix():  boolean  {
    return this.mixtaform.hasError('validateRuc');
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
      localStorage.setItem('percentage', this.percentage.toString());
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
      localStorage.setItem('percentage', this.percentage.toString());
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
      localStorage.setItem('percentage', this.percentage.toString());
      this.router.navigate(['credit/results/economic/financial']);
    }
  }

  /**--------------------------------------------------------------------------------------------------------------------------- */

  public percentageDCompanyName: boolean = false;
  public percentageDPositionCompany: boolean = false;
  public percentageDMonthlySalary: boolean = false;
  public percentageDProvince: boolean = false;
  public percentageDCity: boolean = false;

  public increaseD: number = 6;

  public totalPercentageD: number = 0;

  updatePercentageDCompanyName() {
    if (this.dependienteform.value.companyName.length > 0 && !this.percentageDCompanyName) {
      this.percentageDCompanyName = true;
      this.percentage += this.increaseD;
      this.totalPercentageD += this.increaseD;
    } else if (this.dependienteform.value.companyName.length == 0 && this.percentageDCompanyName) {
      this.percentageDCompanyName = false;
      this.percentage -= this.increaseD;
      this.totalPercentageD -= this.increaseD;
    }
  }

  updatePercentageDPositionCompany() {
    if (this.dependienteform.value.positionCompany.length > 0 && !this.percentageDPositionCompany) {
      this.percentageDPositionCompany = true;
      this.percentage += this.increaseD;
      this.totalPercentageD += this.increaseD;
    } else if (this.dependienteform.value.positionCompany.length == 0 && this.percentageDPositionCompany) {
      this.percentageDPositionCompany = false;
      this.percentage -= this.increaseD;
      this.totalPercentageD -= this.increaseD;
    }
  }

  updatePercentageDMonthlySalary() {
    if (this.dependienteform.value.monthlySalary > 0 && !this.percentageDMonthlySalary) {
      this.percentageDMonthlySalary = true;
      this.percentage += this.increaseD;
      this.totalPercentageD += this.increaseD;
    } else if (this.dependienteform.value.monthlySalary == 0 && this.percentageDMonthlySalary) {
      this.percentageDMonthlySalary = false;
      this.percentage -= this.increaseD;
      this.totalPercentageD -= this.increaseD;
    }
  }

  updatePercentageDProvince() {
    if (!this.percentageDProvince) {
      this.percentageDProvince = true;
      this.percentage += this.increaseD;
      this.totalPercentageD += this.increaseD;
    }
  }

  updatePercentageDCity() {
    if (!this.percentageDCity) {
      this.percentageDCity = true;
      this.percentage += this.increaseD;
      this.totalPercentageD += this.increaseD;
    }
  }

  public percentageIRuc: boolean = false;
  public percentageISector: boolean = false;
  public percentageIAverageSales: boolean = false;

  public increaseI: number = 11;
  public totalPercentageI: number = 0;


  updatePercentageIRuc() {
    if (this.independienteform.value.ruc.length > 0 && !this.percentageIRuc) {
      this.percentageIRuc = true;
      this.percentage += this.increaseI;
      this.totalPercentageI += this.increaseI;
    } else if (this.independienteform.value.ruc.length == 0 && this.percentageIRuc) {
      this.percentageIRuc = false;
      this.percentage -= this.increaseI;
      this.totalPercentageI -= this.increaseI;
    }
  }

  updatePercentageISector() {
    if (this.independienteform.value.sector.length > 0 && !this.percentageISector) {
      this.percentageISector = true;
      this.percentage += this.increaseI;
      this.totalPercentageI += this.increaseI;
    } else if (this.independienteform.value.sector.length == 0 && this.percentageISector) {
      this.percentageISector = false;
      this.percentage -= this.increaseI;
      this.totalPercentageI -= this.increaseI;
    }
  }

  updatePercentageIAverageSales() {
    if (this.independienteform.value.averageSales > 0 && !this.percentageIAverageSales) {
      this.percentageIAverageSales = true;
      this.percentage += this.increaseI;
      this.totalPercentageI += this.increaseI;
    } else if (this.independienteform.value.averageSales == 0 && this.percentageIAverageSales) {
      this.percentageIAverageSales = false;
      this.percentage -= this.increaseI;
      this.totalPercentageI -= this.increaseI;
    }
  }

  public percentageMCompanyName: boolean = false;
  public percentageMPositionCompany: boolean = false;
  public percentageMMonthlySalary: boolean = false;
  public percentageMProvince: boolean = false;
  public percentageMCity: boolean = false;
  public percentageMRuc: boolean = false;
  public percentageMSector: boolean = false;
  public percentageMAverageSales: boolean = false;

  public increaseM: number = 4;
  public totalPercentageM: number = 0;

  updatePercentageMCompanyName() {
    if (this.mixtaform.value.companyName.length > 0 && !this.percentageMCompanyName) {
      this.percentageMCompanyName = true;
      this.percentage += this.increaseM;
      this.totalPercentageM += this.increaseM;
    } else if (this.mixtaform.value.companyName.length == 0 && this.percentageMCompanyName) {
      this.percentageMCompanyName = false;
      this.percentage -= this.increaseM;
      this.totalPercentageM -= this.increaseM;
    }
  }

  updatePercentageMPositionCompany() {
    if (this.mixtaform.value.positionCompany.length > 0 && !this.percentageMPositionCompany) {
      this.percentageMPositionCompany = true;
      this.percentage += this.increaseM;
      this.totalPercentageM += this.increaseM;
    } else if (this.mixtaform.value.positionCompany.length == 0 && this.percentageMPositionCompany) {
      this.percentageMPositionCompany = false;
      this.percentage -= this.increaseM;
      this.totalPercentageM -= this.increaseM;
    }
  }

  updatePercentageMMonthlySalary() {
    if (this.mixtaform.value.monthlySalary > 0 && !this.percentageMMonthlySalary) {
      this.percentageMMonthlySalary = true;
      this.percentage += this.increaseM;
      this.totalPercentageM += this.increaseM;
    } else if (this.mixtaform.value.monthlySalary == 0 && this.percentageMMonthlySalary) {
      this.percentageMMonthlySalary = false;
      this.percentage -= this.increaseM;
      this.totalPercentageM -= this.increaseM;
    }
  }

  updatePercentageMProvince() {
    if (!this.percentageMProvince) {
      this.percentageMProvince = true;
      this.percentage += this.increaseM;
      this.totalPercentageM += this.increaseM;
    }
  }

  updatePercentageMCity() {
    if (!this.percentageMCity) {
      this.percentageMCity = true;
      this.percentage += this.increaseM;
      this.totalPercentageM += this.increaseM;
    }
  }

  updatePercentageMRuc() {
    if (this.mixtaform.value.ruc.length > 0 && !this.percentageMRuc) {
      this.percentageMRuc = true;
      this.percentage += this.increaseM;
      this.totalPercentageM += this.increaseM;
    } else if (this.mixtaform.value.ruc.length == 0 && this.percentageMRuc) {
      this.percentageMRuc = false;
      this.percentage -= this.increaseM;
      this.totalPercentageM -= this.increaseM;
    }
  }

  updatePercentageMSector() {
    if (this.mixtaform.value.sector.length > 0 && !this.percentageMSector) {
      this.percentageMSector = true;
      this.percentage += this.increaseM;
      this.totalPercentageM += this.increaseM;
    } else if (this.mixtaform.value.sector.length == 0 && this.percentageMSector) {
      this.percentageISector = false;
      this.percentage -= this.increaseM;
      this.totalPercentageM -= this.increaseM;
    }
  }

  updatePercentageMAverageSales() {
    if (this.mixtaform.value.averageSales > 0 && !this.percentageMAverageSales) {
      this.percentageMAverageSales = true;
      this.percentage += this.increaseM;
      this.totalPercentageM += this.increaseM;
    } else if (this.mixtaform.value.averageSales == 0 && this.percentageMAverageSales) {
      this.percentageMAverageSales = false;
      this.percentage -= this.increaseM;
      this.totalPercentageM -= this.increaseM;
    }
  }

}
