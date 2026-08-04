import java.util.ArrayList;
import java.util.List;

public class ForEachDemo {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();

        for(int i=1;i<=10;i++) list.add(i);

        list.forEach((ele)->{
            if(ele % 2 == 0 ) System.out.println(ele +" is even");
            else System.out.println(ele+" is odd");
        });

        
    }
}
