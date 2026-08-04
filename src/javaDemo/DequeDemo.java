import java.util.ArrayDeque;
import java.util.Deque;

public class DequeDemo {
    public static void main(String[] args) {
        Deque<Integer> deque = new ArrayDeque<>();

        deque.addFirst(1);
        deque.addFirst(0);
        deque.addLast(10);

        print(deque);

        System.out.println(deque.peekFirst());

        deque.removeFirst();

        print(deque);

        System.out.println(deque.peekLast());
        deque.removeLast();

        print(deque);

        deque.removeLast();

        System.out.println("isEmpty: "+deque.isEmpty());


    }

    public static void print(Deque<Integer> deque) {
        for (Integer ele : deque) {
            System.out.print(ele + " ");
        }
        System.out.println();
    }
}
