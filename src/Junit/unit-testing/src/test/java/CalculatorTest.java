import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class CalculatorTest {

    static Calculator calc;

    @BeforeAll
    static void initializeObjects(){
        calc = new Calculator();
    }

    @Test
    void additionPass() {
//        Calculator calc = new Calculator();
        Assertions.assertEquals(15, calc.add(10, 5), "Expected 15");
    }

    @Test
    void additionFail(){
//        Calculator calc = new Calculator();
        Assertions.assertNotEquals(20,calc.add(10,15),"Expected Values should never equals");
    }
}