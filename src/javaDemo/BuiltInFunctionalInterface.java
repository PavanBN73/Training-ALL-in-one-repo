import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class BuiltInFunctionalInterface {
    public static void main(String[] args) {
        Function<Integer, Float> intToFloat = a -> Float.valueOf(a);

        System.out.println(intToFloat.apply(100));

        Predicate<String> isReply = reply -> reply.equals("Yes");
        System.out.println("Yes: "+(isReply.test("Yes") ? "Welcome" : ""));

        Consumer<String> order = name -> System.out.println("Order "+name+" Accepted");
        order.accept("Biriyani");

        Supplier<String> biriyani = () -> "Your Biriyani is ready";
        System.out.println(biriyani.get());;

    }

}