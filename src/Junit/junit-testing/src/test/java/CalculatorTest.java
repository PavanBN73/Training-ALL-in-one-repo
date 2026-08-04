package test.java;

import main.java.Calculator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorTest {

    @Test
    void additionPass() {
        Calculator calc = new Calculator();
        assertEquals(15, calc.add(10, 5), "Expected 15");
    }
}