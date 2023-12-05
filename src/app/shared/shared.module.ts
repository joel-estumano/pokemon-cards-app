import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { NavPaginationComponent } from './nav-pagination/nav-pagination.component';
import { LoadingComponent } from './loading/loading.component';
import { CardPricesPipe } from './pipes/card-prices.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { SwiperDirective } from './directives/swiper.directive';
import { ManageDecksComponent } from './manage-decks/manage-decks.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AddDeckComponent } from './manage-decks/add-deck/add-deck.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { RouterModule } from '@angular/router';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';

@NgModule({
  declarations: [
    CardComponent,
    CardDetailComponent,
    DeckDetailComponent,
    NavPaginationComponent,
    LoadingComponent,
    NotFoundComponent,
    CardPricesPipe,
    SwiperDirective,
    ManageDecksComponent,
    AddDeckComponent,
  ],
  imports: [
    CommonModule,
    NgxSmartModalModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule,
    RouterModule
  ],
  exports: [
    CardComponent,
    CardDetailComponent,
    DeckDetailComponent,
    NavPaginationComponent,
    LoadingComponent,
    NotFoundComponent,
    CardPricesPipe,
    SwiperDirective,
    ManageDecksComponent,

    DndModule,
  ],
})
export class SharedModule {}
