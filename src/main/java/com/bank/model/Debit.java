package com.bank.model;

public non-sealed record Debit(String transactionId, String customerId, double amount) implements Transaction {
    public Debit {
        if (transactionId == null || customerId == null) {
            throw new IllegalArgumentException("Transaction id and customer id cannot be null");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Debit amount must be positive");
        }
    }

    @Override
    public String description() {
        return "Debit from customer %s".formatted(customerId);
    }
}
