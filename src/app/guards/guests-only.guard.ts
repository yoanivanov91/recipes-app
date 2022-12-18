import { inject, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class GuestsOnlyGuard implements CanActivate {

  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const user = this.authService.getUserAsValue();
    if (user) {
      this.router.navigate(['/']);
      return false;
    }

    return this.authService.fetchUserOnStart().pipe(map(user => {
      if(user) {
        this.router.navigate(['/']);
        return false; 
      }
      return true;
    }))
  }

}