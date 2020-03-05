import { HttpClientService } from './../../services/client/http-client.service';
import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/auth/authentication.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Subscription, Observable, interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy{
  
  //public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  private subscription: Subscription;
  private intervalSub: Subscription;
  public elementsNotReady: number = 0;
  private secondes;

  constructor(
    private authService: AuthenticationService, 
    private httpService: HttpClientService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  onLoggedout() {
    this.authService.logOut();
    this.closeSubscriptions();
    this.router.navigate(['login']);
    //this.toastr.success("You're successfully logged out.", "Polling App");
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
    this.closeSubscriptions();
  }

  closeSubscriptions() {
    if(this.subscription)
      this.subscription.unsubscribe();
    if(this.intervalSub)
      this.intervalSub.unsubscribe();
  }
}
