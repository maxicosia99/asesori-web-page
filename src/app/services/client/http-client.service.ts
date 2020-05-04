import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuth } from '../../models/userAuth';
import { UserRegister } from 'src/app/models/user-register';
import { CarInsuranceRequest } from 'src/app/models/car-insurance-request';
import { InsuranceInformation } from 'src/app/models/insurance-information';
import { CreditInformation } from 'src/app/models/credit-information';
import { CreditFee } from 'src/app/models/credit-fee';

/*
* Variable para adicionar información a las peticiones
*/
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  //private SEVER_URL: string = 'http://10.101.214.140:8080';
  private SEVER_URL: string = 'https://asesori-server.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

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

  /**------------------------------------------------LOGIN------------------------------------------------------------- */

  public login(user: UserAuth): Observable<any> {
    let url = this.getEndUrl('/api/v1/auth/signinClient');
    return this.doPostRequest(url, user);
  }

  public register(user: UserAuth): Observable<any> {
    let url = this.getEndUrl('/api/v1/auth/signupClient');
    return this.doPostRequest(url, user);
  }

  public getDataUserlogin(): Observable<any> {
    let url = this.getEndUrl('/api/v1/user/me');
    return this.doGetRequest(url);
  }

  /**---------------------------------------------UBICACION---------------------------------------------------------- */

  /*  Start - Search by location. */
  getCurrentLocation(): Observable<any> {
    let url = `https://ipapi.co/json/`;
    return this.doGetRequest(url);
  }

  /* Get provinces - cities */
  getProvinces(): Observable<any> {
    let url = this.getEndUrl(`/api/v1/provinces`);
    return this.doGetRequest(url);
  }

  getCities(idProvince: number): Observable<any> {
    let url = this.getEndUrl(`/api/v1/provinces/${idProvince}/cities`);
    return this.doGetRequest(url);
  }
  /* End - Get provinces - cities  */

  verifyProvinceExistence(region_code: string): Observable<any> {
    let url = this.getEndUrl(`/api/v1/provinces/checkExistence?region_code=${region_code}`);
    return this.doGetRequest(url);
  }
  /*  End - Search by location. */

  /**----------------------------------------CREDITOS------------------------------------------------------------ */

  /* Get all credit options  */
  getAllCreditOptions(body: CreditFee): Observable<any> {
    let url = this.getEndUrl(`/api/v1/credits/creditFee`);
    return this.doPostRequest(url,body);
  }
  /* End - Get all credit options  */


  /* Get credit informaction by id  */
  getInformationCreditByid(idCredit: number): Observable<any> {
    let url = this.getEndUrl(`/api/v1/credits/${idCredit}/terms`);
    return this.doGetRequest(url);
  }
  /* End - Get credit informaction by id  */

  createCreditInformation(body: CreditInformation): Observable<any> {
    //console.log(JSON.stringify(body));
    let url = this.getEndUrl(`/api/v1/creditApplications`);
    return this.doPostRequest(url, body);
  }

  linkUserOnRequest(idCreditRequest: number): Observable<any> {
    //console.log(JSON.stringify(body));
    let url = this.getEndUrl(`/api/v1/creditApplications/${idCreditRequest}/linkUserOnRequest`);
    return this.doPutRequest(url);
  }


  /* ---------------------------------  SEGUROS DE VEHICULOS ------------------------------ */

  getAllCarBrands(): Observable<any> {
    let url = this.getEndUrl(`/api/v1/cars/categories/1/brands`);
    return this.doGetRequest(url);
  }

  getYearByBrand(id_brand: number): Observable<any> {
    let url = this.getEndUrl(`/api/v1/cars/brands/${id_brand}/years`);
    return this.doGetRequest(url);
  }

  getModelByYear(brandId: number, year: number): Observable<any> {
    let url = this.getEndUrl(`/api/v1/cars/brands/${brandId}/years/${year}/models`);
    return this.doGetRequest(url);
  }

  getDescriptionByModel(id_model: number, id_brand: number, year: number, ): Observable<any> {
    let url = this.getEndUrl(`/api/v1/cars/brands/${id_brand}/years/${year}/models/${id_model}/descriptions`);
    return this.doGetRequest(url);
  }

  getAllInsuranceCompanies(): Observable<any> {
    let url = this.getEndUrl(`/api/v1/insurances/companies`);
    return this.doGetRequest(url);
  }

  getInsuranceInformation(body: CarInsuranceRequest): Observable<any> {
    let url = this.getEndUrl(`/api/v1/insurances/carInsuranceFee`);
    return this.doPostRequest(url, body);
  }

  createInsuranceInformation(body: InsuranceInformation): Observable<any> {
    let url = this.getEndUrl(`/api/v1/insuranceApplications`);
    return this.doPostRequest(url, body);
  }

  getSendMailInsurance(): Observable<any> {
    let url = this.getEndUrl(`/api/seguros/test`);
    return this.doGetRequest(url);
  }

  /* -------------------------- SEGUIMIENTO DE USUARIO A LOS CRÉDITO ------------------------ */

  getInformationCredits(): Observable<any> {
    let url = this.getEndUrl(`/api/v1/creditApplications`);
    return this.doGetRequest(url);
  }

  getEntityByCreditId(creditapplication_id: number): Observable<any> {
    let url = this.getEndUrl(`/api/v1/creditApplications/${creditapplication_id}/financialEntities`);
    return this.doGetRequest(url);
  }

}
