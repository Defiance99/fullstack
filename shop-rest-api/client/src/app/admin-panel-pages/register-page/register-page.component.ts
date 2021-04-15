import { Route } from '@angular/compiler/src/core';
import { Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, DoCheck, OnDestroy {
  
  signUpForm!: FormGroup;
  hide: boolean = true;
  authSub: Subscription | undefined;

  constructor(
    private userService: UserService,
    private router: Router  
  ) { }

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      userName: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      email: new FormControl("", [Validators.required, Validators.email ,Validators.minLength(4), Validators.maxLength(20)]),
      login: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
    });
  }
  
  ngDoCheck(): void {
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.signUpForm.disable();
      this.authSub = this.userService.signUpUser(this.signUpForm.value).subscribe(
        () => {
          this.router.navigate(['/admin-panel/login']);
        },
        err => {
          this.signUpForm.enable();
        }
      )
    }
  }

}
