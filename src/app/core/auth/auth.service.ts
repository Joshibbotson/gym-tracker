import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

export type LoginConfig = {
  email: string;
  password: string;
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

  getUserFromLocalStorage(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user) as User;
      this.user.set(parsedUser);
    } else {
      this.user.set(null);
    }
  }

  setUserInLocalStorage(user: User): void {
    const stringifiedUser = JSON.stringify(user);
    localStorage.setItem('user', stringifiedUser);
    this.user.set(user);
  }

  public login(query: LoginConfig): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, query);
  }

  public logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, {});
  }
}
