import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateThemeMode } from 'src/app/store/theme-mode/theme-mode.actions';
import { themeMode } from 'src/app/store/theme-mode/theme-mode.seletor';
import { ThemeModeTtype } from 'src/app/types/theme-mode.type';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    theme!: ThemeModeTtype;

    constructor(private store: Store<{ theme: ThemeModeTtype }>) {
        this.store.select(themeMode).subscribe((theme: ThemeModeTtype) => {
            this.theme = theme;
        });
    }

    changeMode($event: any) {
        this.theme = {
            mode: $event.target.checked ? 'dark' : 'light',
        };
        this.store.dispatch(updateThemeMode(this.theme));
    }

    protected get isDarkMode(): boolean {
        return this.theme.mode === 'dark';
    }
}
