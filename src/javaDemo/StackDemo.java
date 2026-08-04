
import java.util.ArrayDeque;
import java.util.Deque;

public class StackDemo {
    public static void main(String[] args) {
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = 1; i <= 10; i++)
            stack.push(i);

        print(stack);

        stack.pop();

        print(stack);

        int topEle = stack.peek();

        System.out.println("topEle: " + topEle);

        System.out.println("IsEmpty:" + stack.isEmpty());
    }

    public static void print(Deque<Integer> deque) {
        for (Integer ele : deque) {
            System.out.print(ele + " ");
        }
        System.out.println();
    }

}
