import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  loading = signal<boolean>(false);
  $destroy = new Subject<void>();

  ngOnInit(): void {
    console.log('init');
  }

  handleLogin(): void {
    const { email, password } = this.loginForm.value;

    if (email?.length && password?.length) {
      this.loading.set(true);
      this.authService
        .login({ email, password })
        .pipe(takeUntil(this.$destroy))
        .subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log('err:', err),
          complete: () => this.loading.set(false),
        });
    }
  }
}
