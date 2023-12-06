import { Component, Input } from '@angular/core';
import { DeckType } from 'src/app/types/deck.type';
import { Location } from '@angular/common';
import { CardType } from 'src/app/types/card.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrl: './deck-detail.component.scss',
})
export class DeckDetailComponent {
  @Input({ required: true }) deck!: DeckType;

  constructor(private location: Location, private readonly router: Router) { }

  backPage(): void {
    this.location.back();
  }

  onClickFn(card: CardType) {
    this.router.navigate([`buy-cards/detail/${card.id}`]);
  }

  countSupertipe(type: 'Pokémon' | 'Trainer'): number {
    return this.deck.cards.reduce((suma: number, card: CardType) => {
      if (card.supertype === type) {
        suma++;
      }
      return suma;
    }, 0);
  }

  get uniqueTypes(): number {
    let types: string[] = [];

    this.deck.cards.forEach((card: CardType) => {
      if (card.types) {
        types = [...types, ...card.types];
      }
    });

    let allTypes: object = types.reduce((acc: any, curr: any) => {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});

    return Object.values(allTypes).reduce((suma: number, el: any) => {
      if (el === 1) {
        suma++;
      }
      return suma;
    }, 0);
  }
}
