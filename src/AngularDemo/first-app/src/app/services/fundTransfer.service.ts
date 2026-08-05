import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FundTransferService {

    balance: number = 1000;

    constructor() {
        console.log('FundTransferService Created');
    }

    transferFunds(
        fromAccount: string,
        toAccount: string,
        amount: number
    ): string {

        if (amount <= 0) {
            return 'Invalid Amount';
        }

        if(this.balance < amount){
            return "Insufficient Balance";
        }

        this.balance -= amount;

        return `₹${amount} transferred from ${fromAccount} to ${toAccount}`;
    }

    getBalance(): number {
        return this.balance;
    }
}