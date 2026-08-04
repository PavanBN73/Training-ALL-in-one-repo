public class MethodOverriding {
    public static void main(String[] args) {
        Manager manager = new Manager();
        manager.designation();
    }   
}

class Employee{
    public void designation(){
        System.out.println("Employee");
    }
}

class Manager extends Employee{
    @Override
    public void designation(){
        System.out.println("Manager");
    }
}
