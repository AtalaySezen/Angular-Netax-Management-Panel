import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Auth, AuthData, user } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  authLocalStorageToken = `${environment.appVersion}-${environment.APP_KEY}`;

  Login(username: string, password: string): Observable<Auth<AuthData>> {
    return this.http.post<Auth<AuthData>>(environment.apiUrl + 'auth/login',
      {
        username: username,
        password: password
      }
    )
  }

  SetLocalStorageToken(user: user) {
    localStorage.setItem(`${this.authLocalStorageToken}-token`, user.accessToken);
    localStorage.setItem(`${this.authLocalStorageToken}-userId`, user.id.toString());
  }

  LogOut() {
    localStorage.removeItem(`${this.authLocalStorageToken}`);
    this.router.navigate(['/login']);
  }

}
