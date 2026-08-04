public class FuncInterface {
    public static void main(String[] args) {
        Calculator<Integer, Integer, Integer> addition = (a, b) -> a + b;
        Calculator<Integer, Integer, Integer> subtraction = (a, b) -> a - b;
        Calculator<Double, Double, Double> multiplication = (a, b) -> a * b;

        System.out.println(addition.compute(10, 20));
        System.out.println(subtraction.compute(30, 20));
        System.out.println(multiplication.compute(10.0, 20.0));
    }
}

@FunctionalInterface
interface Calculator<T1, T2, R> {
    R compute(T1 a, T2 b);
}