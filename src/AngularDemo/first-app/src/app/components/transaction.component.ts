import { Component } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";

import { FundTransferService } from "../services/fundTransfer.service";

import { minimumAmountValidator }
from "../validators/minimum-amount.validator";

import { sameAccountValidator }
from "../validators/same-account.validator";

@Component({
    selector: "app-transaction",
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `

        <h1>Fund Transfer</h1>

        <h2>Balance : {{balance}}</h2>

        <form
            [formGroup]="transferForm"
            (ngSubmit)="transfer()">

            <div>
                From Account :
                <input
                    formControlName="fromAccount">
            </div>

            <br>

            <div>
                To Account :
                <input
                    formControlName="toAccount">
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
                    Source and destination
                    account cannot be same
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

    fundTransferService: FundTransferService;

    balance: number;

    message = '';

    constructor(
        fundTransferService: FundTransferService
    ) {

        this.fundTransferService =
            fundTransferService;

        this.balance =
            this.fundTransferService.getBalance();
    }

    transferForm = new FormGroup({

        fromAccount:
            new FormControl('', [
                Validators.required
            ]),

        toAccount:
            new FormControl('', [
                Validators.required
            ]),

        amount:
            new FormControl(0, [
                Validators.required,
                minimumAmountValidator
            ])

    }, {
        validators: sameAccountValidator
    });

    transfer() {

        const value =
            this.transferForm.value;

        this.message =
            this.fundTransferService.transferFunds(
                value.fromAccount!,
                value.toAccount!,
                Number(value.amount)
            );

        this.balance =
            this.fundTransferService.getBalance();
    }
}