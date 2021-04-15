import { Component, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating-control',
  templateUrl: './rating-control.component.html',
  styleUrls: ['./rating-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RatingControlComponent),
    multi: true
  }]
})
export class RatingControlComponent implements OnInit, ControlValueAccessor {

  @ViewChild('ratingReviewWrapper') ratingReviewRef!: ElementRef;
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;
  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor() { }

  ngOnInit(): void {
  }


  writeValue(value: any) {
    this.rating = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }


  countStar(star: number) {
    this.rating = star;
    this.onChange(star);
    this.onTouched();
  }

  addClass(star: number) {
    let ab = "";
    for (let i = 0; i < star; i++) {
      ab = "starId" + i;
      this.ratingReviewRef.nativeElement.querySelector(`#${ab}`).classList.add("review-form__rating-img_hovered");
    }
  }

  removeClass(star: number) {
    let ab = "";
    for (let i = star - 1; i >= this.rating; i--) {
      ab = "starId" + i;
      this.ratingReviewRef.nativeElement.querySelector(`#${ab}`).classList.remove("review-form__rating-img_hovered");
    }
  }

}
