import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/client/http-client.service';
import { UserInfo } from 'src/app/models/user-info';
import { ICreditAplication } from 'src/app/data/interfaces/icredit-application.metadata';
import { CREDITAPLICATIONS_DATA_ITEMS } from 'src/app/data/constants/credit-applications.const';

@Component({
  selector: 'app-user-tracking',
  templateUrl: './user-tracking.component.html',
  styleUrls: ['./user-tracking.component.scss']
})
export class UserTrackingComponent implements OnInit {

  constructor(
    private httpService: HttpClientService,
    // private formbuilder: FormBuilder,
    // private router: Router,
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

  // public credit_data: any[];
  public credit_data: ICreditAplication[] = CREDITAPLICATIONS_DATA_ITEMS;

  ngOnInit() {

    // this.recuperateLoginData();

  }

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
        this.httpService.getInformationCredits().subscribe(res => {
          this.credit_data = res.data;
          console.log(res.data);
        }, error => {
          console.log('error');
          console.log(error);
        });

      }, (error) => {
        console.log(error);
      });
    }
  }

}
