package com.bank.bankingapp.service;

import com.bank.bankingapp.entity.Account;
import com.bank.bankingapp.repository.AccountRepository;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // Cache-Aside
    @Cacheable(value = "accounts", key = "#accountId")
    public Account getAccountDetails(Long accountId) {

        System.out.println("Fetching account from DATABASE...");

        return accountRepository.findById(accountId)
                .orElseThrow(() ->
                        new RuntimeException("Account not found"));
    }

    // Write-Through style cache update
    @CachePut(value = "accounts", key = "#account.id")
    public Account updateAccount(Account account) {

        System.out.println("Updating account in DATABASE...");

        return accountRepository.save(account);
    }

    // Cache invalidation
    @CacheEvict(value = "accounts", key = "#accountId")
    public void deleteAccount(Long accountId) {

        System.out.println("Deleting account from DATABASE...");

        accountRepository.deleteById(accountId);
    }
}