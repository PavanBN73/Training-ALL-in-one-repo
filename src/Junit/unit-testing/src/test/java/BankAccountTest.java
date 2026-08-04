import org.junit.jupiter.api.Test;
import  org.junit.jupiter.api.Assertions;

import java.io.FileNotFoundException;

public class BankAccountTest {
    // methodName_condition_expectedResult

    @Test
    void withdraw_insufficientBalance_throwsException(){
        // Arrange
        BankAccount bankAccount = new BankAccount();
        bankAccount.deposit(100);

        // Act
        Exception ex = Assertions.assertThrows(FileNotFoundException.class,()->{
            bankAccount.withdraw(200);
        });

        // Assert
        Assertions.assertEquals(ex.getMessage(),"Insufficient Balance");
    }

    @Test
    void withdraw_sufficientBalance_returnTrue(){
        // Arrange
        BankAccount bankAccount = new BankAccount();
        bankAccount.deposit(100);

        // Act
        boolean transactionResult = bankAccount.withdraw(200);

        // Assert
        Assertions.assertTrue(transactionResult);
    }
}
