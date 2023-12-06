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

  private currentX: number = 0;
  private currentY: number = 0;

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

    this.render.addClass(this.elementRef.nativeElement, 'fixed');
    this.render.addClass(this.elementRef.nativeElement, 'shadow-2xl');
    this.render.addClass(this.elementRef.nativeElement, 'rounded-lg');

    this.currentX =
      this.elementRef.nativeElement.parentElement.offsetWidth -
      this.elementRef.nativeElement.offsetWidth;
    this.currentY = 76;

    this.setPosition(this.elementRef, this.currentX, this.currentY);
  }

  initDrag(): void {
    const dragStart$ = fromEvent<MouseEvent>(this.element, 'mousedown');
    const dragEnd$ = fromEvent<MouseEvent>(this.document, 'mouseup');
    const drag$ = fromEvent<MouseEvent>(this.document, 'mousemove').pipe(
      takeUntil(dragEnd$)
    );

    let initialX: number, initialY: number;

    let dragSub!: Subscription;

    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - this.currentX;
      initialY = event.clientY - this.currentY;

      this.element.classList.add('free-dragging');

      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        this.currentX = event.clientX - initialX;
        this.currentY = event.clientY - initialY;

        this.setPosition(this.elementRef, this.currentX, this.currentY);
      });
    });

    const dragEndSub = dragEnd$.subscribe(() => {
      initialX = this.currentX;
      initialY = this.currentY;
      this.element.classList.remove('free-dragging');
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragSub,
      dragEndSub,
    ]);
  }

  private setPosition(ref: ElementRef, x: number, y: number): void {
    ref.nativeElement.style.left = `${x}px`;
    ref.nativeElement.style.top = `${y}px`;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }
}
