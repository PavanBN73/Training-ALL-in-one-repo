import type { Account } from "../models/accounts.js";

class AccountService{
    private account:Account;

    constructor(account:Account){
        this.account = account;
    }

    withdraw(amount:number):boolean{
        if(amount < 0) throw new Error(`Amount ${amount} is invalid`);

        this.account.balance -= amount;

        console.log(`Successfully Withdrawn the account: ${amount}`);

        return true;
    }

    deposit(amount:number):boolean{
        if(amount < 0) throw new Error(`Amount ${amount} is invalid`);

        this.account.balance += amount;

        console.log(`Successfully Deposited the account: ${amount}`);

        return true;
    }

    getAccountInfo(){
       return this.account;
    }

}


export default AccountService;