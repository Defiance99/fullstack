import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { SignInForm, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
    ) { }


  register(userForm: User) {
    return this.http.post('/api/auth/signUp', userForm);
  }

  login(signInForm: SignInForm) {
    return this.http.post('/api/auth/signIn', signInForm)
      .pipe(
        tap(
          (tokens: any) => {
            localStorage.setItem('access_token', tokens['access_token']);
            localStorage.setItem('refresh_token', tokens['refresh_token']);
            /* this.cookieService.set('refresh_token', tokens['refresh_token']); */
            this.setToken(tokens['access_token']);
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  logoutAllDevice() {
    return this.http.get('/api/auth/logoutAllDevice');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  updateTokens() {
    let tokens = {
      /* 'refresh_token': this.cookieService.get('refresh_token'), */
      'access_token': localStorage.getItem('access_token'),
      'refresh_token': localStorage.getItem('refresh_token')
    }
    if (tokens['refresh_token'] == '') return;
    return this.http.post('/api/auth/updateTokens', tokens)
      .pipe(
        tap(
          (tokens: any) => {
            localStorage.setItem('access_token', tokens['access_token']);
            localStorage.setItem('refresh_token', tokens['refresh_token']);
            /* this.cookieService.set('refresh_token', tokens['refresh_token']); */
            this.setToken(tokens['access_token']);
          }
        )
      )
  }

}
