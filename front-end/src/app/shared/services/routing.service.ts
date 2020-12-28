import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  titlePage: string | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) { }

  setTitle() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe((data: { title: string; }) => {
        this.titleService.setTitle(data.title);
        this.titlePage = data.title;
      })
    })
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    }else {
      return activatedRoute;
    }
  }

  getTitle() {
    return this.titlePage;
  }
}
