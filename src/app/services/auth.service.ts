import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  
  login(email: String, password: String): Observable<any> {
    return this.http.post<any>('/api/login', {email, password});
  }
}
