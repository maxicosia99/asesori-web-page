//import { AlertService } from './../alerts/alert.service';
import { HttpClientService } from './../client/http-client.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserInfo } from './../../models/user-info';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService implements OnDestroy {

  private subscription: Subscription;
  currentUser$: Subject<UserInfo> = new Subject<UserInfo>();

  constructor(
    private httpService: HttpClientService,
    private router: Router,
    //private alertService: AlertService
    ) { }

  // logOut() {
  //   localStorage.removeItem('username')
  // }

  getCitas() {
    
  }

  // login(username: string, password: string) {
  //   let user: UserAuth = {usernameOrEmail: username, password: password}
    
  //   return this.http.post<any>(`${this.SEVER_URL}/api/auth/signin`, {"usernameOrEmail": username, "password": password})
    
  //       // this is just the HTTP call, 
  //       // we still need to handle the reception of the token
  //       .pipe(tap(res => {
  //         console.log('RESPUESTA');
  //         console.log(res);
  //         this.setSession(res);
  //       }), // handles the auth result
  //       shareReplay()); // prevents the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.
  // }

  // login(username: string, password: string) {
  //   let user: UserAuth = {usernameOrEmail: username, password: password}
  //   this.httpService.login(user).subscribe((response) => {
  //     console.log(response);  
  //     this.setSession(response);
  //   }, (error) => {
  //     console.log("Servidor no disponible");  
  //     console.log("error es: "+error);  
  //   });
  // }

  // public login(username: string, password: string): Observable<any> {
  //   let user: UserAuth = {usernameOrEmail: username, password: password}
  //   return this.httpService.login(user);
  // }


  public setSession(authResult) {
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('currentUser', JSON.stringify(authResult));
    this.router.navigate(['/']);

    //console.log("resultado----:");
    //console.log();

    /*this.subscription = this.httpService.getDataUserlogin().subscribe((response: UserInfo) => {
      console.log(response);
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.currentUser$.next(response);
      this.router.navigate(['/']);
    }, (error) => {
      this.logOut();
      console.log(error);
    });*/

    // this.http.get(`${this.SEVER_URL}/api/user/me`)
    //   .pipe(first())
    //   .subscribe((user: UserInfo) => {
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.currentUser$.next(user);
    //   },
    //     error => {
    //       console.log(error);
    //   });
  }

  redirectInternalServerError () {
    this.router.navigate(['/500']);
  }

  logOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.currentUser$.next(undefined);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

  // register(user : UserInfo) {
  //   return this.http.post(`${this.SEVER_URL}/api/auth/signup`, user);
  // }

  // getUserProfile(username): any {
  //   return this.http.get(`${this.SEVER_URL}/api/users/${username}`);
  // }

  // getCurrentUser(): UserInfo {
  //   return JSON.parse(localStorage.getItem('currentUser')) as UserInfo;
  // }

}
