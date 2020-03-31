import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { validateCedula } from 'src/app/services/client/validar-cedula';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
  ) { }

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
   * Variables to retrieve user information
   * @type {boolean}
  */
  public hasCedula: boolean = false;
  public hasNames: boolean = false;
  public hasLastNames: boolean = false;

  /**
   * Variable for the selection of marital status
   * @type {any[]}
  */
  public maritalStatus: any = [
    { id: 1, status: 'CASADO' },
    { id: 2, status: 'SOLTERO' },
    { id: 3, status: 'DIVORCIADO' },
    { id: 4, status: 'VIUDO' },
    { id: 4, status: 'UNION LIBRE' },
  ];

  /**
   * Variables for the selection of gender
   * @type {any[]}
  */
  public gender: any = [
    { id: 1, gender: 'HOMBRE' },
    { id: 2, gender: 'MUJER' }
  ]

  /**
   * Define personal data form
  */
  personalDataForm = this.formbuilder.group({
    names: ['', Validators.required],
    last_names: ['', Validators.required],
    dni: ['', [Validators.required, validateCedula]],
    maritalStatus: [''],
    gender: [''],
    age: ['', [Validators.required]]
  });

  /**
     * Variable to verify if the personal data form is correct
     * @type {boolean}
    */
  personalDataFormSubmitted: boolean;

  /**
   * Validate a form field
   * @param {string} field - Field of the form to be validated
   * @return {boolean} - True if the field is correct, false if it is not
  */
  isFieldValidPersonalData(field: string) {
    return (
      this.personalDataForm.get(field).errors && this.personalDataForm.get(field).touched ||
      this.personalDataForm.get(field).untouched &&
      this.personalDataFormSubmitted && this.personalDataForm.get(field).errors
    );
  }

  /**
   * Validate personal data form
   * @return {void} Nothing
  */
  onSubmitPersonalDataForm() {
    this.personalDataFormSubmitted = true;
    if (this.personalDataForm.valid) {
      this.router.navigate(['insurance/results/identification/location']);
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.personalDataForm.controls['maritalStatus'].setValue({ id: -1, status: 'ESTADO CIVIL' });
    this.personalDataForm.controls['gender'].setValue({ id: -1, gender: 'GÉNERO' });
  }

}
