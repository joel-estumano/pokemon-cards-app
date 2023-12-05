import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormService {

    valid(form: FormGroup): boolean {
        Object.keys(form.controls).forEach((control) => {
            const c = form.get(control);
            if (c) {
                c.markAsDirty();
            }
        });
        return form.valid;
    }

    reset(form: FormGroup): void {
        Object.keys(form.controls).forEach((control) => {
            const c = form.get(control);
            if (c instanceof FormArray) {
                c.clear();
            }
            c?.reset();
        });
    }

    class(control: AbstractControl, valid: string, invalid: string) {
        return {
            [valid]:
                !this.handlerInvalidTouched(control) && this.handlerValidTouched(control),
            [invalid]: this.handlerInvalidTouched(control),
        };
    }

    private handlerInvalidTouched(control: AbstractControl) {
        return !control.valid && (control.touched || control.dirty);
    }

    private handlerValidTouched(control: AbstractControl) {
        return (control.touched || control.dirty || ((!control.touched || !control.dirty) && control.valid));
    }
}
