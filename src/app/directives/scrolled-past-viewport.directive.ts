import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from "@angular/core";
import { Subscription, fromEvent } from "rxjs";

@Directive({
    selector: '[appScrolledPastViewPort]',
    standalone: true,
})
export class ScrolledPastViewPortDirective implements OnDestroy {
    @Output() pastViewport: EventEmitter<number> = new EventEmitter<number>();
    viewportPage = 0;
    private sub$: Subscription;
    constructor(private el: ElementRef) {
        this.sub$ = fromEvent(this.el.nativeElement, 'scroll').subscribe(() => {
            const scrollPosition = this.el.nativeElement.scrollTop;
            const currentViewPortPage = Math.floor(scrollPosition / window.innerHeight);
            if (currentViewPortPage > this.viewportPage) {
                // The user has scrolled past the bottom edge of the viewport
                console.log('Scrolled past the bottom edge of the viewport', currentViewPortPage);
                this.viewportPage = currentViewPortPage;
                this.pastViewport.emit(currentViewPortPage);
            }
        });
    }

    ngOnDestroy(): void {
        this.sub$.unsubscribe();
    }
}