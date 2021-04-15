import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './shared/services/auth.service';
import { RoutingService } from './shared/services/routing.service'

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {

  authSub: Subscription | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private routingService: RoutingService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.authSub = this.authService.updateTokens()?.subscribe();
    }
    this.routingService.setTitle();
    /* this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe((data: { title: string; }) => {
        this.titleService.setTitle(data.title);
      })
    }) */
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  /* getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    }else {
      return activatedRoute;
    }
  } */
}
