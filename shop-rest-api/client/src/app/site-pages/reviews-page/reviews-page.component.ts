import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/app/shared/interfaces';
import { ReviewService } from 'src/app/shared/services/review.service';

@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.scss']
})
export class ReviewsPageComponent implements OnInit {

  reviews$!: Observable<Review[]>

  constructor(
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.reviews$ = this.reviewService.getAll();
  }

}
