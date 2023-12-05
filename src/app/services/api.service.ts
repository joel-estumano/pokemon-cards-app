import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { PaginateQueryType } from 'src/app/types/paginate-query.type';
import { PaginateResultType } from 'src/app/types/paginate-result.type';

@Injectable({
  providedIn:  'root'
})
export class ApiService {
  constructor(private readonly httpService: HttpService) { }

  getAll(paginateQuery: PaginateQueryType): Observable<PaginateResultType> {
    const paginateQueryName = paginateQuery.name
      ? `&q=name:${paginateQuery.name}*`
      : ``;
    return this.httpService.getData(
      `cards?page=${paginateQuery.page}&pageSize=${paginateQuery.pageSize}${paginateQueryName}`
    );
  }

  getOne(id: string): Observable<any> {
    return this.httpService
      .getData(`cards/${id}`)
      .pipe(map((res: any) => res.data));
  }
}
