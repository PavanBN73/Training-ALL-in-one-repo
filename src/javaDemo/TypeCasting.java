public class TypeCasting {
    public static void main(String[] args) {
        int a = 10;
        long b = 20;

        // widening
        long c= (long)a;

        // naroowing
        int d = (int)b ;

        
        System.out.println(a);
        System.out.println(b);
        System.out.println(c);
        System.out.println(d);
    }
}
