import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    monthlySalary: [''],
    otherMonthlyValue: [''],
    monthlyExpenses: [''],
    paymentCapacity: ['']
  });

  ngOnInit() {
    window.scrollTo(0, 0)
  }

  /**
   * Validate contact form
   * @return {void} Nothing
  */
  onSubmitLFinancialForm() {
    //this.contactFormSubmitted = true;
    //if (this.contactForm.valid) {
    this.router.navigate(['credit/results/economic/economic']);
    //}
  }

}
