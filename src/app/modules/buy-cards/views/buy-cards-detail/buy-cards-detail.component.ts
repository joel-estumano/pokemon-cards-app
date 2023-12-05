import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CardType } from 'src/app/types/card.type';

@Component({
  selector: 'app-buy-cards-detail',
  templateUrl: './buy-cards-detail.component.html',
  styleUrls: ['./buy-cards-detail.component.scss']
})
export class BuyCardsDetailComponent implements OnInit {

  public card$: Observable<CardType> = new Observable();

  constructor(private readonly apiService: ApiService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.load(params);
    });
  }

  load(params: any) {
    this.card$ = this.apiService.getOne(params['id']).pipe(
      /*  catchError((error) => {
         this.error$.next({ error: true, message: error });
         return empty();
       }), */
      tap(console.log)
    );
  }

}
