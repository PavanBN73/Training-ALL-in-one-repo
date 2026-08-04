package com.dbexample.service;

import com.dbexample.entity.Customer;
import com.dbexample.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public void addCustomer(Customer customer) throws SQLException, ClassNotFoundException {
        repository.save(customer);
    }

    public List<Customer> getCustomers() throws SQLException, ClassNotFoundException {
        return repository.findAll();
    }

    public Customer getCustomer(int id) throws SQLException, ClassNotFoundException {
        return repository.findById(id);
    }

    public void deleteCustomer(int id) throws SQLException, ClassNotFoundException {
        repository.deleteById(id);
    }
}
