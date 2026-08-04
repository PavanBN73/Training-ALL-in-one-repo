public class LambdaDemo {
    public static void main(String[] args) {
        Runnable t1 = new Runnable() {
            @Override
            public void run() {
                System.out.println("this is t1 " + this.getClass());
            }
        };

        Runnable t2 = () -> System.out.println("This is t2 ");

        t1.run();
        t2.run();

        Math add = (a, b) -> a + b;
        Math multiply = (a, b) -> a * b;

        System.out.println(add.process(5, 2));
        System.out.println(multiply.process(5, 2));

    }

    @FunctionalInterface
    interface Math {
        int process(int a, int b);  
    }
}

