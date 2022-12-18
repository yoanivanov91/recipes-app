import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, EMPTY, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environment/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private toast = inject(ToastrService);

  private readonly api_url = environment.api_url;
  private readonly options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  private user = new BehaviorSubject<User | null>(null);

  public register(user: User) {
    return this.http
      .post<User>(`${this.api_url}/users/register`, user, this.options)
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('token', JSON.stringify(user.token));
            this.user.next(user);
            return user;
          }
          return null;
        })
      );
  }

  public login(email: String, password: String) {
    return this.http
      .post<User>(
        `${this.api_url}/users/login`,
        { email, password },
        this.options
      )
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('token', JSON.stringify(user.token));
            this.user.next(user);
            return user;
          }
          return null;
        })
      );
  }

  public logout() {
    localStorage.removeItem('token');
    this.user.next(null);
  }

  public fetchUserOnStart() {
    const token = this.getToken();
    if (token) {
      return this.http.get<User>(`${this.api_url}/users/me`, this.options).pipe(
        map((user) => {
          if (user) {
            this.user.next(user);
            return user;
          }
          this.user.next(null);
          return this.getUserAsValue();
        })
      );
    }
    return of(null);
  }

  public getUser() {
    return this.user.asObservable();
  }

  public getUserAsValue() {
    return this.user.getValue();
  }

  public getToken() {
    return JSON.parse(<string>localStorage.getItem('token'));
  }
}
