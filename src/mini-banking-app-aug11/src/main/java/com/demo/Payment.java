package com.demo;

public interface Payment {
    default void validate() {
        System.out.println("Basic validation done.");
    }

    static void log(String msg) {
        System.out.println("LOG: " + msg);
    }
}
