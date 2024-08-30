import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

/**
 * @example
  <section class="scrollable-content" infiniteScroll (scrolled)="loadMoreData()">
    <!-- Your list of items -->
  </section>
 */
@Directive({
  selector: '[infiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective {
  @Input() scrollThreshold = 0;
  @Output() scrolled = new EventEmitter<void>();

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const deviceRatio = Math.ceil(window.devicePixelRatio ?? 1);
    // const atBottom = element.scrollHeight - Math.ceil(element.scrollTop) <= element.clientHeight + this.scrollThreshold;
    const atBottom = element.clientHeight + Math.ceil(element.scrollTop) + this.scrollThreshold >= element.scrollHeight - deviceRatio;

    if (atBottom) {
      console.log(element.clientHeight + Math.ceil(element.scrollTop) + this.scrollThreshold, '>=', element.scrollHeight - deviceRatio);
      this.scrolled.emit();
    }
  }
}
