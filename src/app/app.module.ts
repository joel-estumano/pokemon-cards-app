import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { themeModeReducer } from './store/theme-mode/theme-mode.reducer';
import { paginateQueryReducer } from './store/paginate/paginate-query.reducer';
import { decksReducer } from './store/decks/decks.reducer';
import { register } from 'swiper/element/bundle';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { HttpInterceptorProviders } from './interceptors';

export const APP_NAME = new InjectionToken<string>('APP_NAME');

register();

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        theme: themeModeReducer,
        paginateQuery: paginateQueryReducer,
        decks: decksReducer,
      },
      {}
    ),
    NgxSmartModalModule.forRoot(),
  ],
  providers: [
    { provide: APP_NAME, useValue: 'Pokemon Cards' },
    NgxSmartModalService, HttpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
