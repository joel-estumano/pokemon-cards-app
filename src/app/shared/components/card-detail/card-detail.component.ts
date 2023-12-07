import { Component, Input } from '@angular/core';
import { CardType } from 'src/app/types/card.type';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss',
})
export class CardDetailComponent {
  @Input({ required: true }) card!: CardType;

  constructor(private location: Location) { }

  backPage(): void {
    this.location.back();
  }
}
