import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type LoginConfig = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // replace with an env variable for production build.
  private readonly apiUrl: string = 'http://localhost:8888';
  private readonly http = inject(HttpClient);

  login(query: LoginConfig): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, query, {
      withCredentials: true,
    });
  }
}
