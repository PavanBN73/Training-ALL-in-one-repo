package executorFrameworkDemo;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class CallableFutureDemo {

    public static void main(String[] args) throws Exception {

        ExecutorService executor = Executors.newFixedThreadPool(2);

        // Callable can return a result
        Callable<Integer> task = () -> {
            int a = 10;
            int b = 20;

            return a + b;
        };

        // Submit Callable task
        Future<Integer> future = executor.submit(task);

        // Get the result
        Integer result = future.get();

        System.out.println("Result: " + result);

        executor.shutdown();
    }
}