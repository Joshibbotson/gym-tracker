import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService, User } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  destroy$ = new Subject<void>();
  user = signal<User | null>(null);

  ngOnInit(): void {
    this.user.set(this.authService.User);
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
