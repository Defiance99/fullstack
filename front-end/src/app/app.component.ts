import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'; 
import { RoutingService } from './shared/services/routing.service'

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(private router: Router,  
              private activatedRoute: ActivatedRoute,  
              private titleService: Title,
              private routingService: RoutingService) {  
              
}  

  ngOnInit() {
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

  /* getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    }else {
      return activatedRoute;
    }
  } */
}
