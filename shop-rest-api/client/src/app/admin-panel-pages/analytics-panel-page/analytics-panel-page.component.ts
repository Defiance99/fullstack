import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-analytics-panel-page',
  templateUrl: './analytics-panel-page.component.html',
  styleUrls: ['./analytics-panel-page.component.scss']
})
export class AnalyticsPanelPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
