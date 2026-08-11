package com.demo;

import java.util.Optional;

public class Customer {
    private final String name;
    private Optional<String> panCard;

    public Customer(String name,String panCrad){
        this.name = name;
        this.panCard = Optional.ofNullable(panCrad);
    }

    public String getName(){
        return  this.name;
    }

    public Optional<String> getPanCard(){
        return  panCard;
    }
}
