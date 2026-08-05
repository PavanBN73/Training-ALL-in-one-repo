import { AbstractControl, ValidationErrors } from "@angular/forms";

export function minimumAmountValidator(
    control: AbstractControl
): ValidationErrors | null {

    if (control.value < 100) {
        return {
            minimumAmount: true
        };
    }

    return null;
}