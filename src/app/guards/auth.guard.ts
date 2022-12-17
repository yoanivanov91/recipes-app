import { inject, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const user = this.authService.getUserAsValue();
    if (user) {
        return true;
    }

    return this.authService.fetchUserOnStart().pipe(map(user => {
      if(user) {
        return true;
      }
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false; 
    }))
  }

}