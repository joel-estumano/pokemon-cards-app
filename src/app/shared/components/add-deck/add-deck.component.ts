import { AfterViewInit, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DndDropEvent } from 'ngx-drag-drop';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { Observable, Observer } from 'rxjs';
import { CustomValidators } from 'src/app/form-validators/custom.validator';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate-guard.service';
import { FormService } from 'src/app/services/form.service';
import { add, update } from 'src/app/store/decks/decks.actions';
import { CardType } from 'src/app/types/card.type';
import { DeckType } from 'src/app/types/deck.type';
import { RoleType } from 'src/app/types/role.type';
import { SwiperOptions } from 'swiper/types';

enum NamesEnum {
  id = 'id',
  name = 'name',
  cards = 'cards',
}

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrl: './add-deck.component.scss',
})
export class AddDeckComponent implements AfterViewInit, CanComponentDeactivate {
  namesEnum = NamesEnum;
  form!: FormGroup;
  modalRef!: NgxSmartModalComponent;

  roles: RoleType = {
    min: 24,
    max: 60,
    repeat: {
      key: 'name',
      limit: 4,
    },
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly storeDecks: Store<{ decks: DeckType[] }>,
    public readonly formService: FormService,
    public readonly ngxSmartModalService: NgxSmartModalService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      [this.namesEnum.id]: new FormControl(null),
      [this.namesEnum.name]: new FormControl(null, [Validators.required]),
      [this.namesEnum.cards]: this.fb.array(
        [],
        [
          CustomValidators.minMaxLength(this.roles.min, this.roles.max),
          CustomValidators.maxReps(
            this.roles.repeat.key,
            this.roles.repeat.limit
          ),
        ]
      ),
    });
  }

  canDeactivate() {
    return new Observable((observer: Observer<boolean>) => {
      observer.next(this.form.dirty || this.form.touched);
    });
  }

  ngAfterViewInit(): void {
    this.modalRef = this.ngxSmartModalService.get('modalAdd');

    this.modalRef.onDataAdded.subscribe((deck: DeckType) => {
      this.form.patchValue(
        { [this.namesEnum.id]: deck.id },
        {
          emitEvent: false,
          onlySelf: true,
        }
      );

      this.form.patchValue(
        { [this.namesEnum.name]: deck.name },
        {
          emitEvent: false,
          onlySelf: true,
        }
      );

      deck.cards.forEach((card: CardType) => {
        this.addCard(card);
      });
    });

    this.modalRef.onClose.subscribe(() => {
      this.formService.reset(this.form);
    });
  }

  get formCards(): FormArray {
    return this.form.get(this.namesEnum.cards) as FormArray;
  }

  private addCard(card: CardType) {
    this.formCards.push(this.fb.control(card));
    if (!this.formCards.dirty) {
      this.formCards.markAsDirty();
    }
  }

  public removeCard(card: CardType) {
    const index = this.formCards.value.indexOf(card);
    this.formCards.removeAt(index);
  }

  onDrop(event: DndDropEvent) {
    this.addCard(event.data);
  }

  onSubmit() {
    if (this.formService.valid(this.form)) {
      const isEdit = this.form.value.id ? true : false;
      if (this.form.value.id) {
        this.storeDecks.dispatch(
          update({
            cards: this.form.value.cards,
            id: this.form.value.id,
            name: this.form.value.name,
          })
        );
      } else {
        const idTime = new Date();
        this.storeDecks.dispatch(
          add({
            cards: this.form.value.cards,
            id: idTime.toISOString(),
            name: this.form.value.name,
          })
        );
      }
      this.modalRef.close();
      if (!isEdit) {
        this.router.navigate([`my-decks`]);
      }
    }
  }

  onClickFn(card: CardType) {
    this.router.navigate([`buy-cards/detail/${card.id}`]);
  }

  readonly swiperConfig: SwiperOptions = {
    spaceBetween: 0,
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
}
