import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service'; //authentication service
import { Subscription } from 'rxjs';                                                  //suscription to login
import { Router } from '@angular/router';
import { RouterExtService } from 'src/app/services/client/routing.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    /**
     * Represents the component of the header module
     * @constructor
     * @param {Router} router - Routing service
     * @param {BsModalService} modalService - Modal administration service
     * @param {AuthenticationService} authenticationService - Authentication service for user data
    */
    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private routerExtService: RouterExtService
    ) { }

    isCollapsed = true;
    isCollapsedMovile = true;

    /**
     * Variable to open or close the navbar
     * @type {boolean}
    */
    navbarOpen: boolean = false;

    /**
     * Variable to sign out
     * @type {Subscription}
    */
    private subscription: Subscription;

    /**
     * Variable to store user information
     * @type {any}
    */
    public user: any;

    public animated: boolean = false;

    ngOnInit() {

    }

    /**
     * Animated navbar with window size
     * @returns {void} - Nothing
    */
    ngDoCheck() {
        if (window.innerWidth <= 768) {
            this.animated = true;
        } else {
            this.animated = false;
        }
    }

    /**
     * Animated navbar with window size
     * @returns {void} - Nothing
    */
    // ngAfterContentChecked(){
    //     if (window.innerWidth <= 768) {
    //         this.animated = true;
    //     }else{
    //         this.animated = false;
    //     }
    // }

    /**
     * Animated navbar with window size
     * @returns {void} - Nothing
    */
    // ngAfterViewChecked(){
    //     if (window.innerWidth <= 768) {
    //         this.animated = true;
    //     }else{
    //         this.animated = false;
    //     }
    // }

    /**
     * Open or close the navbar
     * @returns {void} - Nothing
    */
    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }

    /**
     * Allows to open and close the login modal
     * @param {string} redirect - Route to go at login
     * @param {boolean} isloginVerified - Check if you are logged in
     * @returns {void} - Nothing
    */
    goTologin() {
        this.router.navigate(['/login']);
    }

    /**
     * Lets you log out
     * @param {string} redirect - Route to go at login
     * @returns {void} - Nothing
    */
    onLoggedout() {

        if (this.router.url.includes('/tracking')) {
            this.router.navigate(['/']);
        } else {
            this.router.navigate([this.router.url]);
        }

        this.authService.logOut();
        this.closeSubscriptions();
        console.log('Ha finalizado sesión!');
        this.authService.functionClearUserData();
        //this.router.navigate([this.router.url]);
    }

    /**
     * Closes suscriptions
     * @returns {void} - Nothing
    */
    closeSubscriptions() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    /**
     * Check if the user is logged in
     * @return {boolean} True if you are logged in, false if not
    */
    loginVerified(): Boolean {
        let accessToken = localStorage.getItem('currentUser');
        if (accessToken) {
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            return true;
        }
        return false;
    }

    collapse(){
        if(this.isCollapsed){
            this.isCollapsed = this.isCollapsed;
        }else{
            this.isCollapsed = !this.isCollapsed;
        }
    }

    collapseMovile(){
        if(this.isCollapsedMovile){
            this.isCollapsedMovile = this.isCollapsedMovile;
        }else{
            this.isCollapsedMovile = !this.isCollapsedMovile;
        }
    }
}
