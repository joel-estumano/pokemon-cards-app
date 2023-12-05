import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyCardsComponent } from './views/buy-cards/buy-cards.component';
import { BuyCardsDetailComponent } from './views/buy-cards-detail/buy-cards-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'detail/:id',
    component: BuyCardsDetailComponent,
  },
  {
    path: '',
    component: BuyCardsComponent,
  },
];

@NgModule({
  declarations: [BuyCardsComponent, BuyCardsDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
})
export class BuyCardsModule {}
