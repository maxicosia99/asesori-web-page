import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder              //form service
  ) { }

  ngOnInit() {
  }

  myForm = this.formbuilder.group({
    radio: '0'
  });

  todos(){
    console.log(`todos`);
  }

  bancos(){
    console.log(`bancos`);
  }

  cooperativas(){
    console.log(`cooperativas`);
  }

}
