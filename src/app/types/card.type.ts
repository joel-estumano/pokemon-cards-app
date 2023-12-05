import { PriceType } from "./price.type";

export type CardType = {
    id: string;
    name: string;
    images: {
        large: string;
        small: string;
    };
    supertype: 'Pokémon' | 'Trainer' | string;
    hp: string;

    attacks: [
        {
            convertedEnergyCost: number;
            damage: string;
            name: string;
            text: string;
            cost: string[];
        }
    ];

    cardmarket: {
        prices: {
            averageSellPrice: 2.68;
            avg1: number;
            avg7: number;
            avg30: number;
            germanProLow: number;
            lowPrice: number;
            lowPriceExPlus: number;
            reverseHoloAvg1: number;
            reverseHoloAvg7: number;
            reverseHoloAvg30: number;
            reverseHoloLow: number;
            reverseHoloSell: number;
            reverseHoloTrend: number;
            suggestedPrice: number;
            trendPrice: number;
        };
        updatedAt: string;
    };
    tcgplayer: {
        prices: {
            normal: PriceType;
            holofoil: PriceType;
        };
        updatedAt: string;
    };
    types: string[];
}