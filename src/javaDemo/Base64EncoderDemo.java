import java.util.Base64;

public class Base64EncoderDemo {
    public static void main(String[] args) {
        String text = "12345";

        String encoded = Base64.getEncoder().encodeToString(text.getBytes());


        System.out.println(encoded);
    }   
}

