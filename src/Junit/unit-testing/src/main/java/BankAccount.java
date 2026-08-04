import java.util.UUID;

public class BankAccount {
    private final String accountNumber;
    private double balance;

    public  BankAccount(){
        this.accountNumber = UUID.randomUUID().toString();
    }

    public void deposit(double amount){
        if(amount <0 ) throw new IllegalArgumentException("Invalid ammount");
        this.balance += amount;
    }

    public boolean withdraw(double amount){
        if(this.balance < amount) throw new IllegalArgumentException("Insufficient Balance");
        this.balance -= amount;
        return true;
    }

    public String getAccountNumber(){
        return this.accountNumber;
    }
}
