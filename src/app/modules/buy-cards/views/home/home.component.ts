import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SwiperOptions } from 'swiper/types';
import { ApiService } from '../../../../services/api.service';
import { PaginateResultType } from 'src/app/types/paginate-result.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  paginateResult$!: Observable<PaginateResultType>;

  constructor(private readonly apiService: ApiService) {
    this.paginateResult$ = this.apiService
      .getAll({
        page: this.randomIntFromInterval(1, 10),
        pageSize: 15,
        name: '',
      })
      .pipe();
  }
  readonly swiperConfig: SwiperOptions = {
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 5,
      },
    },
  };

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
