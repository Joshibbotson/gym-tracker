import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

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
  // replace with an env variable for production build.
  private readonly apiUrl: string = 'http://localhost:8888';
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
        console.log('login res:', res);
        this.setUserInLocalStorage(res);
        this.user.set(res);
      }),
      catchError((err) => {
        console.log('error at login:', err);
        this.logout();
        return of(err);
      })
    );
  }
}
