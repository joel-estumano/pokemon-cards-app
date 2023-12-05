import { createAction, props } from '@ngrx/store';
import { ThemeModeTtype } from 'src/app/types/theme-mode.type';

export const getThemeMode = createAction('[ThemeMode get] get');
export const updateThemeMode = createAction('[ThemeMode update] update', props<ThemeModeTtype>());