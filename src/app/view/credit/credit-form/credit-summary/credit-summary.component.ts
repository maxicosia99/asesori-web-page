import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CreditInformation } from 'src/app/models/credit-information';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { Creditos } from 'src/app/models/creditos';

@Component({
  selector: 'app-credit-summary',
  templateUrl: './credit-summary.component.html',
  styleUrls: ['./credit-summary.component.scss']
})
export class CreditSummaryComponent implements OnInit {

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

  /**
   * Variable for the destination credit
   * @type {string}
  */
  public destinedTo: string;

  /**
   * Variable for the amount request credit
   * @type {string}
  */
  public amountRequest: number;

  /**
   * Variable for the entry amount credit
   * @type {string}
  */
  public entryAmount: number;

  /**
   * Variable for the term credit
   * @type {string}
  */
  public term: number;

  /**
   * Variable for the monthly income credit
   * @type {string}
  */
  public monthlyIncome: number;

  public credits_entities: string;
  public credit_information: any;
  public credit_options: any;
  public personal_data: any;
  public location_data: any;
  public contact_data: any;
  public economic_data: any;
  public labor_data: any;
  public financial_data: any;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.percentage = +localStorage.getItem('percentage');

    this.credit_information = JSON.parse(localStorage.getItem('credit_information'));
    this.credit_options = JSON.parse(localStorage.getItem('credit_options'));
    this.personal_data = JSON.parse(localStorage.getItem('personal_data'));
    this.location_data = JSON.parse(localStorage.getItem('location_data'));
    this.contact_data = JSON.parse(localStorage.getItem('contact_data'));
    this.economic_data = JSON.parse(localStorage.getItem('economic_data'));
    this.labor_data = JSON.parse(localStorage.getItem('labor_data'));
    this.financial_data = JSON.parse(localStorage.getItem('financial_data'));

    this.destinedTo = this.credit_information.destinedTo;
    this.amountRequest = this.credit_information.loan_amount;
    this.entryAmount = this.credit_information.initial_amount;
    this.term = this.credit_information.credit_term;
    this.monthlyIncome = this.credit_information.montly_income;
    this.credits_entities = this.credit_options.credits_entities;
  }

  /**
   * Retrieve all the information for the credit application
   * @param {HTMLElement} el - HTML identifier
   * @return {void} Nothing
  */
  onSubmitSummary() {

    let creditInformation: CreditInformation = {} as CreditInformation;

    creditInformation.applicant_name = this.personal_data.name;
    creditInformation.applicant_lastname = this.personal_data.last_name;
    creditInformation.applicant_dni = this.personal_data.cedula;
    creditInformation.applicant_civil_status = this.personal_data.maritalStatus;
    creditInformation.applicant_birthdate = this.personal_data.birthday;
    
    creditInformation.home_city_id = this.location_data.city.id;
    creditInformation.applicant_home_address = this.location_data.address;
    creditInformation.applicant_home_address_reference = this.location_data.reference;
    creditInformation.applicant_home_address_sector = this.location_data.sector;

    creditInformation.applicant_mail = this.contact_data.email;
    creditInformation.applicant_phone1 = this.contact_data.phone;
    creditInformation.applicant_phone2 = this.contact_data.phone2;

    creditInformation.company_name = this.labor_data.companyName;
    creditInformation.company_position = this.labor_data.positionCompany;
    creditInformation.monthly_salary = this.labor_data.monthlySalary;
    creditInformation.other_monthly_value = this.labor_data.otherMonthlyValue;
    creditInformation.detail_other_monthly_value = this.labor_data.valueDetail;
    creditInformation.company_city_id = this.labor_data.city.id;
    creditInformation.company_address = this.labor_data.address;
    creditInformation.company_phone = this.labor_data.phone;

    /**Pilas aqui */
    creditInformation.applicant_ruc = this.labor_data.ruc;
    creditInformation.commercial_sector = this.labor_data.sector;
    creditInformation.average_monthly_sales = this.labor_data.averageSales;
    /**Pilas aqui */

    creditInformation.monthly_expenses = this.financial_data.monthlyExpenses;
    creditInformation.payment_capacity = this.financial_data.paymentCapacity;


    creditInformation.cards_payment = this.economic_data.payments_cards;
    creditInformation.rental_payment = this.economic_data.rental;
    creditInformation.loans_payment = this.economic_data.payment_loans;
    creditInformation.services_payment = this.economic_data.payment_services;
    creditInformation.housing_type = this.economic_data.housing_type;
    creditInformation.mortgage_payment = this.economic_data.mortgage_payment;
    creditInformation.total_assets_appraisal = this.economic_data.total_possessions;

    creditInformation.credit_term = this.term;
    creditInformation.credittype_id = this.credit_information.credit_id;
    creditInformation.request_city_id = this.credit_information.city_id;
    creditInformation.required_amount = this.amountRequest;
    creditInformation.monthly_income = this.monthlyIncome;
    creditInformation.initial_amount = this.entryAmount;
    creditInformation.credit_destination = this.destinedTo;

    let creditos: Creditos[] = this.credit_options.credit_selected;

    creditInformation.selected_credits = creditos;

    this.httpService.createCreditInformation(creditInformation).subscribe(res => {

      //console.log(res);

      if (res.status == 200) {

        sessionStorage.setItem('request_data', JSON.stringify(res.data));
        //localStorage.clear();
        this.router.navigate(['credit/finalize']);

        // let application_id = res.data;
        // this.httpService.sendCreditInformation(application_id).subscribe((res) => {
        //   console.log(res);
        // }, (error) => {
        //   console.log('error al enviar información de solicitud con id ' + application_id + " a la nueva bd");
        //   console.log(error);
        // });

        //this.messageErrorCredit = null;

      } else {
        console.log('Ah ocurrido un error! ' + res.errors);
        //this.messageErrorCredit = res.message;
      }
    }, error => {
      console.log('error al crear información');
      console.log(error);
    });
  }

}
