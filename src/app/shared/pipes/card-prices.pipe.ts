import { Pipe, PipeTransform } from '@angular/core';
import { CardType } from 'src/app/types/card.type';
import { PriceType } from 'src/app/types/price.type';

@Pipe({
  name: 'cardPrices',
})
export class CardPricesPipe implements PipeTransform {
  transform(card: CardType, price: keyof PriceType): number {
    let prices = card.tcgplayer.prices;
    
    const keys = Object.keys(prices);

    if (keys.includes('normal')) {
      return prices.normal[price];
    }

    if (keys.includes('holofoil')) {
      return prices.holofoil[price];
    }

    return 0;
  }
}
