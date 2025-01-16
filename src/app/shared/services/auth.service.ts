import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Auth, AuthData } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  userRole: string;
  authLocalStorageToken = `${environment.appVersion}-${environment.APP_KEY}`;

  Login(username: string, password: string): Observable<Auth<AuthData>> {
    return this.http.post<Auth<AuthData>>(environment.apiUrl + 'auth/login',
      {
        username: username,
        password: password
      }
    )
  }

  TokenIsValid(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'auth/me');
  }

  get token() {
    const token = localStorage.getItem(`${this.authLocalStorageToken}-token`);
    if (token != null) {
      return token;
    } else {
      return '';
    }
  }

  async CheckTokenIsValid(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.TokenIsValid().subscribe({
        next: (data) => {
          this.userRole = data.role;
          resolve(true);
        },
        error: (err) => {
          this.LogOut();
          reject(false);
        },
      });
    });
  }

  async GuardAuth(): Promise<boolean> {
    if (this.token != '') {
      this.CheckTokenIsValid();
      return true;
    } else {
      await this.LogOut();
      return await false;
    }
  }

  SetLocalStorageToken(userToken: string) {
    localStorage.setItem(`${this.authLocalStorageToken}-token`, userToken);
  }

  LogOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
