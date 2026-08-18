package com.bank.bankingapp.controller;

import com.bank.bankingapp.entity.Account;
import com.bank.bankingapp.service.AccountService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/{id}")
    public Account getAccount(@PathVariable Long id) {

        return accountService.getAccountDetails(id);
    }

    @PutMapping
    public Account updateAccount(@RequestBody Account account) {

        return accountService.updateAccount(account);
    }

    @DeleteMapping("/{id}")
    public String deleteAccount(@PathVariable Long id) {

        accountService.deleteAccount(id);

        return "Account deleted successfully";
    }
}