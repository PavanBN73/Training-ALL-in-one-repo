public class SynchronizedDemo {

    public static void main(String[] args) throws InterruptedException {
        Counter c1 = new Counter();

        Thread t1 = new Thread(c1);
        Thread t2 = new Thread(c1);

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        c1.printCount();
    }

}

class Counter implements Runnable {
    int counter = 0;

    public synchronized void increment() {
        counter++;
    }

    public void printCount(){
        System.out.println(counter);
    }

    @Override
    public void run(){
        for(int i=0;i<1000;i++){
            this.increment();
        }
    }

    
}