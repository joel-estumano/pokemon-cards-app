import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeModeTtype } from './types/theme-mode.type';
import { themeMode } from './store/theme-mode/theme-mode.seletor';
import { APP_NAME } from './app.module';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  theme!: ThemeModeTtype;

  constructor(
    @Inject(APP_NAME) private appName: string,
    private title: Title,
    private store: Store<{ theme: ThemeModeTtype }>
  ) {
    this.title.setTitle(this.appName);
    this.store.select(themeMode).subscribe((theme: ThemeModeTtype) => {
      this.theme = theme;
    });
  }
}
