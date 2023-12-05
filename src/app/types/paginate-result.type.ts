import { CardType } from "./card.type";

export type PaginateResultType = {
    count: number;
    data: CardType[];
    page: number;
    pageSize: number;
    totalCount: number;
};
