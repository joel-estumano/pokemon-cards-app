import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardType } from 'src/app/types/card.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) card!: CardType;
  @Input({ required: false }) size: 'small' | 'large' = 'small';
  @Input({ required: false }) autoHeight: boolean = false;
  @Input({ required: false }) remove: boolean = false;

  @Output() onClick = new EventEmitter<CardType>();
  @Output() onRemove = new EventEmitter<CardType>();

  onClickFn(card: CardType): void {
    this.onClick.emit(card);
  }

  onClickRemoveFn(card: CardType): void {
    this.onRemove.emit(card);
  }

  get isLarge(): boolean {
    return this.size === 'large';
  }
}
