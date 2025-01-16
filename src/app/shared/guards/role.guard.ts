import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  authService = inject(AuthService)

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const expectedRoles = next.data['expectedRoles'];

    const isValidToken = await this.authService.CheckTokenIsValid();
    if (!isValidToken) {
      return false;
    }

    const userRoles = this.authService.userRole;
    return expectedRoles.includes(userRoles);
  }
}
