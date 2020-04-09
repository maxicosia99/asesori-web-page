import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-vehicle-data',
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.scss']
})
export class VehicleDataComponent implements OnInit {

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
   * Define vehicle form
  */
  vehicleform = this.formbuilder.group({
    vehicleColor: [null],
    vehiclePlate: [''],
  });

  /**
   * Variable that stores the vehicle color
   * @type {any[]}
  */
  public vehicleColors: any = [
    { id: 1, color_name: 'AMARILLO' },
    { id: 2, color_name: 'AZUL' },
    { id: 3, color_name: 'BEIGE' },
    { id: 4, color_name: 'BLANCO' },
    { id: 5, color_name: 'BRONCE' },
    { id: 6, color_name: 'CAFE' },
    { id: 7, color_name: 'CELESTE' },
    { id: 8, color_name: 'COBRE' },
    { id: 9, color_name: 'CREMA' },
    { id: 10, color_name: 'DORADO' },
    { id: 11, color_name: 'FUCSIA' },
    { id: 12, color_name: 'GRIS' },
    { id: 13, color_name: 'ABANO' },
    { id: 14, color_name: 'LILA' },
    { id: 15, color_name: 'MARFIL' },
    { id: 16, color_name: 'MORADO' },
    { id: 17, color_name: 'MOSTAZA' },
    { id: 18, color_name: 'NARANJA' },
    { id: 18, color_name: 'NEGRO' },
    { id: 19, color_name: 'OTROS' },
    { id: 20, color_name: 'PERLA' },
    { id: 21, color_name: 'PLATA' },
    { id: 22, color_name: 'PLATEADO' },
    { id: 23, color_name: 'PLOMO' },
    { id: 24, color_name: 'ROJO' },
    { id: 25, color_name: 'ROSADO' },
    { id: 26, color_name: 'TOMATE' },
    { id: 27, color_name: 'TURQUEZA' },
    { id: 28, color_name: 'VERDE' },
    { id: 29, color_name: 'VINO' },
  ]

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
    //this.vehicleform.controls['vehicleColor'].setValue({ id: -1, color_name: 'COLOR*' });
  }

  /**
   * Calculate vehicle insurance options
   * @param {HTMLElement} element - HTML identifier
   * @return {void} Nothing
  */
  onSubmitVehicleform() {
    this.vehicleformSubmitted = true;
    if (this.vehicleform.valid) {
      this.router.navigate(['insurance/results/my-insurance']);
    }
  }

}
