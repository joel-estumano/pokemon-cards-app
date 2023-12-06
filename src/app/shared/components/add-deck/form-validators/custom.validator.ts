import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    /**
     *
     * @param min minimum length required
     * @param max maximum length required
     * @returns null or { length: { min, max } }
     */
    static minMaxLength(min: number, max: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!(control.value.length >= min) || !(control.value.length <= max)) {
                return { length: { min, max } };
            }
            return null;
        };
    }

    /**
     *
     * @param key object reference key for verification
     * @param max maximum repetitions allowed
     * @returns null or { maxReps: { max }
     */
    static maxReps(key: string, max: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const occurrence = this.repeatHandler(control.value, key).find(
                (el) => el.occurrence > max
            );
            if (occurrence) {
                return { maxReps: { max } };
            }
            return null;
        };
    }

    private static repeatHandler(
        arr: any[],
        key: string
    ): { key: string; occurrence: number }[] {
        let repeat: any[] = [];
        arr.forEach((el) => {
            if (
                repeat.some((j) => {
                    return j[key] == el[key];
                })
            ) {
                repeat.forEach((k) => {
                    if (k[key] === el[key]) {
                        k.occurrence++;
                    }
                });
            } else {
                const obj: any = {
                    [key]: el[key],
                    occurrence: 1,
                };
                repeat.push(obj);
            }
        });
        return repeat;
    }
}
