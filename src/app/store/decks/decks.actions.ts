import { createAction, props } from '@ngrx/store';
import { CardType } from 'src/app/types/card.type';
import { DeckType } from 'src/app/types/deck.type';

export const list = createAction('[Deck list] list');

export const add = createAction('[Deck add] add', props<DeckType>());
export const update = createAction('[Deck update] update', props<DeckType>());
export const remove = createAction('[Deck remove] remove', props<DeckType>());

export const addCard = createAction('[Deck addCard] addCard', props<{ deckId: string, card: CardType }>());
export const removeCard = createAction('[Deck removeCard] removeCard', props<{ deckId: string, cardId: string }>());