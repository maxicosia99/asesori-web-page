import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-financial-data',
  templateUrl: './financial-data.component.html',
  styleUrls: ['./financial-data.component.scss']
})
export class FinancialDataComponent implements OnInit {

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
  * Service form (credit, insurance, credit cards, investment policy)
 */
  financialform = this.formbuilder.group({
    monthlySalary: ['', [Validators.required]],
    otherMonthlyValue: [''],
    valueDetail: [''],
    monthlyExpenses: ['', [Validators.required]],
    paymentCapacity: ['', [Validators.required]]
  });

  public personal_data: any;
  public location_data: any;
  public contact_data: any;
  public economic_data: any;
  public labor_data: any;
  public financial_data: any;

  ngOnInit() {
    window.scrollTo(0, 0);

    /** Verificar contenido del local storage*/
    this.personal_data = JSON.parse(localStorage.getItem('personal_data'));
    this.location_data = JSON.parse(localStorage.getItem('location_data'));
    this.contact_data = JSON.parse(localStorage.getItem('contact_data'));
    this.economic_data = JSON.parse(localStorage.getItem('economic_data'));
    this.labor_data = JSON.parse(localStorage.getItem('labor_data'));
    this.financial_data = JSON.parse(localStorage.getItem('financial_data'));

    if (this.financial_data) {
      this.financialform.controls['monthlySalary'].setValue(this.financial_data.monthlySalary);  
      this.financialform.controls['otherMonthlyValue'].setValue(this.financial_data.otherMonthlyValue);
      this.financialform.controls['valueDetail'].setValue(this.financial_data.valueDetail);  
      this.financialform.controls['monthlyExpenses'].setValue(this.financial_data.monthlyExpenses);  
      this.financialform.controls['paymentCapacity'].setValue(this.financial_data.paymentCapacity);  
    } else if (this.labor_data) {
      this.financialform.controls['monthlySalary'].setValue(this.labor_data.monthlySalary);
      this.financialform.controls['otherMonthlyValue'].setValue(this.labor_data.otherMonthlyValue);
      this.financialform.controls['valueDetail'].setValue(this.labor_data.valueDetail);
    }
  }

  /**
   * Variable to verify if the address form is correct
   * @type {boolean}
  */
  FinancialFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidfinancialform(field: string) {
    return (
      this.financialform.get(field).errors && this.financialform.get(field).touched ||
      this.financialform.get(field).untouched &&
      this.FinancialFormSubmitted && this.financialform.get(field).errors
    );
  }

  /**
   * Validate contact form
   * @return {void} Nothing
  */
  onSubmitLFinancialForm() {
    //this.FinancialFormSubmitted = true;
    //if (this.financialform.valid) {
      
      let financial_data: any = {
        monthlySalary: this.financialform.value.monthlySalary,
        otherMonthlyValue: this.financialform.value.otherMonthlyValue,
        valueDetail: this.financialform.value.valueDetail,
        monthlyExpenses: this.financialform.value.monthlyExpenses,
        paymentCapacity: this.financialform.value.paymentCapacity
      }

      /** Store location_data in localStorage*/
      localStorage.setItem('financial_data', JSON.stringify(financial_data));
      this.router.navigate(['credit/results/economic/economic']);
    //}
  }

}
