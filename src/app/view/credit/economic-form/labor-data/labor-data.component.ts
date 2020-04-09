import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
    type: new FormControl(),
    monthlySalary: [''],
    otherMonthlyValue: ['']
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
  }

  /**
   * Recover the cities of a province
   * @param {Event} event.id - Province identifier
   * @return {void} Nothing
  */
  changeProvince(event) {
    this.httpService.getCities(event.id).subscribe(res => {
      this.cities = []
      this.cities = res.data;
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  /**
   * Validate contact form
   * @return {void} Nothing
  */
  onSubmitLaborForm() {
    //this.contactFormSubmitted = true;
    //if (this.contactForm.valid) {
    this.router.navigate(['credit/results/economic/financial']);
    //}
  }

}
