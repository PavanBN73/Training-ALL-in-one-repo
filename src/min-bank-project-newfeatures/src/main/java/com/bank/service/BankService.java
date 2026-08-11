package com.bank.service;

import com.bank.model.Customer;
import com.bank.model.Transaction;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class BankService {
    private final Map<String, Customer> customers = new HashMap<>();

    public void register(Customer customer) {
        Objects.requireNonNull(customer, "Customer cannot be null");
        customers.put(customer.id(), customer);
    }

    public Customer customer(String customerId) {
        return customers.get(customerId);
    }

    public Collection<Customer> allCustomers() {
        return customers.values();
    }

    public boolean execute(Transaction transaction) {
        Objects.requireNonNull(transaction, "Transaction cannot be null");

        return switch (transaction) {
            case com.bank.model.Credit credit -> doCredit(credit);
            case com.bank.model.Debit debit -> doDebit(debit);
            case com.bank.model.Transfer transfer -> doTransfer(transfer);
            default -> false;
        };
    }

    private boolean doCredit(com.bank.model.Credit credit) {
        var customer = customer(credit.customerId());
        if (customer == null) {
            return false;
        }
        customer.credit(credit.amount());
        return true;
    }

    private boolean doDebit(com.bank.model.Debit debit) {
        var customer = customer(debit.customerId());
        if (customer == null) {
            return false;
        }
        try {
            customer.debit(debit.amount());
            return true;
        } catch (IllegalStateException e) {
            return false;
        }
    }

    private boolean doTransfer(com.bank.model.Transfer transfer) {
        var from = customer(transfer.fromCustomerId());
        var to = customer(transfer.toCustomerId());
        if (from == null || to == null) {
            return false;
        }
        try {
            from.debit(transfer.amount());
            to.credit(transfer.amount());
            return true;
        } catch (IllegalStateException e) {
            return false;
        }
    }
}
