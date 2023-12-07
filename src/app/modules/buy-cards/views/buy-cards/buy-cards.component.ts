import { Component } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import {
  Observable,
  Observer,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
} from 'rxjs';
import { PaginateResultType } from 'src/app/types/paginate-result.type';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PaginateQueryType } from 'src/app/types/paginate-query.type';
import { paginateQuery } from 'src/app/store/paginate/paginate-query.seletor';
import { updatePaginateQuery } from 'src/app/store/paginate/paginate-query.actions';
import { Router } from '@angular/router';
import { CardType } from 'src/app/types/card.type';
import { CanComponentDeactivate, CanDeactivateType } from 'src/app/guards/can-deactivate-guard.service';

@Component({
  selector: 'app-buy-cards',
  templateUrl: './buy-cards.component.html',
  styleUrls: ['./buy-cards.component.scss'],
})
export class BuyCardsComponent implements CanComponentDeactivate{

  canDeactivate(): CanDeactivateType {
    return new Observable((observer: Observer<boolean>) => {
      observer.next(true);
    });
  }
  
  formControl = new FormControl();
  private paginateQuery!: PaginateQueryType;
  paginateResult$!: Observable<PaginateResultType>;

  constructor(
    private readonly apiService: ApiService,
    private readonly storePaginate: Store<{ paginate: PaginateQueryType }>,
    private readonly router: Router
  ) {
    this.storePaginate
      .select(paginateQuery)
      .subscribe((paginateQuery: PaginateQueryType) => {
        this.paginateQuery = paginateQuery;
        this.formControl.patchValue(paginateQuery.name, {
          emitEvent: false,
          onlySelf: true,
        });
        this.paginateResult$ = this.apiService
          .getAll(paginateQuery)
          .pipe(tap(console.log));
      });

    this.formControl.valueChanges
      .pipe(
        map((value) => value.trim()),
        filter((value) => value.length > -1),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        const paginateQuery: PaginateQueryType = {
          page: 1,
          pageSize: this.paginateQuery.pageSize,
          name: value,
        };
        this.storePaginate.dispatch(updatePaginateQuery(paginateQuery));
      });
  }

  navigateToPage(page: number) {
    const paginateQuery: PaginateQueryType = {
      page: page,
      pageSize: this.paginateQuery.pageSize,
      name: this.paginateQuery.name,
    };
    this.storePaginate.dispatch(updatePaginateQuery(paginateQuery));
  }

  onClickFn(card: CardType) {
    this.router.navigate([`buy-cards/detail/${card.id}`]);
  }

  draggable = {
    data: '',
    effectAllowed: 'all',
    disable: false,
    handle: false,
  };

  onDragStart(event: DragEvent) {
    //console.log('drag started', JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {
    //console.log('drag ended', JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {
    //console.log('draggable copied', JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {
    // console.log('draggable linked', JSON.stringify(event, null, 2));
  }

  onDraggableMoved(event: DragEvent) {
    //console.log('draggable moved', JSON.stringify(event, null, 2));
  }

  onDragCanceled(event: DragEvent) {
    //console.log('drag cancelled', JSON.stringify(event, null, 2));
  }
}
