import { Component } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";

import { FundTransferService }
    from "../services/fundTransfer.service";

import { minimumAmountValidator }
    from "../validators/minimum-amount.validator";

import { sameAccountValidator }
    from "../validators/same-account.validator";

import { AccountMaskPipe }
    from "../pipes/account-mask.pipe";
import { SharedModule } from "../shared/shared.module";

@Component({
    selector: "app-transaction",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        SharedModule
    ],
    template: `
    <h1>Fund Transfer</h1>

    <h2>
      {{ accountNumber | accountMask }}
    </h2>

    <form
      [formGroup]="transferForm"
      (ngSubmit)="transfer()">

      <div>
        From Account :
        <input formControlName="fromAccount">
      </div>

      <br>

      <div>
        To Account :
        <input formControlName="toAccount">
      </div>

      <br>

      <div>
        Amount :
        <input
          type="number"
          formControlName="amount">
      </div>

      @if(
        transferForm.get('amount')
        ?.errors?.['minimumAmount']
      ){
        <p>
          Minimum amount should be ₹100
        </p>
      }

      @if(
        transferForm.errors?.['sameAccount']
      ){
        <p>
          Source and destination account
          cannot be same
        </p>
      }

      <br>

      <button
        type="submit"
        [disabled]="transferForm.invalid">

        Transfer

      </button>

    </form>

    <p>{{message}}</p>
  `
})
export class Transaction {

    accountNumber = "1234567890";

    message = "";

    constructor(
        private fundTransferService: FundTransferService
    ) { }

    transferForm = new FormGroup({

        fromAccount: new FormControl(
            "",
            [Validators.required]
        ),

        toAccount: new FormControl(
            "",
            [Validators.required]
        ),

        amount: new FormControl(
            0,
            [
                Validators.required,
                minimumAmountValidator
            ]
        )

    }, {
        validators: sameAccountValidator
    });

    transfer() {

        const value =
            this.transferForm.value;

        this.fundTransferService
            .transferFunds(
                value.fromAccount!,
                value.toAccount!,
                Number(value.amount)
            )
            .subscribe({

                next: () => {

                    this.message =
                        `₹${value.amount} transferred successfully`;

                    this.transferForm.reset();
                },

                error: () => {

                    this.message =
                        "Transfer Failed";
                }
            });
    }
}