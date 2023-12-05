import { createReducer, on } from '@ngrx/store';
import {
  list,
  add,
  update,
  remove,
  addCard,
  removeCard,
} from './decks.actions';
import { DeckType } from 'src/app/types/deck.type';
import { CardType } from 'src/app/types/card.type';

export const initialState: DeckType[] = [];

export const decksReducer = createReducer(
  initialState,

  on(list, (state) => ({
    ...state,
  })),

  on(add, (state: DeckType[], current: DeckType) => {
    return [current, ...state];
  }),

  on(update, (state: DeckType[], current: DeckType) => {
    return state.map((el) => {
      if (el.id === current.id) {
        return current;
      }
      return el;
    });
  }),

  on(remove, (state: DeckType[], current: DeckType) => {
    return state.filter((el) => el.id != current.id);
  }),

  on(
    addCard,
    (state: DeckType[], props: { deckId: string; card: CardType }) => {
      let current = state.find((el) => el.id === props.deckId);
      if (current) {
        state = state.map((el) => {
          if (current && el.id === current.id) {
            current = {
              ...el,
              cards: [props.card, ...el.cards],
            };
            return current;
          }
          return el;
        });
      }
      return state;
    }
  ),

  on(
    removeCard,
    (state: DeckType[], props: { deckId: string; cardId: string }) => {
      let current = state.find((el) => el.id === props.deckId);
      if (current) {
        state = state.map((el) => {
          if (current && el.id === current.id) {
            current = {
              ...el,
              cards: el.cards.filter((el) => el.id != props.cardId),
            };
            return current;
          }
          return el;
        });
      }
      return state;
    }
  )
);
