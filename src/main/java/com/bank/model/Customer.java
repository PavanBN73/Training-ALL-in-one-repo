package com.bank.model;

import java.util.Objects;

public final class Customer {
    private final String id;
    private final String name;
    private double balance;

    public Customer(String id, String name, double balance) {
        this.id = Objects.requireNonNull(id, "Customer id cannot be null");
        this.name = Objects.requireNonNull(name, "Customer name cannot be null");
        this.balance = Math.max(0, balance);
    }

    public String id() {
        return id;
    }

    public String name() {
        return name;
    }

    public double balance() {
        return balance;
    }

    public void credit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Credit amount must be positive");
        }
        balance += amount;
    }

    public void debit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Debit amount must be positive");
        }
        if (amount > balance) {
            throw new IllegalStateException("Insufficient funds for debit");
        }
        balance -= amount;
    }

    public String statement() {
        return """
                Customer: %s
                Account ID: %s
                Balance: %.2f
                """
                .formatted(name, id, balance);
    }
}
