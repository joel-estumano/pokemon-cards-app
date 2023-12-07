import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './views/home/home.component';
import { BuyCardsComponent } from './views/buy-cards/buy-cards.component';
import { BuyCardsDetailComponent } from './views/buy-cards-detail/buy-cards-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { canDeactivateGuard } from 'src/app/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'detail/:id',
    component: BuyCardsDetailComponent,
  },
  {
    path: 'buy-cards',
    component: BuyCardsComponent,
    canDeactivate:[canDeactivateGuard]
  },
];

@NgModule({
  declarations: [HomeComponent, BuyCardsComponent, BuyCardsDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
  /*  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] */
})
export class BuyCardsModule { }
