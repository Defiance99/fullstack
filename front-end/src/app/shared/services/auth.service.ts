import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SignInForm, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null; 

  constructor(private http: HttpClient) { }


  register(userForm: User) {
    return this.http.post('/api/auth/signUp', userForm);
  }

  login(signInForm: SignInForm) {
    return this.http.post('/api/auth/signIn', signInForm)
    .pipe(
      tap(
        (token: any) => {
          localStorage.setItem('access_token', token['access_token']);
          this.setToken(token);
        }
      )
    )
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }

}
