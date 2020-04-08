import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { validateCedula } from 'src/app/services/client/validar-cedula';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { UserInfo } from 'src/app/models/user-info';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private httpService: HttpClientService,
    private authenticationService: AuthenticationService,
  ) { }

  /**
  * Variable to check user login
  * @type {any}
  */
  public user: any;

  /**
   * Variable to store the user id
   * @type {number}
  */
  public user_id: number;

  /**
   * Variables to retrieve user information
   * @type {boolean}
  */
  public hasCedula: boolean = false;
  public hasNames: boolean = false;
  public hasLastNames: boolean = false;

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
   * Modal methods
   * @type {BsModalRef}
  */
  public modalRef: BsModalRef;

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
   * Variables for the progress bar
   * @type {any[]}
  */
  public percentage: number = 95;

  /**
   * Define personal data form
  */
  personalDataForm = this.formbuilder.group({
    names: ['', Validators.required],
    last_names: ['', Validators.required],
    dni: ['', [Validators.required, validateCedula]],
    maritalStatus: null,
    gender: [''],
    //age: ['', [Validators.required]]
    age: ['']
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
   * Allows to open and close the modal terms and conditions
   * @param {TemplateRef<any>} template - Identifier of the modal HTML tag
  */
  openModal_termsConditions(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-dialog-centered');
  }

  /**
   * Shows modal confirmation message
   * @return {void} Nothing
  */
  confirm(): void {
    this.modalRef.hide();
    console.log(`Confirmar`);
    this.onSubmitPersonalDataForm();
  }

  /**
   * Validate personal data form
   * @return {void} Nothing
  */
  onSubmitPersonalDataForm() {
    this.personalDataFormSubmitted = true;
    if (this.personalDataForm.valid) {

      let personal_data: any = {
        name: this.personalDataForm.value.names,
        last_name: this.personalDataForm.value.last_names,
        cedula: this.personalDataForm.value.dni,
        // maritalStatus: this.personalDataForm.value.maritalStatus.status,
        // gender: this.personalDataForm.value.gender.gender,
        // age: this.personalDataForm.value.age
      }
      /** Store personal_data in localStorage*/
      localStorage.setItem('personal_data', JSON.stringify(personal_data));
      this.router.navigate(['credit/results/identification/location']);
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.personalDataForm.controls['gender'].setValue({ id: -1, gender: 'GÉNERO' });

    /* Handling of personal data when logging in */
    this.recuperateLoginData();
    this.authenticationService.subsVar = this.authenticationService.getUserData.subscribe(() => {
      this.recuperateLoginData();
    });
    this.authenticationService.subsClearVar = this.authenticationService.clearUserData.subscribe(() => {

      this.personalDataForm.controls['dni'].setValue("");
      this.personalDataForm.controls['names'].setValue("");
      this.personalDataForm.controls['last_names'].setValue("");
      this.user_id = null;
      this.hasCedula = false;
      this.hasNames = false;
      this.hasLastNames = false;
    });

  }

  // updatePercentage(value: string, percent: number){
  //   if(value.length > 0){
  //     this.percentage += percent;
  //   }else{
  //     this.percentage -= percent;
  //   }
  // }


  /**------------------------------------------------METHODS AND FUNCTIONS FOR LOGIN---------------------------------------------------- */

  /**
   * Check if the user is logged in
   * @return {boolean} True if you are logged in, false if not
  */
  loginVerified(): boolean {
    let accessToken = localStorage.getItem('currentUser');
    if (accessToken) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      return true;
    }
    this.user_id = null;
    return false;
  }

  /**
   * Retrieves the information if the user is logged in.
   * @return {void} Nothing
  */
  recuperateLoginData() {
    if (this.loginVerified()) {
      this.httpService.getDataUserlogin().subscribe((user: UserInfo) => {
        this.user_id = this.user.id;
        if (user) {
          if (user.cedula) {
            this.personalDataForm.controls['dni'].setValue(user.cedula);
            this.hasCedula = true;
          }
          if (user.name) {
            this.personalDataForm.controls['names'].setValue(user.name);
            this.hasNames = true;
          }
          if (user.last_name) {
            this.personalDataForm.controls['last_names'].setValue(user.last_name);
            this.hasLastNames = true;
          }
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

}
