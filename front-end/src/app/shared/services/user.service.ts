import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInForm, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  signUpUser(userForm: User) {
    return this.http.post('/api/auth/signUp', userForm);
  }

  signInUser(signInForm: SignInForm) {
    return this.http.post('/api/auth/signIn', signInForm);
  }

}
