import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeModeTtype } from './types/theme-mode.type';
import { themeMode } from './store/theme-mode/theme-mode.seletor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokemon-cards-app';

  theme!: ThemeModeTtype;

  constructor(private store: Store<{ theme: ThemeModeTtype }>) {
    this.store.select(themeMode).subscribe((theme: ThemeModeTtype) => {
      this.theme = theme;
    });
  }
}
