import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginateResultType } from 'src/app/types/paginate-result.type';

@Component({
  selector: 'app-nav-pagination',
  templateUrl: './nav-pagination.component.html',
  styleUrl: './nav-pagination.component.scss',
})
export class NavPaginationComponent {
  @Input({ required: true }) paginate!: PaginateResultType;
  @Output() navigate = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.paginate.totalCount / this.paginate.pageSize);
  }

  get prevPage(): boolean {
    return this.paginate.page <= 1;
  }

  get nextPage(): boolean {
    return this.paginate.page >= this.totalPages;
  }

  get carousel(): number[] {
    if (this.totalPages >= this.paginate.page) {
      const carousel = [
        this.paginate.page - 4,
        this.paginate.page - 3,
        this.paginate.page - 2,
        this.paginate.page - 1,
        this.paginate.page,
        this.paginate.page + 1,
        this.paginate.page + 2,
        this.paginate.page + 3,
        this.paginate.page + 4,
      ];
      return carousel
        .filter((el) => el > 0)
        .slice(0, this.totalPages >= 5 ? 5 : this.totalPages);
    }
    return [];
  }

  navigateToPage(page: number) {
    if (page !== this.paginate.page && page > 0 && page <= this.totalPages)
      this.navigate.emit(page);
  }
}
