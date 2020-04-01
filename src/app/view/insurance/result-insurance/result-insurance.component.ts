import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CarInsuranceRequest } from 'src/app/models/car-insurance-request';
import { Insurance } from 'src/app/models/insurance';

@Component({
  selector: 'app-result-insurance',
  templateUrl: './result-insurance.component.html',
  styleUrls: ['./result-insurance.component.scss']
})
export class ResultInsuranceComponent implements OnInit {

  constructor(
    private httpService: HttpClientService,
    private formbuilder: FormBuilder,
    private router: Router,
  ) { }

  //insurance_information: any;

  public insurance_information: any;

  /**
   * Variable to store insurance results
   * @type {any}
  */
  public can_access_vehicleInsurance: any;

  /**
   * Variables necessary to store the results
   * @type {number}
  */
  public cant_insurances: number = 0;
  public cont_insurances: number = 0;

  /**
   * Subscriptions necessary to store the results
   * @type {any}
  */
  public subsc1: any;
  public subsc2: any = [];

  /**
   * Variable to store the names of the selected insurance entities
   * @type {string}
  */
  public insurance_entities: string = ``;

  /**
   * Variable to store the amount of results chosen by the user
   * @type {number}
  */
  public cantInsurnaceUserSelected: number = 0;

  /**
   * Get variable to store the results of insurance selected by the user
   * @return {FormArray} Values where the user can obtain the insurance
  */
  get can_access_vehicleInsurance_userSelected(): FormArray {
    return this.insuranceform.get('can_access_vehicleInsurance_userSelected') as FormArray;
  }

  /**
   * Count insurance selected options
   * @return {void} Nothing
  */
  public cantInsuranceSelectedUser() {
    this.cantInsurnaceUserSelected = this.insuranceform.value.can_access_vehicleInsurance_userSelected
      .map((v, i) => v ? this.can_access_vehicleInsurance[i].id : null)
      .filter(v => v !== null).length;
  }

  /**
   * Define insurance form
  */
  insuranceform = this.formbuilder.group({
    can_access_vehicleInsurance_userSelected: new FormArray([]),
  });

  /**
   * Calculate vehicle insurance options
   * @param {HTMLElement} element - HTML identifier
   * @return {void} Nothing
  */
  ngOnInit() {

    this.insurance_information = JSON.parse(localStorage.getItem('insurance_information'));

    window.scrollTo(0, 0);

    this.can_access_vehicleInsurance = [];
    this.cont_insurances = 0;
    this.cant_insurances = 0;

    let request: CarInsuranceRequest = {} as CarInsuranceRequest;
    request.insured_dni = '1718570250';
    request.insured_age = 23;
    request.insured_name = 'Bryan Alexander';
    request.insured_lastname = 'Aguilar Yaguana';
    request.insured_gender = 'MASCULINO';
    request.insured_marital_status = 'CASADO';
    request.region_code = 'A';
    request.city = 'Cuenca';
    request.car_year = this.insurance_information.vehicleYear;
    request.car_brand = this.insurance_information.vehicleBrand;
    request.car_model = this.insurance_information.vehicleModel;
    request.car_description = this.insurance_information.vehicleDescription;
    request.carprice_id = this.insurance_information.carprice_id;
    request.car_color = 'ROJO';
    request.car_license_plate = '';

    if (this.subsc1) {
      this.subsc1.unsubscribe();
    }
    if (this.subsc2 && this.subsc2.length) {
      for (let entry of this.subsc2)
        entry.unsubscribe();
    }
    this.subsc1 = this.httpService.getAllInsuranceCompanies().subscribe(res => {
      if (res.status == 200) {
        let insurances = res.data;
        //console.log(insurances);
        this.cant_insurances = insurances.length;
        for (let entry of insurances) {
          request.insurancecompany_id = entry.id;
          this.subsc2.push(
            this.httpService.getInsuranceInformation(request).subscribe(resp => {
              this.cont_insurances = this.cont_insurances + 1;
              //console.log(resp);
              if (res.status == 200) {
                //element.scrollIntoView({ behavior: 'smooth' });
                if (resp.data && resp.data.aseguradoras.length > 0) {
                  if (this.can_access_vehicleInsurance) {
                    this.can_access_vehicleInsurance_userSelected.clear()
                  }
                  //console.log(resp.data.aseguradoras[0]);
                  this.can_access_vehicleInsurance.push(resp.data.aseguradoras[0]);
                  this.can_access_vehicleInsurance.forEach((o, i) => {
                    const control = new FormControl(false);
                    (this.insuranceform.controls.can_access_vehicleInsurance_userSelected as FormArray).push(control);
                  });
                }
              } else {
                console.log(res);
                console.log('Ah ocurrido un error!' + res.message);
              }
            }, error => {
              console.log('error');
              console.log(error);
            })
          );
        }

      } else {
        console.log(res);
        console.log('Ah ocurrido un error!' + res.message);
      }
    }, error => {
      console.log('error');
      console.log(error);
    });

  }

  /**
   * Get entity names for summary
   * @return {void} Nothing
  */
  getEntityNames() {

    this.insurance_entities = ``;

    const selectedInsurancesIds = this.insuranceform.value.can_access_vehicleInsurance_userSelected
      .map((v, i) => v ? this.can_access_vehicleInsurance[i].idaseguradora : null)
      .filter(v => v !== null);


    for (let entry of selectedInsurancesIds) {
      let aux = this.can_access_vehicleInsurance.find(x => x.idaseguradora == entry);
      this.insurance_entities += aux.name + ' - ' + aux.nombre_corto + ', ';
    }

  }

  /**
   * Validate results credit form
   * @return {void} Nothing
  */
  onSubmitInsuranceForm() {
    if (this.cantInsurnaceUserSelected > 0) {

      this.getEntityNames();

      const selectedVehicleInsurance = this.insuranceform.value.can_access_vehicleInsurance_userSelected
        .map((v, i) => v ? this.can_access_vehicleInsurance[i].id : null)
        .filter(v => v !== null);

      let insurance_selected: Insurance[] = [];

      for (let entry of selectedVehicleInsurance) {
        let aux = this.can_access_vehicleInsurance.find(x => x.id == entry);
        let insurance: Insurance = {} as Insurance;
        insurance.id_insurancecompany = aux.id_insurance_entity;
        insurance.anual_fee = aux.total_premium;
        insurance_selected.push(insurance);
      }

      let insurance_options: any = {
        insurance_selected: insurance_selected,
        insurance_entities : this.insurance_entities
      }

      /** Store credit information in localStorage*/      
      localStorage.setItem('insurance_options', JSON.stringify(insurance_options));
      this.router.navigate(['insurance/results/identification']);
    } else {
      alert(`seleccione al menos una opción de seguro`);
    }
  }

}
