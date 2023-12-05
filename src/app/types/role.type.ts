import { CardType } from './card.type';

export type RoleType = {
    min: number;
    max: number;
    repeat: {
        key: keyof CardType;
        limit: number;
    };
};
