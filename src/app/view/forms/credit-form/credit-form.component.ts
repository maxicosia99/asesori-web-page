import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/client/comunication.service';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-credit-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.scss']
})
export class CreditFormComponent implements OnInit {

  //credit_information: any;

  credit_information: any = {
    amountRequest:50000,
    monthlyIncome:150,
    entryAmount: 250,
    term: 144,
    region_code: 'A',
    entityType: 0,
    id_credit: 11 
  }

  constructor(
    private dataService: DataService,
    private httpService: HttpClientService,
    private formbuilder: FormBuilder,
  ) { }

  /**
   * Variables to store credit results
   * @type {any}
  */
  public creditOptions: any;        //all credit options
  public can_access_credit: any;    //financial institutions where you can get credit
  public cannot_access_credit: any; //financial institutions where you cannot obtain credit
  public credit_unavailable: any;   //financial institutions where credit is not available

  /**
  * Variable to store the amount of results chosen by the user
  * @type {number}
 */
  public cantSelectedCreditOptions: number = 0;

  /**
   * Define credit form
  */
  creditform = this.formbuilder.group({
    can_access_credit_userSelected: new FormArray([]),
    cannot_access_credit_userSelected: new FormArray([]),
    filter: '0'
  });


  /**
   * Get variable to store the results of credits selected by the user
   * @return {FormArray} Values where the user can obtain the credit
  */
  get can_access_credit_userSelected(): FormArray {
    return this.creditform.get('can_access_credit_userSelected') as FormArray;
  }

  /**
   * Get variable to store the results of credits selected by the user
   * @return {FormArray} Values where the user cannot obtain the credit
  */
  get cannot_access_credit_userSelected(): FormArray {
    return this.creditform.get('cannot_access_credit_userSelected') as FormArray;
  }

  /**
   * Add checkbox of can access credit options
   * @return {void} Nothing
  */
  private addCheckboxesCan_access_credit() {
    this.can_access_credit.forEach((o, i) => {
      const control = new FormControl(false);
      (this.creditform.controls.can_access_credit_userSelected as FormArray).push(control);
    });
  }

  /**
   * Add checkbox of cannot access credit options
   * @return {void} Nothing
  */
  private addCheckboxesCannot_access_credit() {
    this.cannot_access_credit.forEach((o, i) => {
      const control = new FormControl(false);
      (this.creditform.controls.cannot_access_credit_userSelected as FormArray).push(control);
    });
  }

  /**
   * Count credit selected options
   * @return {void} Nothing
  */
  cantSelectedUser() {
    this.cantSelectedCreditOptions =
      this.creditform.value.can_access_credit_userSelected
        .map((v, i) => v ? this.can_access_credit[i].id : null)
        .filter(v => v !== null).length +
      this.creditform.value.cannot_access_credit_userSelected
        .map((v, i) => v ? this.cannot_access_credit[i].id : null)
        .filter(v => v !== null).length;
  }

  ngOnInit() {
    //this.dataService.currentInformation.subscribe(information => this.credit_information = information);

    this.httpService.getAllCreditOptions(this.credit_information.region_code, this.credit_information.entityType, this.credit_information.id_credit, this.credit_information.amountRequest, this.credit_information.monthlyIncome, this.credit_information.term, this.credit_information.entryAmount).subscribe(res => {
      if (res.status == 200) {

        if (this.can_access_credit) {
          this.can_access_credit_userSelected.clear()
        }

        if (this.cannot_access_credit) {
          this.cannot_access_credit_userSelected.clear()
        }

        this.creditOptions = res.data;
        this.can_access_credit = res.data.can_access_credit;
        this.cannot_access_credit = res.data.cannot_access_credit;
        this.credit_unavailable = res.data.credit_unavailable;
        this.addCheckboxesCan_access_credit();
        this.addCheckboxesCannot_access_credit();

      } else {
        console.log('Ah ocurrido un error!' + res.message);
      }
    }, error => {
      console.log('error');
      console.log(error);
    });

  }


  /**
   * Filter credit options (all)
   * @return {void} Nothing
  */
 todos() {
  console.log(`todos`);
}

/**
 * Filter credit options (bank)
 * @return {void} Nothing
*/
bancos() {
  console.log(`bancos`);
}

/**
 * Filter credit options (cooperative)
 * @return {void} Nothing
*/
cooperativas() {
  console.log(`cooperativas`);
}

}
