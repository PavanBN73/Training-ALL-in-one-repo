package main.java.Bank;

public interface BankRepository {

    BankAccount findByAccountNumber(String accountNumber);

    void save(BankAccount account);
}