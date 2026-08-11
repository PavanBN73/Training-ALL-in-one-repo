package com.bank.model;

public sealed interface Transaction permits Credit, Debit, Transfer {
    String transactionId();

    double amount();

    String description();

    default String summary() {
        return switch (this) {
            case Credit c -> "Credit of %.2f to %s".formatted(c.amount(), c.customerId());
            case Debit d -> "Debit of %.2f from %s".formatted(d.amount(), d.customerId());
            case Transfer t -> "Transfer of %.2f from %s to %s".formatted(t.amount(), t.fromCustomerId(), t.toCustomerId());
        };
    }
}
