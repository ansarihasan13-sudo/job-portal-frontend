import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data['role'];
    const userRole = this.authService.getRole();

    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    if (userRole === expectedRole) {
      return true;
    }

    // Smart redirect based on actual role
    switch (userRole) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'EMPLOYER':
        this.router.navigate(['/employer']);
        break;
      case 'JOB_SEEKER':
        this.router.navigate(['/jobs']);
        break;
      default:
        this.router.navigate(['/login']);
    }

    return false;
  }
}