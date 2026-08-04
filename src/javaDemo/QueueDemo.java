import java.util.ArrayDeque;
import java.util.Deque;

public class QueueDemo {
    public static void main(String[] args) {
        Deque<Integer> queue = new ArrayDeque<>();

        for(int i=1;i<=10;i++) queue.offer(i);

        print(queue);

        queue.poll();

        print(queue);

        System.out.println("Peek: "+queue.peek());
        System.out.println("Empty: "+queue.isEmpty());

    }

    public static void print(Deque<Integer> deque) {
        for (Integer ele : deque) {
            System.out.print(ele + " ");
        }
        System.out.println();
    }
}
