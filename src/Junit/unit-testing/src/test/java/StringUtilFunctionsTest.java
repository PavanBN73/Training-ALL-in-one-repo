import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

public class StringUtilFunctionsTest {

    @ParameterizedTest
    @ValueSource(strings = {"mom","sos"})
    void isPalindrome_validateMultipleArgs_true(String name){
        // Act
        boolean res = StringUtilFunctions.isPalindrome(name);

        // Assert
        Assertions.assertTrue(res);
    }
}
