import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDecksComponent } from './views/my-decks/my-decks.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyDecksDetailComponent } from './views/my-decks-detail/my-decks-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MyDecksComponent,
  },
  {
    path: 'detail/:id',
    component: MyDecksDetailComponent,
  },
];

@NgModule({
  declarations: [MyDecksComponent, MyDecksDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MyDecksModule { }
