import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  goTologin(): void {
    this.router.navigate(['/login']);
  }

  loginVerified(): boolean {
    const accessToken = 'token';
    if (accessToken) {
      return true;
    }
    return false;
  }
}
