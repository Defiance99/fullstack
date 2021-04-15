import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appReviewRating]'
})
export class ReviewRatingDirective {

  constructor(
    private element: ElementRef,
  ) { }

  @HostBinding('class.review-form__rating-img_hovered') isHovered = false;

  @HostListener('mouseenter') onMouseEnter(event: any) {
    console.log(this.element, event)
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
  }

}
