import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FundTransferService, Account }
from "../services/fundTransfer.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1>Dashboard</h1>

    <h2>Create Account</h2>

    <input
      placeholder="Account Number"
      [(ngModel)]="accountNumber">

    <input
      type="number"
      placeholder="Balance"
      [(ngModel)]="balance">

    <button (click)="createAccount()">
      Add Account
    </button>

    <hr>

    <button (click)="loadAccounts()">
      Refresh Accounts
    </button>

    @for(account of accounts; track account.id){

      <div style="margin:10px;padding:10px;border:1px solid black">

        <p>ID : {{account.id}}</p>
        <p>Account : {{account.accountNumber}}</p>
        <p>Balance : ₹{{account.balance}}</p>

        <button
          (click)="updateBalance(account.id!, account.balance)">
          Add ₹500
        </button>

        <button
          (click)="deleteAccount(account.id!)">
          Delete
        </button>

      </div>
    }
  `
})
export class Dashboard implements OnInit {

  accounts: Account[] = [];

  accountNumber = "";

  balance = 0;

  constructor(
    private fundTransferService: FundTransferService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.fundTransferService
      .getAccounts()
      .subscribe(data => {
        this.accounts = data;
      });
  }

  createAccount() {

    const account: Account = {
      accountNumber: this.accountNumber,
      balance: this.balance
    };

    this.fundTransferService
      .createAccount(account)
      .subscribe(() => {

        this.loadAccounts();

        this.accountNumber = "";
        this.balance = 0;
      });
  }

  updateBalance(
    id: number,
    currentBalance: number
  ) {

    this.fundTransferService
      .updateBalance(
        id,
        currentBalance + 500
      )
      .subscribe(() => {
        this.loadAccounts();
      });
  }

  deleteAccount(id: number) {

    this.fundTransferService
      .deleteAccount(id)
      .subscribe(() => {
        this.loadAccounts();
      });
  }
}