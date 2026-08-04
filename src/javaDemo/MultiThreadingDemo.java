// import java.util.concurrent.Exe;

public class MultiThreadingDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> {
            try {
                // Thread.sleep(0);
                System.out.println("t-"+ Thread.currentThread().getName()  + " Good morning");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        },"morning");

        t1.setPriority(Thread.MAX_PRIORITY);

        Thread t2 = new Thread(() -> {
            try {
                // Thread.sleep(1000);
                System.out.println("t-"+ Thread.currentThread().getName()  + " Good Afteroon");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        },"afternoon");
        t2.setPriority(Thread.NORM_PRIORITY);
        

        Thread t3 = new Thread(() -> {
            try {
                Thread.sleep(3000);// we can also simply remove this line
                System.out.println("t-"+ Thread.currentThread().isAlive()  + " Good Evening");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        });
        t3.setName("evening");
        t3.setDaemon(true);
        t3.setPriority(Thread.MIN_PRIORITY);

        t1.start();
        t2.start();
        t3.start();

        t1.join();
        t2.join();
        t3.join();


        // System.out.println(t1.getName() +" "+t2.getName()+" "+t3.getName());
        System.out.println("Main thread finished");
        System.out.println(t1.isAlive());


    }
}

class ThreadDemo extends Thread {
    String name;

    public ThreadDemo(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        System.out.println("Running Thread: " + name);

        try {
            for (int i = 0; i <= 5; i++) {
                Thread.sleep(200);
                System.out.println(name + " " + i);
            }
        } catch (InterruptedException e) {
            System.out.println(e.getMessage());
        }
    }

    public void start() {
        Thread t = new Thread(this, "internal");
        t.start();
    }

}

class Bank implements Runnable {
    String name;

    public Bank(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        System.out.println("Running Thread: " + name);

        try {
            for (int i = 0; i <= 5; i++) {
                Thread.sleep(200);
                System.out.println(name + " " + i);
            }
        } catch (InterruptedException e) {
            System.out.println(e.getMessage());
        }
    }
}
