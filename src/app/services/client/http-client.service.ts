import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuth } from '../../models/userAuth';
import { UserRegister } from 'src/app/models/user-register';
import { CarInsuranceRequest } from 'src/app/models/car-insurance-request';
import { InsuranceInformation } from 'src/app/models/insurance-information';
import { CreditInformation } from 'src/app/models/credit-information';

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
    let url = this.getEndUrl('/api/user/me');
    return this.doGetRequest(url);
  }

  /*  Start - Search by location. */
  getCurrentLocation(): Observable<any> {
    let url = `https://ipapi.co/json/`;
    return this.doGetRequest(url);
  }

  verifyLocationExistence(region_code: string): Observable<any> {
    let url = this.getEndUrl(`/api/provincias/verificarExistenciaProvincia?region_code=${region_code}`);
    return this.doGetRequest(url);
  }

  verifyProvinceExistence(region_code: string): Observable<any> {
    let url = this.getEndUrl(`/api/provincias/buscar?region_code=${region_code}`);
    return this.doGetRequest(url);
  }
  /*  End - Search by location. */

  
  
  /* Get all credit options  */
  getAllCreditOptions(region_code: string, entityType: number, id_credit: number, loan_amount: number, montly_income: number, credit_term: number, initial_amount: number): Observable<any> {
    let url;

    if (entityType === undefined) {
      entityType = 0;
    }

    if (initial_amount === null || initial_amount === 0) {
      url = this.getEndUrl(`/api/creditos/calcularCuota?id_credit=${id_credit}&loan_amount=${loan_amount}&montly_income=${montly_income}&credit_term=${credit_term}&search_type=${entityType}&region_code=${region_code}`);
    } else {
      url = this.getEndUrl(`/api/creditos/calcularCuota?id_credit=${id_credit}&loan_amount=${loan_amount}&montly_income=${montly_income}&credit_term=${credit_term}&initial_amount=${initial_amount}&search_type=${entityType}&region_code=${region_code}`);
    }

    return this.doGetRequest(url);
  }
  /* End - Get all credit options  */


  /* Get credit informaction by id  */
  getInformationCreditByid(idCredit: number): Observable<any> {
    let url = this.getEndUrl(`/api/creditos/condiciones?idcredito=${idCredit}`);
    return this.doGetRequest(url);
  }
  /* End - Get credit informaction by id  */

  createCreditInformation(body: CreditInformation): Observable<any> {
    //console.log(JSON.stringify(body));
    let url = this.getEndUrl(`/api/creditos/guardarSolicitudCredito`);
    return this.doPostRequest(url, body);
  }

  sendCreditInformation(application_id: number): Observable<any> {
    //console.log(JSON.stringify(body));
    let url = this.getEndUrl(`/api/creditos/enviarSolicitudCredito?applicant_id=${application_id}`);
    return this.doGetRequest(url);
  }

  
  
  /* Get provinces - cities */
  getProvinces(): Observable<any> {
    let url = this.getEndUrl(`/api/provincias/findAll`);
    return this.doGetRequest(url);
  }

  getCities(idProvince: number): Observable<any> {
    let url = this.getEndUrl(`/api/ciudades/${idProvince}`);
    return this.doGetRequest(url);
  }
  /* End - Get provinces - cities  */


  /* ---------------------------------  SEGUROS DE VEHICULOS ------------------------------ */

  getAllCarBrands(): Observable<any> {
    let url = this.getEndUrl(`/api/autos/marcas?categoria=1`);
    return this.doGetRequest(url);
  }

  getYearByBrand(id_brand: number): Observable<any> {
    let url = this.getEndUrl(`/api/autos/anos?marca=${id_brand}`);
    return this.doGetRequest(url);
  }

  getModelByYear(id_model: number, year: number): Observable<any> {
    let url = this.getEndUrl(`/api/autos/modelos?marca=${id_model}&ano=${year}`);
    return this.doGetRequest(url);
  }

  getDescriptionByModel(id_model: number, id_brand: number, year: number, ): Observable<any> {
    let url = this.getEndUrl(`/api/autos/descripciones?marca=${id_brand}&ano=${year}&modelo=${id_model}`);
    return this.doGetRequest(url);
  }

  getAllInsuranceOptions(id_car: number): Observable<any> {
    let url = this.getEndUrl(`/api/seguros/buscarcuota?auto=${id_car}`);
    return this.doGetRequest(url);
  }

  getAllInsuranceCompanies(): Observable<any> {
    let url = this.getEndUrl(`/api/seguros/aseguradoras`);
    return this.doGetRequest(url);
  }

  getInsuranceInformation(body: CarInsuranceRequest): Observable<any> {
    let url = this.getEndUrl(`/api/seguros/calcular-cuota`);
    return this.doPostRequest(url, body);
  }

  createInsuranceInformation(body: InsuranceInformation): Observable<any> {
    let url = this.getEndUrl(`/api/seguros/solicitar`);
    return this.doPostRequest(url, body);
  }

  getSendMailInsurance(): Observable<any> {
    let url = this.getEndUrl(`/api/seguros/test`);
    return this.doGetRequest(url);
  }

  /* -------------------------- SEGUIMIENTO DE USUARIO A LOS CRÉDITO ------------------------ */

  getInformationCredits(user_id: number): Observable<any> {
    let url = this.getEndUrl(`/api/credittracking/findApplications?user_id=${user_id}`);
    return this.doGetRequest(url);
  }

  getEntityByCreditId(creditapplication_id: number): Observable<any> {
    let url = this.getEndUrl(`/api/credittracking/findEntitiesOfApplication?application_id=${creditapplication_id}`);
    return this.doGetRequest(url);
  }

}
