import {
    AbstractControl,
    ValidationErrors
} from "@angular/forms";

export function sameAccountValidator(
    control: AbstractControl
): ValidationErrors | null {

    const fromAccount =
        control.get('fromAccount')?.value;

    const toAccount =
        control.get('toAccount')?.value;

    if (fromAccount === toAccount) {
        return {
            sameAccount: true
        };
    }

    return null;
}