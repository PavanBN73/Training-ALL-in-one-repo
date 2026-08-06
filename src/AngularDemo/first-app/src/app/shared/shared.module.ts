import { NgModule } from '@angular/core';

import { AccountMaskPipe } from '../pipes/account-mask.pipe';

@NgModule({
    imports: [
        AccountMaskPipe
    ],
    exports: [
        AccountMaskPipe
    ]
})
export class SharedModule {
}
