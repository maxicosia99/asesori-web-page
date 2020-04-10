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
    vehicleColor: [null, Validators.required],
    vehiclePlate: [''],
    vehicleDetails: ['']
  });

  /**
   * Variable that stores the vehicle color
   * @type {any[]}
  */
  public vehicleColors: any = [
    {color_name: 'AMARILLO' },
    {color_name: 'AZUL' },
    {color_name: 'BEIGE' },
    {color_name: 'BLANCO' },
    {color_name: 'BRONCE' },
    {color_name: 'CAFE' },
    {color_name: 'CELESTE' },
    {color_name: 'COBRE' },
    {color_name: 'CREMA' },
    { color_name: 'DORADO' },
    { color_name: 'FUCSIA' },
    { color_name: 'GRIS' },
    { color_name: 'ABANO' },
    { color_name: 'LILA' },
    { color_name: 'MARFIL' },
    { color_name: 'MORADO' },
    { color_name: 'MOSTAZA' },
    { color_name: 'NARANJA' },
    { color_name: 'NEGRO' },
    { color_name: 'OTROS' },
    { color_name: 'PERLA' },
    { color_name: 'PLATA' },
    { color_name: 'PLATEADO' },
    { color_name: 'PLOMO' },
    { color_name: 'ROJO' },
    { color_name: 'ROSADO' },
    { color_name: 'TOMATE' },
    { color_name: 'TURQUEZA' },
    { color_name: 'VERDE' },
    { color_name: 'VINO' },
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

  public personal_data: any;
  public location_data: any;
  public contact_data: any;
  public vehicle_data:any;

  ngOnInit() {
    /** Verificar contenido del local storage*/
    this.personal_data = JSON.parse(localStorage.getItem('personal_data'));
    this.location_data = JSON.parse(localStorage.getItem('location_data'));
    this.contact_data = JSON.parse(localStorage.getItem('contact_data'));
    this.vehicle_data = JSON.parse(localStorage.getItem('vehicle_data'));

    if(this.vehicle_data){
      this.vehicleform.controls['vehicleColor'].setValue({color_name:this.vehicle_data.vehicleColor.color_name});
      this.vehicleform.controls['vehiclePlate'].setValue(this.vehicle_data.vehiclePlate);
      this.vehicleform.controls['vehicleDetails'].setValue(this.vehicle_data.vehicleDetails);
    }
  }

  /**
   * Calculate vehicle insurance options
   * @param {HTMLElement} element - HTML identifier
   * @return {void} Nothing
  */
  onSubmitVehicleform() {
    this.vehicleformSubmitted = true;
    if (this.vehicleform.valid) {

      let vehicle_data: any = {
        vehicleColor: this.vehicleform.value.vehicleColor,
        vehiclePlate: this.vehicleform.value.vehiclePlate,
        vehicleDetails: this.vehicleform.value.vehicleDetails,
      }
      /** Store vehicle_data in localStorage*/
      localStorage.setItem('vehicle_data', JSON.stringify(vehicle_data));
      this.router.navigate(['insurance/results/my-insurance']);
    }
  }

}
