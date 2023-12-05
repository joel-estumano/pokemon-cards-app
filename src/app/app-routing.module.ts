import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: 'buy-cards',
    loadChildren: () =>
      import('./modules/buy-cards/buy-cards.module').then(
        (m) => m.BuyCardsModule
      ),
  },
  {
    path: 'my-decks',
    loadChildren: () =>
      import('./modules/my-decks/my-decks.module').then(
        (m) => m.MyDecksModule
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
