import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/client/comunication.service';

@Component({
  selector: 'app-insurance-form',
  templateUrl: './insurance-form.component.html',
  styleUrls: ['./insurance-form.component.scss']
})
export class InsuranceFormComponent implements OnInit {

  insurance_information:any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.currentInformation.subscribe(information => this.insurance_information = information);
    console.log(this.insurance_information);

  }

}
