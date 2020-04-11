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

    this.credit_information = JSON.parse(localStorage.getItem('credit_information'));
    this.credit_options = JSON.parse(localStorage.getItem('credit_options'));
    this.personal_data = JSON.parse(localStorage.getItem('personal_data'));
    this.location_data = JSON.parse(localStorage.getItem('location_data'));
    this.contact_data = JSON.parse(localStorage.getItem('contact_data'));
    this.economic_data = JSON.parse(localStorage.getItem('economic_data'));
    this.labor_data = JSON.parse(localStorage.getItem('labor_data'));
    this.financial_data = JSON.parse(localStorage.getItem('financial_data'));

    this.destinedTo = this.credit_information.destinedTo;
    this.amountRequest = this.credit_information.amountRequest;
    this.entryAmount = this.credit_information.entryAmount;
    this.term = this.credit_information.term;
    this.monthlyIncome = this.credit_information.monthlyIncome;
    this.credits_entities = this.credit_options.credits_entities;
  }

  /**
   * Retrieve all the information for the credit application
   * @param {HTMLElement} el - HTML identifier
   * @return {void} Nothing
  */
  onSubmitSummary() {

    let creditInformation: CreditInformation = {} as CreditInformation;

    /**Ver el ID de usuario */
    creditInformation.user_id = 1;

    creditInformation.name = this.personal_data.name;
    creditInformation.last_name = this.personal_data.last_name;
    creditInformation.cedula = this.personal_data.cedula;

    creditInformation.city = this.location_data.city.name;
    creditInformation.region_name = this.location_data.province.name;
    creditInformation.country_name = 'ECUADOR';
    creditInformation.address = this.location_data.address;

    creditInformation.email = this.contact_data.email;
    creditInformation.phone = this.contact_data.phone;

    creditInformation.payments_cards = this.economic_data.payments_cards;
    creditInformation.rental = this.economic_data.rental;
    creditInformation.payment_loans = this.economic_data.payment_loans;
    creditInformation.payment_services = this.economic_data.payment_services;
    creditInformation.housing_type = this.economic_data.housing_type;
    creditInformation.mortgage_payment = this.economic_data.mortgage_payment;
    creditInformation.total_possessions = this.economic_data.total_possessions;

    creditInformation.term = this.term;
    creditInformation.id_credit = this.credit_information.id_credit;
    creditInformation.amount_required = this.amountRequest;
    creditInformation.monthly_income = this.monthlyIncome;
    creditInformation.initial_amount = this.entryAmount;
    creditInformation.destination = this.destinedTo;

    let creditos: Creditos[] = this.credit_options.credit_selected;

    creditInformation.creditos = creditos;

    this.httpService.createCreditInformation(creditInformation).subscribe(res => {

      //console.log(creditInformation)

      if (res.status == 200) {

        localStorage.removeItem('credit_information');
        localStorage.removeItem('credit_options');
        localStorage.removeItem('economic_data');
        localStorage.removeItem('personal_data');
        localStorage.removeItem('location_data');
        localStorage.removeItem('labor_data');
        localStorage.removeItem('financial_data');
        //localStorage.removeItem('contact_data');
        //localStorage.clear();

        this.router.navigate(['credit/finalize']);

        let application_id = res.data;
        this.httpService.sendCreditInformation(application_id).subscribe((res) => {
          console.log(res);
        }, (error) => {
          console.log('error al enviar información de solicitud con id ' + application_id + " a la nueva bd");
          console.log(error);
        });

        //this.messageErrorCredit = null;

      } else {
        console.log('Ah ocurrido un error! ' + res.message);
        //this.messageErrorCredit = res.message;
      }
    }, error => {
      console.log('error al crear información');
      console.log(error);
    });
  }

}
