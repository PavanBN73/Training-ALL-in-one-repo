package com.bank.model;

public record Credit(String transactionId, String customerId, double amount) implements Transaction {
    public Credit {
        if (transactionId == null || customerId == null) {
            throw new IllegalArgumentException("Transaction id and customer id cannot be null");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Credit amount must be positive");
        }
    }

    @Override
    public String description() {
        return "Credit to customer %s".formatted(customerId);
    }
}
