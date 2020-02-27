import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuth } from '../../models/userAuth';
import { UserRegister } from 'src/app/models/user-register';

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

  //private SEVER_URL: string = 'http://10.101.214.140:8080';
  private SEVER_URL: string = 'https://asesori-server-demo.herokuapp.com';

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
    let url = this.getEndUrl('/api/auth/signinClient');
    return this.doPostRequest(url, user);
  }

  public register(userRegister: UserRegister): Observable<any> {
    let url = this.getEndUrl('/api/auth/signupClient');
    return this.doPostRequest(url, userRegister);
  }

  public getDataUserlogin(): Observable<any> {
    let url = this.getEndUrl('/api/v1/user/me');
    return this.doGetRequest(url);
  }

  /*  Start - Search by location. */
  getCurrentCity(): Observable<any> {
    let url = `https://ipapi.co/json/`;
    return this.doGetRequest(url);
  }
  /*  End - Search by location. */

  /* Get all credit options  */
  getAllCreditOptions(region_name: string, entityType: number, id_credit: number, loan_amount: number, montly_income: number, credit_term: number, initial_amount: number): Observable<any> {
    let url;

    if (entityType === undefined) {
      entityType = 0;
    }

    if (initial_amount === null || initial_amount === 0) {
      url = this.getEndUrl(`/api/creditos/calcularCuota?id_credit=${id_credit}&loan_amount=${loan_amount}&montly_income=${montly_income}&credit_term=${credit_term}&type=${entityType}&region_name=${region_name}`);
    } else {
      url = this.getEndUrl(`/api/creditos/calcularCuota?id_credit=${id_credit}&loan_amount=${loan_amount}&montly_income=${montly_income}&credit_term=${credit_term}&initial_amount=${initial_amount}&type=${entityType}&region_name=${region_name}`);
    }

    return this.doGetRequest(url);
  }
  /* End - Get all credit options  */

}
