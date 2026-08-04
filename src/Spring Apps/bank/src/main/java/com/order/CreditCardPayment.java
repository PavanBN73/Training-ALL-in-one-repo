package com.order;

import org.springframework.stereotype.Service;

@Service
public class CreditCardPayment implements PaymentService {
    @Override
    public boolean processPayment(double amount){
        System.out.println("Payment Completed: "+amount);
        return true;
    }
}
