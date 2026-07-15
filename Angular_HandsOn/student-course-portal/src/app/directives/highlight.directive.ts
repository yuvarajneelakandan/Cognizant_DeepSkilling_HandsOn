import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})

export class HighlightDirective {

  @Input() appHighlight = 'yellow';

  constructor(private element: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const card = this.element.nativeElement.querySelector('.course-card');
    if (card) {
      card.style.backgroundColor = this.appHighlight;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    const card = this.element.nativeElement.querySelector('.course-card');
    if (card) {
      card.style.backgroundColor = '';
    }
  }
}