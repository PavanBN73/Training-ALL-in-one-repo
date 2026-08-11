package com.bank;

import com.bank.model.Credit;
import com.bank.model.Customer;
import com.bank.model.Debit;
import com.bank.model.Transaction;
import com.bank.model.Transfer;
import com.bank.processor.TransactionProcessor;
import com.bank.service.BankService;

import java.util.List;

public class App {
    public static void main(String[] args) {
        var bankService = createBankService();
        var transactions = createTransactionBatch();
        var results = new TransactionProcessor().process(transactions, bankService);

        System.out.println("===== Mini Banking App =====");
        System.out.println("Bank snapshot after transaction processing:\n");
        results.forEach(result -> System.out.println(formatResult(result.transaction(), result)));

        System.out.println("\nCustomer statements:\n");
        bankService.allCustomers().forEach(customer -> System.out.println(customer.statement()));
    }

    private static BankService createBankService() {
        var service = new BankService();
        service.register(new Customer("C001", "Alice", 1_200.00));
        service.register(new Customer("C002", "Bob", 550.00));
        service.register(new Customer("C003", "Clara", 3_400.50));
        return service;
    }

    private static List<Transaction> createTransactionBatch() {
        return List.of(
                new Credit("T001", "C001", 250.00),
                new Debit("T002", "C002", 120.50),
                new Transfer("T003", "C003", "C001", 800.00),
                new Debit("T004", "C002", 600.00),
                new Credit("T005", "C004", 90.00)
        );
    }

    private static String formatResult(Transaction transaction, TransactionProcessor.TransactionResult result) {
        return "[" + transaction.transactionId() + "] " + transaction.summary() + " -> " + result.message();
    }
}
