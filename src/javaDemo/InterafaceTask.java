class InterafaceTask{
    public static void main(String[] args) {
        Employee emp = () -> System.out.println("Employee Details");

        emp.printDetails();
        emp.companyName();
        emp.companyHQ();
    }
}


@FunctionalInterface
interface Employee{
    abstract void printDetails();

    default void companyName(){
        System.out.println("IBM");
    }

    default void companyHQ(){
        System.out.println("New York");
    }
}