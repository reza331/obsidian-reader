import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appRatingColor]',
})
export class RatingColor {

  rating = input<number>(0)

  el = inject(ElementRef)

  styleEffect = effect(() => {
    const value = this.rating();

    if (value < 7) {
      this.el.nativeElement.style.color = '#ef4444'; // red
    } else if (value < 8.5) {
      this.el.nativeElement.style.color = '#facc15'; // yellow
    } else {
      this.el.nativeElement.style.color = '#22c55e'; // green
    }
  })


}
