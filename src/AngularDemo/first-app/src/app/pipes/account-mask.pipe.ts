import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "accountMask",
    standalone: true
})
export class AccountMaskPipe implements PipeTransform {
    transform(accountNumber: string): string {
        if (!accountNumber) {
            return '';
        }

        return 'XXXXXX' + accountNumber.slice(-4);
    }
}
