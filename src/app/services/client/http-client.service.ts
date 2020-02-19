import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuth } from '../../models/userAuth';

/*
* Variable para adicionar información a las peticiones
*/ 
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private SEVER_URL: string = 'https://asesori-creditrequest-server.herokuapp.com';
  //private SEVER_URL: string = 'http://192.168.137.225:8001';

  constructor(private httpClient:HttpClient) { }

  private getEndUrl(endPoint: string): string {
    return `${this.SEVER_URL}${endPoint}`;
  }

  private doGetRequest(url: string): Observable<any> {
    console.log('Enviando HTTP GET: ' + url);
    return this.httpClient.get(url, httpOptions);
  }

  private doPostRequest(url: string, body: any = null, requestOptions: HttpHeaders = null): Observable<any> {
    console.log('Enviando HTTP POST: ' + url);
    return this.httpClient.post(url, body, httpOptions);
  }

  private doPutRequest(url: string) {
    console.log('Enviando HTTP GET: ' + url);
    return this.httpClient.put(url, httpOptions);
  }

  private doDeleteRequest(url: string) {

  }

  public testConnection(url: string = null): Observable<any> {
    return this.doGetRequest(url + "/test");
  }

  public login(user: UserAuth): Observable<any> {
      let url = this.getEndUrl('/api/v1/auth/signIn');
      return this.doPostRequest(url, user);
  }

  public getDataUserlogin(): Observable<any> {
    let url = this.getEndUrl('/api/v1/user/me');
    return this.doGetRequest(url);
  }

  checkUsernameAvailability(username: string): Observable<any> {
    let url = this.getEndUrl(`/api/user/checkUsernameAvailability?username=${username}`);
    return this.doGetRequest(url);
  }

  checkEmailAvailability(email: string): Observable<any> {
    let url = this.getEndUrl(`/api/user/checkEmailAvailability?email=${email}`);
    return this.doGetRequest(url);
  }
  
  /* Get Financial Request */
  getAllFinancialRequest(user_id: number): Observable<any> {
    let url = this.getEndUrl(`/api/v1/credit-applications/findapplications?user_id=${user_id}`);
    return this.doGetRequest(url);
  }
  /* End - Get Financial Request */

  /* Put Update Status Financial Request */
  updateStatusFinancialRequest(application_id: number): Observable<any> {
    let url = this.getEndUrl(`/api/v1/credit-applications/putreaded?application_id=${application_id}`);
    return this.doPutRequest(url);
  }
  /* End - Put Update Status Financial Request */

}
