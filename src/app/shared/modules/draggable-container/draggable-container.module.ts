import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableContainerComponent } from './draggable-container.component';
import { DraggableContainerDirective } from './draggable-container.directive';

@NgModule({
  declarations: [DraggableContainerComponent, DraggableContainerDirective],
  imports: [CommonModule],
  exports: [DraggableContainerComponent, DraggableContainerDirective],
})
export class DraggableContainerModule { }
