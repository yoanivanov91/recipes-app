import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: String, password: String) {
    // return this.http.post<User>('/api/login', {email, password}).shareReplay();
  }
}
