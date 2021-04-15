import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-flow-rating',
  templateUrl: './flow-rating.component.html',
  styleUrls: ['./flow-rating.component.scss']
})
export class FlowRatingComponent implements OnInit {

  @Input() review!: Review;

  constructor() { }

  ngOnInit(): void {
  }

}
