import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-request',
  templateUrl: './detail-request.component.html',
  styleUrls: ['./detail-request.component.scss']
})
export class DetailRequestComponent implements OnInit {

  constructor(
    private httpService: HttpClientService,
    private route: ActivatedRoute
  ) { }

  isCollapsed = true;
  public entity_data: any[];

  ngOnInit() {

    this.httpService.getEntityByCreditId(+(this.route.snapshot.paramMap.get('id'))).subscribe(res => {
      // this.newSteps = [];
      // this.entityName = null;
      this.entity_data = res.data;
      console.log(res.data);
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

}
