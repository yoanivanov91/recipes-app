import { inject, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BackNavigationService } from '../services/back-navigation.service';


@Injectable({
  providedIn: 'root'
})
export class GuestsOnlyGuard implements CanActivate {

  private router = inject(Router);
  private authService = inject(AuthService);
  private navigate = inject(BackNavigationService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.getUserAsValue();
    if (user) {
      // this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      this.navigate.back();
      return false;
    }
    
    return true;
  }

}