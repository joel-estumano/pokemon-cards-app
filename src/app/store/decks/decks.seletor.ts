import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeckType } from 'src/app/types/deck.type';

const decksState = createFeatureSelector<DeckType[]>('decks');

export const getDecks = createSelector(
    decksState,
    (state: DeckType[]) => state
);

export const getById = (deckId: string) => createSelector(
    getDecks,
    (items: DeckType[]) => items.find(el => el.id === deckId)
);
