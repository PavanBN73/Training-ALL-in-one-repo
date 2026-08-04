public class DaemonDemo {
    public static void main(String[] args) throws Exception {
        Thread daemon = new Thread(() -> {
            while (true) {
                System.out.println("Daemon thread working...");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        // daemon.setDaemon(true);
        daemon.start();

        // Thread.sleep(10000); // main stays alive for
        //  10 seconds
        System.out.println("Main thread finished");
    }
}