import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';                                      //options carousel images
import { HttpClientService } from 'src/app/services/client/http-client.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  public credit_name: string;
  public beneficiaries: string[];
  public destination: string[];
  public terms: string[];
  public url_photo: string;

  /* Carousel options */
  customOptions: OwlOptions = {
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
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    }
  }

  constructor(
    private formbuilder: FormBuilder,              //form service
    private httpService: HttpClientService,       //client api service
  ) { }

  ngOnInit() {

    this.httpService.getInformationCreditByid(this.creditform.get('credit_type_userSelected').value.split("_")[1]).subscribe(res => {
      
      console.log(`Destinación: ${this.creditform.get('credit_type_userSelected').value.split("_")[0]}`);

      this.credit_name = res.data.credit_name;
      this.beneficiaries = res.data.beneficiaries;
      this.destination = res.data.destination;
      this.terms = res.data.terms;
      this.url_photo = res.data.url_photo;

    }, error => {
      console.log('error');
      console.log(error);
    });

  }

  myForm = this.formbuilder.group({
    radio: '0'
  });

  /* Credit calculation form */
  creditform = this.formbuilder.group({
    credit_type_userSelected: 'estudios_10'
  });

  creditos() {
    console.log(`creditos`);
  }

  seguros() {
    console.log(`seguros`);
  }

  onSelectCreditType($event) {

    this.httpService.getInformationCreditByid($event.target.value.split("_")[1]).subscribe(res => {
      
      console.log(`Destinación: ${$event.target.value.split("_")[0]}`);

      this.credit_name = res.data.credit_name;
      this.beneficiaries = res.data.beneficiaries;
      this.destination = res.data.destination;
      this.terms = res.data.terms;
      this.url_photo = res.data.url_photo;
      
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

}
