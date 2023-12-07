import { AfterViewInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { addCard, remove, removeCard } from 'src/app/store/decks/decks.actions';
import { getDecks } from 'src/app/store/decks/decks.seletor';
import { CardType } from 'src/app/types/card.type';
import { DeckType } from 'src/app/types/deck.type';
import { SwiperOptions } from 'swiper/types';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-decks',
  templateUrl: './manage-decks.component.html',
  styleUrl: './manage-decks.component.scss',
})
export class ManageDecksComponent implements AfterViewInit {
  @Input({ required: false }) add: boolean = false;
  @Input({ required: false }) list: boolean = false;
  @Input({ required: false }) edit: boolean = false;
  @Input({ required: false }) remove: boolean = false;
  decks: DeckType[] = [];
  modalRef!: NgxSmartModalComponent;

  constructor(
    private readonly storeDecks: Store<{ decks: DeckType[] }>,
    public readonly ngxSmartModalService: NgxSmartModalService,
    private readonly router: Router,
    private location: Location,
  ) {
    this.storeDecks.select(getDecks).subscribe((decks: DeckType[]) => {
      this.decks = decks;
    });
  }

  ngAfterViewInit(): void {
    this.modalRef = this.ngxSmartModalService.get('modalAdd');
    if (!this.decks.length && this.add) {
      this.addDeck();
    }
  }

  addDeck(deck?: DeckType) {
    if (!deck) {
      this.modalRef.open();
    } else if (!this.modalRef.isVisible()) {
      this.ngxSmartModalService.setModalData(deck, 'modalAdd', true);
      this.modalRef.open();
    }
  }

  deleteDeck(deck: DeckType) {
    this.storeDecks.dispatch(remove(deck));
  }

  private addCard(deck: DeckType, card: CardType) {
    this.storeDecks.dispatch(addCard({ deckId: deck.id, card: card }));
  }

  removeCard(deck: DeckType, card: CardType) {
    this.storeDecks.dispatch(removeCard({ deckId: deck.id, cardId: card.id }));
  }

  cardDetail(card: CardType) {
    this.router.navigate([`buy-cards/detail/${card.id}`]);
  }

  deckDetail(deck: DeckType) {
    this.router.navigate([`my-decks/detail/${deck.id}`]);
  }

  backPage(): void {
    this.location.back();
  }

  readonly swiperConfig: SwiperOptions = {
    spaceBetween: 0,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 5,
      },
    },
  };

}
