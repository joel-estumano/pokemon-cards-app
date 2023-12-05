import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaginateQueryType } from 'src/app/types/paginate-query.type';

const paginateQueryState = createFeatureSelector<PaginateQueryType>('paginateQuery');
export const paginateQuery = createSelector(paginateQueryState, (state: PaginateQueryType) => state);