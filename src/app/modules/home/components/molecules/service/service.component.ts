import { Component, Input } from '@angular/core';
import { Service } from '@data/interfaces';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent {
  @Input() service: Service = {
    description: '',
    id: '',
    image: '',
    title: '',
  };
}
