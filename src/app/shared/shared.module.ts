import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { NavPaginationComponent } from './components/nav-pagination/nav-pagination.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CardPricesPipe } from './pipes/card-prices.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { SwiperDirective } from './directives/swiper.directive';
import { ManageDecksComponent } from './components/manage-decks/manage-decks.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AddDeckComponent } from './components/add-deck/add-deck.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ngx-drag-drop';
import { RouterModule } from '@angular/router';
import { DeckDetailComponent } from './components/deck-detail/deck-detail.component';
import { DraggableContainerModule } from './modules/draggable-container/draggable-container.module';

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
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule,
    /* modules */
    DndModule,
    DraggableContainerModule,
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
    /* modules */
    DndModule,
    DraggableContainerModule,
  ],
})
export class SharedModule { }
