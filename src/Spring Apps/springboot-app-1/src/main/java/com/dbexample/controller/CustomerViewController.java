package com.dbexample.controller;

import com.dbexample.service.CustomerService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/thymeleaf")
public class CustomerViewController {

    private final CustomerService service;

    public CustomerViewController(CustomerService service) {
        this.service = service;
    }

    @GetMapping("/view-customers")
    public String viewCustomers(Model model) throws Exception {

        model.addAttribute(
                "customers",
                service.getCustomers()
        );

        return "customers";
    }
}