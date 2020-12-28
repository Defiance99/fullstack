import { AfterViewChecked, Component, DoCheck, Input, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing.service'

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, DoCheck {

  titlePage: string | undefined;

  constructor(private routingService: RoutingService) {}

  ngOnInit(): void {
    
  }

  ngDoCheck() {
    this.titlePage = this.routingService.getTitle();
  }

}
