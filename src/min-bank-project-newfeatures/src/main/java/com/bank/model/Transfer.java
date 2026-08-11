package com.bank.model;

public record Transfer(String transactionId, String fromCustomerId, String toCustomerId, double amount) implements Transaction {
    public Transfer {
        if (transactionId == null || fromCustomerId == null || toCustomerId == null) {
            throw new IllegalArgumentException("Transaction id and customer ids cannot be null");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Transfer amount must be positive");
        }
        if (fromCustomerId.equals(toCustomerId)) {
            throw new IllegalArgumentException("Transfer source and destination must differ");
        }
    }

    @Override
    public String description() {
        return "Transfer from %s to %s".formatted(fromCustomerId, toCustomerId);
    }
}
