public class WrapperClassDemo {

    public static void main(String[] args) {

        // Autoboxing: primitive to wrapper
        int primitiveInt = 10;
        Integer wrappedInt = primitiveInt;  // Compiler converts automatically

        System.out.println("Primitive value: " + primitiveInt);
        System.out.println("Wrapper value: " + wrappedInt);


        // Explicit wrapper object
        Integer objInt = Integer.valueOf(25);

        // Unboxing: wrapper to primitive
        int unboxedInt = objInt;  // Compiler converts automatically

        System.out.println("Wrapper object: " + objInt);
        System.out.println("Unboxed primitive value: " + unboxedInt);
    }
}