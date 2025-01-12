import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  route = inject(Router);

  loading = signal<boolean>(false);
  $destroy = new Subject<void>();

  loginForm = new FormGroup({
    email: new FormControl({ value: '', disabled: this.loading() }, [
      Validators.required,
    ]),
    password: new FormControl({ value: '', disabled: this.loading() }, [
      Validators.required,
    ]),
  });
  ngOnInit(): void {}

  handleLogin(): void {
    const { email, password } = this.loginForm.value;

    if (email?.length && password?.length) {
      this.loading.set(true);
      this.authService
        .login({ email, password })
        .pipe(takeUntil(this.$destroy))
        .subscribe({
          next: () => {
            this.route.navigate(['/']);
          },
          error: (err) => console.log('err:', err),
          complete: () => this.loading.set(false),
        });
    }
  }
}
