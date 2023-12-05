import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ThemeModeTtype } from 'src/app/types/theme-mode.type';

const themeModeState = createFeatureSelector<ThemeModeTtype>('theme');
export const themeMode = createSelector(themeModeState, (state: ThemeModeTtype) => state);