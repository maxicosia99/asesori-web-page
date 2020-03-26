import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service'; //authentication service
import { Subscription } from 'rxjs';                                                  //suscription to login
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

    /**
     * Represents the component of the footer module
     * @constructor
     * @param {Router} router - Routing service
     * @param {BsModalService} modalService - Modal administration service
     * @param {AuthenticationService} authenticationService - Authentication service for user data
    */
    constructor(
        private router: Router,
        private authService: AuthenticationService,
    ) { }

    ngOnInit() {
    }

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
}
