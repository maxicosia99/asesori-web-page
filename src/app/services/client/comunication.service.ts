import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {

  private informationSource = new BehaviorSubject(null);
  currentInformation = this.informationSource.asObservable();

  constructor() { }

  changeInfomation(information: any) {
    this.informationSource.next(information);
  }

}