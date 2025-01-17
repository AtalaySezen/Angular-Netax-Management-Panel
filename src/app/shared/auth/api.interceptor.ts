import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable, catchError, finalize } from 'rxjs';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService);
    const loaderService = inject(LoaderService);
    const token = authService.token; //Auth.service.ts üzerinden tokeni alır.

    if (!request.url.includes('auth/login')) {
        if (token) {
            loaderService.setLoading(true, request.url); //API isteği başlayınca loader gözükür.
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
    } else {
        if (!/^(http|https):/i.test(request.url)) {
            request = request.clone({
                url: environment.apiUrl + request.url,
            });
        }
    }

    return next(request).pipe(
        catchError((err: HttpErrorResponse) => {
            // Eğer kullanıcı authenticated olmamışsa çıkış yap.
            if (err.status === 401 || err.status === 0) {
                authService.LogOut();
            } else {
                console.error('HTTP Error:', 'Hata Oluştu');
            }
            return new Observable<HttpEvent<any>>(observer => {
                observer.error(err);
                observer.complete();
            });
        }),
        finalize(() => {
            loaderService.setLoading(false); //API isteği bitince loader kapanır.
        })
    );
};