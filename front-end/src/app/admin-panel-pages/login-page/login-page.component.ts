import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  signInForm!: FormGroup
  authSub!: Subscription

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      login: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
    })

    this.route.queryParams.subscribe(
      params => {
        if (params['registered']) {
          // вы зареганы
        }else if (params['accessDenied']) {
          // вы не зарегын
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onSubmit() {
    this.signInForm.disable();

    this.authSub = this.authService.login(this.signInForm.value).subscribe(
      () =>  {
        console.log('login success');
        this.router.navigate(['/admin-panel']);
      },
      err => {
        console.log(err);
        this.signInForm.enable();
      }
    );
  }

}
