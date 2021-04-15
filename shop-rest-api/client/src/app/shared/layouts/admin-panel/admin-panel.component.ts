import { AfterViewChecked, Component, DoCheck, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoutingService } from '../../services/routing.service'

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, DoCheck {

  titlePage: string | undefined;
  isAuthPage: boolean = false;

  constructor(
    private routingService: RoutingService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    
  }

  ngDoCheck() {
    this.titlePage = this.routingService.getTitle();

    if (this.titlePage == 'Регистрация' || this.titlePage == 'Вход в систему') {
      this.isAuthPage = true;
    }else {
      this.isAuthPage = false;
    }
  }

  logout() {
    this.authService.logout();
  }

  logoutAll() {
    this.authService.logoutAllDevice();
  }

}
