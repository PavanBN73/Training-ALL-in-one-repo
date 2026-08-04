package com.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/usersApi")
public class MyController {

    private final List<String> users =
            List.of("Prasunamba", "Meher", "Kom");

    @GetMapping
    public List<String> getUsers() {
        return users;
    }
}