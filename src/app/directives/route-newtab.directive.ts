import {
  Directive,
  ElementRef,
  Inject,
  Input,
  HostListener
} from '@angular/core';
@Directive({
  selector: '[appRouteNewtab]'
})
export class RouteNewtabDirective {
  constructor(public el: ElementRef) {}
  @Input('link') link: string;
  @HostListener('mousedown') onMouseEnter() {
    window.open(this.link || '');
  }
}
