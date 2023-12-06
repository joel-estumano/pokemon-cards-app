import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDraggableContainer]'
})
export class DraggableContainerDirective implements AfterViewInit {

  @Input({ required: true }) draggableContainer: boolean = false;

  constructor(private ref: ElementRef) { }

  private parent!: ElementRef;

  ngAfterViewInit(): void {
    this.parent = this.ref.nativeElement.parentElement;
  }

}
