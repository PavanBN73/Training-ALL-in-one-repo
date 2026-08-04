package com.dbexample.controller;

import com.dbexample.entity.Customer;
import com.dbexample.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @PostMapping
    public String addCustomer(@RequestBody Customer customer) {
        try {
            service.addCustomer(customer);
            return "Customer Added";
        } catch (SQLException | ClassNotFoundException e) {
            return "Error: " + e.getMessage();
        }
    }

    @GetMapping
    public List<Customer> getCustomers() {
        try {
            return service.getCustomers();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable int id) {
        try {
            return service.getCustomer(id);
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable int id) {
        try {
            service.deleteCustomer(id);
            return "Customer Deleted";
        } catch (SQLException | ClassNotFoundException e) {
            return "Error: " + e.getMessage();
        }
    }
}