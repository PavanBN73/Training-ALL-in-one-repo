import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Account {
    id?: number;
    accountNumber: string;
    balance: number;
}

@Injectable({
    providedIn: "root"
})
export class FundTransferService {

    private apiUrl =
        "http://localhost:3000/accounts";

    constructor(
        private http: HttpClient
    ) { }

    // GET ALL
    getAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(
            this.apiUrl
        );
    }

    // GET BY ID
    getAccount(
        id: number
    ): Observable<Account> {

        return this.http.get<Account>(
            `${this.apiUrl}/${id}`
        );
    }

    // GET BY ACCOUNT NUMBER
    getAccountByNumber(
        accountNumber: string
    ): Observable<Account[]> {

        return this.http.get<Account[]>(
            `${this.apiUrl}?accountNumber=${accountNumber}`
        );
    }

    // POST
    createAccount(
        account: Account
    ): Observable<Account> {

        return this.http.post<Account>(
            this.apiUrl,
            account
        );
    }

    // PATCH
    updateBalance(
        id: number,
        balance: number
    ): Observable<Account> {

        return this.http.patch<Account>(
            `${this.apiUrl}/${id}`,
            {
                balance
            }
        );
    }

    // DELETE
    deleteAccount(
        id: number
    ): Observable<void> {

        return this.http.delete<void>(
            `${this.apiUrl}/${id}`
        );
    }

    // SAVE TRANSFER HISTORY
    transferFunds(
        fromAccount: string,
        toAccount: string,
        amount: number
    ) {

        return this.http.post(
            "http://localhost:3000/transfers",
            {
                fromAccount,
                toAccount,
                amount,
                transferDate: new Date()
            }
        );
    }
}