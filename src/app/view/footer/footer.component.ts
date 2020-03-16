import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service'; //authentication service
import { Subscription } from 'rxjs';                                                  //suscription to login
import { BsModalService, BsModalRef } from 'ngx-bootstrap';                           //modal service
import { LoginComponent } from 'src/app/view/login/login.component';                  //call login
import { Router } from '@angular/router';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

    constructor(
        private router: Router,
        private modalService: BsModalService,         //modal service
        private authService: AuthenticationService,   //authentication service
    ) { }

    ngOnInit() {
    }

    /* Modal methods */
    message: string;
    modalRef: BsModalRef;

    openModal(redirect: string, isloginVerified: boolean) {

        if (!isloginVerified) {
            redirect = this.router.url;
        }

        const initialState = {
            redirect: redirect
        };
        
        this.modalRef = this.modalService.show(LoginComponent, { initialState });
        this.modalRef.setClass('modal-dialog-centered');
        this.modalRef.content.closeBtnName = 'Close';
    }

    /* ON LOGGED OUT */

    private subscription: Subscription;
    private intervalSub: Subscription;
    public user: any;

    onLoggedout(redirect: string) {

        // if (this.router.url === '/stepper') {
        //     redirect = '/';
        // } else {
        //     redirect = this.router.url;
        // }

        redirect = this.router.url;
        this.authService.logOut();
        this.closeSubscriptions();
        console.log('Ha finalizado sesión!');
        this.authService.functionClearUserData();
        this.router.navigate([redirect]);
    }

    closeSubscriptions() {
        if (this.subscription)
            this.subscription.unsubscribe();
        if (this.intervalSub)
            this.intervalSub.unsubscribe();
    }

    loginVerified(): Boolean {
        let accessToken = localStorage.getItem('currentUser');
        if (accessToken) {
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            return true;
        }
        return false;
    }

    loginValidated(redirect: string) {
        if (!this.loginVerified()) {
            this.openModal(redirect, true);
        } else {
            this.router.navigate([redirect]);
        }
    }

    /* END - ON LOGGED OUT */
}
