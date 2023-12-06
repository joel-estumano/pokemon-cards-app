import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subscription, fromEvent, takeUntil } from 'rxjs';

@Directive({
  selector: '[appDraggableContainer]',
})
export class DraggableContainerDirective
  implements OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true }) draggableContainer: boolean = false;

  private element!: HTMLElement;
  private parent!: ElementRef;

  private subscriptions: Subscription[] = [];

  private currentX!: number;
  private currentY!: number;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any,
    private render: Renderer2
  ) { }

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement as HTMLElement;
    this.initDrag();
  }

  ngAfterViewInit(): void {
    this.parent = this.elementRef.nativeElement.parentElement;
    this.render.addClass(this.elementRef.nativeElement, 'shadow-2xl');
    this.render.addClass(this.elementRef.nativeElement, 'rounded-lg');

    this.currentX =
      this.elementRef.nativeElement.parentElement.offsetWidth -
      this.elementRef.nativeElement.offsetWidth;
    this.currentY =
      this.elementRef.nativeElement.parentElement.offsetHeight -
      this.elementRef.nativeElement.parentElement.offsetHeight * 2 +
      this.elementRef.nativeElement.offsetHeight;

    this.element.style.transform =
      'translate3d(' + this.currentX + 'px, ' + this.currentY + 'px, 0)';
  }

  initDrag(): void {
    // main logic will come here

    // 1
    const dragStart$ = fromEvent<MouseEvent>(this.element, 'mousedown');
    const dragEnd$ = fromEvent<MouseEvent>(this.document, 'mouseup');
    const drag$ = fromEvent<MouseEvent>(this.document, 'mousemove').pipe(
      takeUntil(dragEnd$)
    );

    // 2
    let initialX: number,
      initialY: number /* ,
      currentX = 0,
      currentY = 0 */;

    let dragSub!: Subscription;

    // 3
    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - this.currentX;
      initialY = event.clientY - this.currentY;

      this.element.classList.add('free-dragging');

      // 4
      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        this.currentX = event.clientX - initialX;
        this.currentY = event.clientY - initialY;

        console.log(
          'currentX: ',
          this.currentX + ' - currentY: ',
          this.currentY + ' - parent: ',
          this.elementRef.nativeElement.parentElement.offsetWidth
        );

        this.element.style.transform =
          'translate3d(' + this.currentX + 'px, ' + this.currentY + 'px, 0)';
      });
    });

    // 5
    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = this.currentX;
      initialY = this.currentY;
      this.element.classList.remove('free-dragging');
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    // 6
    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragSub,
      dragEndSub,
    ]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }
}
