import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  destroy$ = new Subject<void>();

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
