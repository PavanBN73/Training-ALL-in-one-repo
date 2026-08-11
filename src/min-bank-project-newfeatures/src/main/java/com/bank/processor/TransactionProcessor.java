package com.bank.processor;

import com.bank.model.Transaction;
import com.bank.service.BankService;

import java.util.ArrayList;
import java.util.List;

public class TransactionProcessor {
    public record TransactionResult(Transaction transaction, boolean success, String message) {}

    public List<TransactionResult> process(List<Transaction> transactions, BankService bankService) {
        var results = new ArrayList<TransactionResult>(transactions.size());
        for (var transaction : transactions) {
            var success = bankService.execute(transaction);
            var message = success ? "Processed successfully" : "Failed to process";
            results.add(new TransactionResult(transaction, success, message));
        }
        return results;
    }
}
