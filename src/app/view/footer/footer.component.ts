import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service'; //authentication service
import { Subscription } from 'rxjs';                                                  //suscription to login
import { BsModalService, BsModalRef } from 'ngx-bootstrap';                           //modal service
import { LoginComponent } from 'src/app/view/login/login.component';                  //call login


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

    constructor(
        private modalService: BsModalService,         //modal service
        private authService: AuthenticationService,   //authentication service
    ) { }

    ngOnInit() {
    }

    /* Modal methods */
    message: string;
    modalRef: BsModalRef;

    openModal() {
        // const initialState = {
        //   information : {
        //     username: 'bryan',
        //     password: 'bryan123'
        //   },
        // };
        //this.modalRef = this.modalService.show(LoginComponent, { initialState });
        this.modalRef = this.modalService.show(LoginComponent);
        this.modalRef.setClass('modal-dialog-centered');
        this.modalRef.content.closeBtnName = 'Close';
      }

    /* ON LOGGED OUT */

    private subscription: Subscription;
    private intervalSub: Subscription;
    public user: any;

    onLoggedout() {
        this.authService.logOut();
        this.closeSubscriptions();
        console.log('Ha finalizado sesión!')
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

    /* END - ON LOGGED OUT */
}
