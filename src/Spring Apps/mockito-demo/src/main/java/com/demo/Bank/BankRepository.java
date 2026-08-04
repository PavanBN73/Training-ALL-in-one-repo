package com.demo.Bank;

public interface BankRepository {

    BankAccount findByAccountNumber(String accountNumber);

    void save(BankAccount account);
}