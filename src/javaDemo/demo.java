import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class demo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("java","js");

        names.forEach(System.out::println);
    }
}
