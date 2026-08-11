package executorFrameworkDemo;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorDemo {

    public static void main(String[] args) {

        // Executors is a utility class used to create ExecutorService
        ExecutorService executorService =
                Executors.newFixedThreadPool(2);

        // ExecutorService can execute tasks
        executorService.execute(() -> {
            System.out.println("Task 1 is running");
        });

        executorService.execute(() -> {
            System.out.println("Task 2 is running");
        });

        // Shutdown the ExecutorService
        executorService.shutdown();
    }
}