import { createAction, props } from '@ngrx/store';
import { PaginateQueryType } from 'src/app/types/paginate-query.type';

export const getPaginateQuery = createAction('[PaginateQuery get] get');
export const updatePaginateQuery = createAction('[PaginateQuery update] update', props<PaginateQueryType>());