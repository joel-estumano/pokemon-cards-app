import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { getById } from 'src/app/store/decks/decks.seletor';
import { DeckType } from 'src/app/types/deck.type';

@Component({
  selector: 'app-my-decks-detail',
  templateUrl: './my-decks-detail.component.html',
  styleUrl: './my-decks-detail.component.scss'
})
export class MyDecksDetailComponent {

  public deck$: Observable<DeckType | undefined> = new Observable();

  constructor(private readonly storeDecks: Store<{ decks: DeckType[] }>,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.load(params);
    });
  }

  load(params: any) {
    this.deck$ = this.storeDecks.select(getById(params['id'])).pipe(tap(console.log));
  }

}
