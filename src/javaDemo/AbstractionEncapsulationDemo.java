abstract class BankAccount {

    // Abstraction
    abstract void calculateInterest();

    void displayAccountType() {
        System.out.println("This is a bank account.");
    }
}

// Encapsulation
class SavingsAccount extends BankAccount {

    private double balance;

    SavingsAccount(double balance) {
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        if (balance >= 0) {
            this.balance = balance;
        } else {
            System.out.println("Balance cannot be negative.");
        }
    }

    @Override
    void calculateInterest() {
        double interest = balance * 0.05;
        System.out.println("Interest: " + interest);
    }
}

public class AbstractionEncapsulationDemo {

    public static void main(String[] args) {

        SavingsAccount account = new SavingsAccount(10000);

        System.out.println("Balance: " + account.getBalance());

        account.setBalance(15000);

        System.out.println("Updated Balance: " + account.getBalance());

        account.calculateInterest();
        account.displayAccountType();
    }
}


