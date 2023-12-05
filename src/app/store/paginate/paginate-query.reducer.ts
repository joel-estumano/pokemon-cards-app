import { createReducer, on } from '@ngrx/store';
import { PaginateQueryType } from "src/app/types/paginate-query.type";
import { getPaginateQuery, updatePaginateQuery } from "./paginate-query.actions";

export const initialState: PaginateQueryType = {
    page: 1,
    pageSize: 30,
    name: ''
};

export const paginateQueryReducer = createReducer(
    initialState,
    on(getPaginateQuery, (state) => ({
        ...state
    })),
    on(updatePaginateQuery, (state, mode) => ({
        ...state,
        ...mode
    })),
);