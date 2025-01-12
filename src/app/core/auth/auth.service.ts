import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export type LoginConfig = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  user?: User;
  validLogin: boolean;
  message?: string;
};

type User = {
  name: string;
  email: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = environment.apiUrl;
  private readonly http = inject(HttpClient);

  public user = signal<User | null>(null);

  get User(): User | null {
    return this.user();
  }

  set User(user: User) {
    this.user.set(user);
  }

  getUserFromLocalStorage(): User | null {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user) as User;
      return parsedUser;
    } else {
      return null;
    }
  }

  setUserInLocalStorage(user: User): void {
    const stringifiedUser = JSON.stringify(user);
    localStorage.setItem('user', stringifiedUser);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user.set(null);
  }

  public login(query: LoginConfig): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, query).pipe(
      tap((res) => {
        this.setUserInLocalStorage(res);
        this.user.set(res);
      }),
      catchError((err) => {
        this.logout();
        return of(err);
      })
    );
  }
}
