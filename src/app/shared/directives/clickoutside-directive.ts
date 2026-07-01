import { Directive, ElementRef, HostListener, inject, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Directive({
  selector: '[appClickoutsideDirective]',
})
export class ClickoutsideDirective {

  private elementRef = inject(ElementRef);
  @Output() clickOutside = new EventEmitter<any>();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: EventTarget | null): void {

    const clickedElement = target as HTMLElement;

    if (!clickedElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(clickedElement);

    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }

}
