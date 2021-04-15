import { Component, ElementRef, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ReviewService } from 'src/app/shared/services/review.service';
import SwiperCore, { Navigation, Swiper, SwiperOptions } from 'swiper/core';
declare const showModalReviewWindow: any;
declare const showModalMessage: any;
declare const closeModalWindow: any;
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReviewComponent),
      multi: true
    }
  ]
})
export class ReviewComponent implements OnInit, OnDestroy {

  reviews$: Observable<Review[]> | undefined;
  isAuthenticated: boolean = false;
  reviewForm!: FormGroup;
  rating!: FormControl;
  reviewSubscription: Subscription | undefined;
  config: SwiperOptions = {
    navigation: {
      prevEl: '.custom-left-arrow-container',
      nextEl: '.custom-right-arrow-container'
    },
    spaceBetween: 20,
    slidesPerView: 1,
  }

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getReviews(4);
    this.reviewForm = new FormGroup({
      theme: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
      message: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(300)]),
    })
    this.rating = new FormControl("", [Validators.min(1), Validators.max(5)]);
  }

  ngOnDestroy(): void {
    closeModalWindow();
    this.reviewSubscription?.unsubscribe();
  }

  getReviews(limit: number) {
    this.reviews$ = this.reviewService.getByLimit(limit);
  }

  openReviewWindow() {
    this.isAuthenticated = this.authService.isAuthenticated();
    showModalReviewWindow();
  }

  openMessageModal(message: string) {
    showModalMessage(message);
  }

  onSubmit() {
    this.reviewForm.disable();
    let review = {
      'theme': this.reviewForm.value.theme,
      'message': this.reviewForm.value.message,
      'rating': this.rating.value
    }

    this.reviewSubscription = this.reviewService.create(review).subscribe(
      () => {
        this.reviewForm.enable();
        this.openMessageModal('Отзыв создан');
      },
      err => {
        this.reviewForm.enable();
        this.openMessageModal(err.message);
      }
    )
  }

}
