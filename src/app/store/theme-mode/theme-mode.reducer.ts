import { createReducer, on } from '@ngrx/store';
import { ThemeModeTtype } from 'src/app/types/theme-mode.type';
import { getThemeMode, updateThemeMode } from './theme-mode.actions';

const theme = localStorage.getItem('theme');

export const initialState: ThemeModeTtype = {
    mode: theme ? JSON.parse(theme).mode : 'dark',
};

export const themeModeReducer = createReducer(
    initialState,
    on(getThemeMode, (state) => ({
        ...state,
    })),
    on(updateThemeMode, (state, mode) => {
        localStorage.setItem('theme', JSON.stringify(mode));
        return {
            ...state,
            ...mode,
        };
    })
);
